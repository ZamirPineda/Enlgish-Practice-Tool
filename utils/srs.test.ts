import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import {
  calculateSrsData,
  createNewSrsItem,
  getDueReviewItems,
  getDueReviewWords,
  getIsoWeekKey,
  getWeeklyBossReviewItems,
} from "./srs";
import { SrsVocabularyItem } from "../types";
import { Rating } from "ts-fsrs";

describe("createNewSrsItem", () => {
  const MOCK_TODAY = new Date("2024-02-20T00:00:00.000Z");

  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(MOCK_TODAY);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("creates a new item with correct defaults", () => {
    const word = "example";
    const definition = "a representative form or pattern";

    const result = createNewSrsItem(word, definition);

    expect(result).toEqual(
      expect.objectContaining({
        word,
        definition,
        repetition: 0,
        efactor: 2.5,
        interval: 0,
        lapses: 0,
        nextReviewDate: "2024-02-20",
        status: "new",
      }),
    );
    expect(result.fsrsData).toBeDefined();
  });
});

// Helper to create a partial SRS item
const createItem = (
  word: string,
  nextReviewDate: string,
): SrsVocabularyItem => ({
  word,
  nextReviewDate,
  definition: "test definition",
  repetition: 0,
  efactor: 2.5,
  interval: 1,
  status: "learning",
});

