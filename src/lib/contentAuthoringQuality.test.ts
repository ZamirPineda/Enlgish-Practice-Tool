import { describe, expect, test } from "vitest";
import { validateAuthoredContentRecordQuality } from "@/lib/contentAuthoringQuality";

describe("contentAuthoringQuality", () => {
  test("accepts a well-formed authored item", () => {
    const issues = validateAuthoredContentRecordQuality({
      source: "manual",
      skill: "english",
      difficulty: "core",
      format: "flashcard",
      prompt: "How would you describe a resilient teammate?",
      answer: "Someone who adapts quickly after setbacks.",
      tags: ["interview", "behavioral"],
      alternatives: [],
      hints: ["Think adaptability"],
      metadata: {
        routeObjective: "english_interview",
        cefr: "B1",
        topic: "behavioral_interview",
      },
      active: true,
    });

    expect(issues).toEqual([]);
  });

  test("rejects invalid tag quality and excessive list sizes", () => {
    const issues = validateAuthoredContentRecordQuality({
      source: "manual",
      skill: "dev",
      difficulty: "core",
      format: "multiple_choice",
      prompt: "What does a circuit breaker protect against?",
      answer: "Repeated failing downstream calls.",
      tags: ["a", "infra", "Infra"],
      alternatives: [
        "Cold starts",
        "Cache misses",
        "Slow DNS",
        "Memory leaks",
        "Lock contention",
        "Replica lag",
        "Packet loss",
      ],
      hints: [
        "Think resilience",
        "Think timeout budgets",
        "Think fallback",
        "Think retries",
        "Think bulkheads",
      ],
      metadata: {
        routeObjective: "dev_reasoning",
      },
      active: true,
    });

    expect(issues).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ field: "tags" }),
        expect.objectContaining({ field: "alternatives" }),
        expect.objectContaining({ field: "hints" }),
      ]),
    );
  });

  test("rejects format contracts that do not have enough answer data", () => {
    const multipleChoiceIssues = validateAuthoredContentRecordQuality({
      source: "manual",
      skill: "english",
      difficulty: "core",
      format: "multiple_choice",
      prompt: "Choose the best collocation for make ___ progress",
      answer: "steady",
      tags: ["collocation"],
      alternatives: ["rapid"],
      hints: [],
      metadata: {},
      active: true,
    });
    const transformIssues = validateAuthoredContentRecordQuality({
      source: "manual",
      skill: "english",
      difficulty: "stretch",
      format: "sentence_transform",
      prompt: "Rewrite this in passive voice.",
      answer: "Rewrite this in passive voice.",
      tags: ["grammar"],
      alternatives: [],
      hints: [],
      metadata: {},
      active: true,
    });

    expect(multipleChoiceIssues).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ field: "alternatives" }),
      ]),
    );
    expect(transformIssues).toEqual(
      expect.arrayContaining([expect.objectContaining({ field: "answer" })]),
    );
  });

  test("rejects difficulty metadata mismatches for route and CEFR", () => {
    const issues = validateAuthoredContentRecordQuality({
      source: "manual",
      skill: "dev",
      difficulty: "foundation",
      format: "open_response",
      prompt: "Explain eventual consistency in distributed systems.",
      answer:
        "A model where replicas converge over time instead of immediately.",
      tags: ["distributed", "consistency"],
      alternatives: [],
      hints: [],
      metadata: {
        routeObjective: "english_interview",
        cefr: "C1",
      },
      active: true,
    });

    expect(issues).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ field: "metadata.routeObjective" }),
        expect.objectContaining({ field: "difficulty" }),
      ]),
    );
  });
});
