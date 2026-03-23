import {
  getCountryReferenceByCapital,
  getCountryReferenceByName,
  getNeighborReferences,
  hasLandBorders,
} from "@/lib/geographyReference";

describe("geographyReference", () => {
  it("builds a country reference from Stop country and capital data", () => {
    const reference = getCountryReferenceByName("Brazil");

    expect(reference).not.toBeNull();
    expect(reference?.canonicalCountry).toBe("Brazil");
    expect(reference?.capitalName).toBe("Brasilia");
    expect(reference?.countryTranslation).toBe("Brasil");
  });

  it("resolves aliases used in Stop capital data", () => {
    const reference = getCountryReferenceByName("USA");

    expect(reference).not.toBeNull();
    expect(reference?.canonicalCountry).toBe("United States");
    expect(reference?.capitalName).toBe("Washington D.C.");
  });

  it("resolves country references from capitals", () => {
    const reference = getCountryReferenceByCapital("Ottawa");

    expect(reference).not.toBeNull();
    expect(reference?.canonicalCountry).toBe("Canada");
    expect(reference?.capitalName).toBe("Ottawa");
  });

  it("returns neighbor references for supported countries", () => {
    const neighbors = getNeighborReferences("Colombia");

    expect(neighbors.map((neighbor) => neighbor.canonicalCountry)).toEqual(
      expect.arrayContaining([
        "Brazil",
        "Ecuador",
        "Panama",
        "Peru",
        "Venezuela",
      ]),
    );
    expect(hasLandBorders("Colombia")).toBe(true);
    expect(hasLandBorders("Japan")).toBe(false);
  });
});
