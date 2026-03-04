import { AnalyticsEvent } from "@/lib/analytics";
import { toDateKey } from "@/lib/activityTracker";
import { normalizeGameId } from "@/lib/gameAnalytics";

export type DailyLoopFocusRoute =
  | "english_interview"
  | "math_speed"
  | "dev_reasoning";

export type DailyLoopCategory = "english" | "math" | "dev";

export interface DailyLoopStep {
  id: string;
  title: string;
  description: string;
  path: string;
  category: DailyLoopCategory;
  gameId: string;
  completedAt: string | null;
}

export interface DailyLoopState {
  dateKey: string;
  focusRoute: DailyLoopFocusRoute;
  startedAt: string;
  completedAt: string | null;
  rewardClaimed: boolean;
  steps: DailyLoopStep[];
}

interface LoopGameConfig {
  title: string;
  description: string;
  path: string;
  category: DailyLoopCategory;
  gameId: string;
}

export const DAILY_LOOP_STORAGE_KEY = "skillpal-daily-loop-state";
export const DAILY_LOOP_REWARD_XP = 60;

export const DAILY_LOOP_FOCUS_LABEL: Record<DailyLoopFocusRoute, string> = {
  english_interview: "English Interview",
  math_speed: "Math Speed",
  dev_reasoning: "Dev Reasoning",
};

const REQUIRED_COUNTS: Record<DailyLoopCategory, number> = {
  english: 2,
  math: 1,
  dev: 1,
};

const DAILY_LOOP_SEQUENCE: DailyLoopCategory[] = [
  "english",
  "english",
  "math",
  "dev",
];

const ENGLISH_GAMES: LoopGameConfig[] = [
  {
    title: "Speed Builder",
    description: "Ordena palabras rapido y gana precision.",
    path: "/speed-builder",
    category: "english",
    gameId: "speed_builder",
  },
  {
    title: "Error Hunter",
    description: "Detecta errores gramaticales bajo tiempo.",
    path: "/error-hunter",
    category: "english",
    gameId: "error_hunter",
  },
  {
    title: "Paraphrase Duel",
    description: "Transforma frases con estructura correcta.",
    path: "/paraphrase-duel",
    category: "english",
    gameId: "paraphrase_duel",
  },
  {
    title: "Collocation Sprint",
    description: "Conecta palabras que van juntas.",
    path: "/collocation-sprint",
    category: "english",
    gameId: "collocation_sprint",
  },
  {
    title: "Taboo English",
    description: "Describe conceptos sin palabras prohibidas.",
    path: "/taboo-english",
    category: "english",
    gameId: "taboo_english",
  },
  {
    title: "Sentence Transformer",
    description: "Reescribe ideas con nuevas estructuras.",
    path: "/sentence-transformer",
    category: "english",
    gameId: "sentence_transformer",
  },
];

const MATH_GAMES: LoopGameConfig[] = [
  {
    title: "Math Speed Duel",
    description: "Responde formula y conceptos contra reloj.",
    path: "/calculus?tab=game",
    category: "math",
    gameId: "math_game",
  },
];

const DEV_GAMES: LoopGameConfig[] = [
  {
    title: "Code Syntax Builder",
    description: "Reconstruye sintaxis y comandos clave.",
    path: "/syntax-builder",
    category: "dev",
    gameId: "code_syntax_builder",
  },
  {
    title: "Code Bug Hunter",
    description: "Encuentra bugs antes de que cierre el timer.",
    path: "/bug-hunter",
    category: "dev",
    gameId: "code_bug_hunter",
  },
  {
    title: "Diplomatic Reviewer",
    description: "Practica reasoning tecnico con feedback claro.",
    path: "/diplomatic-reviewer",
    category: "dev",
    gameId: "diplomatic_reviewer",
  },
];

const GAME_POOL: Record<DailyLoopCategory, LoopGameConfig[]> = {
  english: ENGLISH_GAMES,
  math: MATH_GAMES,
  dev: DEV_GAMES,
};

