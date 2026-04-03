import { beforeEach, describe, expect, test } from "vitest";
import { createContentInventoryItem } from "@/lib/contentInventory";
import { buildContentInventoryIndex } from "@/lib/contentInventoryIndex";
import {
  clearAnalyticsEventsForTesting,
  getAnalyticsEvents,
} from "@/lib/analytics";
import {
  createContentSelectionSession,
  pickNextItems,
  pickNextTechDeckCards,
  resetTechContentInventoryIndexCache,
} from "@/lib/contentInventoryPicker";
import { resetContentSelectionHistory } from "@/lib/contentSelectionHistory";
import { techDecks } from "@/features/data/techDecks";

describe("contentInventoryPicker", () => {
  beforeEach(() => {
    resetContentSelectionHistory();
    clearAnalyticsEventsForTesting();
  });

  test("pickNextItems applies combined filters and excludeIds", () => {
    const first = createContentInventoryItem({
      source: "study_deck",
      skill: "english",
      difficulty: "core",
      format: "flashcard",
      prompt: "Prompt A",
      answer: "Answer A",
      metadata: { gameId: "study_deck" },
      active: true,
    });
    const second = createContentInventoryItem({
      source: "study_deck",
      skill: "english",
      difficulty: "core",
      format: "flashcard",
      prompt: "Prompt B",
      answer: "Answer B",
      metadata: { gameId: "study_deck" },
      active: true,
    });
    const third = createContentInventoryItem({
      source: "tech_deck",
      skill: "dev",
      difficulty: "core",
      format: "open_response",
      prompt: "Prompt C",
      answer: "Answer C",
      metadata: { gameId: "tech_flashcards", deckId: "demo" },
      active: true,
    });

    const index = buildContentInventoryIndex([first, second, third]);
    const selected = pickNextItems({
      index,
      limit: 2,
      skills: ["english"],
      levels: ["core"],
      games: ["study_deck"],
      excludeIds: [first.id],
      shuffle: false,
    });

    expect(selected).toHaveLength(1);
    expect(selected[0].id).toBe(second.id);
  });

  test("pickNextItems uses deterministic order when shuffle is false", () => {
    const first = createContentInventoryItem({
      source: "manual",
      skill: "english",
      difficulty: "foundation",
      format: "flashcard",
      prompt: "Prompt 1",
      answer: "Answer 1",
      metadata: { gameId: "manual" },
      active: true,
    });
    const second = createContentInventoryItem({
      source: "manual",
      skill: "english",
      difficulty: "foundation",
      format: "flashcard",
      prompt: "Prompt 2",
      answer: "Answer 2",
      metadata: { gameId: "manual" },
      active: true,
    });
    const third = createContentInventoryItem({
      source: "manual",
      skill: "english",
      difficulty: "foundation",
      format: "flashcard",
      prompt: "Prompt 3",
      answer: "Answer 3",
      metadata: { gameId: "manual" },
      active: true,
    });

    const index = buildContentInventoryIndex([first, second, third]);
    const selected = pickNextItems({
      index,
      limit: 2,
      skills: ["english"],
      shuffle: false,
    });

    expect(selected.map((item) => item.id)).toEqual([first.id, second.id]);
  });

  test("pickNextItems returns empty for strict filters without emitting telemetry", () => {
    const items = [
      createContentInventoryItem({
        source: "daily_loop",
        skill: "english",
        difficulty: "foundation",
        format: "sentence_transform",
        prompt: "Prompt A",
        answer: "Answer A",
        metadata: {
          gameId: "speed_builder",
          routeObjective: "english_interview",
        },
        active: true,
      }),
    ];
    const index = buildContentInventoryIndex(items);

    const selected = pickNextItems({
      index,
      limit: 3,
      skills: ["dev"],
      sources: ["tech_deck"],
      formats: ["code_snippet"],
      games: ["tech_boss"],
      categories: ["nonexistent-category"],
      shuffle: false,
    });

    expect(selected).toEqual([]);
    expect(
      getAnalyticsEvents().filter((event) => event.name === "content_selected"),
    ).toEqual([]);
  });

  test("pickNextItems avoids recent items within the same game session", () => {
    const items = [
      createContentInventoryItem({
        source: "tech_deck",
        skill: "dev",
        difficulty: "core",
        format: "open_response",
        prompt: "Prompt 1",
        answer: "Answer 1",
        metadata: { gameId: "tech_flashcards", deckId: "demo" },
        active: true,
      }),
      createContentInventoryItem({
        source: "tech_deck",
        skill: "dev",
        difficulty: "core",
        format: "open_response",
        prompt: "Prompt 2",
        answer: "Answer 2",
        metadata: { gameId: "tech_flashcards", deckId: "demo" },
        active: true,
      }),
      createContentInventoryItem({
        source: "tech_deck",
        skill: "dev",
        difficulty: "core",
        format: "open_response",
        prompt: "Prompt 3",
        answer: "Answer 3",
        metadata: { gameId: "tech_flashcards", deckId: "demo" },
        active: true,
      }),
      createContentInventoryItem({
        source: "tech_deck",
        skill: "dev",
        difficulty: "core",
        format: "open_response",
        prompt: "Prompt 4",
        answer: "Answer 4",
        metadata: { gameId: "tech_flashcards", deckId: "demo" },
        active: true,
      }),
    ];
    const index = buildContentInventoryIndex(items);
    const sessionId = createContentSelectionSession("tech_flashcards");

    const firstPick = pickNextItems({
      index,
      limit: 2,
      deckId: "demo",
      shuffle: false,
      historyScope: {
        gameId: "tech_flashcards",
        sessionId,
      },
    });
    const secondPick = pickNextItems({
      index,
      limit: 2,
      deckId: "demo",
      shuffle: false,
      historyScope: {
        gameId: "tech_flashcards",
        sessionId,
      },
    });

    expect(firstPick.map((item) => item.id)).toEqual([items[0].id, items[1].id]);
    expect(secondPick.map((item) => item.id)).toEqual([items[2].id, items[3].id]);
  });

  test("pickNextItems falls back to recent items when the pool is exhausted", () => {
    const items = [
      createContentInventoryItem({
        source: "tech_deck",
        skill: "dev",
        difficulty: "core",
        format: "open_response",
        prompt: "Prompt A",
        answer: "Answer A",
        metadata: { gameId: "tech_boss", deckId: "demo" },
        active: true,
      }),
      createContentInventoryItem({
        source: "tech_deck",
        skill: "dev",
        difficulty: "core",
        format: "open_response",
        prompt: "Prompt B",
        answer: "Answer B",
        metadata: { gameId: "tech_boss", deckId: "demo" },
        active: true,
      }),
    ];
    const index = buildContentInventoryIndex(items);
    const sessionId = createContentSelectionSession("tech_boss");

    const firstPick = pickNextItems({
      index,
      limit: 2,
      deckId: "demo",
      shuffle: false,
      historyScope: {
        gameId: "tech_boss",
        sessionId,
      },
    });
    const secondPick = pickNextItems({
      index,
      limit: 2,
      deckId: "demo",
      shuffle: false,
      historyScope: {
        gameId: "tech_boss",
        sessionId,
      },
    });

    expect(firstPick).toHaveLength(2);
    expect(secondPick).toHaveLength(2);
    expect(secondPick.map((item) => item.id)).toEqual([items[0].id, items[1].id]);
  });

  test("pickNextItems stays stable with a single-item dataset across repeated picks", () => {
    const item = createContentInventoryItem({
      source: "daily_loop",
      skill: "math",
      difficulty: "core",
      format: "formula_drill",
      prompt: "Prompt solo",
      answer: "Answer solo",
      metadata: {
        gameId: "math_game",
        routeObjective: "math_speed",
      },
      active: true,
    });
    const index = buildContentInventoryIndex([item]);
    const sessionId = createContentSelectionSession("math_game");

    const firstPick = pickNextItems({
      index,
      limit: 3,
      skills: ["math"],
      shuffle: false,
      historyScope: {
        gameId: "math_game",
        sessionId,
        gameWindow: 4,
        sessionWindow: 4,
      },
    });
    const secondPick = pickNextItems({
      index,
      limit: 3,
      skills: ["math"],
      shuffle: false,
      historyScope: {
        gameId: "math_game",
        sessionId,
        gameWindow: 4,
        sessionWindow: 4,
      },
    });

    expect(firstPick).toHaveLength(1);
    expect(secondPick).toHaveLength(1);
    expect(firstPick[0].id).toBe(item.id);
    expect(secondPick[0].id).toBe(item.id);

    const selectionEvents = getAnalyticsEvents().filter(
      (event) => event.name === "content_selected",
    );
    expect(selectionEvents).toHaveLength(2);
    expect(selectionEvents[0].payload.repeated).toBe(false);
    expect(selectionEvents[1].payload.repeated).toBe(true);
  });

  test("pickNextItems tracks content_selected events with repeated flag", () => {
    const items = [
      createContentInventoryItem({
        source: "daily_loop",
        skill: "english",
        difficulty: "foundation",
        format: "sentence_transform",
        prompt: "Prompt A",
        answer: "Answer A",
        metadata: {
          gameId: "speed_builder",
          routeObjective: "english_interview",
        },
        active: true,
      }),
      createContentInventoryItem({
        source: "daily_loop",
        skill: "english",
        difficulty: "core",
        format: "pair_match",
        prompt: "Prompt B",
        answer: "Answer B",
        metadata: {
          gameId: "collocation_sprint",
          routeObjective: "english_interview",
        },
        active: true,
      }),
    ];
    const index = buildContentInventoryIndex(items);
    const sessionId = createContentSelectionSession("daily_loop:english");

    pickNextItems({
      index,
      limit: 2,
      skills: ["english"],
      sources: ["daily_loop"],
      shuffle: false,
      historyScope: {
        gameId: "daily_loop:english",
        sessionId,
        gameWindow: 4,
        sessionWindow: 4,
      },
    });
    pickNextItems({
      index,
      limit: 2,
      skills: ["english"],
      sources: ["daily_loop"],
      shuffle: false,
      historyScope: {
        gameId: "daily_loop:english",
        sessionId,
        gameWindow: 4,
        sessionWindow: 4,
      },
    });

    const selectionEvents = getAnalyticsEvents().filter(
      (event) => event.name === "content_selected",
    );
    expect(selectionEvents).toHaveLength(4);
    expect(selectionEvents.slice(0, 2).every((event) => event.payload.repeated === false)).toBe(true);
    expect(selectionEvents.slice(2).every((event) => event.payload.repeated === true)).toBe(true);
  });

  test("pickNextItems preserves variety through long sessions before repeating", () => {
    const items = Array.from({ length: 5 }, (_, index) =>
      createContentInventoryItem({
        source: "daily_loop",
        skill: "english",
        difficulty: "core",
        format: "sentence_transform",
        prompt: `Prompt ${index + 1}`,
        answer: `Answer ${index + 1}`,
        metadata: {
          gameId: "speed_builder",
          routeObjective: "english_interview",
        },
        active: true,
      }),
    );
    const index = buildContentInventoryIndex(items);
    const sessionId = createContentSelectionSession("speed_builder");

    const rounds = Array.from({ length: 7 }, () =>
      pickNextItems({
        index,
        limit: 1,
        skills: ["english"],
        shuffle: false,
        historyScope: {
          gameId: "speed_builder",
          sessionId,
          gameWindow: 8,
          sessionWindow: 8,
        },
      })[0],
    );

    expect(rounds.slice(0, 5).map((item) => item.id)).toEqual(
      items.map((item) => item.id),
    );
    expect(items.some((item) => item.id === rounds[5].id)).toBe(true);
    expect(items.some((item) => item.id === rounds[6].id)).toBe(true);
    expect(new Set(rounds.slice(0, 5).map((item) => item.id)).size).toBe(5);

    const selectionEvents = getAnalyticsEvents().filter(
      (event) => event.name === "content_selected",
    );
    expect(selectionEvents).toHaveLength(7);
    expect(selectionEvents.slice(0, 5).every((event) => event.payload.repeated === false)).toBe(true);
    expect(selectionEvents.slice(5).every((event) => event.payload.repeated === true)).toBe(true);
  });

  test("pickNextTechDeckCards returns cards from selected deck", () => {
    resetTechContentInventoryIndexCache();
    const deck = techDecks[0];
    const promptSet = new Set(deck.cards.map((card) => card.prompt));

    const selected = pickNextTechDeckCards({
      deckId: deck.id,
      limit: 5,
      shuffle: false,
    });

    expect(selected).toHaveLength(5);
    expect(selected.every((card) => promptSet.has(card.prompt))).toBe(true);
  });
});
