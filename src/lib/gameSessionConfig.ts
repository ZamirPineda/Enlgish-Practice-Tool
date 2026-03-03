export type TimePreset = "relaxed" | "normal" | "hardcore";

export const TIME_PRESET_LABEL: Record<TimePreset, string> = {
  relaxed: "Relajado",
  normal: "Normal",
  hardcore: "Hardcore",
};

const TIME_PRESET_MULTIPLIER: Record<TimePreset, number> = {
  relaxed: 1.25,
  normal: 1,
  hardcore: 0.8,
};

export const getTimeByPreset = (baseSeconds: number, preset: TimePreset) =>
  Math.max(10, Math.round(baseSeconds * TIME_PRESET_MULTIPLIER[preset]));
