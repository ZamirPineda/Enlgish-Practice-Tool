import { createHash } from "node:crypto";
import { describe, expect, test } from "vitest";
import { starterKits } from "@/features/data/vocabularyVault";
import { techDecks } from "@/features/data/techDecks";
import {
  buildContentInventoryFromAdapters,
  type BuildInventoryAdaptersInput,
} from "@/lib/contentInventoryAdapters";
import { importAuthoredContent } from "@/lib/contentAuthoringPipeline";
import type { SrsVocabularyItem } from "@/types";

const buildStarterKitDeck = (): Record<string, SrsVocabularyItem> =>
  Object.values(starterKits)
    .flat()
    .reduce<Record<string, SrsVocabularyItem>>((accumulator, item, index) => {
      const key = `${item.word.toLowerCase().replace(/[^a-z0-9]+/g, "_")}_${index}`;
      accumulator[key] = {
        word: item.word,
        definition: item.definition,
        ipa: item.ipa,
        example: item.example,
        partOfSpeech: item.partOfSpeech,
        tags: item.tags,
        repetition: 1,
        efactor: 2.5,
        interval: 1,
        nextReviewDate: "2099-01-01",
        status: "learning",
      };
      return accumulator;
    }, {});

const buildInventoryDigest = (input: BuildInventoryAdaptersInput) => {
  const pack = buildContentInventoryFromAdapters(input);
  const canonicalPayload = pack.items.map((item) => ({
    id: item.id,
    source: item.source,
    skill: item.skill,
    difficulty: item.difficulty,
    format: item.format,
    prompt: item.prompt,
    answer: item.answer,
    alternatives: item.alternatives,
    tags: item.tags,
    metadata: item.metadata,
    fingerprint: item.fingerprint,
    active: item.active,
  }));
  const digest = createHash("sha256")
    .update(JSON.stringify(canonicalPayload))
    .digest("hex");

  const countBy = <T extends string>(values: T[]) =>
    values.reduce<Record<string, number>>((accumulator, value) => {
      accumulator[value] = (accumulator[value] || 0) + 1;
      return accumulator;
    }, {});

  return {
    schemaVersion: pack.schemaVersion,
    totalItems: pack.items.length,
    digest,
    bySource: countBy(pack.items.map((item) => item.source)),
    bySkill: countBy(pack.items.map((item) => item.skill)),
    byFormat: countBy(pack.items.map((item) => item.format)),
    firstIds: pack.items.slice(0, 5).map((item) => item.id),
    lastIds: pack.items.slice(-5).map((item) => item.id),
  };
};

const summarizeBundleSnapshot = () => {
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
    sourceLabel: "snapshot_fixture",
  }).bundle;

  const bundle = importAuthoredContent({
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
    sourceLabel: "snapshot_fixture",
    previousBundle,
    releaseNotes: ["Expanded math coverage and refreshed dev phrasing."],
  }).bundle;

  return {
    schemaVersion: bundle.schemaVersion,
    packVersion: bundle.packVersion,
    sourceLabel: bundle.sourceLabel,
    sourceFormat: bundle.sourceFormat,
    summary: bundle.summary,
    itemIds: bundle.inventory.items.map((item) => item.id),
    changelog: {
      current: {
        version: bundle.changelog.current.version,
        previousVersion: bundle.changelog.current.previousVersion,
        rollbackTargetVersion: bundle.changelog.current.rollbackTargetVersion,
        summary: bundle.changelog.current.summary,
        notes: bundle.changelog.current.notes,
      },
      historyVersions: bundle.changelog.history.map((entry) => entry.version),
    },
  };
};

describe("content pipeline snapshots", () => {
  test("runtime inventory snapshot stays stable for canonical datasets", () => {
    const snapshot = buildInventoryDigest({
      vocabularyVaultDeck: buildStarterKitDeck(),
      techDecks,
    });

    expect(snapshot).toMatchInlineSnapshot(`
      {
        "byFormat": {
          "flashcard": 48,
          "open_response": 2459,
        },
        "bySkill": {
          "dev": 2459,
          "english": 48,
        },
        "bySource": {
          "tech_deck": 2459,
          "vocabulary_vault": 48,
        },
        "digest": "926da40ec55ff211d1465b6a80d3c4d069ac812c06895b9ca2d5b8276198b800",
        "firstIds": [
          "ci_vocabulary_vault_skuzs5",
          "ci_vocabulary_vault_2ntztc",
          "ci_vocabulary_vault_jjrnyb",
          "ci_vocabulary_vault_4k33r8",
          "ci_vocabulary_vault_ng1g34",
        ],
        "lastIds": [
          "ci_tech_deck_yx4gd2",
          "ci_tech_deck_j2k0jq",
          "ci_tech_deck_m1ih5a",
          "ci_tech_deck_4htunw",
          "ci_tech_deck_9w7fgy",
        ],
        "schemaVersion": 1,
        "totalItems": 2507,
      }
    `);
  });

  test("authoring bundle snapshot stays stable for versioning and rollback metadata", () => {
    expect(summarizeBundleSnapshot()).toMatchInlineSnapshot(`
      {
        "changelog": {
          "current": {
            "notes": [
              "Expanded math coverage and refreshed dev phrasing.",
              "Changes since 1.0.0: added 1, updated 1 items.",
              "Current pack now contains 2 items.",
              "Rollback target: 1.0.0.",
            ],
            "previousVersion": "1.0.0",
            "rollbackTargetVersion": "1.0.0",
            "summary": {
              "addedCount": 1,
              "removedCount": 0,
              "totalItems": 2,
              "updatedCount": 1,
            },
            "version": "1.1.0",
          },
          "historyVersions": [
            "1.0.0",
          ],
        },
        "itemIds": [
          "stable-dev-item",
          "ci_manual_jt8tld",
        ],
        "packVersion": "1.1.0",
        "schemaVersion": 2,
        "sourceFormat": "json",
        "sourceLabel": "snapshot_fixture",
        "summary": {
          "importedCount": 2,
          "invalidCount": 0,
          "removedDuplicateCount": 0,
        },
      }
    `);
  });
});
