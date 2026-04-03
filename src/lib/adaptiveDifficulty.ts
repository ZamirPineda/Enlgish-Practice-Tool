import { isAdaptiveDifficultyEnabledForGame } from "@/lib/adaptiveRollout";

export type AdaptiveDifficultyDirection = "up" | "down";

export type AdaptiveDifficultyReason =
  | "manual_select"
  | "manual_up"
  | "manual_down"
  | "rule_upshift"
  | "rule_downshift"
  | "system_reset";

export interface AdaptiveDifficultyTransition<TLevel extends string> {
  gameId: string;
  previousLevel: TLevel;
  nextLevel: TLevel;
  direction: AdaptiveDifficultyDirection | "set";
  reason: AdaptiveDifficultyReason;
  changed: boolean;
  timestamp: string;
}

interface AdaptiveDifficultyBaseParams<TLevel extends string> {
  gameId: string;
  levels: readonly TLevel[];
  currentLevel: TLevel;
  reason: AdaptiveDifficultyReason;
  timestamp?: string;
}

export interface SetDifficultyLevelParams<TLevel extends string>
  extends AdaptiveDifficultyBaseParams<TLevel> {
  targetLevel: TLevel;
}

export interface ShiftDifficultyLevelParams<TLevel extends string>
  extends AdaptiveDifficultyBaseParams<TLevel> {
  direction: AdaptiveDifficultyDirection;
  steps?: number;
}

export interface AdaptiveDifficultyEngine<TLevel extends string> {
  readonly gameId: string;
  readonly levels: readonly TLevel[];
  readonly defaultLevel: TLevel;
  setLevel: (
    currentLevel: TLevel,
    targetLevel: TLevel,
    reason?: AdaptiveDifficultyReason,
  ) => AdaptiveDifficultyTransition<TLevel>;
  increaseLevel: (
    currentLevel: TLevel,
    reason?: AdaptiveDifficultyReason,
    steps?: number,
  ) => AdaptiveDifficultyTransition<TLevel>;
  decreaseLevel: (
    currentLevel: TLevel,
    reason?: AdaptiveDifficultyReason,
    steps?: number,
  ) => AdaptiveDifficultyTransition<TLevel>;
}

interface CreateAdaptiveDifficultyEngineOptions<TLevel extends string> {
  gameId: string;
  levels: readonly TLevel[];
  defaultLevel: TLevel;
}

export type AdaptiveDifficultyTrigger =
  | "consecutive_wrong"
  | "consecutive_correct"
  | "manual";

export interface AdaptiveDifficultyLogEntry {
  gameId: string;
  previousLevel: string;
  nextLevel: string;
  direction: AdaptiveDifficultyDirection | "set";
  reason: AdaptiveDifficultyReason;
  changed: boolean;
  timestamp: string;
  trigger: AdaptiveDifficultyTrigger;
  details?: Record<string, unknown>;
}

export const ADAPTIVE_DIFFICULTY_LOG_KEY = "skillpal-adaptive-difficulty-log";
const MAX_ADAPTIVE_DIFFICULTY_LOG_ENTRIES = 200;

const assertNonEmptyLevels = <TLevel extends string>(levels: readonly TLevel[]) => {
  if (levels.length === 0) {
    throw new Error("Adaptive difficulty requires at least one level.");
  }
};

export const getDifficultyIndex = <TLevel extends string>(
  levels: readonly TLevel[],
  level: TLevel,
): number => levels.indexOf(level);

const assertKnownLevel = <TLevel extends string>(
  levels: readonly TLevel[],
  level: TLevel,
  label: string,
) => {
  if (getDifficultyIndex(levels, level) === -1) {
    throw new Error(`Unknown ${label} "${level}" for adaptive difficulty.`);
  }
};

const safeSteps = (steps: number | undefined): number => {
  if (typeof steps !== "number" || Number.isNaN(steps)) return 1;
  if (steps <= 0) return 1;
  return Math.floor(steps);
};

export const shouldDownshiftByWrongStreak = (
  consecutiveWrong: number,
  threshold = 3,
): boolean => {
  const normalizedThreshold = Math.max(2, Math.floor(threshold));
  return consecutiveWrong >= normalizedThreshold;
};

export const shouldUpshiftByCorrectStreak = (
  consecutiveCorrect: number,
  threshold = 3,
): boolean => {
  const normalizedThreshold = Math.max(2, Math.floor(threshold));
  return consecutiveCorrect >= normalizedThreshold;
};

