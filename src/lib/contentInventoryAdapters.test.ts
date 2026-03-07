import { describe, expect, test } from "vitest";
import {
  DEFAULT_ROADMAP_ADAPTERS_INPUT,
  adaptCodeBugsToInventoryItems,
  adaptCodeSyntaxToInventoryItems,
  adaptDocsQuizToInventoryItems,
  adaptErrorHunterToInventoryItems,
  adaptMathPracticeToInventoryItems,
  adaptParaphraseDuelToInventoryItems,
  adaptSentenceTransformerToInventoryItems,
  adaptSpeedBuilderToInventoryItems,
  adaptStudyDocsTreeToInventoryItems,
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

  test("adapts roadmap game datasets into inventory items", () => {
    const englishItems = [
      ...adaptSpeedBuilderToInventoryItems([
        {
          id: "sb-1",
          sentence: "I handle stakeholder updates calmly",
          tags: ["Interview", "Leadership"],
          level: "B2",
        },
      ]),
      ...adaptErrorHunterToInventoryItems([
        {
          id: "eh-1",
          incorrectSentence: "He don't review pull requests carefully",
          correctedSentence: "He doesn't review pull requests carefully",
          errorType: "Auxiliary do/does",
          tags: ["Technology"],
          level: "A2",
        },
      ]),
      ...adaptParaphraseDuelToInventoryItems([
        {
          id: "pd-1",
          sentence: "Although the outage was severe we recovered quickly.",
          targetConnector: "although",
          acceptedAnswers: [
            "Although the outage was severe we recovered quickly.",
          ],
          tags: ["Work", "Strategy"],
          level: "B2",
        },
      ]),
      ...adaptSentenceTransformerToInventoryItems([
        {
          id: "st-1",
          baseSentence: "The board approves the roadmap today.",
          mode: "question",
          expectedSentence: "Does the board approve the roadmap today?",
          tags: ["Business"],
          level: "C1",
        },
      ]),
    ];

    expect(englishItems).toHaveLength(4);
    expect(englishItems.map((item) => item.source)).toEqual([
      "english_game",
      "english_game",
      "english_game",
      "english_game",
    ]);
    expect(englishItems[0].metadata.gameId).toBe("speed_builder");
    expect(englishItems[0].difficulty).toBe("stretch");
    expect(englishItems[3].difficulty).toBe("expert");

    const mathItems = adaptMathPracticeToInventoryItems({
      normal: [
        {
          id: "math-1",
          prompt: "Selecciona la formula correcta",
          answerTypeLabel: "Formula",
          sectionLabel: "Derivadas",
          correctAnswer: "f'(x)",
          options: ["f'(x)", "f(x)", "x", "0"],
          topicLabel: "Calculus",
          difficultyTier: "stretch",
          routeObjective: "math_speed",
          tags: ["calculus", "symbols"],
          sourceTopicId: "calculus",
        },
      ],
    });

    expect(mathItems).toHaveLength(1);
    expect(mathItems[0].source).toBe("math_game");
    expect(mathItems[0].format).toBe("formula_drill");
    expect(mathItems[0].metadata.gameId).toBe("math_game");

    const devItems = [
      ...adaptCodeSyntaxToInventoryItems([
        {
          id: "syntax-1",
          prompt: "Crea un useEffect con cleanup",
          tokens: ["useEffect", "(", ")", "=>", "{", "}"],
          language: "typescript",
          difficultyTier: "core",
          routeObjective: "dev_reasoning",
          tags: ["typescript", "react", "syntax"],
        },
      ]),
      ...adaptCodeBugsToInventoryItems([
        {
          id: "bug-1",
          language: "tsx",
          codeLines: ["const value = state.count + 1;"],
          bugLineIndex: 0,
          explanation: "State can be stale if updates are async.",
          difficultyTier: "stretch",
          routeObjective: "dev_reasoning",
          tags: ["react", "debugging"],
        },
      ]),
      ...adaptDocsQuizToInventoryItems([
        {
          id: "quiz-1",
          category: "Cloud-Native & DevOps",
          subCategory: "GCP",
          question: "Which GCP service runs HTTP containers serverlessly?",
          options: ["Cloud Run", "Cloud SQL", "Bigtable", "Pub/Sub"],
          correctAnswer: "Cloud Run",
          explanation:
            "Cloud Run executes HTTP containers without server management.",
        },
      ]),
      ...adaptStudyDocsTreeToInventoryItems([
        {
          name: "Cloud-Native & DevOps",
          path: "Cloud-Native & DevOps",
          type: "directory",
          children: [
            {
              name: "Microservices_Observability.html",
              path: "Cloud-Native & DevOps/Microservices_Observability.html",
              type: "file",
            },
          ],
        },
      ]),
    ];

    expect(devItems).toHaveLength(4);
    expect(devItems[0].metadata.gameId).toBe("code_syntax_builder");
    expect(devItems[1].metadata.gameId).toBe("code_bug_hunter");
    expect(devItems[2].metadata.gameId).toBe("study_docs_quiz");
    expect(devItems[3].metadata.gameId).toBe("study_docs_game");
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

  test("builds the default roadmap adapter input into a multi-route inventory pack", () => {
    const pack = buildContentInventoryFromAdapters(
      DEFAULT_ROADMAP_ADAPTERS_INPUT,
    );

    expect(pack.items.length).toBeGreaterThan(100);
    expect(
      pack.items.some(
        (item) =>
          item.source === "english_game" &&
          item.metadata.gameId === "speed_builder" &&
          item.metadata.routeObjective === "english_interview",
      ),
    ).toBe(true);
    expect(
      pack.items.some(
        (item) =>
          item.source === "math_game" &&
          item.metadata.gameId === "math_game" &&
          item.metadata.routeObjective === "math_speed",
      ),
    ).toBe(true);
    expect(
      pack.items.some(
        (item) =>
          item.source === "dev_game" &&
          item.metadata.gameId === "code_syntax_builder" &&
          item.metadata.routeObjective === "dev_reasoning",
      ),
    ).toBe(true);
    expect(
      pack.items.some(
        (item) =>
          item.source === "dev_game" &&
          item.metadata.gameId === "study_docs_quiz" &&
          item.metadata.routeObjective === "dev_reasoning",
      ),
    ).toBe(true);
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
