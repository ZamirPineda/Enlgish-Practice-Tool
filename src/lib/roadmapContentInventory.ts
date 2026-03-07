import type {
  ContentInventoryItem,
  ContentInventoryPack,
} from "@/lib/contentInventory";
import {
  buildContentInventoryFromAdapters,
  DEFAULT_ROADMAP_ADAPTERS_INPUT,
  type BuildInventoryAdaptersInput,
} from "@/lib/contentInventoryAdapters";
import {
  buildContentInventoryIndex,
  queryContentInventoryIndex,
  type ContentInventoryIndex,
} from "@/lib/contentInventoryIndex";
import {
  defaultRoadmapDefinition,
  defaultRoadmapIndex,
} from "@/lib/roadmapCatalog";
import {
  buildRoadmapModelIndex,
  type IndexedRoadmapNode,
  type RoadmapDefinition,
  type RoadmapRouteObjective,
} from "@/lib/roadmapModel";

export type BuildRoadmapContentInventoryInput = BuildInventoryAdaptersInput;

export interface RoadmapNodeInventoryCoverage {
  nodeId: string;
  lessonId: string;
  unitId: string;
  moduleId: string;
  routeObjective: RoadmapRouteObjective;
  gameId: string;
  matchedCount: number;
  strictMatchedCount: number;
  fallbackMatchedCount: number;
  usedFallback: boolean;
  matchedItemIds: string[];
  missing: boolean;
}

export interface RoadmapInventoryCoverageReport {
  totalNodes: number;
  coveredNodes: number;
  uncoveredNodeIds: string[];
  nodes: RoadmapNodeInventoryCoverage[];
}

let roadmapInventoryPackCache: ContentInventoryPack | null = null;
let roadmapInventoryIndexCache: ContentInventoryIndex | null = null;

const mergeRoadmapAdaptersInput = (
  overrides: BuildRoadmapContentInventoryInput = {},
): BuildInventoryAdaptersInput => ({
  ...DEFAULT_ROADMAP_ADAPTERS_INPUT,
  ...overrides,
});

const filterRoadmapItems = (
  items: ContentInventoryItem[],
  node: IndexedRoadmapNode,
): ContentInventoryItem[] => {
  const requiredRoute =
    node.contentFilters.routeObjective || node.routeObjective || undefined;
  const requiredFormat = node.contentFilters.format || undefined;

  return items.filter((item) => {
    if (requiredRoute && item.metadata.routeObjective !== requiredRoute) {
      return false;
    }
    if (requiredFormat && item.format !== requiredFormat) {
      return false;
    }
    return true;
  });
};

const queryRoadmapNodeInventoryItems = (
  index: ContentInventoryIndex,
  node: IndexedRoadmapNode,
  tags: string[],
): ContentInventoryItem[] =>
  filterRoadmapItems(
    queryContentInventoryIndex(index, {
      skills: [node.skill],
      levels: [node.contentFilters.difficulty || node.difficulty],
      games: [node.gameId],
      categories: tags.length > 0 ? tags : undefined,
      activeOnly: true,
    }),
    node,
  );

export const buildRoadmapContentInventoryPack = (
  overrides: BuildRoadmapContentInventoryInput = {},
): ContentInventoryPack => {
  if (Object.keys(overrides).length === 0 && roadmapInventoryPackCache) {
    return roadmapInventoryPackCache;
  }

  const pack = buildContentInventoryFromAdapters(
    mergeRoadmapAdaptersInput(overrides),
  );

  if (Object.keys(overrides).length === 0) {
    roadmapInventoryPackCache = pack;
  }

  return pack;
};

export const getRoadmapContentInventoryIndex = (
  overrides: BuildRoadmapContentInventoryInput = {},
): ContentInventoryIndex => {
  if (Object.keys(overrides).length === 0 && roadmapInventoryIndexCache) {
    return roadmapInventoryIndexCache;
  }

  const index = buildContentInventoryIndex(
    buildRoadmapContentInventoryPack(overrides).items,
  );

  if (Object.keys(overrides).length === 0) {
    roadmapInventoryIndexCache = index;
  }

  return index;
};

export const resetRoadmapContentInventoryCache = () => {
  roadmapInventoryPackCache = null;
  roadmapInventoryIndexCache = null;
};

export const getRoadmapNodeInventoryCoverage = (
  node: IndexedRoadmapNode,
  input: {
    index?: ContentInventoryIndex;
  } = {},
): RoadmapNodeInventoryCoverage => {
  const index = input.index || getRoadmapContentInventoryIndex();
  const strictTags =
    node.contentFilters.tags.length > 0 ? node.contentFilters.tags : node.tags;
  const strictMatches = queryRoadmapNodeInventoryItems(index, node, strictTags);
  const fallbackMatches =
    strictMatches.length === 0 && strictTags.length > 0
      ? queryRoadmapNodeInventoryItems(index, node, [])
      : [];
  const matchedItems =
    strictMatches.length > 0 ? strictMatches : fallbackMatches;

  return {
    nodeId: node.id,
    lessonId: node.lessonId,
    unitId: node.unitId,
    moduleId: node.moduleId,
    routeObjective: node.routeObjective,
    gameId: node.gameId,
    matchedCount: matchedItems.length,
    strictMatchedCount: strictMatches.length,
    fallbackMatchedCount: fallbackMatches.length,
    usedFallback: strictMatches.length === 0 && fallbackMatches.length > 0,
    matchedItemIds: matchedItems.map((item) => item.id),
    missing: matchedItems.length === 0,
  };
};

export const getRoadmapInventoryCoverage = (
  input: {
    definition?: RoadmapDefinition;
    index?: ContentInventoryIndex;
  } = {},
): RoadmapInventoryCoverageReport => {
  const definition = input.definition || defaultRoadmapDefinition;
  const index = input.index || getRoadmapContentInventoryIndex();
  const nodes =
    definition === defaultRoadmapDefinition
      ? defaultRoadmapIndex.nodesInOrder
      : buildRoadmapModelIndex(definition).nodesInOrder;
  const coverage = nodes.map((node) =>
    getRoadmapNodeInventoryCoverage(node, { index }),
  );
  const uncoveredNodeIds = coverage
    .filter((entry) => entry.missing)
    .map((entry) => entry.nodeId);

  return {
    totalNodes: coverage.length,
    coveredNodes: coverage.length - uncoveredNodeIds.length,
    uncoveredNodeIds,
    nodes: coverage,
  };
};
