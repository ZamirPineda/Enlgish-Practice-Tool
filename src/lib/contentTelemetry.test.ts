import { describe, expect, test } from "vitest";
import { createContentInventoryItem } from "@/lib/contentInventory";
import {
  buildContentTelemetryRouteSummary,
  buildContentTelemetrySummary,
} from "@/lib/contentTelemetry";
import { AnalyticsEvent } from "@/lib/analytics";

describe("contentTelemetry", () => {
  const availableItems = [
    createContentInventoryItem({
      source: "daily_loop",
      skill: "english",
      difficulty: "foundation",
      format: "sentence_transform",
      prompt: "Speed Builder",
      answer: "English warmup",
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
      prompt: "Collocation Sprint",
      answer: "English collocations",
      metadata: {
        gameId: "collocation_sprint",
        routeObjective: "english_interview",
      },
      active: true,
    }),
    createContentInventoryItem({
      source: "daily_loop",
      skill: "math",
      difficulty: "core",
      format: "formula_drill",
      prompt: "Math Speed Duel",
      answer: "Math drill",
      metadata: {
        gameId: "math_game",
        routeObjective: "math_speed",
      },
      active: true,
    }),
    createContentInventoryItem({
      source: "tech_deck",
      skill: "dev",
      difficulty: "core",
      format: "open_response",
      prompt: "What is BFS?",
      answer: "Breadth-first search",
      metadata: {
        gameId: "tech_flashcards",
        routeObjective: "dev_reasoning",
      },
      active: true,
    }),
  ];

  const events: AnalyticsEvent[] = [
    {
      name: "content_selected",
      timestamp: "2026-03-06T12:00:00.000Z",
      payload: {
        game: "speed_builder",
        contentId: availableItems[0].id,
        skill: "english",
        routeObjective: "english_interview",
        repeated: false,
      },
    },
    {
      name: "content_selected",
      timestamp: "2026-03-06T12:05:00.000Z",
      payload: {
        game: "collocation_sprint",
        contentId: availableItems[1].id,
        skill: "english",
        routeObjective: "english_interview",
        repeated: true,
      },
    },
    {
      name: "content_selected",
      timestamp: "2026-03-06T12:10:00.000Z",
      payload: {
        game: "tech_flashcards",
        contentId: availableItems[3].id,
        skill: "dev",
        routeObjective: "dev_reasoning",
        repeated: false,
      },
    },
  ];

  test("computes repeat rate and coverage for filtered route/category", () => {
    const summary = buildContentTelemetrySummary({
      events,
      availableItems,
      categoryFilter: "english",
      focusRouteFilter: "english_interview",
    });

    expect(summary).toMatchObject({
      selections: 2,
      repeatedSelections: 1,
      repeatRate: 50,
      uniqueSelected: 2,
      availableItems: 2,
      coverageRate: 100,
    });
  });

  test("builds route-level coverage rows respecting category filter", () => {
    const routeSummary = buildContentTelemetryRouteSummary({
      events,
      availableItems,
      categoryFilter: "all",
    });

    expect(routeSummary).toHaveLength(3);
    expect(routeSummary[0]).toMatchObject({
      route: "english_interview",
      selections: 2,
      coverageRate: 100,
    });
    expect(routeSummary[1]).toMatchObject({
      route: "math_speed",
      selections: 0,
      availableItems: 1,
      coverageRate: 0,
    });
    expect(routeSummary[2]).toMatchObject({
      route: "dev_reasoning",
      selections: 1,
      availableItems: 1,
      coverageRate: 100,
    });
  });

  test("returns zeroed metrics for strict filters with no matching inventory", () => {
    const summary = buildContentTelemetrySummary({
      events,
      availableItems,
      categoryFilter: "math",
      focusRouteFilter: "dev_reasoning",
    });

    expect(summary).toMatchObject({
      selections: 0,
      repeatedSelections: 0,
      repeatRate: 0,
      uniqueSelected: 0,
      availableItems: 0,
      coverageRate: 0,
    });
  });
});
