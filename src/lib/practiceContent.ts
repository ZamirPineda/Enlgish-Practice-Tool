export type PracticeDifficultyTier =
  | "foundation"
  | "core"
  | "stretch"
  | "expert";

export type PracticeRouteObjective =
  | "english_interview"
  | "math_speed"
  | "dev_reasoning";

export const mapDifficultyTierToAdaptiveLevel = (
  tier: PracticeDifficultyTier,
): "easy" | "normal" | "hard" => {
  if (tier === "foundation") return "easy";
  if (tier === "core") return "normal";
  return "hard";
};

export const rankToDifficultyTier = (
  rank: number,
  total: number,
): PracticeDifficultyTier => {
  const percentile = total <= 0 ? 1 : (rank + 1) / total;

  if (percentile <= 0.25) return "foundation";
  if (percentile <= 0.6) return "core";
  if (percentile <= 0.85) return "stretch";
  return "expert";
};

export const uniqueTags = (values: string[]) =>
  Array.from(new Set(values.map((value) => value.trim()).filter(Boolean)));
