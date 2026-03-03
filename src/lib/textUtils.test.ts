import { describe, it, expect } from "vitest";
import {
  getFullTextFromParts,
  getLevenshteinDistance,
  getTextAccuracyScore,
  normalizeTextForComparison,
} from "@/lib/textUtils";
import { WordPart } from "@/types";

describe("getFullTextFromParts", () => {
  it("joins multiple word parts with a space", () => {
    const parts: WordPart[] = [{ word: "Hello" }, { word: "world" }];
    expect(getFullTextFromParts(parts)).toBe("Hello world");
  });

  it("returns an empty string for an empty array", () => {
    expect(getFullTextFromParts([])).toBe("");
  });

  it("returns a single word without spaces", () => {
    const parts: WordPart[] = [{ word: "Hello" }];
    expect(getFullTextFromParts(parts)).toBe("Hello");
  });

  it("preserves punctuation within words", () => {
    const parts: WordPart[] = [{ word: "Hello," }, { word: "world!" }];
    expect(getFullTextFromParts(parts)).toBe("Hello, world!");
  });

  it("handles parts with categories", () => {
    const parts: WordPart[] = [
      { word: "The", category: "Determiner" },
      { word: "big", category: "Size" },
      { word: "red", category: "Color" },
      { word: "dog" },
    ];
    expect(getFullTextFromParts(parts)).toBe("The big red dog");
  });
});

describe("normalizeTextForComparison", () => {
  it("normalizes case, punctuation and extra spaces", () => {
    expect(normalizeTextForComparison(" Hello,   WORLD! ")).toBe("hello world");
  });

  it("preserves accented letters", () => {
    expect(normalizeTextForComparison("Café naïve")).toBe("café naïve");
  });
});

describe("getLevenshteinDistance", () => {
  it("returns expected distance for known strings", () => {
    expect(getLevenshteinDistance("kitten", "sitting")).toBe(3);
  });
});

describe("getTextAccuracyScore", () => {
  it("returns 100 for exact match after normalization", () => {
    expect(getTextAccuracyScore("Hello, world!", "hello world")).toBe(100);
  });

  it("returns a lower score for different text", () => {
    expect(getTextAccuracyScore("hello there", "good morning")).toBeLessThan(
      70,
    );
  });
});
