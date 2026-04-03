import { z } from "zod";
import type { ContentInventoryPack } from "@/lib/contentInventory";

const authoredContentVersionSchema = z
  .string()
  .regex(/^\d+\.\d+\.\d+$/, "Expected semantic version like 1.0.0");

export const authoredContentChangelogEntrySchema = z.object({
  version: authoredContentVersionSchema,
  previousVersion: authoredContentVersionSchema.optional(),
  rollbackTargetVersion: authoredContentVersionSchema.optional(),
  releasedAt: z.string(),
  summary: z.object({
    totalItems: z.number().int().nonnegative(),
    addedCount: z.number().int().nonnegative(),
    updatedCount: z.number().int().nonnegative(),
    removedCount: z.number().int().nonnegative(),
  }),
  notes: z.array(z.string().min(1)).min(1),
});

export type AuthoredContentChangelogEntry = z.infer<
  typeof authoredContentChangelogEntrySchema
>;

export const authoredContentChangelogSchema = z.object({
  current: authoredContentChangelogEntrySchema,
  history: z.array(authoredContentChangelogEntrySchema).default([]),
});

export type AuthoredContentChangelog = z.infer<
  typeof authoredContentChangelogSchema
>;

export interface VersionedContentInventoryBundleSnapshot {
  packVersion: string;
  inventory: ContentInventoryPack;
  changelog?: AuthoredContentChangelog;
}

const toUnique = (values: string[]) => Array.from(new Set(values.filter(Boolean)));

const buildSkillBreakdown = (pack: ContentInventoryPack) =>
  pack.items.reduce<Record<string, number>>((accumulator, item) => {
    accumulator[item.skill] = (accumulator[item.skill] || 0) + 1;
    return accumulator;
  }, {});

const formatBreakdown = (counts: Record<string, number>) =>
  Object.entries(counts)
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([key, value]) => `${key}: ${value}`)
    .join(", ");

const buildItemLookup = (pack: ContentInventoryPack) =>
  pack.items.reduce<Record<string, (typeof pack.items)[number]>>((accumulator, item) => {
    accumulator[item.id] = item;
    return accumulator;
  }, {});

const createAutomaticNotes = (input: {
  pack: ContentInventoryPack;
  previousBundle?: VersionedContentInventoryBundleSnapshot;
  summary: AuthoredContentChangelogEntry["summary"];
}): string[] => {
  if (!input.previousBundle) {
    return [
      `Initial content pack release with ${input.summary.totalItems} items.`,
      `Coverage by skill: ${formatBreakdown(buildSkillBreakdown(input.pack))}.`,
    ];
  }

  const notes: string[] = [];
  const { summary } = input;

  if (
    summary.addedCount === 0 &&
    summary.updatedCount === 0 &&
    summary.removedCount === 0
  ) {
    notes.push(
      `No inventory changes compared to version ${input.previousBundle.packVersion}.`,
    );
  } else {
    const parts = [
      summary.addedCount > 0 ? `added ${summary.addedCount}` : "",
      summary.updatedCount > 0 ? `updated ${summary.updatedCount}` : "",
      summary.removedCount > 0 ? `removed ${summary.removedCount}` : "",
    ].filter(Boolean);
    notes.push(
      `Changes since ${input.previousBundle.packVersion}: ${parts.join(", ")} items.`,
    );
  }

  notes.push(`Current pack now contains ${summary.totalItems} items.`);
  notes.push(
    `Rollback target: ${input.previousBundle.packVersion}.`,
  );

  return notes;
};

export const buildAuthoredContentChangelog = (input: {
  packVersion: string;
  pack: ContentInventoryPack;
  releasedAt?: string;
  previousBundle?: VersionedContentInventoryBundleSnapshot;
  releaseNotes?: string[];
}): AuthoredContentChangelog => {
  const releasedAt = input.releasedAt || new Date().toISOString();
  const previousPack = input.previousBundle?.inventory;
  const previousById = previousPack ? buildItemLookup(previousPack) : {};
  const currentById = buildItemLookup(input.pack);

  const addedCount = input.pack.items.filter((item) => !previousById[item.id]).length;
  const removedCount = previousPack
    ? previousPack.items.filter((item) => !currentById[item.id]).length
    : 0;
  const updatedCount = input.pack.items.filter((item) => {
    const previousItem = previousById[item.id];
    return Boolean(previousItem) && previousItem.fingerprint !== item.fingerprint;
  }).length;

  const summary = {
    totalItems: input.pack.items.length,
    addedCount,
    updatedCount,
    removedCount,
  };

  const automaticNotes = createAutomaticNotes({
    pack: input.pack,
    previousBundle: input.previousBundle,
    summary,
  });
  const notes = toUnique([...(input.releaseNotes || []), ...automaticNotes]);

  const current = authoredContentChangelogEntrySchema.parse({
    version: input.packVersion,
    previousVersion: input.previousBundle?.packVersion,
    rollbackTargetVersion: input.previousBundle?.packVersion,
    releasedAt,
    summary,
    notes,
  });

  const history = [
    ...(input.previousBundle?.changelog?.history || []),
    ...(input.previousBundle?.changelog?.current
      ? [input.previousBundle.changelog.current]
      : []),
  ];

  return authoredContentChangelogSchema.parse({
    current,
    history,
  });
};