export const getAdaptiveDifficultyLog = (): AdaptiveDifficultyLogEntry[] => {
  if (typeof window === "undefined" || !window.localStorage) return [];
  const raw = localStorage.getItem(ADAPTIVE_DIFFICULTY_LOG_KEY);
  if (!raw) return [];

  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((entry) => {
      if (!entry || typeof entry !== "object" || Array.isArray(entry)) {
        return false;
      }
      return (
        typeof entry.gameId === "string" &&
        typeof entry.previousLevel === "string" &&
        typeof entry.nextLevel === "string" &&
        typeof entry.direction === "string" &&
        typeof entry.reason === "string" &&
        typeof entry.changed === "boolean" &&
        typeof entry.timestamp === "string" &&
        typeof entry.trigger === "string"
      );
    }) as AdaptiveDifficultyLogEntry[];
  } catch {
    return [];
  }
};

export const appendAdaptiveDifficultyLog = (
  entry: AdaptiveDifficultyLogEntry,
): void => {
  if (typeof window === "undefined" || !window.localStorage) return;
  if (!isAdaptiveDifficultyEnabledForGame(entry.gameId)) return;
  const current = getAdaptiveDifficultyLog();
  const next = [...current, entry].slice(-MAX_ADAPTIVE_DIFFICULTY_LOG_ENTRIES);
  localStorage.setItem(ADAPTIVE_DIFFICULTY_LOG_KEY, JSON.stringify(next));
  window.dispatchEvent(new Event("adaptiveDifficultyUpdated"));
};

export const setDifficultyLevel = <TLevel extends string>(
  params: SetDifficultyLevelParams<TLevel>,
): AdaptiveDifficultyTransition<TLevel> => {
  const {
    gameId,
    levels,
    currentLevel,
    targetLevel,
    reason,
    timestamp = new Date().toISOString(),
  } = params;

  assertNonEmptyLevels(levels);
  assertKnownLevel(levels, currentLevel, "current level");
  assertKnownLevel(levels, targetLevel, "target level");

  return {
    gameId,
    previousLevel: currentLevel,
    nextLevel: targetLevel,
    direction: "set",
    reason,
    changed: currentLevel !== targetLevel,
    timestamp,
  };
};

export const shiftDifficultyLevel = <TLevel extends string>(
  params: ShiftDifficultyLevelParams<TLevel>,
): AdaptiveDifficultyTransition<TLevel> => {
  const {
    gameId,
    levels,
    currentLevel,
    direction,
    reason,
    timestamp = new Date().toISOString(),
  } = params;

  assertNonEmptyLevels(levels);
  assertKnownLevel(levels, currentLevel, "current level");

  const currentIndex = getDifficultyIndex(levels, currentLevel);
  const maxIndex = levels.length - 1;
  const stepCount = safeSteps(params.steps);
  const targetIndex =
    direction === "up"
      ? Math.min(maxIndex, currentIndex + stepCount)
      : Math.max(0, currentIndex - stepCount);
  const nextLevel = levels[targetIndex];

  return {
    gameId,
    previousLevel: currentLevel,
    nextLevel,
    direction,
    reason,
    changed: currentLevel !== nextLevel,
    timestamp,
  };
};

export const createAdaptiveDifficultyEngine = <TLevel extends string>(
  options: CreateAdaptiveDifficultyEngineOptions<TLevel>,
): AdaptiveDifficultyEngine<TLevel> => {
  const { gameId, levels, defaultLevel } = options;
  assertNonEmptyLevels(levels);
  assertKnownLevel(levels, defaultLevel, "default level");

  return {
    gameId,
    levels: [...levels],
    defaultLevel,
    setLevel: (currentLevel, targetLevel, reason = "manual_select") =>
      setDifficultyLevel({
        gameId,
        levels,
        currentLevel,
        targetLevel,
        reason,
      }),
    increaseLevel: (currentLevel, reason = "manual_up", steps) => {
      if (!isAdaptiveDifficultyEnabledForGame(gameId)) {
        return {
          gameId,
          previousLevel: currentLevel,
          nextLevel: currentLevel,
          direction: "set",
          reason: "system_reset",
          changed: false,
          timestamp: new Date().toISOString(),
        };
      }
      return shiftDifficultyLevel({
        gameId,
        levels,
        currentLevel,
        direction: "up",
        reason,
        steps,
      });
    },
    decreaseLevel: (currentLevel, reason = "manual_down", steps) => {
      if (!isAdaptiveDifficultyEnabledForGame(gameId)) {
        return {
          gameId,
          previousLevel: currentLevel,
          nextLevel: currentLevel,
          direction: "set",
          reason: "system_reset",
          changed: false,
          timestamp: new Date().toISOString(),
        };
      }
      return shiftDifficultyLevel({
        gameId,
        levels,
        currentLevel,
        direction: "down",
        reason,
        steps,
      });
    },
  };
};
