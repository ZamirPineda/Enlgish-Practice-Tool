import { describe, expect, test } from "vitest";
import { createContentInventoryItem } from "@/lib/contentInventory";
import { buildAuthoredContentChangelog } from "@/lib/contentAuthoringVersioning";

describe("contentAuthoringVersioning", () => {
  test("builds an initial changelog with readable release notes", () => {
    const pack = {
      schemaVersion: 1 as const,
      generatedAt: "2026-03-06T00:00:00.000Z",
      items: [
        createContentInventoryItem({
          source: "manual",
          skill: "english",
          difficulty: "core",
          format: "flashcard",
          prompt: "Explain a resilient leadership example",
          answer: "A concise story about recovering under pressure.",
          tags: ["interview"],
          metadata: { routeObjective: "english_interview", cefr: "B1" },
          active: true,
        }),
      ],
    };

    const changelog = buildAuthoredContentChangelog({
      packVersion: "1.0.0",
      pack,
      releasedAt: "2026-03-06T00:00:00.000Z",
      releaseNotes: ["Baseline curated interview pack."],
    });

    expect(changelog.current).toMatchObject({
      version: "1.0.0",
      previousVersion: undefined,
      rollbackTargetVersion: undefined,
      summary: {
        totalItems: 1,
        addedCount: 1,
        updatedCount: 0,
        removedCount: 0,
      },
    });
    expect(changelog.current.notes).toEqual(
      expect.arrayContaining([
        "Baseline curated interview pack.",
        "Initial content pack release with 1 items.",
      ]),
    );
    expect(changelog.history).toEqual([]);
  });

  test("builds incremental changelog with rollback target and previous history", () => {
    const previousPack = {
      schemaVersion: 1 as const,
      generatedAt: "2026-03-05T00:00:00.000Z",
      items: [
        createContentInventoryItem({
          id: "stable-dev-item",
          source: "manual",
          skill: "dev",
          difficulty: "core",
          format: "open_response",
          prompt: "Explain idempotency in APIs in one sentence",
          answer: "Repeated requests produce the same effect.",
          tags: ["backend"],
          metadata: { routeObjective: "dev_reasoning", cefr: "B2" },
          active: true,
        }),
      ],
    };
    const currentPack = {
      schemaVersion: 1 as const,
      generatedAt: "2026-03-06T00:00:00.000Z",
      items: [
        createContentInventoryItem({
          id: "stable-dev-item",
          source: "manual",
          skill: "dev",
          difficulty: "core",
          format: "open_response",
          prompt: "Explain idempotency in APIs with one precise sentence",
          answer: "Repeated requests should keep the same effect.",
          tags: ["backend"],
          metadata: { routeObjective: "dev_reasoning", cefr: "B2" },
          active: true,
        }),
        createContentInventoryItem({
          source: "manual",
          skill: "math",
          difficulty: "foundation",
          format: "flashcard",
          prompt: "What is the value of 8 plus 7?",
          answer: "15",
          tags: ["arithmetic"],
          metadata: { routeObjective: "math_speed", cefr: "A2" },
          active: true,
        }),
      ],
    };

    const changelog = buildAuthoredContentChangelog({
      packVersion: "1.1.0",
      pack: currentPack,
      releasedAt: "2026-03-06T00:00:00.000Z",
      previousBundle: {
        packVersion: "1.0.0",
        inventory: previousPack,
        changelog: {
          current: {
            version: "1.0.0",
            releasedAt: "2026-03-05T00:00:00.000Z",
            summary: {
              totalItems: 1,
              addedCount: 1,
              updatedCount: 0,
              removedCount: 0,
            },
            notes: ["Initial content pack release with 1 items."],
          },
          history: [],
        },
      },
      releaseNotes: ["Expanded math coverage and refreshed dev phrasing."],
    });

    expect(changelog.current).toMatchObject({
      version: "1.1.0",
      previousVersion: "1.0.0",
      rollbackTargetVersion: "1.0.0",
      summary: {
        totalItems: 2,
        addedCount: 1,
        updatedCount: 1,
        removedCount: 0,
      },
    });
    expect(changelog.current.notes).toEqual(
      expect.arrayContaining([
        "Expanded math coverage and refreshed dev phrasing.",
        "Changes since 1.0.0: added 1, updated 1 items.",
        "Rollback target: 1.0.0.",
      ]),
    );
    expect(changelog.history).toEqual([
      expect.objectContaining({
        version: "1.0.0",
      }),
    ]);
  });
});
