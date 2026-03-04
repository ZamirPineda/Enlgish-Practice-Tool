import { normalizeGameId } from "@/lib/gameAnalytics";

export const ADAPTIVE_ROLLOUT_STORAGE_KEY = "skillpal-adaptive-rollout-v1";
export const ADAPTIVE_ROLLOUT_UPDATED_EVENT = "adaptiveRolloutUpdated";

export const ADAPTIVE_ROLLOUT_GAME_IDS = [
  "error_hunter",
  "collocation_sprint",
  "taboo_english",
  "paraphrase_duel",
  "sentence_transformer",
  "speed_builder",
  "diplomatic_reviewer",
  "stop_game",
  "math_game",
  "code_bug_hunter",
  "code_syntax_builder",
  "docs_game",
  "docs_quiz",
  "tech_trivia",
  "tech_matchup",
  "tech_flashcards",
  "tech_boss",
] as const;

export type AdaptiveRolloutGameId = (typeof ADAPTIVE_ROLLOUT_GAME_IDS)[number];

export interface AdaptiveRolloutConfig {
  globalEnabled: boolean;
  disabledGames: string[];
  updatedAt: string;
}

const DEFAULT_ROLLOUT_CONFIG: AdaptiveRolloutConfig = {
  globalEnabled: true,
  disabledGames: [],
  updatedAt: new Date(0).toISOString(),
};

const toUniqueGameIds = (gameIds: string[]): string[] =>
  Array.from(
    new Set(
      gameIds
        .filter((gameId) => typeof gameId === "string" && gameId.length > 0)
        .map((gameId) => normalizeGameId(gameId)),
    ),
  );

const parseConfig = (value: unknown): AdaptiveRolloutConfig | null => {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const candidate = value as Partial<AdaptiveRolloutConfig>;

  return {
    globalEnabled: candidate.globalEnabled !== false,
    disabledGames: Array.isArray(candidate.disabledGames)
      ? toUniqueGameIds(candidate.disabledGames.filter((item): item is string => typeof item === "string"))
      : [],
    updatedAt:
      typeof candidate.updatedAt === "string" && candidate.updatedAt.length > 0
        ? candidate.updatedAt
        : new Date().toISOString(),
  };
};

const readConfig = (): AdaptiveRolloutConfig => {
  if (typeof window === "undefined" || !window.localStorage) {
    return DEFAULT_ROLLOUT_CONFIG;
  }

  const raw = localStorage.getItem(ADAPTIVE_ROLLOUT_STORAGE_KEY);
  if (!raw) return DEFAULT_ROLLOUT_CONFIG;

  try {
    const parsed = parseConfig(JSON.parse(raw));
    return parsed || DEFAULT_ROLLOUT_CONFIG;
  } catch {
    return DEFAULT_ROLLOUT_CONFIG;
  }
};

const writeConfig = (config: AdaptiveRolloutConfig): AdaptiveRolloutConfig => {
  if (typeof window === "undefined" || !window.localStorage) return config;

  localStorage.setItem(ADAPTIVE_ROLLOUT_STORAGE_KEY, JSON.stringify(config));
  window.dispatchEvent(new Event(ADAPTIVE_ROLLOUT_UPDATED_EVENT));
  return config;
};

export const getAdaptiveRolloutConfig = (): AdaptiveRolloutConfig => readConfig();

export const isAdaptiveDifficultyEnabledForGame = (gameId: string): boolean => {
  const config = readConfig();
  if (!config.globalEnabled) return false;
  return !config.disabledGames.includes(normalizeGameId(gameId));
};

export const setAdaptiveDifficultyGlobalEnabled = (
  enabled: boolean,
): AdaptiveRolloutConfig => {
  const current = readConfig();
  return writeConfig({
    ...current,
    globalEnabled: enabled,
    updatedAt: new Date().toISOString(),
  });
};

export const setAdaptiveDifficultyEnabledForGame = (
  gameId: string,
  enabled: boolean,
): AdaptiveRolloutConfig => {
  const current = readConfig();
  const normalizedGameId = normalizeGameId(gameId);
  const nextDisabledGames = enabled
    ? current.disabledGames.filter((item) => item !== normalizedGameId)
    : toUniqueGameIds([...current.disabledGames, normalizedGameId]);

  return writeConfig({
    ...current,
    disabledGames: nextDisabledGames,
    updatedAt: new Date().toISOString(),
  });
};

export const resetAdaptiveRolloutConfig = (): AdaptiveRolloutConfig => {
  return writeConfig({
    ...DEFAULT_ROLLOUT_CONFIG,
    updatedAt: new Date().toISOString(),
  });
};
