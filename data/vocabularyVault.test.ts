import { describe, expect, it } from "vitest";
import { starterKits } from "./vocabularyVault";

const requiredMvpKits = ["workInterview", "travelEmergencies"] as const;

describe("vocabularyVault starter kits", () => {
  it("includes MVP thematic kits with at least 12 items each", () => {
    for (const kitName of requiredMvpKits) {
      expect(starterKits[kitName].length).toBeGreaterThanOrEqual(12);
    }
  });

  it("keeps required fields for all starter kit entries", () => {
    const allItems = Object.values(starterKits).flat();

    for (const item of allItems) {
      expect(item.word?.trim().length).toBeGreaterThan(0);
      expect(item.definition?.trim().length).toBeGreaterThan(0);
      if (item.tags) {
        expect(item.tags.length).toBeGreaterThan(0);
      }
    }
  });

  it("does not contain duplicate words across MVP thematic kits", () => {
    const words = requiredMvpKits.flatMap((kitName) =>
      starterKits[kitName].map((item) => item.word.toLowerCase().trim()),
    );

    const uniqueWords = new Set(words);
    expect(uniqueWords.size).toBe(words.length);
  });

  it("contains CEFR tags in MVP thematic kits", () => {
    const cefrPattern = /\bA1\b|\bA2\b|\bB1\b|\bB2\b|\bC1\b|\bC2\b/;

    for (const kitName of requiredMvpKits) {
      for (const item of starterKits[kitName]) {
        expect(item.tags?.some((tag) => cefrPattern.test(tag))).toBe(true);
      }
    }
  });
});
