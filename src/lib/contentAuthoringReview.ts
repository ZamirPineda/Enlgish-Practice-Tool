import { normalizeContentTag } from "@/lib/contentInventory";
import type { LintableAuthoredContentRow } from "@/lib/contentAuthoringLinter";

export type ContentAuthoringReviewCategory =
  | "source"
  | "skill"
  | "difficulty"
  | "format"
  | "routeObjective"
  | "topic";

export interface ContentAuthoringReviewSampleItem {
  rowNumber: number;
  prompt: string;
  answer?: string;
  tags: string[];
}

export interface ContentAuthoringReviewBatch {
  batchId: string;
  category: ContentAuthoringReviewCategory;
  categoryValue: string;
  totalRowCount: number;
  sampledRowCount: number;
  sample: ContentAuthoringReviewSampleItem[];
}

export interface ContentAuthoringReviewSample {
  category: ContentAuthoringReviewCategory;
  sampleSizePerBatch: number;
  totalCandidateRows: number;
  batchCount: number;
  batches: ContentAuthoringReviewBatch[];
}

export interface CreateContentAuthoringReviewSampleInput {
  rows: LintableAuthoredContentRow[];
  category: ContentAuthoringReviewCategory;
  sampleSizePerBatch?: number;
  seed?: string;
}

export interface ContentAuthoringBatchDecision {
  batchId: string;
  decision: "approved" | "rejected";
  reviewer?: string;
  note?: string;
  decidedAt?: string;
}

export interface ContentAuthoringBatchDecisionOutcome {
  batchId: string;
  categoryValue: string;
  decision: "approved" | "rejected" | "pending";
  reviewer?: string;
  note?: string;
  decidedAt?: string;
  rowNumbers: number[];
}

export interface ApplyContentAuthoringBatchDecisionsResult {
  approvedRows: LintableAuthoredContentRow[];
  rejectedRows: LintableAuthoredContentRow[];
  pendingRows: LintableAuthoredContentRow[];
  outcomes: ContentAuthoringBatchDecisionOutcome[];
}

const DEFAULT_SAMPLE_SIZE = 3;
const UNCATEGORIZED_VALUE = "uncategorized";

const trimOrFallback = (value: string | undefined) =>
  value?.trim() ? value.trim() : UNCATEGORIZED_VALUE;

const resolveCategoryValue = (
  row: LintableAuthoredContentRow,
  category: ContentAuthoringReviewCategory,
) => {
  switch (category) {
    case "source":
      return row.record.source;
    case "skill":
      return row.record.skill;
    case "difficulty":
      return row.record.difficulty;
    case "format":
      return row.record.format;
    case "routeObjective":
      return trimOrFallback(row.record.metadata.routeObjective);
    case "topic":
      return trimOrFallback(row.record.metadata.topic);
  }
};

const buildBatchId = (
  category: ContentAuthoringReviewCategory,
  categoryValue: string,
) => `${category}:${normalizeContentTag(categoryValue)}`;

const hashString = (value: string): number => {
  let hash = 0;
  for (let index = 0; index < value.length; index += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(index);
    hash |= 0;
  }
  return Math.abs(hash);
};

const compareRowsForSampling = (
  seed: string,
  batchId: string,
  left: LintableAuthoredContentRow,
  right: LintableAuthoredContentRow,
) =>
  hashString(`${seed}::${batchId}::${left.rowNumber}::${left.record.prompt}`) -
    hashString(`${seed}::${batchId}::${right.rowNumber}::${right.record.prompt}`) ||
  left.rowNumber - right.rowNumber;

const toSampleItem = (
  row: LintableAuthoredContentRow,
): ContentAuthoringReviewSampleItem => ({
  rowNumber: row.rowNumber,
  prompt: row.record.prompt,
  answer: row.record.answer,
  tags: row.record.tags,
});

export const createContentAuthoringReviewSample = ({
  rows,
  category,
  sampleSizePerBatch = DEFAULT_SAMPLE_SIZE,
  seed = "default",
}: CreateContentAuthoringReviewSampleInput): ContentAuthoringReviewSample => {
  const normalizedSampleSize = Math.max(1, Math.floor(sampleSizePerBatch));
  const buckets = rows.reduce<Record<string, LintableAuthoredContentRow[]>>(
    (accumulator, row) => {
      const categoryValue = resolveCategoryValue(row, category);
      accumulator[categoryValue] = accumulator[categoryValue] || [];
      accumulator[categoryValue].push(row);
      return accumulator;
    },
    {},
  );

  const batches = Object.entries(buckets)
    .sort(([left], [right]) => left.localeCompare(right))
    .map<ContentAuthoringReviewBatch>(([categoryValue, bucket]) => {
      const batchId = buildBatchId(category, categoryValue);
      const sampled = [...bucket]
        .sort((left, right) => compareRowsForSampling(seed, batchId, left, right))
        .slice(0, normalizedSampleSize)
        .map(toSampleItem);

      return {
        batchId,
        category,
        categoryValue,
        totalRowCount: bucket.length,
        sampledRowCount: sampled.length,
        sample: sampled,
      };
    });

  return {
    category,
    sampleSizePerBatch: normalizedSampleSize,
    totalCandidateRows: rows.length,
    batchCount: batches.length,
    batches,
  };
};

export const applyContentAuthoringBatchDecisions = (input: {
  rows: LintableAuthoredContentRow[];
  sample: ContentAuthoringReviewSample;
  decisions: ContentAuthoringBatchDecision[];
}): ApplyContentAuthoringBatchDecisionsResult => {
  const rowsByBatchId = input.rows.reduce<Record<string, LintableAuthoredContentRow[]>>(
    (accumulator, row) => {
      const categoryValue = resolveCategoryValue(row, input.sample.category);
      const batchId = buildBatchId(input.sample.category, categoryValue);
      accumulator[batchId] = accumulator[batchId] || [];
      accumulator[batchId].push(row);
      return accumulator;
    },
    {},
  );

  const decisionByBatchId = input.decisions.reduce<
    Record<string, ContentAuthoringBatchDecision>
  >((accumulator, decision) => {
    accumulator[decision.batchId] = decision;
    return accumulator;
  }, {});

  const approvedRows: LintableAuthoredContentRow[] = [];
  const rejectedRows: LintableAuthoredContentRow[] = [];
  const pendingRows: LintableAuthoredContentRow[] = [];

  const outcomes = input.sample.batches.map<ContentAuthoringBatchDecisionOutcome>(
    (batch) => {
      const decision = decisionByBatchId[batch.batchId];
      const bucketRows = [...(rowsByBatchId[batch.batchId] || [])].sort(
        (left, right) => left.rowNumber - right.rowNumber,
      );

      if (!decision) {
        pendingRows.push(...bucketRows);
        return {
          batchId: batch.batchId,
          categoryValue: batch.categoryValue,
          decision: "pending",
          rowNumbers: bucketRows.map((row) => row.rowNumber),
        };
      }

      if (decision.decision === "approved") {
        approvedRows.push(...bucketRows);
      } else {
        rejectedRows.push(...bucketRows);
      }

      return {
        batchId: batch.batchId,
        categoryValue: batch.categoryValue,
        decision: decision.decision,
        reviewer: decision.reviewer,
        note: decision.note,
        decidedAt: decision.decidedAt,
        rowNumbers: bucketRows.map((row) => row.rowNumber),
      };
    },
  );

  return {
    approvedRows,
    rejectedRows,
    pendingRows,
    outcomes,
  };
};
