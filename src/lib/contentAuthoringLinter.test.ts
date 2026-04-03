import { describe, expect, test } from "vitest";
import { lintAuthoredContentRows } from "@/lib/contentAuthoringLinter";

describe("contentAuthoringLinter", () => {
  test("reports exact duplicate groups and near duplicate pairs", () => {
    const report = lintAuthoredContentRows([
      {
        rowNumber: 2,
        record: {
          source: "manual",
          skill: "english",
          difficulty: "core",
          format: "flashcard",
          prompt: "Resilient leadership example",
          answer: "An example of recovering quickly under pressure.",
          tags: ["interview"],
          alternatives: [],
          hints: [],
          metadata: { routeObjective: "english_interview", cefr: "B1" },
          active: true,
        },
      },
      {
        rowNumber: 3,
        record: {
          source: "manual",
          skill: "english",
          difficulty: "core",
          format: "flashcard",
          prompt: " resilient leadership example ",
          answer: "An example of recovering quickly under pressure.",
          tags: ["behavioral"],
          alternatives: [],
          hints: [],
          metadata: { routeObjective: "english_interview", cefr: "B1" },
          active: true,
        },
      },
      {
        rowNumber: 4,
        record: {
          source: "manual",
          skill: "dev",
          difficulty: "core",
          format: "open_response",
          prompt: "Explain idempotency in APIs in one sentence",
          answer: "Repeated requests produce the same effect.",
          tags: ["backend"],
          alternatives: [],
          hints: [],
          metadata: { routeObjective: "dev_reasoning", topic: "api", cefr: "B2" },
          active: true,
        },
      },
      {
        rowNumber: 5,
        record: {
          source: "manual",
          skill: "dev",
          difficulty: "core",
          format: "open_response",
          prompt: "Explain idempotency in APIs using one sentence",
          answer: "Repeated requests should produce the same effect.",
          tags: ["api"],
          alternatives: [],
          hints: [],
          metadata: { routeObjective: "dev_reasoning", topic: "backend", cefr: "B2" },
          active: true,
        },
      },
    ]);

    expect(report.scannedRowCount).toBe(4);
    expect(report.exactDuplicateGroupCount).toBe(1);
    expect(report.exactDuplicateRowCount).toBe(2);
    expect(report.exactDuplicateGroups).toEqual([
      expect.objectContaining({
        rowNumbers: [2, 3],
        promptPreview: "Resilient leadership example",
      }),
    ]);
    expect(report.nearDuplicateCount).toBe(1);
    expect(report.nearDuplicatePairs).toEqual([
      expect.objectContaining({
        rowNumbers: [4, 5],
        similarity: expect.any(Number),
      }),
    ]);
    expect(report.nearDuplicatePairs[0]!.similarity).toBeGreaterThanOrEqual(0.82);
  });
});
