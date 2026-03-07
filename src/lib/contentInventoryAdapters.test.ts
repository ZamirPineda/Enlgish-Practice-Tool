import { describe, expect, test } from "vitest";
import {
  adaptStudyDeckToInventoryItems,
  adaptTechDecksToInventoryItems,
  adaptVocabularyVaultToInventoryItems,
  buildContentInventoryFromAdapters,
  buildContentInventoryFromAdaptersWithReport,
} from "@/lib/contentInventoryAdapters";
import { EnglishLevel, SrsVocabularyItem, type DrillsByLevel } from "@/types";

describe("contentInventoryAdapters", () => {
  test("adapts StudyDeck examples and skips separator headers", () => {
    const drillsByLevel: DrillsByLevel = {
      [EnglishLevel.B1]: [
        {
          id: "b1-topic",
          name: "B1 Topic",
          description: "Demo topic",
          examples: [
            { parts: [{ word: "--- Header ---" }] },
            {
              parts: [{ word: "I" }, { word: "work" }, { word: "remote." }],
              translation_es: "Trabajo remoto.",
              ipa: "/aɪ wɜrk/",
            },
            {
              comparison: [
                {
                  parts: [{ word: "Ship" }],
                  ipa: "/ʃɪp/",
                  translation_es: "barco",
                },
                {
                  parts: [{ word: "Sheep" }],
                  ipa: "/ʃiːp/",
                  translation_es: "oveja",
                },
              ],
            },
          ],
        },
      ],
    };

    const items = adaptStudyDeckToInventoryItems(drillsByLevel);
    expect(items).toHaveLength(2);
    expect(items[0].source).toBe("study_deck");
    expect(items[0].prompt).toBe("I work remote.");
    expect(items[1].format).toBe("pair_match");
    expect(items[1].alternatives).toContain("Sheep");
  });

  test("adapts vocabulary vault deck and infers skill/difficulty", () => {
    const deck: Record<string, SrsVocabularyItem> = {
      "latency-budget": {
        word: "Latency budget",
        definition: "Maximum tolerated latency for a request path.",
        repetition: 3,
        efactor: 2.5,
        interval: 4,
        nextReviewDate: "2099-01-01",
        status: "mastered",
        tags: ["DevOps", "API", "performance"],
      },
      integral: {
        word: "Integral",
        definition: "Area under the curve.",
        repetition: 1,
        efactor: 2.5,
        interval: 1,
        nextReviewDate: "2099-01-01",
        status: "new",
        tags: ["math", "calculus"],
      },
    };

    const items = adaptVocabularyVaultToInventoryItems(deck);
    expect(items).toHaveLength(2);

    const devItem = items.find((item) => item.prompt === "Latency budget");
    const mathItem = items.find((item) => item.prompt === "Integral");

    expect(devItem?.skill).toBe("dev");
    expect(devItem?.difficulty).toBe("stretch");
    expect(mathItem?.skill).toBe("math");
    expect(mathItem?.difficulty).toBe("foundation");
  });

  test("adapts tech decks into dev inventory items", () => {
    const items = adaptTechDecksToInventoryItems([
      {
        id: "algo",
        name: "Algorithms",
        cards: [
          { prompt: "What is BFS?", answer: "Breadth-first search." },
          { prompt: "What is DFS?", answer: "Depth-first search." },
        ],
      },
    ]);

    expect(items).toHaveLength(2);
    expect(items[0].source).toBe("tech_deck");
    expect(items[0].skill).toBe("dev");
    expect(items[0].metadata.deckId).toBe("algo");
    expect(items[0].metadata.routeObjective).toBe("dev_reasoning");
  });

  test("builds a combined inventory pack from all adapters", () => {
    const pack = buildContentInventoryFromAdapters({
      studyDeckByLevel: {
        [EnglishLevel.A1]: [
          {
            id: "a1-topic",
            name: "A1 topic",
            description: "A1 demo",
            examples: [
              {
                parts: [{ word: "Hello" }, { word: "there." }],
                translation_es: "Hola.",
              },
            ],
          },
        ],
      },
      vocabularyVaultDeck: {
        hello: {
          word: "hello",
          definition: "greeting",
          repetition: 1,
          efactor: 2.5,
          interval: 1,
          nextReviewDate: "2099-01-01",
          status: "learning",
          tags: ["english"],
        },
      },
      techDecks: [
        {
          id: "dev-basics",
          name: "Dev Basics",
          cards: [{ prompt: "What is HTTP?", answer: "Protocol." }],
        },
      ],
    });

    expect(pack.schemaVersion).toBe(1);
    expect(pack.items.length).toBe(3);
    expect(pack.items.map((item) => item.source).sort()).toEqual([
      "study_deck",
      "tech_deck",
      "vocabulary_vault",
    ]);
  });

  test("dedupes semantically equal entries across sources with traceable report", () => {
    const result = buildContentInventoryFromAdaptersWithReport({
      studyDeckByLevel: {
        [EnglishLevel.A1]: [
          {
            id: "a1-topic",
            name: "A1 topic",
            description: "A1 demo",
            examples: [
              {
                parts: [{ word: "Resilient" }],
                translation_es: "Que se recupera rapido.",
              },
            ],
          },
        ],
      },
      vocabularyVaultDeck: {
        resilient: {
          word: "Resilient",
          definition: "Que se recupera rapido.",
          repetition: 2,
          efactor: 2.5,
          interval: 3,
          nextReviewDate: "2099-01-01",
          status: "learning",
          tags: ["english", "behavioral"],
        },
      },
    });

    expect(result.pack.items).toHaveLength(1);
    expect(result.pack.items[0].source).toBe("vocabulary_vault");
    expect(result.pack.items[0].metadata.dedupeLineage).toEqual(
      expect.arrayContaining([
        expect.stringMatching(/^ci_study_deck_/),
        expect.stringMatching(/^ci_vocabulary_vault_/),
      ]),
    );
    expect(result.dedupeReport).toMatchObject({
      originalCount: 2,
      dedupedCount: 1,
      removedCount: 1,
    });
    expect(result.dedupeReport.groups).toHaveLength(1);
    expect(result.dedupeReport.groups[0].reason).toBe("fingerprint");
  });
});