describe("getDueReviewWords", () => {
  beforeEach(() => {
    // Set a fixed date: 2024-02-20
    // Using a specific time to avoid timezone issues, although the code uses split('T')[0]
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2024-02-20T12:00:00Z"));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should return words due today", () => {
    const deck: Record<string, SrsVocabularyItem> = {
      today: createItem("today", "2024-02-20"),
    };
    const result = getDueReviewWords(deck);
    expect(result).toEqual(["today"]);
  });

  it("should return words due in the past (overdue)", () => {
    const deck: Record<string, SrsVocabularyItem> = {
      overdue: createItem("overdue", "2024-02-19"),
    };
    const result = getDueReviewWords(deck);
    expect(result).toEqual(["overdue"]);
  });

  it("should NOT return words due in the future", () => {
    const deck: Record<string, SrsVocabularyItem> = {
      future: createItem("future", "2024-02-21"),
    };
    const result = getDueReviewWords(deck);
    expect(result).toEqual([]);
  });

  it("should handle mixed deck correctly", () => {
    const deck: Record<string, SrsVocabularyItem> = {
      due: createItem("due", "2024-02-20"),
      overdue: createItem("overdue", "2024-02-10"),
      future: createItem("future", "2024-02-25"),
    };
    const result = getDueReviewWords(deck);
    expect(result).toContain("due");
    expect(result).toContain("overdue");
    expect(result).not.toContain("future");
    expect(result.length).toBe(2);
  });

  it("should handle empty deck", () => {
    const result = getDueReviewWords({});
    expect(result).toEqual([]);
  });

  it("should handle null/undefined deck gracefully", () => {
    // @ts-ignore
    expect(getDueReviewWords(null)).toEqual([]);
    // @ts-ignore
    expect(getDueReviewWords(undefined)).toEqual([]);
  });
});

describe("calculateSrsData (FSRS)", () => {
  const MOCK_TODAY = new Date("2023-01-01T00:00:00.000Z");

  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(MOCK_TODAY);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  const createBaseItem = (): SrsVocabularyItem => ({
    word: "test",
    definition: "test definition",
    repetition: 0,
    efactor: 2.5,
    interval: 0,
    nextReviewDate: "2023-01-01",
    status: "new",
  });

  describe("when answer is correct (fallback to Good)", () => {
    it("handles the first review", () => {
      const item = createBaseItem();
      const result = calculateSrsData(item, true);

      expect(result.repetition).toBe(1);
      // Good on New card sets 10min interval, so 0 days
      expect(result.interval).toBe(0);
      expect(result.nextReviewDate).toBe("2023-01-01");
      expect(result.status).toBe("learning");
    });
  });

  describe("when specific ratings are provided", () => {
    it("handles Rating.Easy for a new card", () => {
      const item = createBaseItem();
      const result = calculateSrsData(item, true, Rating.Easy);

      expect(result.repetition).toBe(1);
      // Easy skips to Review usually
      expect(result.interval).toBeGreaterThan(0);
    });

    it("handles Rating.Again (Fail) for a new card", () => {
      const item = {
        ...createBaseItem(),
        repetition: 5,
        interval: 20,
      };
      const result = calculateSrsData(item, false, Rating.Again);

      // Reps increment, interval drops to 0 (learning steps)
      expect(result.repetition).toBeGreaterThan(0);
      expect(result.interval).toBe(0);
      expect(result.lapses).toBe(0); // Lapses is 0 for failing a brand-new internal FSRS card
      expect(result.status).toBe("learning");
    });
  });

  describe("preservation of fsrsData", () => {
    it("saves and reuses explicit FSRS state", () => {
      const item = createBaseItem();
      const firstReview = calculateSrsData(item, true, Rating.Good);

      expect(firstReview.fsrsData).toBeDefined();

      // Ensure mock time advances
      vi.setSystemTime(new Date("2023-01-01T00:15:00.000Z")); // 15 mins later
      const secondReview = calculateSrsData(firstReview, true, Rating.Good);

      expect(secondReview.repetition).toBe(2);
      expect(secondReview.interval).toBeGreaterThan(0); // Graduates from learning to Review (1+ days)
    });
  });
});

describe("getDueReviewItems", () => {
  // Mock the date to ensure deterministic results: 2023-01-01
  const MOCK_TODAY = new Date("2023-01-01T00:00:00.000Z");

  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(MOCK_TODAY);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  // Helper to create a partial SRS item for testing filtering
  const createItem = (
    word: string,
    nextReviewDate: string,
  ): SrsVocabularyItem => ({
    word,
    definition: "test definition",
    repetition: 0,
    efactor: 2.5,
    interval: 0,
    nextReviewDate,
    status: "learning",
  });

  it("returns empty array if deck is undefined or null", () => {
    expect(getDueReviewItems(null)).toEqual([]);
    expect(getDueReviewItems(undefined)).toEqual([]);
  });

  it("returns empty array if deck is empty object", () => {
    expect(getDueReviewItems({})).toEqual([]);
  });

  it("returns items that are due today", () => {
    const deck: Record<string, SrsVocabularyItem> = {
      word1: createItem("word1", "2023-01-01"), // Due today (MOCK_TODAY)
    };
    const result = getDueReviewItems(deck);
    expect(result).toHaveLength(1);
    expect(result[0].word).toBe("word1");
  });

  it("returns items that are overdue (due in past)", () => {
    const deck: Record<string, SrsVocabularyItem> = {
      word1: createItem("word1", "2022-12-31"), // Due yesterday
    };
    const result = getDueReviewItems(deck);
    expect(result).toHaveLength(1);
    expect(result[0].word).toBe("word1");
  });

  it("does NOT return items that are due in the future", () => {
    const deck: Record<string, SrsVocabularyItem> = {
      word1: createItem("word1", "2023-01-02"), // Due tomorrow
    };
    const result = getDueReviewItems(deck);
    expect(result).toHaveLength(0);
  });

  it("filters mixed deck correctly (returns only due/overdue items)", () => {
    const deck: Record<string, SrsVocabularyItem> = {
      due: createItem("due", "2023-01-01"),
      overdue: createItem("overdue", "2022-12-31"),
      future: createItem("future", "2023-01-02"),
    };
    const result = getDueReviewItems(deck);

    expect(result).toHaveLength(2);
    const words = result.map((i) => i.word).sort();
    expect(words).toEqual(["due", "overdue"]);
  });

  it("prioritizes cards with more failures first", () => {
    const deck: Record<string, SrsVocabularyItem> = {
      easy: { ...createItem("easy", "2023-01-01"), lapses: 0 },
      hard: { ...createItem("hard", "2023-01-01"), lapses: 4 },
      medium: { ...createItem("medium", "2023-01-01"), lapses: 2 },
    };

    const result = getDueReviewItems(deck);
    expect(result.map((item) => item.word)).toEqual(["hard", "medium", "easy"]);
  });

  it("handles invalid items in the deck gracefully", () => {
    const deck = {
      valid: createItem("valid", "2023-01-01"),
      invalid: null, // Simulate potential corrupted data
    };
    const result = getDueReviewItems(deck);

    expect(result).toHaveLength(1);
    expect(result[0].word).toBe("valid");
  });
});

describe("getIsoWeekKey", () => {
  it("returns expected ISO week key", () => {
    expect(getIsoWeekKey(new Date("2026-02-23T00:00:00.000Z"))).toBe(
      "2026-W09",
    );
  });
});

describe("getWeeklyBossReviewItems", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-02-23T12:00:00.000Z"));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  const createBossItem = (
    word: string,
    nextReviewDate: string,
    status: "new" | "learning" | "mastered" = "learning",
  ): SrsVocabularyItem => ({
    word,
    definition: "test",
    repetition: status === "new" ? 0 : 1,
    efactor: 2.5,
    interval: status === "new" ? 0 : 3,
    nextReviewDate,
    status,
    lapses: 0,
  });

  it("prioritizes due items and then upcoming/new items", () => {
    const deck: Record<string, SrsVocabularyItem> = {
      overdue1: createBossItem("overdue-1", "2026-02-20"),
      dueToday: createBossItem("due-today", "2026-02-23"),
      upcoming: createBossItem("upcoming", "2026-02-27"),
      newCard: createBossItem("new-card", "2026-03-12", "new"),
      future: createBossItem("future", "2026-03-20"),
    };

    const result = getWeeklyBossReviewItems(deck, 4).map((item) => item.word);

    expect(result).toContain("overdue-1");
    expect(result).toContain("due-today");
    expect(result).toContain("upcoming");
    expect(result).toContain("new-card");
    expect(result).not.toContain("future");
  });

  it("respects maxItems limit", () => {
    const deck: Record<string, SrsVocabularyItem> = {
      a: createBossItem("a", "2026-02-20"),
      b: createBossItem("b", "2026-02-21"),
      c: createBossItem("c", "2026-02-22"),
    };

    const result = getWeeklyBossReviewItems(deck, 2);
    expect(result).toHaveLength(2);
  });
});
