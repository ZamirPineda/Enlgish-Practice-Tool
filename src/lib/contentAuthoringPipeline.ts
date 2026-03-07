import { z } from "zod";
import {
  contentInventoryDifficultySchema,
  contentInventoryFormatSchema,
  contentInventoryItemSchema,
  contentInventoryMetadataSchema,
  contentInventoryPackSchema,
  contentInventorySkillSchema,
  contentInventorySourceSchema,
  createContentInventoryItem,
  createEmptyContentInventoryPack,
  parseContentInventoryPack,
  type ContentInventoryItem,
  type ContentInventoryPack,
} from "@/lib/contentInventory";
import {
  dedupeContentInventoryItems,
  type ContentInventoryDedupeReport,
} from "@/lib/contentInventoryDedupe";
import {
  lintAuthoredContentRows,
  type ContentAuthoringLintReport,
  type LintableAuthoredContentRow,
} from "@/lib/contentAuthoringLinter";
import { validateAuthoredContentRecordQuality } from "@/lib/contentAuthoringQuality";
import {
  authoredContentChangelogSchema,
  buildAuthoredContentChangelog,
  type VersionedContentInventoryBundleSnapshot,
} from "@/lib/contentAuthoringVersioning";

export const AUTHORED_CONTENT_BUNDLE_SCHEMA_VERSION = 2;
const DEFAULT_PACK_VERSION = "1.0.0";
const DEFAULT_SOURCE_LABEL = "manual_import";
const authoredContentVersionSchema = z
  .string()
  .regex(/^\d+\.\d+\.\d+$/, "Expected semantic version like 1.0.0");

export const authoredContentRecordSchema = z.object({
  id: z.string().min(3).optional(),
  source: contentInventorySourceSchema.default("manual"),
  skill: contentInventorySkillSchema,
  difficulty: contentInventoryDifficultySchema,
  format: contentInventoryFormatSchema,
  prompt: z.string().min(1),
  answer: z.string().min(1).optional(),
  alternatives: z.array(z.string().min(1)).default([]),
  hints: z.array(z.string().min(1)).default([]),
  tags: z.array(z.string().min(1)).default([]),
  metadata: contentInventoryMetadataSchema.default({}),
  active: z.boolean().default(true),
});

export type AuthoredContentRecord = z.infer<typeof authoredContentRecordSchema>;

const authoredContentJsonDocumentSchema = z.union([
  z.array(authoredContentRecordSchema),
  z.object({
    packVersion: authoredContentVersionSchema.optional(),
    sourceLabel: z.string().min(1).optional(),
    items: z.array(authoredContentRecordSchema),
  }),
]);

export interface AuthoredContentValidationIssue {
  row: number;
  field: string;
  message: string;
}

export interface ParsedAuthoredContentInput {
  rows: AuthoredContentRecord[];
  issues: AuthoredContentValidationIssue[];
  packVersion?: string;
  sourceLabel?: string;
}

export interface PreparedAuthoredContentRowsResult {
  rows: LintableAuthoredContentRow[];
  issues: AuthoredContentValidationIssue[];
  packVersion?: string;
  sourceLabel?: string;
}

interface ParsedAuthoredContentRow extends LintableAuthoredContentRow {}

interface ParsedAuthoredContentRowsResult {
  rows: ParsedAuthoredContentRow[];
  issues: AuthoredContentValidationIssue[];
  packVersion?: string;
  sourceLabel?: string;
}

export const authoredContentInventoryBundleSchema = z.object({
  schemaVersion: z.literal(AUTHORED_CONTENT_BUNDLE_SCHEMA_VERSION),
  packVersion: authoredContentVersionSchema,
  sourceLabel: z.string().min(1),
  sourceFormat: z.enum(["csv", "json"]),
  generatedAt: z.string(),
  inventory: contentInventoryPackSchema,
  changelog: authoredContentChangelogSchema,
  summary: z.object({
    importedCount: z.number().int().nonnegative(),
    invalidCount: z.number().int().nonnegative(),
    removedDuplicateCount: z.number().int().nonnegative(),
  }),
});

export type AuthoredContentInventoryBundle = z.infer<
  typeof authoredContentInventoryBundleSchema
>;

export interface ImportedAuthoredContentResult {
  bundle: AuthoredContentInventoryBundle;
  dedupeReport: ContentInventoryDedupeReport;
  lintReport: ContentAuthoringLintReport;
  issues: AuthoredContentValidationIssue[];
}