const hashString = (value: string): number => {
  let hash = 0;
  for (let index = 0; index < value.length; index += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(index);
    hash |= 0;
  }
  return Math.abs(hash);
};

const rotatePool = <T>(items: T[], offset: number): T[] => {
  if (items.length <= 1) return [...items];
  const safeOffset = offset % items.length;
  return items.slice(safeOffset).concat(items.slice(0, safeOffset));
};

const pickGamesForCategory = (
  category: DailyLoopCategory,
  count: number,
  seed: string,
): LoopGameConfig[] => {
  const pool = GAME_POOL[category];
  if (!pool.length || count <= 0) return [];

  const rotated = rotatePool(pool, hashString(seed));
  if (count <= rotated.length) {
    return rotated.slice(0, count);
  }

  const selected: LoopGameConfig[] = [];
  for (let index = 0; index < count; index += 1) {
    selected.push(rotated[index % rotated.length]);
  }
  return selected;
};

const buildLoopSteps = (
  dateKey: string,
  focusRoute: DailyLoopFocusRoute,
): DailyLoopStep[] => {
  const categoryGames: Record<DailyLoopCategory, LoopGameConfig[]> = {
    english: pickGamesForCategory(
      "english",
      REQUIRED_COUNTS.english,
      `${dateKey}-${focusRoute}-english`,
    ),
    math: pickGamesForCategory(
      "math",
      REQUIRED_COUNTS.math,
      `${dateKey}-${focusRoute}-math`,
    ),
    dev: pickGamesForCategory(
      "dev",
      REQUIRED_COUNTS.dev,
      `${dateKey}-${focusRoute}-dev`,
    ),
  };

  const categoryCursor: Record<DailyLoopCategory, number> = {
    english: 0,
    math: 0,
    dev: 0,
  };

  return DAILY_LOOP_SEQUENCE.map((category, index) => {
    const cursor = categoryCursor[category];
    categoryCursor[category] += 1;
    const game = categoryGames[category][cursor];

    return {
      id: `step-${index + 1}`,
      title: game.title,
      description: game.description,
      path: game.path,
      category,
      gameId: game.gameId,
      completedAt: null,
    };
  });
};

const parseDailyLoopState = (value: unknown): DailyLoopState | null => {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const candidate = value as Partial<DailyLoopState>;
  if (
    typeof candidate.dateKey !== "string" ||
    typeof candidate.focusRoute !== "string" ||
    typeof candidate.startedAt !== "string" ||
    !Array.isArray(candidate.steps)
  ) {
    return null;
  }

  if (
    candidate.focusRoute !== "english_interview" &&
    candidate.focusRoute !== "math_speed" &&
    candidate.focusRoute !== "dev_reasoning"
  ) {
    return null;
  }

  const steps = candidate.steps
    .map((step) => {
      if (!step || typeof step !== "object" || Array.isArray(step)) {
        return null;
      }
      const parsedStep = step as Partial<DailyLoopStep>;
      if (
        typeof parsedStep.id !== "string" ||
        typeof parsedStep.title !== "string" ||
        typeof parsedStep.description !== "string" ||
        typeof parsedStep.path !== "string" ||
        typeof parsedStep.gameId !== "string" ||
        typeof parsedStep.category !== "string"
      ) {
        return null;
      }

      if (
        parsedStep.category !== "english" &&
        parsedStep.category !== "math" &&
        parsedStep.category !== "dev"
      ) {
        return null;
      }

      return {
        id: parsedStep.id,
        title: parsedStep.title,
        description: parsedStep.description,
        path: parsedStep.path,
        category: parsedStep.category,
        gameId: parsedStep.gameId,
        completedAt:
          typeof parsedStep.completedAt === "string"
            ? parsedStep.completedAt
            : null,
      } satisfies DailyLoopStep;
    })
    .filter((step): step is DailyLoopStep => Boolean(step));

  if (!steps.length) return null;

  return {
    dateKey: candidate.dateKey,
    focusRoute: candidate.focusRoute,
    startedAt: candidate.startedAt,
    completedAt:
      typeof candidate.completedAt === "string" ? candidate.completedAt : null,
    rewardClaimed: Boolean(candidate.rewardClaimed),
    steps,
  };
};

