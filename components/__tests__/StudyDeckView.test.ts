import { describe, it, expect } from "vitest";
import { getFullTextFromParts } from "../../utils/textUtils";
import { WordPart } from "../../types";

describe("getFullTextFromParts", () => {
  it("concatenates simple words with spaces", () => {
    const parts: WordPart[] = [{ word: "Hello" }, { word: "world" }];
    expect(getFullTextFromParts(parts)).toBe("Hello world");
  });

  it("returns empty string for empty array", () => {
    const parts: WordPart[] = [];
    expect(getFullTextFromParts(parts)).toBe("");
  });

  it("handles single word", () => {
    const parts: WordPart[] = [{ word: "Test" }];
    expect(getFullTextFromParts(parts)).toBe("Test");
  });

  it("preserves punctuation in words", () => {
    const parts: WordPart[] = [{ word: "Hello," }, { word: "world!" }];
    expect(getFullTextFromParts(parts)).toBe("Hello, world!");
  });

  it("handles words with categories", () => {
    const parts: WordPart[] = [
      { word: "The", category: "Determiner" as any }, // casting to any to simplify if categories are strict union types
      { word: "cat" },
    ];
    expect(getFullTextFromParts(parts)).toBe("The cat");
  });

  it("handles multiple spaces if words contain spaces", () => {
    const parts: WordPart[] = [{ word: "New York" }, { word: "City" }];
    expect(getFullTextFromParts(parts)).toBe("New York City");
  });
});