const KNOWN_CSV_COLUMNS = new Set([
  "id",
  "source",
  "skill",
  "difficulty",
  "format",
  "prompt",
  "answer",
  "alternatives",
  "hints",
  "tags",
  "active",
  "gameid",
  "deckid",
  "moduleid",
  "unitid",
  "routeobjective",
  "topic",
  "cefr",
]);

const normalizeHeader = (value: string) =>
  value.trim().toLowerCase().replace(/[\s_-]+/g, "");

const splitListCell = (value: string): string[] => {
  const trimmed = value.trim();
  if (!trimmed) {
    return [];
  }

  if (trimmed.startsWith("[") && trimmed.endsWith("]")) {
    try {
      const parsed = JSON.parse(trimmed);
      if (Array.isArray(parsed)) {
        return parsed
          .map((item) => `${item}`.trim())
          .filter((item) => item.length > 0);
      }
    } catch {
      // Fall through to delimiter parsing.
    }
  }

  return trimmed
    .split("|")
    .map((item) => item.trim())
    .filter((item) => item.length > 0);
};

const parseBooleanCell = (value: string): boolean => {
  const normalized = value.trim().toLowerCase();
  return normalized === "true" || normalized === "1" || normalized === "yes";
};

const buildRowIssue = (
  row: number,
  field: string,
  message: string,
): AuthoredContentValidationIssue => ({
  row,
  field,
  message,
});

const safeParseAuthoredRecord = (
  rowNumber: number,
  candidate: unknown,
): { row: AuthoredContentRecord | null; issues: AuthoredContentValidationIssue[] } => {
  const parsed = authoredContentRecordSchema.safeParse(candidate);
  if (parsed.success) {
    return { row: parsed.data, issues: [] };
  }

  return {
    row: null,
    issues: parsed.error.issues.map((issue) =>
      buildRowIssue(
        rowNumber,
        issue.path.length > 0 ? issue.path.join(".") : "row",
        issue.message,
      ),
    ),
  };
};

const parseCsvTable = (input: string): string[][] => {
  const rows: string[][] = [];
  let currentRow: string[] = [];
  let currentField = "";
  let inQuotes = false;

  for (let index = 0; index < input.length; index += 1) {
    const char = input[index];
    const nextChar = input[index + 1];

    if (inQuotes) {
      if (char === '"') {
        if (nextChar === '"') {
          currentField += '"';
          index += 1;
        } else {
          inQuotes = false;
        }
      } else {
        currentField += char;
      }
      continue;
    }

    if (char === '"') {
      inQuotes = true;
      continue;
    }

    if (char === ",") {
      currentRow.push(currentField);
      currentField = "";
      continue;
    }

    if (char === "\n") {
      currentRow.push(currentField);
      if (currentRow.some((field) => field.trim().length > 0)) {
        rows.push(currentRow);
      }
      currentRow = [];
      currentField = "";
      continue;
    }

    if (char !== "\r") {
      currentField += char;
    }
  }

  currentRow.push(currentField);
  if (currentRow.some((field) => field.trim().length > 0)) {
    rows.push(currentRow);
  }

  return rows;
};

const coerceCsvRecord = (
  headers: string[],
  values: string[],
): Record<string, unknown> => {
  const rawRecord = headers.reduce<Record<string, string>>((accumulator, header, index) => {
    accumulator[header] = values[index] ?? "";
    return accumulator;
  }, {});

  const metadataExtras = Object.entries(rawRecord).reduce<Record<string, unknown>>(
    (accumulator, [header, value]) => {
      if (!KNOWN_CSV_COLUMNS.has(header) && value.trim().length > 0) {
        accumulator[header] = value.trim();
      }
      return accumulator;
    },
    {},
  );

  return {
    id: rawRecord.id || undefined,
    source: rawRecord.source || "manual",
    skill: rawRecord.skill,
    difficulty: rawRecord.difficulty,
    format: rawRecord.format,
    prompt: rawRecord.prompt,
    answer: rawRecord.answer || undefined,
    alternatives: splitListCell(rawRecord.alternatives || ""),
    hints: splitListCell(rawRecord.hints || ""),
    tags: splitListCell(rawRecord.tags || ""),
    active:
      rawRecord.active && rawRecord.active.trim().length > 0
        ? parseBooleanCell(rawRecord.active)
        : true,
    metadata: {
      ...metadataExtras,
      gameId: rawRecord.gameid || undefined,
      deckId: rawRecord.deckid || undefined,
      moduleId: rawRecord.moduleid || undefined,
      unitId: rawRecord.unitid || undefined,
      routeObjective: rawRecord.routeobjective || undefined,
      topic: rawRecord.topic || undefined,
      cefr: rawRecord.cefr || undefined,
    },
  };
};

