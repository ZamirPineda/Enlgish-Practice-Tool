import Fuse, { FuseResultMatch } from "fuse.js";
import { SrsVocabularyItem } from "../types";

export interface VaultSearchFilters {
  tags: string[];
  states: ("new" | "learning" | "mastered")[];
  dateRange: { start: string; end: string } | null;
  difficulty: "all" | "hard" | "medium" | "easy";
}

export type VaultSortMode = "alphabetical" | "strength" | "newest";

export interface WorkerInitMessage {
  type: "INIT";
  payload: SrsVocabularyItem[];
}

export interface WorkerSearchMessage {
  type: "SEARCH";
  id: string; // To map responses back
  payload: {
    query: string;
    filters: VaultSearchFilters;
    sort: VaultSortMode;
  };
}

export type WorkerMessage = WorkerInitMessage | WorkerSearchMessage;

export interface VaultSearchResult {
  item: SrsVocabularyItem;
  matches?: readonly FuseResultMatch[];
}

export interface WorkerSearchResponse {
  type: "SEARCH_RESULT";
  id: string;
  payload: VaultSearchResult[];
}

// Global state within the worker
let fuseInstance: Fuse<SrsVocabularyItem> | null = null;
let rawItems: SrsVocabularyItem[] = [];

const FUSE_OPTIONS = {
  keys: [
    { name: "word", weight: 2 },
    { name: "definition", weight: 1 },
    { name: "tags", weight: 0.5 },
  ],
  includeMatches: true,
  threshold: 0.3, // 0.0 is perfect match, 1.0 is anything
  ignoreLocation: true,
  useExtendedSearch: true,
};

function applyFilters(
  item: SrsVocabularyItem,
  filters: VaultSearchFilters,
): boolean {
  // Tags Match
  if (filters.tags.length > 0) {
    if (!item.tags || item.tags.length === 0) return false;
    const hasTag = filters.tags.some((t) => item.tags!.includes(t));
    if (!hasTag) return false;
  }

  // State Match
  if (filters.states.length > 0) {
    if (!filters.states.includes(item.status)) return false;
  }

  // Date Range Match
  if (filters.dateRange) {
    const nextReview = new Date(item.nextReviewDate).getTime();
    const start = new Date(filters.dateRange.start).getTime();
    const end = new Date(filters.dateRange.end).getTime();
    if (nextReview < start || nextReview > end) return false;
  }

  // Difficulty Match (Basic heuristic: efactor < 2.0 = hard, interval > 21 = easy)
  if (filters.difficulty !== "all") {
    if (filters.difficulty === "hard" && item.efactor >= 2.0) return false;
    if (filters.difficulty === "easy" && item.interval <= 21) return false;
    if (
      filters.difficulty === "medium" &&
      (item.efactor < 2.0 || item.interval > 21)
    ) {
      return false;
    }
  }

  return true;
}

function getSorted(
  items: VaultSearchResult[],
  sortMode: VaultSortMode,
): VaultSearchResult[] {
  return [...items].sort((a, b) => {
    if (sortMode === "alphabetical") {
      return a.item.word.localeCompare(b.item.word);
    }
    if (sortMode === "strength") {
      return b.item.interval - a.item.interval;
    }
    if (sortMode === "newest") {
      return (
        new Date(b.item.nextReviewDate).getTime() -
        new Date(a.item.nextReviewDate).getTime()
      );
    }
    return 0;
  });
}

// Listen to messages from the main thread
self.addEventListener("message", (event: MessageEvent<WorkerMessage>) => {
  const data = event.data;

  if (data.type === "INIT") {
    rawItems = data.payload;
    fuseInstance = new Fuse(rawItems, FUSE_OPTIONS);
  }

  if (data.type === "SEARCH") {
    if (!fuseInstance) {
      console.warn("Search called before INIT. Aborting.");
      return;
    }

    const { query, filters, sort } = data.payload;

    let searchResults: VaultSearchResult[] = [];

    // 1. Search Query
    if (query.trim() === "") {
      // Return all, let filtering apply below
      searchResults = rawItems.map((item) => ({ item, matches: [] }));
    } else {
      const results = fuseInstance.search(query);
      searchResults = results.map((res) => ({
        item: res.item,
        matches: res.matches,
      }));
    }

    // 2. Filters
    searchResults = searchResults.filter((res) =>
      applyFilters(res.item, filters),
    );

    // 3. Sort
    // Note: If there's a query, Fuse.js already sorts by relevance!
    // Usually, we only sort if query is empty OR if user forces a sort.
    if (query.trim() === "") {
      searchResults = getSorted(searchResults, sort);
    }

    const response: WorkerSearchResponse = {
      type: "SEARCH_RESULT",
      id: data.id,
      payload: searchResults,
    };

    self.postMessage(response);
  }
});
