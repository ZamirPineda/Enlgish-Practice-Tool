export interface AppSettings {
  theme: "dark" | "light";
  reducedMotion: boolean;
  ttsAutoPlay: boolean;
  confirmDialogs: boolean;
  hasCompletedOnboarding: boolean;
}

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

const normalizeSettings = (input: unknown): AppSettings => {
  const parsed = (
    input && typeof input === "object" ? input : {}
  ) as Partial<AppSettings>;

  return {
    theme: parsed.theme === "light" ? "light" : "dark",
    reducedMotion:
      typeof parsed.reducedMotion === "boolean"
        ? parsed.reducedMotion
        : getSystemReducedMotionPreference(),
    ttsAutoPlay:
      typeof parsed.ttsAutoPlay === "boolean" ? parsed.ttsAutoPlay : true,
    confirmDialogs:
      typeof parsed.confirmDialogs === "boolean" ? parsed.confirmDialogs : true,
    hasCompletedOnboarding:
      typeof parsed.hasCompletedOnboarding === "boolean"
        ? parsed.hasCompletedOnboarding
        : false,
  };
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
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
};
