import { z } from "zod";

export const CONTENT_INVENTORY_SCHEMA_VERSION = 1;
export const CONTENT_INVENTORY_STORAGE_KEY = "skillpal-content-inventory";

export const contentInventorySourceSchema = z.enum([
  "study_deck",
  "vocabulary_vault",
  "tech_deck",
  "daily_loop",
  "english_game",
  "math_game",
  "dev_game",
  "manual",
]);

export type ContentInventorySource = z.infer<
  typeof contentInventorySourceSchema
>;

export const contentInventorySkillSchema = z.enum([
  "english",
  "math",
  "dev",
  "mixed",
]);

export type ContentInventorySkill = z.infer<typeof contentInventorySkillSchema>;

export const contentInventoryDifficultySchema = z.enum([
  "foundation",
  "core",
  "stretch",
  "expert",
]);

export type ContentInventoryDifficulty = z.infer<
  typeof contentInventoryDifficultySchema
>;

export const contentInventoryFormatSchema = z.enum([
  "flashcard",
  "multiple_choice",
  "open_response",
  "sentence_transform",
  "pair_match",
  "code_snippet",
  "formula_drill",
  "listening_prompt",
]);

export type ContentInventoryFormat = z.infer<
  typeof contentInventoryFormatSchema
>;

export const contentInventoryMetadataSchema = z
  .object({
    gameId: z.string().optional(),
    deckId: z.string().optional(),
    moduleId: z.string().optional(),
    unitId: z.string().optional(),
    routeObjective: z
      .enum(["english_interview", "math_speed", "dev_reasoning"])
      .optional(),
    topic: z.string().optional(),
    cefr: z.enum(["A1", "A2", "B1", "B2", "C1", "C2"]).optional(),
  })
  .catchall(z.unknown());

export type ContentInventoryMetadata = z.infer<
  typeof contentInventoryMetadataSchema
>;

export const contentInventoryItemSchema = z.object({
  id: z.string().min(3),
  source: contentInventorySourceSchema,
  skill: contentInventorySkillSchema,
  difficulty: contentInventoryDifficultySchema,
  format: contentInventoryFormatSchema,
  tags: z.array(z.string().min(1)).default([]),
  prompt: z.string().min(1),
  answer: z.string().optional(),
  alternatives: z.array(z.string().min(1)).default([]),
  hints: z.array(z.string().min(1)).default([]),
  metadata: contentInventoryMetadataSchema.default({}),
  fingerprint: z.string().min(4),
  active: z.boolean().default(true),
});

export type ContentInventoryItem = z.infer<typeof contentInventoryItemSchema>;

export const contentInventoryPackSchema = z.object({
  schemaVersion: z.literal(CONTENT_INVENTORY_SCHEMA_VERSION),
  generatedAt: z.string(),
  items: z.array(contentInventoryItemSchema),
});

export type ContentInventoryPack = z.infer<typeof contentInventoryPackSchema>;

const normalizeText = (value: string) =>
  value.trim().toLowerCase().replace(/\s+/g, " ");

export const normalizeContentTag = (value: string) =>
  normalizeText(value).replace(/[^a-z0-9_-]/g, "_");

export const normalizeContentTags = (values: string[] = []) =>
  Array.from(
    new Set(
      values
        .map((value) => normalizeContentTag(value))
        .filter((value) => value.length > 0),
    ),
  ).sort();

const hashString = (value: string): string => {
  let hash = 0;
  for (let index = 0; index < value.length; index += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(index);
    hash |= 0;
  }
  const result = Math.abs(hash).toString(36);
  // Ensure it's at least 4 characters for z.string().min(4) compatibility.
  // We use a prefix that still guarantees determinism for the same input.
  return result.length < 4 ? result.padStart(4, "x") : result;
};

export const createContentFingerprint = (
  input: Pick<
    ContentInventoryItem,
    "source" | "skill" | "difficulty" | "format" | "prompt" | "answer"
  > & { alternatives?: string[] },
) => {
  const normalizedAlternatives = (input.alternatives || [])
    .map((value) => normalizeText(value))
    .sort()
    .join("|");

  const seed = [
    input.skill,
    input.format,
    normalizeText(input.prompt),
    normalizeText(input.answer || ""),
    normalizedAlternatives,
  ].join("::");

  return hashString(seed);
};

export const buildContentInventoryId = (
  source: ContentInventorySource,
  fingerprint: string,
) => `ci_${source}_${fingerprint}`;

export const createContentInventoryItem = (
  input: Omit<
    ContentInventoryItem,
    "id" | "fingerprint" | "tags" | "metadata" | "alternatives" | "hints"
  > & {
    id?: string;
    tags?: string[];
    metadata?: ContentInventoryMetadata;
    alternatives?: string[];
    hints?: string[];
  },
): ContentInventoryItem => {
  const normalizedTags = normalizeContentTags(input.tags || []);
  const fingerprint = createContentFingerprint({
    source: input.source,
    skill: input.skill,
    difficulty: input.difficulty,
    format: input.format,
    prompt: input.prompt,
    answer: input.answer,
    alternatives: input.alternatives || [],
  });

  const item = {
    ...input,
    id: input.id || buildContentInventoryId(input.source, fingerprint),
    fingerprint,
    tags: normalizedTags,
    metadata: input.metadata || {},
    alternatives: input.alternatives || [],
    hints: input.hints || [],
  };

  return contentInventoryItemSchema.parse(item);
};

export const createEmptyContentInventoryPack = (): ContentInventoryPack => ({
  schemaVersion: CONTENT_INVENTORY_SCHEMA_VERSION,
  generatedAt: new Date().toISOString(),
  items: [],
});

export const parseContentInventoryPack = (
  input: unknown,
): ContentInventoryPack => contentInventoryPackSchema.parse(input);

export const safeParseContentInventoryItems = (
  input: unknown[],
): ContentInventoryItem[] =>
  input.reduce<ContentInventoryItem[]>((accumulator, item) => {
    const parsed = contentInventoryItemSchema.safeParse(item);
    if (parsed.success) {
      accumulator.push(parsed.data);
    }
    return accumulator;
  }, []);
