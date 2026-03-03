import { WordPart } from "@/types";

export const getFullTextFromParts = (parts: WordPart[]) =>
  parts.map((p) => p.word).join(" ");

export const normalizeTextForComparison = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^\p{L}\p{N} ]/gu, "")
    .replace(/\s+/g, " ")
    .trim();

export const getLevenshteinDistance = (
  source: string,
  target: string,
): number => {
  if (source === target) return 0;
  if (!source.length) return target.length;
  if (!target.length) return source.length;

  const sourceLength = source.length;
  const targetLength = target.length;
  const matrix = Array.from({ length: sourceLength + 1 }, () =>
    Array<number>(targetLength + 1).fill(0),
  );

  for (let i = 0; i <= sourceLength; i++) matrix[i][0] = i;
  for (let j = 0; j <= targetLength; j++) matrix[0][j] = j;

  for (let i = 1; i <= sourceLength; i++) {
    for (let j = 1; j <= targetLength; j++) {
      const cost = source[i - 1] === target[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,
        matrix[i][j - 1] + 1,
        matrix[i - 1][j - 1] + cost,
      );
    }
  }

  return matrix[sourceLength][targetLength];
};

export const getTextAccuracyScore = (
  spokenText: string,
  targetText: string,
): number => {
  const normalizedSpoken = normalizeTextForComparison(spokenText);
  const normalizedTarget = normalizeTextForComparison(targetText);

  if (!normalizedTarget) return 0;
  if (!normalizedSpoken) return 0;

  const distance = getLevenshteinDistance(normalizedSpoken, normalizedTarget);
  const maxLength = Math.max(normalizedSpoken.length, normalizedTarget.length);
  const similarity = 1 - distance / maxLength;
  return Math.max(0, Math.min(100, Math.round(similarity * 100)));
};
