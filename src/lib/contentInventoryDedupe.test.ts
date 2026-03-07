import { describe, expect, test } from "vitest";
import { createContentInventoryItem } from "@/lib/contentInventory";
import { dedupeContentInventoryItems } from "@/lib/contentInventoryDedupe";

describe("contentInventoryDedupe", () => {
  test("dedupes by fingerprint and preserves traceability metadata", () => {
    const studyItem = createContentInventoryItem({
      source: "study_deck",
      skill: "english",
      difficulty: "core",
      format: "flashcard",
      prompt: "resilient",
      answer: "Able to recover quickly from difficulties.",
      tags: ["behavioral"],
      hints: ["hint-study"],
      alternatives: ["recovers fast"],
      metadata: { topic: "interview" },
      active: true,
    });

    const vaultItem = createContentInventoryItem({
      source: "vocabulary_vault",
      skill: "english",
      difficulty: "core",
      format: "flashcard",
      prompt: "resilient",
      answer: "Able to recover quickly from difficulties.",
      tags: ["vocabulary", "behavioral"],
      hints: ["hint-vault"],
      alternatives: ["recovers fast"],
      metadata: { deckId: "vault-main" },
      active: true,
    });

    const result = dedupeContentInventoryItems([studyItem, vaultItem]);

    expect(result.items).toHaveLength(1);
    expect(result.report.originalCount).toBe(2);
    expect(result.report.dedupedCount).toBe(1);
    expect(result.report.removedCount).toBe(1);
    expect(result.report.groups).toHaveLength(1);
    expect(result.report.groups[0]).toMatchObject({
      reason: "fingerprint",
      keptId: vaultItem.id,
      removedIds: [studyItem.id],
      keptSource: "vocabulary_vault",
    });

    expect(result.items[0].tags).toEqual(["behavioral", "vocabulary"]);
    expect(result.items[0].hints).toEqual(
      expect.arrayContaining(["hint-study", "hint-vault"]),
    );
    expect(result.items[0].alternatives).toEqual(["recovers fast"]);
    expect(result.items[0].metadata.dedupeLineage).toEqual(
      expect.arrayContaining([studyItem.id, vaultItem.id]),
    );
    expect(result.items[0].metadata.dedupeSources).toEqual(
      expect.arrayContaining(["study_deck", "vocabulary_vault"]),
    );
  });

  test("dedupes by id collisions after fingerprint pass", () => {
    const first = createContentInventoryItem({
      id: "ci_manual_shared",
      source: "manual",
      skill: "english",
      difficulty: "foundation",
      format: "flashcard",
      prompt: "term-a",
      answer: "definition-a",
      tags: ["manual-a"],
      active: true,
    });

    const second = createContentInventoryItem({
      id: "ci_manual_shared",
      source: "manual",
      skill: "english",
      difficulty: "stretch",
      format: "flashcard",
      prompt: "term-b",
      answer: "definition-b",
      tags: ["manual-b"],
      active: true,
    });

    const result = dedupeContentInventoryItems([first, second]);

    expect(result.items).toHaveLength(1);
    expect(result.report.originalCount).toBe(2);
    expect(result.report.dedupedCount).toBe(1);
    expect(result.report.removedCount).toBe(1);
    expect(result.report.groups).toHaveLength(1);
    expect(result.report.groups[0]).toMatchObject({
      reason: "id_collision",
      key: "ci_manual_shared",
      keptId: "ci_manual_shared",
      removedIds: ["ci_manual_shared"],
    });
    expect(result.items[0].metadata.dedupeLineage).toEqual(
      expect.arrayContaining(["ci_manual_shared"]),
    );
  });
});
