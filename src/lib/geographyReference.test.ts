import { describe, expect, test } from "vitest";
import {
  getCountryReferenceByCapital,
  getCountryReferenceByName,
} from "@/lib/geographyReference";

describe("geographyReference", () => {
  test("returns land borders for common European countries", () => {
    const spain = getCountryReferenceByName("Spain");
    const france = getCountryReferenceByName("France");
    const germany = getCountryReferenceByName("Germany");

    expect(spain?.neighbors).toContain("Portugal");
    expect(france?.neighbors).toContain("Spain");
    expect(germany?.neighbors).toContain("France");
  });

  test("capital lookups reuse the same land border reference", () => {
    const madrid = getCountryReferenceByCapital("Madrid");
    const paris = getCountryReferenceByCapital("Paris");

    expect(madrid?.canonicalCountry).toBe("Spain");
    expect(madrid?.neighbors.length).toBeGreaterThan(0);
    expect(paris?.canonicalCountry).toBe("France");
    expect(paris?.neighbors).toContain("Germany");
  });

  test("keeps island countries without land borders", () => {
    const japan = getCountryReferenceByName("Japan");
    const iceland = getCountryReferenceByName("Iceland");

    expect(japan?.neighbors).toEqual([]);
    expect(iceland?.neighbors).toEqual([]);
  });
});
