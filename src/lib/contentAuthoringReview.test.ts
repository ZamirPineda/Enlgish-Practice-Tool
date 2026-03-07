import { describe, expect, test } from "vitest";
import {
  applyContentAuthoringBatchDecisions,
  createContentAuthoringReviewSample,
} from "@/lib/contentAuthoringReview";
import { prepareAuthoredContentRowsForReview } from "@/lib/contentAuthoringPipeline";

describe("contentAuthoringReview", () => {
  test("creates deterministic samples grouped by category", () => {
    const rows = prepareAuthoredContentRowsForReview({
      sourceFormat: "json",
      content: JSON.stringify([
        {
          source: "manual",
          skill: "dev",
          difficulty: "core",
          format: "open_response",
          prompt: "Explain idempotency in APIs in one sentence",
          answer: "Repeated requests produce the same effect.",
          tags: ["backend"],
          metadata: { topic: "backend", routeObjective: "dev_reasoning", cefr: "B2" },
        },
        {
          source: "manual",
          skill: "dev",
          difficulty: "core",
          format: "open_response",
          prompt: "Explain circuit breakers in one sentence",
          answer: "They stop repeated failing calls.",
          tags: ["backend"],
          metadata: { topic: "backend", routeObjective: "dev_reasoning", cefr: "B2" },
        },
        {
          source: "manual",
          skill: "english",
          difficulty: "core",
          format: "flashcard",
          prompt: "Give a concise answer about stakeholder alignment",
          answer: "I align stakeholders early and confirm risks.",
          tags: ["interview"],
          metadata: {
            topic: "behavioral",
            routeObjective: "english_interview",
            cefr: "B1",
          },
        },
      ]),
    });

    const sample = createContentAuthoringReviewSample({
      rows: rows.rows,
      category: "topic",
      sampleSizePerBatch: 1,
      seed: "review-seed",
    });

    expect(rows.issues).toEqual([]);
    expect(sample.category).toBe("topic");
    expect(sample.totalCandidateRows).toBe(3);
    expect(sample.batchCount).toBe(2);
    expect(sample.batches).toEqual([
      expect.objectContaining({
        batchId: "topic:backend",
        categoryValue: "backend",
        totalRowCount: 2,
        sampledRowCount: 1,
      }),
      expect.objectContaining({
        batchId: "topic:behavioral",
        categoryValue: "behavioral",
        totalRowCount: 1,
        sampledRowCount: 1,
      }),
    ]);
    expect(sample.batches[0]!.sample).toHaveLength(1);
    expect(sample.batches[1]!.sample[0]).toMatchObject({
      rowNumber: 3,
      prompt: "Give a concise answer about stakeholder alignment",
    });
  });

  test("approves and rejects complete batches while leaving the rest pending", () => {
    const prepared = prepareAuthoredContentRowsForReview({
      sourceFormat: "json",
      content: JSON.stringify([
        {
          source: "manual",
          skill: "dev",
          difficulty: "core",
          format: "open_response",
          prompt: "Explain idempotency in APIs in one sentence",
          answer: "Repeated requests produce the same effect.",
          tags: ["backend"],
          metadata: { topic: "backend", routeObjective: "dev_reasoning", cefr: "B2" },
        },
        {
          source: "manual",
          skill: "dev",
          difficulty: "core",
          format: "open_response",
          prompt: "Explain circuit breakers in one sentence",
          answer: "They stop repeated failing calls.",
          tags: ["backend"],
          metadata: { topic: "backend", routeObjective: "dev_reasoning", cefr: "B2" },
        },
        {
          source: "manual",
          skill: "english",
          difficulty: "core",
          format: "flashcard",
          prompt: "Give a concise answer about stakeholder alignment",
          answer: "I align stakeholders early and confirm risks.",
          tags: ["interview"],
          metadata: {
            topic: "behavioral",
            routeObjective: "english_interview",
            cefr: "B1",
          },
        },
        {
          source: "manual",
          skill: "math",
          difficulty: "foundation",
          format: "flashcard",
          prompt: "What is the value of 9 plus 6?",
          answer: "15",
          tags: ["arithmetic"],
          metadata: { topic: "addition", routeObjective: "math_speed", cefr: "A2" },
        },
      ]),
    });
    const sample = createContentAuthoringReviewSample({
      rows: prepared.rows,
      category: "skill",
      sampleSizePerBatch: 1,
      seed: "skill-review",
    });

    const result = applyContentAuthoringBatchDecisions({
      rows: prepared.rows,
      sample,
      decisions: [
        {
          batchId: "skill:dev",
          decision: "approved",
          reviewer: "qa",
        },
        {
          batchId: "skill:math",
          decision: "rejected",
          reviewer: "qa",
          note: "Needs more progression steps",
        },
      ],
    });

    expect(result.approvedRows.map((row) => row.rowNumber)).toEqual([1, 2]);
    expect(result.rejectedRows.map((row) => row.rowNumber)).toEqual([4]);
    expect(result.pendingRows.map((row) => row.rowNumber)).toEqual([3]);
    expect(result.outcomes).toEqual([
      expect.objectContaining({
        batchId: "skill:dev",
        decision: "approved",
        rowNumbers: [1, 2],
      }),
      expect.objectContaining({
        batchId: "skill:english",
        decision: "pending",
        rowNumbers: [3],
      }),
      expect.objectContaining({
        batchId: "skill:math",
        decision: "rejected",
        rowNumbers: [4],
      }),
    ]);
  });
});