export const parseAuthoredContentCsv = (input: string): ParsedAuthoredContentInput => {
  const table = parseCsvTable(input);
  if (table.length === 0) {
    return {
      rows: [],
      issues: [buildRowIssue(0, "file", "CSV input is empty")],
    };
  }

  const [headerRow, ...dataRows] = table;
  const headers = headerRow.map(normalizeHeader);

  if (!headers.includes("prompt")) {
    return {
      rows: [],
      issues: [buildRowIssue(0, "header", 'CSV header must include "prompt"')],
    };
  }

  return dataRows.reduce<ParsedAuthoredContentInput>(
    (accumulator, values, rowIndex) => {
      const candidate = coerceCsvRecord(headers, values);
      const parsed = safeParseAuthoredRecord(rowIndex + 2, candidate);
      if (parsed.row) {
        accumulator.rows.push(parsed.row);
      }
      accumulator.issues.push(...parsed.issues);
      return accumulator;
    },
    { rows: [], issues: [] },
  );
};

const parseAuthoredContentCsvWithRows = (
  input: string,
): ParsedAuthoredContentRowsResult => {
  const table = parseCsvTable(input);
  if (table.length === 0) {
    return {
      rows: [],
      issues: [buildRowIssue(0, "file", "CSV input is empty")],
    };
  }

  const [headerRow, ...dataRows] = table;
  const headers = headerRow.map(normalizeHeader);

  if (!headers.includes("prompt")) {
    return {
      rows: [],
      issues: [buildRowIssue(0, "header", 'CSV header must include "prompt"')],
    };
  }

  return dataRows.reduce<ParsedAuthoredContentRowsResult>(
    (accumulator, values, rowIndex) => {
      const rowNumber = rowIndex + 2;
      const candidate = coerceCsvRecord(headers, values);
      const parsed = safeParseAuthoredRecord(rowNumber, candidate);
      if (parsed.row) {
        accumulator.rows.push({ rowNumber, record: parsed.row });
      }
      accumulator.issues.push(...parsed.issues);
      return accumulator;
    },
    { rows: [], issues: [] },
  );
};

export const parseAuthoredContentJson = (
  input: string | unknown,
): ParsedAuthoredContentInput => {
  const rawValue =
    typeof input === "string"
      ? JSON.parse(input)
      : input;
  const parsed = authoredContentJsonDocumentSchema.parse(rawValue);

  if (Array.isArray(parsed)) {
    return {
      rows: parsed,
      issues: [],
    };
  }

  return {
    rows: parsed.items,
    issues: [],
    packVersion: parsed.packVersion,
    sourceLabel: parsed.sourceLabel,
  };
};

const parseAuthoredContentJsonWithRows = (
  input: string | unknown,
): ParsedAuthoredContentRowsResult => {
  const parsed = parseAuthoredContentJson(input);
  return {
    rows: parsed.rows.map((record, index) => ({
      rowNumber: index + 1,
      record,
    })),
    issues: parsed.issues,
    packVersion: parsed.packVersion,
    sourceLabel: parsed.sourceLabel,
  };
};

const applyQualityValidation = (
  rows: ParsedAuthoredContentRow[],
): {
  rows: ParsedAuthoredContentRow[];
  issues: AuthoredContentValidationIssue[];
} =>
  rows.reduce<{
    rows: ParsedAuthoredContentRow[];
    issues: AuthoredContentValidationIssue[];
  }>(
    (accumulator, row) => {
      const qualityIssues = validateAuthoredContentRecordQuality(row.record).map(
        (issue) => buildRowIssue(row.rowNumber, issue.field, issue.message),
      );

      if (qualityIssues.length === 0) {
        accumulator.rows.push(row);
      } else {
        accumulator.issues.push(...qualityIssues);
      }

      return accumulator;
    },
    { rows: [], issues: [] },
  );

export const buildContentInventoryFromAuthoredRowsWithReport = (
  rows: AuthoredContentRecord[],
): { pack: ContentInventoryPack; dedupeReport: ContentInventoryDedupeReport } => {
  const validatedRows = rows.filter(
    (row) => validateAuthoredContentRecordQuality(row).length === 0,
  );
  const inventoryItems = validatedRows.map((row) =>
    createContentInventoryItem({
      id: row.id,
      source: row.source,
      skill: row.skill,
      difficulty: row.difficulty,
      format: row.format,
      prompt: row.prompt,
      answer: row.answer,
      alternatives: row.alternatives,
      hints: row.hints,
      tags: row.tags,
      metadata: row.metadata,
      active: row.active,
    }),
  );

  const deduped = dedupeContentInventoryItems(inventoryItems);
  const pack = parseContentInventoryPack({
    ...createEmptyContentInventoryPack(),
    items: deduped.items,
  });

  return {
    pack,
    dedupeReport: deduped.report,
  };
};

