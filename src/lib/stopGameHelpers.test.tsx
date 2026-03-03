import { describe, it, expect } from "vitest";
import { getCategoryIcon, getFlagUrl } from "@/lib/stopGameHelpers";
import { StopCategory } from "@/types";

describe("getCategoryIcon", () => {
  it("returns correct icon for standard categories", () => {
    const testCases: { category: StopCategory; expected: string }[] = [
      { category: "Countries", expected: "🌍" },
      { category: "Cities", expected: "🏙️" },
      { category: "Fruits & Vegetables", expected: "🥕" },
      { category: "Technology & Internet", expected: "🌐" },
      { category: "Science", expected: "🔬" },
    ];

    testCases.forEach(({ category, expected }) => {
      expect(getCategoryIcon(category)).toBe(expected);
    });
  });

  it("returns default icon for unmapped categories", () => {
    // 'Rare & Literary' exists in StopCategory type but is not in the switch case in stopGameHelpers.tsx
    const unmappedCategory: StopCategory = "Rare & Literary";
    expect(getCategoryIcon(unmappedCategory)).toBe("📝");
  });

  it("returns default icon for unknown categories (runtime safety)", () => {
    // Casting to unknown then StopCategory to bypass TS checks for testing runtime behavior
    const unknownCategory =
      "Completely Unknown Category" as unknown as StopCategory;
    expect(getCategoryIcon(unknownCategory)).toBe("📝");
  });
});

describe("getFlagUrl", () => {
  it("returns the correct flag URL for a valid country name", () => {
    expect(getFlagUrl("Argentina")).toBe("https://flagcdn.com/w40/ar.png");
    expect(getFlagUrl("United Kingdom")).toBe("https://flagcdn.com/w40/gb.png");
  });

  it("returns the correct flag URL for a country name with slashes", () => {
    expect(getFlagUrl("Nepal/China")).toBe("https://flagcdn.com/w40/np.png");
    expect(getFlagUrl("Jordan/Israel")).toBe("https://flagcdn.com/w40/jo.png");
  });

  it("returns null for an invalid country name", () => {
    expect(getFlagUrl("UnknownCountry")).toBeNull();
    expect(getFlagUrl("")).toBeNull();
  });

  it("returns null for undefined input", () => {
    expect(getFlagUrl(undefined)).toBeNull();
  });

  it("is case-sensitive and returns null for lowercase country names", () => {
    // The current implementation relies on exact key match in COUNTRY_CODES
    expect(getFlagUrl("argentina")).toBeNull();
  });

  it("handles leading/trailing spaces correctly", () => {
    expect(getFlagUrl(" Argentina ")).toBe("https://flagcdn.com/w40/ar.png");
    expect(getFlagUrl(" Nepal/China ")).toBe("https://flagcdn.com/w40/np.png");
  });
});
