import { z } from "zod";

const SETTINGS_KEY = "app-settings";

const getSystemReducedMotionPreference = () => {
  if (
    typeof window === "undefined" ||
    typeof window.matchMedia !== "function"
  ) {
    return false;
  }
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

export const appSettingsSchema = z.object({
  theme: z.enum(["dark", "light"]).catch("dark"),
  reducedMotion: z.boolean().catch(() => getSystemReducedMotionPreference()),
  ttsAutoPlay: z.boolean().catch(true),
  ttsSpeed: z.number().catch(0.9),
  confirmDialogs: z.boolean().catch(true),
  soundEnabled: z.boolean().catch(true),
  hasCompletedOnboarding: z.boolean().catch(false),
  weeklyGoalSessions: z
    .number()
    .catch(5)
    .transform((val) => Math.min(14, Math.max(1, Math.round(val)))),
});

export type AppSettings = z.infer<typeof appSettingsSchema>;

const normalizeSettings = (input: unknown): AppSettings => {
  const parsed = input && typeof input === "object" ? input : {};
  return appSettingsSchema.parse(parsed);
};

export const loadSettings = (): AppSettings => {
  if (typeof window === "undefined" || !window.localStorage) {
    return normalizeSettings(null);
  }
  const raw = localStorage.getItem(SETTINGS_KEY);
  if (!raw) {
    return normalizeSettings(null);
  }
  try {
    return normalizeSettings(JSON.parse(raw));
  } catch {
    return normalizeSettings(null);
  }
};

export const saveSettings = (settings: AppSettings) => {
  if (typeof window === "undefined" || !window.localStorage) {
    return;
  }
  const validSettings = appSettingsSchema.parse(settings);
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(validSettings));
};
