import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";
import { importFromJSON, exportDataSchema } from "./exportImport";

describe("exportImport", () => {
  beforeEach(() => {
    localStorage.clear();
    // Use a mock for dispatchEvent
    vi.spyOn(window, "dispatchEvent").mockImplementation(() => true);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("validates a proper export schema without failing", () => {
    const validData = {
      exportVersion: 1,
      settings: { theme: "dark" },
      profile: {
        character: {
          name: "TestUser",
          avatarStyle: "micah",
          seed: "123",
          backgroundColor: "transparent",
        },
      },
      globalXp: 500,
    };
    const result = exportDataSchema.safeParse(validData);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.exportVersion).toBe(1);
      expect(result.data.globalXp).toBe(500);
    }
  });

  it("recovers gracefully from missing or corrupt fields internally", () => {
    const corruptData = {
      exportVersion: "invalid_string", // should catch(1)
      settings: { theme: "random" }, // theme should catch("dark")
      profile: {
        character: {
          name: 123, // string expected, should catch("Learner")
          avatarStyle: "micah",
          seed: "123",
          backgroundColor: "transparent",
        },
      },
    };
    const result = exportDataSchema.safeParse(corruptData);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.exportVersion).toBe(1);
      expect(result.data.settings?.theme).toBe("dark");
      expect(result.data.profile?.character.name).toBe("Learner");
    }
  });

  it("imports valid JSON into localStorage", () => {
    const validJSON = JSON.stringify({
      exportVersion: 1,
      globalXp: 1200,
      streakFreezes: 2,
    });

    const result = importFromJSON(validJSON);
    expect(result.success).toBe(true);
    expect(localStorage.getItem("english-pal-global-xp")).toBe("1200");
    expect(localStorage.getItem("skillpal-streak-freezes")).toBe("2");
  });

  it("safely merges decks by keeping higher repetition", () => {
    // Current deck
    localStorage.setItem(
      "vocab-vault-deck",
      JSON.stringify({
        testword: {
          word: "testword",
          definition: "definition 1",
          repetition: 2,
          efactor: 2.5,
          interval: 3,
          nextReviewDate: "2024-01-01",
          status: "learning",
        },
      }),
    );

    // Incoming JSON has higher reps
    const incomingDeckHigher = {
      deck: {
        testword: {
          word: "testword",
          definition: "definition 2",
          repetition: 5,
          efactor: 2.5,
          interval: 10,
          nextReviewDate: "2024-01-05",
          status: "mastered",
        },
      },
    };

    const res1 = importFromJSON(JSON.stringify(incomingDeckHigher));
    expect(res1.success).toBe(true);
    const stored1 = JSON.parse(localStorage.getItem("vocab-vault-deck")!);
    expect(stored1["testword"].repetition).toBe(5);
    expect(stored1["testword"].status).toBe("mastered");

    // Incoming JSON has lower reps -> should be ignored for testword, but add newword
    const incomingDeckLower = {
      deck: {
        testword: {
          word: "testword",
          definition: "definition 3",
          repetition: 1,
          efactor: 2.5,
          interval: 1,
          nextReviewDate: "2024-01-01",
          status: "learning",
        },
        newword: {
          word: "newword",
          definition: "new word",
          repetition: 0,
          efactor: 2.5,
          interval: 0,
          nextReviewDate: "2024-01-01",
          status: "new",
        },
      },
    };

    const res2 = importFromJSON(JSON.stringify(incomingDeckLower));
    expect(res2.success).toBe(true);
    const stored2 = JSON.parse(localStorage.getItem("vocab-vault-deck")!);
    expect(stored2["testword"].repetition).toBe(5); // kept the local version
    expect(stored2["newword"].word).toBe("newword"); // added new word
  });

  it("returns error on invalid json string", () => {
    const result = importFromJSON("not-json, { random ]");
    expect(result.success).toBe(false);
    expect(result.error).toBe("Failed to parse JSON string");
  });

  it("returns error when schema fails aggressively on deck corruption", () => {
    const badJSON = JSON.stringify({
      deck: {
        word1: {
          // missing required fields completely without fallback inside srs schema
          word: "word1",
        },
      },
    });

    const result = importFromJSON(badJSON);
    expect(result.success).toBe(false);
    expect(result.error).toBe("Archivo incompatible o corrupto");
  });
});
