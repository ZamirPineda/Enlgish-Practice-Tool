import { AnalyticsEvent } from "@/lib/analytics";
import { toDateKey } from "@/lib/activityTracker";
import { getAdaptiveDifficultyLog } from "@/lib/adaptiveDifficulty";
import {
  ContentInventoryDifficulty,
  ContentInventoryFormat,
  ContentInventoryItem,
  ContentInventorySkill,
  createContentInventoryItem,
} from "@/lib/contentInventory";
import { buildContentInventoryIndex } from "@/lib/contentInventoryIndex";
import { pickNextItems } from "@/lib/contentInventoryPicker";
import { createContentSelectionSession } from "@/lib/contentSelectionHistory";
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
  adaptiveLevel: string | null;
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
  routeObjective: DailyLoopFocusRoute;
  difficulty: ContentInventoryDifficulty;
  format: ContentInventoryFormat;
  tags?: string[];
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
    routeObjective: "english_interview",
    difficulty: "foundation",
    format: "sentence_transform",
    tags: ["speaking", "fluency", "sentence_building"],
  },
  {
    title: "Error Hunter",
    description: "Detecta errores gramaticales bajo tiempo.",
    path: "/error-hunter",
    category: "english",
    gameId: "error_hunter",
    routeObjective: "english_interview",
    difficulty: "core",
    format: "open_response",
    tags: ["grammar", "correction"],
  },
  {
    title: "Paraphrase Duel",
    description: "Transforma frases con estructura correcta.",
    path: "/paraphrase-duel",
    category: "english",
    gameId: "paraphrase_duel",
    routeObjective: "english_interview",
    difficulty: "core",
    format: "sentence_transform",
    tags: ["paraphrase", "interview"],
  },
  {
    title: "Collocation Sprint",
    description: "Conecta palabras que van juntas.",
    path: "/collocation-sprint",
    category: "english",
    gameId: "collocation_sprint",
    routeObjective: "english_interview",
    difficulty: "foundation",
    format: "pair_match",
    tags: ["vocabulary", "collocations"],
  },
  {
    title: "Taboo English",
    description: "Describe conceptos sin palabras prohibidas.",
    path: "/taboo-english",
    category: "english",
    gameId: "taboo_english",
    routeObjective: "english_interview",
    difficulty: "stretch",
    format: "open_response",
    tags: ["speaking", "explanations"],
  },
  {
    title: "Sentence Transformer",
    description: "Reescribe ideas con nuevas estructuras.",
    path: "/sentence-transformer",
    category: "english",
    gameId: "sentence_transformer",
    routeObjective: "english_interview",
    difficulty: "stretch",
    format: "sentence_transform",
    tags: ["rewriting", "structures"],
  },
];

const MATH_GAMES: LoopGameConfig[] = [
  {
    title: "Math Speed Duel",
    description: "Responde formula y conceptos contra reloj.",
    path: "/calculus?tab=game",
    category: "math",
    gameId: "math_game",
    routeObjective: "math_speed",
    difficulty: "core",
    format: "formula_drill",
    tags: ["calculus", "algebra", "geometry"],
  },
];

const DEV_GAMES: LoopGameConfig[] = [
  {
    title: "Code Syntax Builder",
    description: "Reconstruye sintaxis y comandos clave.",
    path: "/syntax-builder",
    category: "dev",
    gameId: "code_syntax_builder",
    routeObjective: "dev_reasoning",
    difficulty: "foundation",
    format: "code_snippet",
    tags: ["syntax", "commands"],
  },
  {
    title: "Code Bug Hunter",
    description: "Encuentra bugs antes de que cierre el timer.",
    path: "/bug-hunter",
    category: "dev",
    gameId: "code_bug_hunter",
    routeObjective: "dev_reasoning",
    difficulty: "core",
    format: "code_snippet",
    tags: ["debugging", "bugs"],
  },
  {
    title: "Diplomatic Reviewer",
    description: "Practica reasoning tecnico con feedback claro.",
    path: "/diplomatic-reviewer",
    category: "dev",
    gameId: "diplomatic_reviewer",
    routeObjective: "dev_reasoning",
    difficulty: "stretch",
    format: "open_response",
    tags: ["feedback", "review", "reasoning"],
  },
];

const GAME_POOL: Record<DailyLoopCategory, LoopGameConfig[]> = {
  english: ENGLISH_GAMES,
  math: MATH_GAMES,
  dev: DEV_GAMES,
};

const CATEGORY_SKILL: Record<DailyLoopCategory, ContentInventorySkill> = {
  english: "english",
  math: "math",
  dev: "dev",
};

const FOCUS_ROUTE_CATEGORY: Record<DailyLoopFocusRoute, DailyLoopCategory> = {
  english_interview: "english",
  math_speed: "math",
  dev_reasoning: "dev",
};

