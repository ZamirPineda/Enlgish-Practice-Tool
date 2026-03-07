import { describe, expect, test } from "vitest";
import { createContentInventoryItem } from "@/lib/contentInventory";
import {
  buildContentInventoryIndex,
  queryContentInventoryIndex,
  queryContentInventoryIndexIds,
} from "@/lib/contentInventoryIndex";

describe("contentInventoryIndex", () => {
  const englishStudy = createContentInventoryItem({
    source: "study_deck",
    skill: "english",
    difficulty: "core",
    format: "flashcard",
    prompt: "Resilient",
    answer: "Able to recover quickly from difficulties.",
    tags: ["behavioral", "interview"],
    metadata: { gameId: "study_deck", topic: "behavioral" },
    active: true,
  });

  const englishVault = createContentInventoryItem({
    source: "vocabulary_vault",
    skill: "english",
    difficulty: "stretch",
    format: "flashcard",
    prompt: "Latency budget",
    answer: "Maximum tolerated latency.",
    tags: ["devops", "api"],
    metadata: { gameId: "vocabulary_vault", topic: "performance" },
    active: true,
  });

  const mathItem = createContentInventoryItem({
    source: "vocabulary_vault",
    skill: "math",
    difficulty: "foundation",
    format: "formula_drill",
    prompt: "Integral",
    answer: "Area under the curve.",
    tags: ["calculus"],
    metadata: { gameId: "math_game", topic: "calculus" },
    active: false,
  });

  const devItem = createContentInventoryItem({
    source: "tech_deck",
    skill: "dev",
    difficulty: "core",
    format: "open_response",
    prompt: "What is HTTP?",
    answer: "Application protocol.",
    tags: ["networking"],
    metadata: { gameId: "tech_flashcards", topic: "backend" },
    active: true,
  });

  const index = buildContentInventoryIndex([
    englishStudy,
    englishVault,
    mathItem,
    devItem,
  ]);

  test("builds buckets by skill, category, level and game", () => {
    expect(index.bySkill.english).toHaveLength(2);
    expect(index.bySkill.math).toEqual([mathItem.id]);
    expect(index.byLevel.core).toEqual([englishStudy.id, devItem.id]);
    expect(index.byLevel.foundation).toEqual([mathItem.id]);
    expect(index.byCategory.behavioral).toEqual([englishStudy.id]);
    expect(index.byCategory.calculus).toEqual([mathItem.id]);
    expect(index.byGame.study_deck).toEqual([englishStudy.id]);
    expect(index.byGame.tech_flashcards).toEqual([devItem.id]);
  });

  test("queries by one dimension and defaults to active items", () => {
    const ids = queryContentInventoryIndexIds(index, {
      skills: ["math", "dev"],
    });

    expect(ids).toEqual([devItem.id]);
  });

  test("supports combined intersection queries", () => {
    const ids = queryContentInventoryIndexIds(index, {
      skills: ["english"],
      levels: ["stretch"],
      categories: ["performance"],
      games: ["vocabulary_vault"],
    });

    expect(ids).toEqual([englishVault.id]);
  });

  test("returns inactive items only when activeOnly is false", () => {
    const items = queryContentInventoryIndex(index, {
      categories: ["calculus"],
      activeOnly: false,
    });

    expect(items).toHaveLength(1);
    expect(items[0].id).toBe(mathItem.id);
  });

  test("applies query limit while preserving item order", () => {
    const ids = queryContentInventoryIndexIds(index, {
      skills: ["english", "dev"],
      limit: 2,
    });

    expect(ids).toEqual([englishStudy.id, englishVault.id]);
  });
});