export const buildContentInventoryFromAuthoredRows = (
  rows: AuthoredContentRecord[],
): ContentInventoryPack =>
  buildContentInventoryFromAuthoredRowsWithReport(rows).pack;

export const prepareAuthoredContentRowsForReview = (input: {
  content: string;
  sourceFormat: "csv" | "json";
}): PreparedAuthoredContentRowsResult => {
  const parsed =
    input.sourceFormat === "csv"
      ? parseAuthoredContentCsvWithRows(input.content)
      : parseAuthoredContentJsonWithRows(input.content);
  const qualityValidated = applyQualityValidation(parsed.rows);

  return {
    rows: qualityValidated.rows,
    issues: [...parsed.issues, ...qualityValidated.issues],
    packVersion: parsed.packVersion,
    sourceLabel: parsed.sourceLabel,
  };
};

export const buildVersionedContentInventoryBundle = (input: {
  pack: ContentInventoryPack;
  sourceFormat: "csv" | "json";
  sourceLabel?: string;
  packVersion?: string;
  invalidCount?: number;
  dedupeReport?: ContentInventoryDedupeReport;
  previousBundle?: VersionedContentInventoryBundleSnapshot;
  releaseNotes?: string[];
}): AuthoredContentInventoryBundle =>
  (() => {
    const generatedAt = new Date().toISOString();
    const packVersion = input.packVersion || DEFAULT_PACK_VERSION;

    return authoredContentInventoryBundleSchema.parse({
      schemaVersion: AUTHORED_CONTENT_BUNDLE_SCHEMA_VERSION,
      packVersion,
      sourceLabel: input.sourceLabel || DEFAULT_SOURCE_LABEL,
      sourceFormat: input.sourceFormat,
      generatedAt,
      inventory: input.pack,
      changelog: buildAuthoredContentChangelog({
        packVersion,
        pack: input.pack,
        releasedAt: generatedAt,
        previousBundle: input.previousBundle,
        releaseNotes: input.releaseNotes,
      }),
      summary: {
        importedCount: input.pack.items.length,
        invalidCount: input.invalidCount || 0,
        removedDuplicateCount: input.dedupeReport?.removedCount || 0,
      },
    });
  })();

export const importAuthoredContent = (input: {
  content: string;
  sourceFormat: "csv" | "json";
  sourceLabel?: string;
  packVersion?: string;
  previousBundle?: VersionedContentInventoryBundleSnapshot;
  releaseNotes?: string[];
}): ImportedAuthoredContentResult => {
  const prepared = prepareAuthoredContentRowsForReview({
    content: input.content,
    sourceFormat: input.sourceFormat,
  });
  const lintReport = lintAuthoredContentRows(prepared.rows);
  const built = buildContentInventoryFromAuthoredRowsWithReport(
    prepared.rows.map((row) => row.record),
  );
  const bundle = buildVersionedContentInventoryBundle({
    pack: built.pack,
    sourceFormat: input.sourceFormat,
    sourceLabel: input.sourceLabel || prepared.sourceLabel,
    packVersion: input.packVersion || prepared.packVersion,
    invalidCount: prepared.issues.length,
    dedupeReport: built.dedupeReport,
    previousBundle: input.previousBundle,
    releaseNotes: input.releaseNotes,
  });

  return {
    bundle,
    dedupeReport: built.dedupeReport,
    lintReport,
    issues: prepared.issues,
  };
};

export const safeParseImportedInventoryBundle = (
  input: unknown,
): AuthoredContentInventoryBundle =>
  authoredContentInventoryBundleSchema.parse(input);

export const safeParseInventoryItemsFromAuthoringBundle = (
  input: unknown,
): ContentInventoryItem[] => {
  const bundle = safeParseImportedInventoryBundle(input);
  return bundle.inventory.items.reduce<ContentInventoryItem[]>(
    (accumulator, item) => {
      const parsed = contentInventoryItemSchema.safeParse(item);
      if (parsed.success) {
        accumulator.push(parsed.data);
      }
      return accumulator;
    },
    [],
  );
};
