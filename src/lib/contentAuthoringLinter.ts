import { createContentFingerprint } from "@/lib/contentInventory";
import type { AuthoredContentRecord } from "@/lib/contentAuthoringPipeline";

const NEAR_DUPLICATE_THRESHOLD = 0.82;

export interface LintableAuthoredContentRow {
  rowNumber: number;
  record: AuthoredContentRecord;
}

export interface ContentAuthoringExactDuplicateGroup {
  type: "exact_duplicate";
  key: string;
  rowNumbers: number[];
  promptPreview: string;
}

export interface ContentAuthoringNearDuplicatePair {
  type: "near_duplicate";
  key: string;
  rowNumbers: [number, number];
  similarity: number;
  promptPreview: string;
  comparisonPromptPreview: string;
}

export interface ContentAuthoringLintReport {
  scannedRowCount: number;
  exactDuplicateGroupCount: number;
  exactDuplicateRowCount: number;
  nearDuplicateCount: number;
  exactDuplicateGroups: ContentAuthoringExactDuplicateGroup[];
  nearDuplicatePairs: ContentAuthoringNearDuplicatePair[];
}

const normalizeLintText = (value: string) =>
  value
    .trim()
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const buildPromptPreview = (value: string) => {
  const preview = value.trim().replace(/\s+/g, " ");
  return preview.length <= 72 ? preview : `${preview.slice(0, 69)}...`;
};

const createExactDuplicateKey = (record: AuthoredContentRecord) =>
  createContentFingerprint({
    source: record.source,
    skill: record.skill,
    difficulty: record.difficulty,
    format: record.format,
    prompt: record.prompt,
    answer: record.answer,
    alternatives: record.alternatives,
  });

const toNgrams = (value: string, size: number): string[] => {
  if (value.length <= size) {
    return value.length > 0 ? [value] : [];
  }

  const ngrams: string[] = [];
  for (let index = 0; index <= value.length - size; index += 1) {
    ngrams.push(value.slice(index, index + size));
  }

  return ngrams;
};

const calculateDiceCoefficient = (left: string, right: string): number => {
  if (!left || !right) {
    return 0;
  }

  if (left === right) {
    return 1;
  }

  const gramsLeft = toNgrams(left, 2);
  const gramsRight = toNgrams(right, 2);
  const rightCounts = gramsRight.reduce<Map<string, number>>((accumulator, gram) => {
    accumulator.set(gram, (accumulator.get(gram) || 0) + 1);
    return accumulator;
  }, new Map());

  let matches = 0;
  gramsLeft.forEach((gram) => {
    const count = rightCounts.get(gram) || 0;
    if (count > 0) {
      matches += 1;
      rightCounts.set(gram, count - 1);
    }
  });

  return (2 * matches) / (gramsLeft.length + gramsRight.length);
};

const calculateJaccardSimilarity = (
  leftTokens: string[],
  rightTokens: string[],
): number => {
  if (leftTokens.length === 0 || rightTokens.length === 0) {
    return 0;
  }

  const left = new Set(leftTokens);
  const right = new Set(rightTokens);
  let intersection = 0;

  left.forEach((token) => {
    if (right.has(token)) {
      intersection += 1;
    }
  });

  const union = new Set([...left, ...right]).size;
  return union === 0 ? 0 : intersection / union;
};

const calculateTextSimilarity = (leftRaw: string, rightRaw: string): number => {
  const left = normalizeLintText(leftRaw);
  const right = normalizeLintText(rightRaw);

  if (!left || !right) {
    return 0;
  }

  const diceScore = calculateDiceCoefficient(left, right);
  const tokenScore = calculateJaccardSimilarity(
    left.split(" ").filter(Boolean),
    right.split(" ").filter(Boolean),
  );

  return Math.max(diceScore, tokenScore);
};

