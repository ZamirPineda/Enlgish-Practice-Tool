import { describe, expect, test } from "vitest";
import {
  buildContentInventoryId,
  CONTENT_INVENTORY_SCHEMA_VERSION,
  contentInventoryPackSchema,
  createContentFingerprint,
  createContentInventoryItem,
  normalizeContentTags,
  safeParseContentInventoryItems,
} from "@/lib/contentInventory";

describe("contentInventory", () => {
  test("builds canonical item with required fields for APP-501", () => {
    const item = createContentInventoryItem({
      source: "study_deck",
      skill: "english",
      difficulty: "core",
      format: "flashcard",
      prompt: "What does resilient mean?",
      answer: "Able to recover quickly from difficulties.",
      tags: ["Behavior", "Interview", " interview "],
      metadata: {
        topic: "behavioral_interview",
        cefr: "B2",
        gameId: "study_deck",
      },
      active: true,
    });

    expect(item.id).toMatch(/^ci_study_deck_/);
    expect(item.fingerprint.length).toBeGreaterThanOrEqual(4);
    expect(item.tags).toEqual(["behavior", "interview"]);
    expect(item.metadata.topic).toBe("behavioral_interview");
  });

  test("keeps fingerprint and id deterministic for same semantic content", () => {
    const fingerprintA = createContentFingerprint({
      source: "tech_deck",
      skill: "dev",
      difficulty: "stretch",
      format: "multiple_choice",
      prompt: "What does CAP theorem state?",
      answer: "Consistency, Availability, Partition tolerance trade-off.",
      alternatives: ["A", "B", "C"],
    });
    const fingerprintB = createContentFingerprint({
      source: "tech_deck",
      skill: "dev",
      difficulty: "stretch",
      format: "multiple_choice",
      prompt: "  What does   CAP theorem state? ",
      answer: "Consistency, Availability, Partition tolerance trade-off.",
      alternatives: ["C", "A", "B"],
    });

    expect(fingerprintA).toBe(fingerprintB);
    expect(buildContentInventoryId("tech_deck", fingerprintA)).toBe(
      buildContentInventoryId("tech_deck", fingerprintB),
    );
  });

  test("builds equal fingerprint across sources when semantic content is the same", () => {
    const fromStudyDeck = createContentFingerprint({
      source: "study_deck",
      skill: "english",
      difficulty: "core",
      format: "flashcard",
      prompt: "Resilient",
      answer: "Able to recover quickly from difficulties.",
    });
    const fromVault = createContentFingerprint({
      source: "vocabulary_vault",
      skill: "english",
      difficulty: "stretch",
      format: "flashcard",
      prompt: " resilient ",
      answer: "Able to recover quickly from difficulties.",
    });

    expect(fromStudyDeck).toBe(fromVault);
  });

  test("normalizes and deduplicates tags", () => {
    expect(
      normalizeContentTags([
        "Math Speed",
        "math-speed",
        " MATH speed ",
        "algebra",
      ]),
    ).toEqual(["algebra", "math-speed", "math_speed"]);
  });

  test("filters out invalid entries during safe parse", () => {
    const valid = createContentInventoryItem({
      source: "daily_loop",
      skill: "math",
      difficulty: "foundation",
      format: "formula_drill",
      prompt: "Derivative of x^2",
      answer: "2x",
      tags: ["calculus"],
      active: true,
    });

    const result = safeParseContentInventoryItems([
      valid,
      { prompt: "missing required fields" },
    ]);

    expect(result).toHaveLength(1);
    expect(result[0].prompt).toBe("Derivative of x^2");
  });

  test("supports pack schema with versioned contract", () => {
    const pack = {
      schemaVersion: CONTENT_INVENTORY_SCHEMA_VERSION,
      generatedAt: new Date().toISOString(),
      items: [
        createContentInventoryItem({
          source: "english_game",
          skill: "english",
          difficulty: "core",
          format: "sentence_transform",
          prompt: "Rewrite in passive voice.",
          answer: "The report was finished yesterday.",
          active: true,
        }),
      ],
    };

    expect(() => contentInventoryPackSchema.parse(pack)).not.toThrow();
  });
});