export const saveDailyLoopState = (state: DailyLoopState) => {
  if (typeof window === "undefined" || !window.localStorage) return;
  localStorage.setItem(DAILY_LOOP_STORAGE_KEY, JSON.stringify(state));
  window.dispatchEvent(new Event("dailyLoopUpdated"));
};

export const getTodayDailyLoop = (
  dateKey = toDateKey(),
): DailyLoopState | null => {
  if (typeof window === "undefined" || !window.localStorage) return null;
  const raw = localStorage.getItem(DAILY_LOOP_STORAGE_KEY);
  if (!raw) return null;

  try {
    const parsed = parseDailyLoopState(JSON.parse(raw));
    if (!parsed || parsed.dateKey !== dateKey) return null;
    return parsed;
  } catch {
    return null;
  }
};

export const startDailyLoop = (
  focusRoute: DailyLoopFocusRoute,
  dateKey = toDateKey(),
  nowIso = new Date().toISOString(),
): DailyLoopState => {
  const nextState: DailyLoopState = {
    dateKey,
    focusRoute,
    startedAt: nowIso,
    completedAt: null,
    rewardClaimed: false,
    steps: buildLoopSteps(dateKey, focusRoute),
  };

  saveDailyLoopState(nextState);
  return nextState;
};

export const markDailyLoopStepComplete = (
  loop: DailyLoopState,
  stepId: string,
  completedAt = new Date().toISOString(),
): DailyLoopState => {
  let changed = false;
  const nextSteps = loop.steps.map((step) => {
    if (step.id !== stepId || step.completedAt) return step;
    changed = true;
    return { ...step, completedAt };
  });

  if (!changed) return loop;

  const allDone = nextSteps.every((step) => Boolean(step.completedAt));
  return {
    ...loop,
    steps: nextSteps,
    completedAt: allDone ? loop.completedAt || completedAt : null,
  };
};

export const claimDailyLoopReward = (dateKey = toDateKey()): boolean => {
  const loop = getTodayDailyLoop(dateKey);
  if (!loop || !loop.completedAt || loop.rewardClaimed) return false;

  saveDailyLoopState({ ...loop, rewardClaimed: true });
  return true;
};

export const syncDailyLoopWithAnalytics = (
  loop: DailyLoopState,
  events: AnalyticsEvent[],
): DailyLoopState => {
  if (loop.steps.every((step) => Boolean(step.completedAt))) return loop;

  const sessionEvents = events
    .filter(
      (event) =>
        event.name === "session_end" &&
        typeof event.payload.game === "string" &&
        new Date(event.timestamp).getTime() >=
          new Date(loop.startedAt).getTime(),
    )
    .sort((left, right) => left.timestamp.localeCompare(right.timestamp));

  if (!sessionEvents.length) return loop;

  const consumedEventIndexes = new Set<number>();
  let nextLoop = loop;

  loop.steps.forEach((step) => {
    if (step.completedAt) return;

    const matchingEventIndex = sessionEvents.findIndex((event, index) => {
      if (consumedEventIndexes.has(index)) return false;
      if (typeof event.payload.game !== "string") return false;
      return normalizeGameId(event.payload.game) === step.gameId;
    });

    if (matchingEventIndex === -1) return;
    consumedEventIndexes.add(matchingEventIndex);
    nextLoop = markDailyLoopStepComplete(
      nextLoop,
      step.id,
      sessionEvents[matchingEventIndex].timestamp,
    );
  });

  return nextLoop;
};