const calculateNearDuplicateScore = (
  left: AuthoredContentRecord,
  right: AuthoredContentRecord,
): number => {
  const promptScore = calculateTextSimilarity(left.prompt, right.prompt);
  const answerScore =
    left.answer && right.answer
      ? calculateTextSimilarity(left.answer, right.answer)
      : 0;
  const routeScore =
    left.metadata.routeObjective &&
    left.metadata.routeObjective === right.metadata.routeObjective
      ? 1
      : 0;

  return promptScore * 0.75 + answerScore * 0.2 + routeScore * 0.05;
};

const compareNearPairs = (
  left: ContentAuthoringNearDuplicatePair,
  right: ContentAuthoringNearDuplicatePair,
) =>
  right.similarity - left.similarity ||
  left.rowNumbers[0] - right.rowNumbers[0] ||
  left.rowNumbers[1] - right.rowNumbers[1];

export const lintAuthoredContentRows = (
  rows: LintableAuthoredContentRow[],
): ContentAuthoringLintReport => {
  const exactBuckets = new Map<string, LintableAuthoredContentRow[]>();

  rows.forEach((row) => {
    const key = createExactDuplicateKey(row.record);
    const bucket = exactBuckets.get(key) || [];
    bucket.push(row);
    exactBuckets.set(key, bucket);
  });

  const exactDuplicateGroups = Array.from(exactBuckets.entries())
    .filter(([, bucket]) => bucket.length > 1)
    .map<ContentAuthoringExactDuplicateGroup>(([key, bucket]) => ({
      type: "exact_duplicate",
      key,
      rowNumbers: bucket.map((row) => row.rowNumber).sort((left, right) => left - right),
      promptPreview: buildPromptPreview(bucket[0].record.prompt),
    }))
    .sort((left, right) => left.rowNumbers[0] - right.rowNumbers[0]);

  const exactKeys = new Set(exactDuplicateGroups.map((group) => group.key));
  const bucketedRows = rows.reduce<Record<string, LintableAuthoredContentRow[]>>(
    (accumulator, row) => {
      const bucketKey = [
        row.record.skill,
        row.record.format,
        row.record.metadata.routeObjective || "any",
      ].join("::");
      accumulator[bucketKey] = accumulator[bucketKey] || [];
      accumulator[bucketKey].push(row);
      return accumulator;
    },
    {},
  );

  const nearDuplicatePairs: ContentAuthoringNearDuplicatePair[] = [];

  Object.values(bucketedRows).forEach((bucket) => {
    for (let leftIndex = 0; leftIndex < bucket.length; leftIndex += 1) {
      for (
        let rightIndex = leftIndex + 1;
        rightIndex < bucket.length;
        rightIndex += 1
      ) {
        const left = bucket[leftIndex];
        const right = bucket[rightIndex];
        const leftKey = createExactDuplicateKey(left.record);
        const rightKey = createExactDuplicateKey(right.record);

        if (leftKey === rightKey || exactKeys.has(leftKey) || exactKeys.has(rightKey)) {
          continue;
        }

        const similarity = calculateNearDuplicateScore(left.record, right.record);
        if (similarity < NEAR_DUPLICATE_THRESHOLD) {
          continue;
        }

        nearDuplicatePairs.push({
          type: "near_duplicate",
          key: `${left.rowNumber}:${right.rowNumber}`,
          rowNumbers: [left.rowNumber, right.rowNumber],
          similarity: Number(similarity.toFixed(3)),
          promptPreview: buildPromptPreview(left.record.prompt),
          comparisonPromptPreview: buildPromptPreview(right.record.prompt),
        });
      }
    }
  });

  const exactDuplicateRowCount = exactDuplicateGroups.reduce(
    (accumulator, group) => accumulator + group.rowNumbers.length,
    0,
  );

  return {
    scannedRowCount: rows.length,
    exactDuplicateGroupCount: exactDuplicateGroups.length,
    exactDuplicateRowCount,
    nearDuplicateCount: nearDuplicatePairs.length,
    exactDuplicateGroups,
    nearDuplicatePairs: nearDuplicatePairs.sort(compareNearPairs),
  };
};
