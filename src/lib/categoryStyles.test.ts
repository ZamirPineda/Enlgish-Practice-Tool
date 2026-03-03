import { describe, it, expect } from "vitest";
import {
  getCategoryStyle,
  DEFAULT_CATEGORY_STYLE,
  categoryStyles,
} from "@/lib/categoryStyles";
import { WordCategory } from "@/types";

describe("getCategoryStyle", () => {
  it("returns the correct style for a known category", () => {
    const category: WordCategory = "Simple Present (3rd Person)";
    const expectedStyle = categoryStyles[category];
    expect(getCategoryStyle(category)).toBe(expectedStyle);
  });

  it("returns the correct style for another known category", () => {
    const category: WordCategory = "Idiom";
    const expectedStyle = categoryStyles[category];
    expect(getCategoryStyle(category)).toBe(expectedStyle);
  });

  it("returns the default style for a category not in the map", () => {
    // Casting to WordCategory to simulate a valid type that might be missing from the map,
    // or just an invalid string if we want to be robust.
    const unknownCategory = "NonExistentCategory" as WordCategory;
    expect(getCategoryStyle(unknownCategory)).toBe(DEFAULT_CATEGORY_STYLE);
  });

  it("returns the default style when input is undefined or null", () => {
    expect(getCategoryStyle(undefined as any)).toBe(DEFAULT_CATEGORY_STYLE);
    expect(getCategoryStyle(null as any)).toBe(DEFAULT_CATEGORY_STYLE);
  });
});
