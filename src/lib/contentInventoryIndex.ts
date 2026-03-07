import {
  ContentInventoryDifficulty,
  ContentInventoryItem,
  ContentInventoryPack,
  ContentInventorySkill,
  normalizeContentTag,
  normalizeContentTags,
} from "@/lib/contentInventory";

export interface ContentInventoryIndex {
  byId: Record<string, ContentInventoryItem>;
  itemOrder: string[];
  orderById: Record<string, number>;
  bySkill: Record<ContentInventorySkill, string[]>;
  byCategory: Record<string, string[]>;
  byLevel: Record<ContentInventoryDifficulty, string[]>;
  byGame: Record<string, string[]>;
}

export interface ContentInventoryQuery {
  skills?: ContentInventorySkill[];
  categories?: string[];
  levels?: ContentInventoryDifficulty[];
  games?: string[];
  activeOnly?: boolean;
  limit?: number;
}

const pushIntoBucket = (
  index: Record<string, string[]>,
  key: string,
  id: string,
) => {
  if (!index[key]) {
    index[key] = [];
  }
  index[key].push(id);
};

const extractCategories = (item: ContentInventoryItem): string[] => {
  const topic = item.metadata.topic ? [item.metadata.topic] : [];
  return normalizeContentTags([...item.tags, ...topic]);
};

const resolveGameKey = (item: ContentInventoryItem): string =>
  normalizeContentTag(item.metadata.gameId || item.source);

const unionBuckets = (
  index: Record<string, string[]>,
  keys: string[],
): Set<string> => {
  const ids = new Set<string>();
  keys.forEach((key) => {
    (index[key] || []).forEach((id) => ids.add(id));
  });
  return ids;
};

const intersectSets = (target: Set<string>, next: Set<string>) => {
  for (const id of target) {
    if (!next.has(id)) {
      target.delete(id);
    }
  }
};

const normalizeQueryArray = (values: string[] = []): string[] =>
  Array.from(new Set(values.map((value) => value.trim()).filter(Boolean)));

export const buildContentInventoryIndex = (
  items: ContentInventoryItem[],
): ContentInventoryIndex => {
  const byId: Record<string, ContentInventoryItem> = {};
  const itemOrder: string[] = [];
  const orderById: Record<string, number> = {};
  const byCategory: Record<string, string[]> = {};
  const byGame: Record<string, string[]> = {};
  const bySkill: ContentInventoryIndex["bySkill"] = {
    english: [],
    math: [],
    dev: [],
    mixed: [],
  };
  const byLevel: ContentInventoryIndex["byLevel"] = {
    foundation: [],
    core: [],
    stretch: [],
    expert: [],
  };

  items.forEach((item, index) => {
    byId[item.id] = item;
    itemOrder.push(item.id);
    orderById[item.id] = index;

    bySkill[item.skill].push(item.id);
    byLevel[item.difficulty].push(item.id);
    pushIntoBucket(byGame, resolveGameKey(item), item.id);
    extractCategories(item).forEach((category) =>
      pushIntoBucket(byCategory, category, item.id),
    );
  });

  return {
    byId,
    itemOrder,
    orderById,
    bySkill,
    byCategory,
    byLevel,
    byGame,
  };
};

export const buildContentInventoryIndexFromPack = (
  pack: ContentInventoryPack,
): ContentInventoryIndex => buildContentInventoryIndex(pack.items);

export const queryContentInventoryIndexIds = (
  index: ContentInventoryIndex,
  query: ContentInventoryQuery = {},
): string[] => {
  const skillKeys = query.skills || [];
  const levelKeys = query.levels || [];
  const categoryKeys = normalizeContentTags(query.categories || []);
  const gameKeys = normalizeQueryArray(query.games || []).map((game) =>
    normalizeContentTag(game),
  );

  let candidateIds: Set<string> | null = null;
  const applyBucket = (bucket: Set<string>) => {
    if (candidateIds === null) {
      candidateIds = bucket;
      return;
    }
    intersectSets(candidateIds, bucket);
  };

  if (skillKeys.length > 0) {
    applyBucket(unionBuckets(index.bySkill, skillKeys));
  }
  if (levelKeys.length > 0) {
    applyBucket(unionBuckets(index.byLevel, levelKeys));
  }
  if (categoryKeys.length > 0) {
    applyBucket(unionBuckets(index.byCategory, categoryKeys));
  }
  if (gameKeys.length > 0) {
    applyBucket(unionBuckets(index.byGame, gameKeys));
  }

  let ids =
    candidateIds === null
      ? [...index.itemOrder]
      : Array.from(candidateIds).sort(
          (left, right) => index.orderById[left] - index.orderById[right],
        );

  if (query.activeOnly !== false) {
    ids = ids.filter((id) => index.byId[id]?.active);
  }
  if (typeof query.limit === "number") {
    ids = ids.slice(0, Math.max(0, query.limit));
  }

  return ids;
};

export const queryContentInventoryIndex = (
  index: ContentInventoryIndex,
  query: ContentInventoryQuery = {},
): ContentInventoryItem[] =>
  queryContentInventoryIndexIds(index, query)
    .map((id) => index.byId[id])
    .filter((item): item is ContentInventoryItem => Boolean(item));
