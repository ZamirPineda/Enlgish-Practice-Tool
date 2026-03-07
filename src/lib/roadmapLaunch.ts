import type { ContentInventoryDifficulty } from "@/lib/contentInventory";
import { mapDifficultyTierToAdaptiveLevel } from "@/lib/practiceContent";
import type { RoadmapNode } from "@/lib/roadmapModel";

export interface RoadmapSessionConfig {
  autostart: boolean;
  nodeId: string;
  gameId: string;
  difficulty: string;
  routeObjective: string;
  tags: string[];
}

const normalizeTag = (value: string) => value.trim().toLowerCase();

const normalizeTags = (values: string[]) =>
  Array.from(
    new Set(values.map(normalizeTag).filter((value) => value.length > 0)),
  );

const ROADMAP_GAME_ID_ALIASES: Record<string, string[]> = {
  study_docs_quiz: ["study_docs_quiz", "docs_quiz"],
  study_docs_game: ["study_docs_game", "docs_game"],
};

const resolveAllowedGameIds = (expectedGameId?: string | string[]) => {
  if (!expectedGameId) {
    return null;
  }

  const gameIds = Array.isArray(expectedGameId)
    ? expectedGameId
    : [expectedGameId];

  return new Set(
    gameIds.flatMap((gameId) => ROADMAP_GAME_ID_ALIASES[gameId] || [gameId]),
  );
};

const mapEnglishDifficulty = (difficulty: ContentInventoryDifficulty) => {
  switch (difficulty) {
    case "foundation":
      return "A2";
    case "core":
      return "B1";
    case "stretch":
      return "B2";
    case "expert":
      return "C1";
    default:
      return "B1";
  }
};

export const mapRoadmapNodeDifficultyToGameLevel = (
  node: Pick<RoadmapNode, "gameId" | "difficulty">,
) => {
  switch (node.gameId) {
    case "speed_builder":
    case "error_hunter":
    case "paraphrase_duel":
    case "sentence_transformer":
      return mapEnglishDifficulty(node.difficulty);
    default:
      return mapDifficultyTierToAdaptiveLevel(node.difficulty);
  }
};

export const buildRoadmapNodeSessionHref = (node: RoadmapNode) => {
  const [pathname, existingSearch = ""] = node.path.split("?");
  const searchParams = new URLSearchParams(existingSearch);

  searchParams.set("roadmap", "1");
  searchParams.set("autostart", "1");
  searchParams.set("roadmapNode", node.id);
  searchParams.set("gameId", node.gameId);
  searchParams.set("difficulty", mapRoadmapNodeDifficultyToGameLevel(node));
  searchParams.set("routeObjective", node.routeObjective);

  const tags = normalizeTags(node.contentFilters.tags || node.tags || []);
  if (tags.length > 0) {
    searchParams.set("tags", tags.join(","));
  }

  const nextSearch = searchParams.toString();
  return nextSearch.length > 0 ? `${pathname}?${nextSearch}` : pathname;
};

export const parseRoadmapSessionConfig = (
  searchParams: URLSearchParams,
  expectedGameId?: string | string[],
): RoadmapSessionConfig | null => {
  if (searchParams.get("roadmap") !== "1") {
    return null;
  }

  const gameId = searchParams.get("gameId");
  const nodeId = searchParams.get("roadmapNode");
  const difficulty = searchParams.get("difficulty");
  const routeObjective = searchParams.get("routeObjective");

  if (!gameId || !nodeId || !difficulty || !routeObjective) {
    return null;
  }

  const allowedGameIds = resolveAllowedGameIds(expectedGameId);
  if (allowedGameIds && !allowedGameIds.has(gameId)) {
    return null;
  }

  const rawTags = searchParams.get("tags") || "";

  return {
    autostart: searchParams.get("autostart") === "1",
    nodeId,
    gameId,
    difficulty,
    routeObjective,
    tags: normalizeTags(rawTags.split(",")),
  };
};

export const matchesRoadmapTags = (
  itemTags: string[] | undefined,
  selectedTags: string[],
) => {
  const normalizedSelectedTags = normalizeTags(selectedTags);

  if (normalizedSelectedTags.length === 0) {
    return true;
  }

  const normalizedItemTags = new Set(normalizeTags(itemTags || []));
  return normalizedSelectedTags.some((tag) => normalizedItemTags.has(tag));
};
