import {
  ContentInventoryDifficulty,
  ContentInventoryFormat,
  ContentInventoryItem,
  ContentInventorySkill,
  ContentInventorySource,
} from "@/lib/contentInventory";
import { buildContentInventoryFromAdapters } from "@/lib/contentInventoryAdapters";
import {
  buildContentInventoryIndex,
  ContentInventoryIndex,
  queryContentInventoryIndexIds,
} from "@/lib/contentInventoryIndex";
import {
  ContentSelectionHistoryScope,
  createContentSelectionSession,
  getContentSelectionHistory,
  recordContentSelectionHistory,
} from "@/lib/contentSelectionHistory";
import { techDecks } from "@/features/data/techDecks";
import { trackAnalyticsEvent } from "@/lib/analytics";

export interface PickNextItemsInput {
  index: ContentInventoryIndex;
  limit: number;
  skills?: ContentInventorySkill[];
  categories?: string[];
  levels?: ContentInventoryDifficulty[];
  games?: string[];
  sources?: ContentInventorySource[];
  formats?: ContentInventoryFormat[];
  deckId?: string;
  excludeIds?: string[];
  activeOnly?: boolean;
  shuffle?: boolean;
  random?: () => number;
  historyScope?: ContentSelectionHistoryScope;
}

export interface PickedTechDeckCard {
  id: string;
  prompt: string;
  answer: string;
}

let techInventoryIndexCache: ContentInventoryIndex | null = null;

const uniqueArray = <T,>(values: T[] = []) => Array.from(new Set(values));

const fisherYatesShuffle = <T,>(values: T[], random: () => number): T[] => {
  const shuffled = [...values];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [
      shuffled[swapIndex],
      shuffled[index],
    ];
  }
  return shuffled;
};

export const getTechContentInventoryIndex = (): ContentInventoryIndex => {
  if (techInventoryIndexCache) {
    return techInventoryIndexCache;
  }

  const pack = buildContentInventoryFromAdapters({ techDecks });
  techInventoryIndexCache = buildContentInventoryIndex(pack.items);
  return techInventoryIndexCache;
};

export const resetTechContentInventoryIndexCache = () => {
  techInventoryIndexCache = null;
};

const prioritizeRecentHistory = (
  candidates: ContentInventoryItem[],
  sessionRecentIds: string[],
  gameRecentIds: string[],
  shuffle: boolean,
  random: () => number,
): ContentInventoryItem[] => {
  const sessionRecent = new Set(uniqueArray(sessionRecentIds));
  const gameRecent = new Set(uniqueArray(gameRecentIds));
  const buckets: ContentInventoryItem[][] = [[], [], [], []];

  candidates.forEach((item) => {
    const isInSessionWindow = sessionRecent.has(item.id);
    const isInGameWindow = gameRecent.has(item.id);
    const priority = isInSessionWindow
      ? isInGameWindow
        ? 3
        : 2
      : isInGameWindow
        ? 1
        : 0;
    buckets[priority].push(item);
  });

  return buckets.flatMap((bucket) =>
    shuffle ? fisherYatesShuffle(bucket, random) : bucket,
  );
};

export const pickNextItems = ({
  index,
  limit,
  skills,
  categories,
  levels,
  games,
  sources,
  formats,
  deckId,
  excludeIds = [],
  activeOnly = true,
  shuffle = true,
  random = Math.random,
  historyScope,
}: PickNextItemsInput): ContentInventoryItem[] => {
  const candidateIds = queryContentInventoryIndexIds(index, {
    skills,
    categories,
    levels,
    games,
    activeOnly,
  });
  const excluded = new Set(uniqueArray(excludeIds));

  let candidates = candidateIds
    .filter((id) => !excluded.has(id))
    .map((id) => index.byId[id])
    .filter((item): item is ContentInventoryItem => Boolean(item));

  if (sources && sources.length > 0) {
    const allowed = new Set(uniqueArray(sources));
    candidates = candidates.filter((item) => allowed.has(item.source));
  }

  if (formats && formats.length > 0) {
    const allowed = new Set(uniqueArray(formats));
    candidates = candidates.filter((item) => allowed.has(item.format));
  }

  if (deckId) {
    candidates = candidates.filter((item) => item.metadata.deckId === deckId);
  }

  const history = historyScope
    ? getContentSelectionHistory(historyScope)
    : {
        gameRecentIds: [],
        sessionRecentIds: [],
      };
  const repeatedIds = new Set([
    ...history.gameRecentIds,
    ...history.sessionRecentIds,
  ]);
  const prioritized = prioritizeRecentHistory(
    candidates,
    history.sessionRecentIds,
    history.gameRecentIds,
    shuffle,
    random,
  );
  const selected = prioritized.slice(0, Math.max(0, limit));

  if (selected.length > 0) {
    selected.forEach((item) => {
      trackAnalyticsEvent("content_selected", {
        game:
          typeof item.metadata.gameId === "string"
            ? item.metadata.gameId
            : historyScope?.gameId || "unknown",
        contentId: item.id,
        source: item.source,
        skill: item.skill,
        difficulty: item.difficulty,
        format: item.format,
        routeObjective:
          typeof item.metadata.routeObjective === "string"
            ? item.metadata.routeObjective
            : undefined,
        topic:
          typeof item.metadata.topic === "string"
            ? item.metadata.topic
            : undefined,
        repeated: repeatedIds.has(item.id),
      });
    });
  }

  if (historyScope && selected.length > 0) {
    recordContentSelectionHistory({
      ...historyScope,
      ids: selected.map((item) => item.id),
    });
  }

  return selected;
};

export const pickNextTechDeckCards = (input: {
  deckId: string;
  limit?: number;
  excludeIds?: string[];
  shuffle?: boolean;
  activeOnly?: boolean;
  random?: () => number;
  historyScope?: ContentSelectionHistoryScope;
}): PickedTechDeckCard[] =>
  pickNextItems({
    index: getTechContentInventoryIndex(),
    limit: input.limit ?? Number.MAX_SAFE_INTEGER,
    deckId: input.deckId,
    sources: ["tech_deck"],
    formats: ["open_response"],
    excludeIds: input.excludeIds,
    shuffle: input.shuffle,
    activeOnly: input.activeOnly,
    random: input.random,
    historyScope: input.historyScope,
  })
    .filter((item): item is ContentInventoryItem & { answer: string } =>
      Boolean(item.answer),
    )
    .map((item) => ({
      id: item.id,
      prompt: item.prompt,
      answer: item.answer,
    }));

export { createContentSelectionSession };
