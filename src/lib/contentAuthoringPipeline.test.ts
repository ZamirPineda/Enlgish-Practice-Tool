import { describe, expect, test } from "vitest";
import {
  buildContentInventoryFromAuthoredRowsWithReport,
  buildVersionedContentInventoryBundle,
  importAuthoredContent,
  parseAuthoredContentCsv,
  parseAuthoredContentJson,
  safeParseInventoryItemsFromAuthoringBundle,
} from "@/lib/contentAuthoringPipeline";

describe("contentAuthoringPipeline", () => {
  test("parses CSV rows with quoted values, arrays and metadata columns", () => {
    const csvInput = [
      "skill,difficulty,format,prompt,answer,tags,alternatives,hints,gameId,topic,routeObjective",
      'english,core,flashcard,"What is a latency budget, in practice?","A maximum tolerated delay.","devops|performance","SLO guardrail|performance cap","Think APIs|Think user experience",study_deck,performance,english_interview',
    ].join("\n");

    const result = parseAuthoredContentCsv(csvInput);

    expect(result.issues).toEqual([]);
    expect(result.rows).toHaveLength(1);
    expect(result.rows[0]).toMatchObject({
      skill: "english",
      difficulty: "core",
      format: "flashcard",
      prompt: "What is a latency budget, in practice?",
      answer: "A maximum tolerated delay.",
      tags: ["devops", "performance"],
      alternatives: ["SLO guardrail", "performance cap"],
      hints: ["Think APIs", "Think user experience"],
      metadata: {
        gameId: "study_deck",
        topic: "performance",
        routeObjective: "english_interview",
      },
    });
  });

  test("parses JSON documents as array or versioned object", () => {
    const arrayDocument = JSON.stringify([
      {
        skill: "dev",
        difficulty: "stretch",
        format: "open_response",
        prompt: "Explain idempotency.",
        answer: "Repeating the same request produces the same effect.",
      },
    ]);
    const objectDocument = JSON.stringify({
      packVersion: "2.1.0",
      sourceLabel: "weekly_curation",
      items: [
        {
          skill: "math",
          difficulty: "foundation",
          format: "formula_drill",
          prompt: "Derivative of x^3",
          answer: "3x^2",
        },
      ],
    });

    expect(parseAuthoredContentJson(arrayDocument).rows).toHaveLength(1);

    const objectResult = parseAuthoredContentJson(objectDocument);
    expect(objectResult.rows).toHaveLength(1);
    expect(objectResult.packVersion).toBe("2.1.0");
    expect(objectResult.sourceLabel).toBe("weekly_curation");
  });

  test("blocks invalid authored rows and keeps valid ones for import", () => {
    const csvInput = [
      "skill,difficulty,format,prompt,answer,tags",
      "english,core,flashcard,Valid prompt text,Valid answer text,interview",
      "english,invalid_level,flashcard,Bad row,Should fail,interview",
      "dev,core,open_response,,Missing prompt,backend",
    ].join("\n");

    const result = importAuthoredContent({
      content: csvInput,
      sourceFormat: "csv",
      sourceLabel: "curation_batch",
      packVersion: "1.2.0",
    });

    expect(result.bundle.sourceLabel).toBe("curation_batch");
    expect(result.bundle.packVersion).toBe("1.2.0");
    expect(result.bundle.inventory.items).toHaveLength(1);
    expect(result.bundle.summary.invalidCount).toBe(2);
    expect(result.issues).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ row: 3, field: "difficulty" }),
        expect.objectContaining({ row: 4, field: "prompt" }),
      ]),
    );
  });

  test("blocks authored rows that pass schema but fail quality validators", () => {
    const csvInput = [
      "skill,difficulty,format,prompt,answer,tags,alternatives,cefr,routeObjective",
      "english,core,multiple_choice,Choose the best option for the interview answer,Confident answer,interview,option-a,A2,english_interview",
      "math,foundation,flashcard,What is 2 plus 2?,4,math-basics,,C1,math_speed",
    ].join("\n");

    const result = importAuthoredContent({
      content: csvInput,
      sourceFormat: "csv",
      sourceLabel: "quality_gate_batch",
    });

    expect(result.bundle.inventory.items).toHaveLength(0);
    expect(result.bundle.summary.invalidCount).toBe(2);
    expect(result.issues).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ row: 2, field: "alternatives" }),
        expect.objectContaining({ row: 3, field: "difficulty" }),
      ]),
    );
  });

  test("dedupes authored rows before building versioned inventory bundle", () => {
    const result = buildContentInventoryFromAuthoredRowsWithReport([
      {
        source: "manual",
        skill: "english",
        difficulty: "core",
        format: "flashcard",
        prompt: "Resilient",
        answer: "Able to recover quickly from difficulties.",
        tags: ["behavioral"],
        hints: [],
        alternatives: [],
        metadata: { topic: "interview" },
        active: true,
      },
      {
        source: "manual",
        skill: "english",
        difficulty: "stretch",
        format: "flashcard",
        prompt: " resilient ",
        answer: "Able to recover quickly from difficulties.",
        tags: ["interview"],
        hints: [],
        alternatives: [],
        metadata: { topic: "behavioral" },
        active: true,
      },
    ]);

    expect(result.pack.items).toHaveLength(1);
    expect(result.dedupeReport.removedCount).toBe(1);
    expect(result.pack.items[0].metadata.dedupeLineage).toEqual(
      expect.arrayContaining([expect.stringMatching(/^ci_manual_/)]),
    );
  });

  test("emits duplicate lint report for exact and near collisions during import", () => {
    const result = importAuthoredContent({
      content: JSON.stringify([
        {
          source: "manual",
          skill: "english",
          difficulty: "core",
          format: "flashcard",
          prompt: "Resilient leadership example",
          answer: "An example of recovering quickly under pressure.",
          tags: ["interview"],
          metadata: {
            routeObjective: "english_interview",
            cefr: "B1",
          },
        },
        {
          source: "manual",
          skill: "english",
          difficulty: "core",
          format: "flashcard",
          prompt: " resilient leadership example ",
          answer: "An example of recovering quickly under pressure.",
          tags: ["behavioral"],
          metadata: {
            routeObjective: "english_interview",
            cefr: "B1",
          },
        },
        {
          source: "manual",
          skill: "dev",
          difficulty: "core",
          format: "open_response",
          prompt: "Explain idempotency in APIs in one sentence",
          answer: "Repeated requests produce the same effect.",
          tags: ["backend"],
          metadata: {
            routeObjective: "dev_reasoning",
            cefr: "B2",
          },
        },
        {
          source: "manual",
          skill: "dev",
          difficulty: "core",
          format: "open_response",
          prompt: "Explain idempotency in APIs using one sentence",
          answer: "Repeated requests should produce the same effect.",
          tags: ["api"],
          metadata: {
            routeObjective: "dev_reasoning",
            cefr: "B2",
          },
        },
      ]),
      sourceFormat: "json",
      sourceLabel: "lint_batch",
    });

    expect(result.lintReport.exactDuplicateGroupCount).toBe(1);
    expect(result.lintReport.nearDuplicateCount).toBe(1);
    expect(result.lintReport.exactDuplicateGroups[0]).toMatchObject({
      rowNumbers: [1, 2],
    });
    expect(result.lintReport.nearDuplicatePairs[0]).toMatchObject({
      rowNumbers: [3, 4],
    });
    expect(result.bundle.summary.removedDuplicateCount).toBe(1);
  });

  test("builds a versioned bundle that can be parsed back into inventory items", () => {
    const imported = importAuthoredContent({
      content: JSON.stringify({
        packVersion: "3.0.0",
        sourceLabel: "ops_review",
        items: [
          {
            source: "manual",
            skill: "dev",
            difficulty: "core",
            format: "open_response",
            prompt: "What is a circuit breaker pattern?",
            answer: "A resilience pattern that stops repeated failing calls.",
            tags: ["architecture", "resilience"],
            metadata: {
              gameId: "tech_flashcards",
              topic: "backend",
            },
          },
        ],
      }),
      sourceFormat: "json",
    });

    const items = safeParseInventoryItemsFromAuthoringBundle(imported.bundle);
    const rebuiltBundle = buildVersionedContentInventoryBundle({
      pack: imported.bundle.inventory,
      sourceFormat: "json",
      sourceLabel: imported.bundle.sourceLabel,
      packVersion: imported.bundle.packVersion,
    });

    expect(items).toHaveLength(1);
    expect(items[0].prompt).toBe("What is a circuit breaker pattern?");
    expect(rebuiltBundle.summary.importedCount).toBe(1);
    expect(rebuiltBundle.packVersion).toBe("3.0.0");
    expect(rebuiltBundle.changelog.current.version).toBe("3.0.0");
    expect(rebuiltBundle.changelog.current.notes).toEqual(
      expect.arrayContaining([
        "Initial content pack release with 1 items.",
      ]),
    );
  });

  test("preserves rollback metadata and readable changelog when building from a previous bundle", () => {
    const previousBundle = importAuthoredContent({
      content: JSON.stringify([
        {
          id: "stable-dev-item",
          source: "manual",
          skill: "dev",
          difficulty: "core",
          format: "open_response",
          prompt: "Explain idempotency in APIs in one sentence",
          answer: "Repeated requests produce the same effect.",
          tags: ["backend"],
          metadata: {
            routeObjective: "dev_reasoning",
            cefr: "B2",
          },
        },
      ]),
      sourceFormat: "json",
      packVersion: "1.0.0",
      sourceLabel: "weekly_curation",
    }).bundle;

    const nextBundle = importAuthoredContent({
      content: JSON.stringify([
        {
          id: "stable-dev-item",
          source: "manual",
          skill: "dev",
          difficulty: "core",
          format: "open_response",
          prompt: "Explain idempotency in APIs with one precise sentence",
          answer: "Repeated requests should keep the same effect.",
          tags: ["backend"],
          metadata: {
            routeObjective: "dev_reasoning",
            cefr: "B2",
          },
        },
        {
          source: "manual",
          skill: "math",
          difficulty: "foundation",
          format: "flashcard",
          prompt: "What is the value of 8 plus 7?",
          answer: "15",
          tags: ["arithmetic"],
          metadata: {
            routeObjective: "math_speed",
            cefr: "A2",
          },
        },
      ]),
      sourceFormat: "json",
      packVersion: "1.1.0",
      sourceLabel: "weekly_curation",
      previousBundle,
      releaseNotes: ["Expanded math coverage and refreshed dev phrasing."],
    }).bundle;

    expect(nextBundle.changelog.current).toMatchObject({
      version: "1.1.0",
      previousVersion: "1.0.0",
      rollbackTargetVersion: "1.0.0",
      summary: {
        addedCount: 1,
        updatedCount: 1,
        removedCount: 0,
      },
    });
    expect(nextBundle.changelog.current.notes).toEqual(
      expect.arrayContaining([
        "Expanded math coverage and refreshed dev phrasing.",
        "Changes since 1.0.0: added 1, updated 1 items.",
        "Rollback target: 1.0.0.",
      ]),
    );
    expect(nextBundle.changelog.history).toEqual([
      expect.objectContaining({ version: "1.0.0" }),
    ]);
  });
});