const GAME_CONFIG_BY_ID = Object.values(GAME_POOL)
  .flat()
  .reduce<Record<string, LoopGameConfig>>((accumulator, config) => {
    accumulator[config.gameId] = config;
    return accumulator;
  }, {});

let dailyLoopInventoryIndexCache: ReturnType<
  typeof buildContentInventoryIndex
> | null = null;

const hashString = (value: string): number => {
  let hash = 0;
  for (let index = 0; index < value.length; index += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(index);
    hash |= 0;
  }
  return Math.abs(hash);
};

const createSeededRandom = (seed: string) => {
  let state = hashString(seed) || 1;
  return () => {
    state = (state * 1664525 + 1013904223) >>> 0;
    return state / 4294967296;
  };
};

export const buildDailyLoopInventoryItems = (): ContentInventoryItem[] =>
  Object.values(GAME_POOL)
    .flat()
    .map((config, index) =>
      createContentInventoryItem({
        source: "daily_loop",
        skill: CATEGORY_SKILL[config.category],
        difficulty: config.difficulty,
        format: config.format,
        prompt: config.title,
        answer: config.description,
        tags: [
          "daily-loop",
          config.category,
          config.gameId,
          config.routeObjective,
          ...(config.tags || []),
        ],
        metadata: {
          gameId: config.gameId,
          routeObjective: config.routeObjective,
          topic: config.category,
          path: config.path,
          sequence: index,
        },
        active: true,
      }),
    );

export const getDailyLoopInventoryIndex = () => {
  if (dailyLoopInventoryIndexCache) {
    return dailyLoopInventoryIndexCache;
  }

  dailyLoopInventoryIndexCache = buildContentInventoryIndex(
    buildDailyLoopInventoryItems(),
  );
  return dailyLoopInventoryIndexCache;
};

const pickGamesForCategory = ({
  category,
  focusRoute,
  count,
  dateKey,
  sessionId,
  excludeIds = [],
}: {
  category: DailyLoopCategory;
  focusRoute: DailyLoopFocusRoute;
  count: number;
  dateKey: string;
  sessionId: string;
  excludeIds?: string[];
}): LoopGameConfig[] => {
  if (count <= 0) return [];

  const index = getDailyLoopInventoryIndex();
  const historyScope = {
    gameId: `daily_loop:${category}`,
    sessionId,
    gameWindow: 4,
    sessionWindow: 6,
  };
  const selected: ContentInventoryItem[] = [];

  if (FOCUS_ROUTE_CATEGORY[focusRoute] === category) {
    selected.push(
      ...pickNextItems({
        index,
        limit: count,
        skills: [CATEGORY_SKILL[category]],
        sources: ["daily_loop"],
        categories: [focusRoute],
        excludeIds,
        shuffle: true,
        random: createSeededRandom(
          `${dateKey}-${focusRoute}-${category}-focus`,
        ),
        historyScope,
      }),
    );
  }

  if (selected.length < count) {
    selected.push(
      ...pickNextItems({
        index,
        limit: count - selected.length,
        skills: [CATEGORY_SKILL[category]],
        sources: ["daily_loop"],
        categories: [category],
        excludeIds: [...excludeIds, ...selected.map((item) => item.id)],
        shuffle: true,
        random: createSeededRandom(`${dateKey}-${focusRoute}-${category}-all`),
        historyScope,
      }),
    );
  }

  return selected
    .map((item) => GAME_CONFIG_BY_ID[item.metadata.gameId || ""])
    .filter((config): config is LoopGameConfig => Boolean(config))
    .slice(0, count);
};

const buildLoopSteps = (
  dateKey: string,
  focusRoute: DailyLoopFocusRoute,
): DailyLoopStep[] => {
  const sessionId = createContentSelectionSession(`daily_loop:${dateKey}`);
  const latestAdaptiveLevelByGame = getAdaptiveDifficultyLog().reduce<
    Record<string, string>
  >((accumulator, entry) => {
    if (!entry.changed) return accumulator;
    accumulator[normalizeGameId(entry.gameId)] = entry.nextLevel;
    return accumulator;
  }, {});

  const categoryGames: Record<DailyLoopCategory, LoopGameConfig[]> = {
    english: pickGamesForCategory({
      category: "english",
      focusRoute,
      count: REQUIRED_COUNTS.english,
      dateKey,
      sessionId,
    }),
    math: pickGamesForCategory({
      category: "math",
      focusRoute,
      count: REQUIRED_COUNTS.math,
      dateKey,
      sessionId,
    }),
    dev: pickGamesForCategory({
      category: "dev",
      focusRoute,
      count: REQUIRED_COUNTS.dev,
      dateKey,
      sessionId,
    }),
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
      adaptiveLevel: latestAdaptiveLevelByGame[game.gameId] || null,
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
        adaptiveLevel:
          typeof parsedStep.adaptiveLevel === "string"
            ? parsedStep.adaptiveLevel
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
