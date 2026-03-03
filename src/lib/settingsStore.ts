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

const v1AppSettingsSchema = z.object({
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
  dailyGoalType: z.enum(["cards", "time", "xp"]).catch("cards"),
  dailyGoalTarget: z.number().catch(50),
  dayOffsetHours: z.number().catch(3), // By default, a day ends at 3 AM the next day
  srsSessionLimit: z.number().catch(20),
  srsTimeBoxMinutes: z.number().catch(10),
});

export const appSettingsSchema = v1AppSettingsSchema.extend({
  settingsVersion: z.literal(3).catch(3),
});

export type AppSettings = z.infer<typeof appSettingsSchema>;

export const defaultSettings = appSettingsSchema.parse({});

const normalizeSettings = (input: unknown): AppSettings => {
  const parsed = input && typeof input === "object" ? input : {};
  return appSettingsSchema.parse(parsed);
};

export const loadSettings = (): AppSettings => {
  if (typeof window === "undefined" || !window.localStorage) {
    return defaultSettings;
  }
  const raw = localStorage.getItem(SETTINGS_KEY);
  if (!raw) {
    return defaultSettings;
  }
  try {
    const parsedData = JSON.parse(raw);

    // Check if it's v1 (missing settingsVersion or version < 2)
    if (
      !parsedData ||
      typeof parsedData !== "object" ||
      !("settingsVersion" in parsedData) ||
      parsedData.settingsVersion < 2
    ) {
      // Migrate from v1
      const v1Data = v1AppSettingsSchema.parse(parsedData);
      const migratedData: AppSettings = {
        ...v1Data,
        settingsVersion: 3,
      };

      // Save migrated data immediately
      saveSettings(migratedData);
      return migratedData;
    }

    return normalizeSettings(parsedData);
  } catch {
    // Fallback on corrupt JSON without crashing
    return defaultSettings;
  }
};

export const saveSettings = (settings: AppSettings) => {
  if (typeof window === "undefined" || !window.localStorage) {
    return;
  }
  try {
    const validSettings = appSettingsSchema.parse(settings);
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(validSettings));
  } catch (error) {
    console.error("Failed to save valid settings", error);
  }
};
