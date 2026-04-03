import {
  ContentInventoryItem,
  ContentInventorySource,
  contentInventoryItemSchema,
  normalizeContentTags,
} from "@/lib/contentInventory";

type DedupeReason = "fingerprint" | "id_collision";

export interface ContentInventoryDedupeGroup {
  reason: DedupeReason;
  key: string;
  keptId: string;
  removedIds: string[];
  keptSource: ContentInventorySource;
}

export interface ContentInventoryDedupeReport {
  originalCount: number;
  dedupedCount: number;
  removedCount: number;
  groups: ContentInventoryDedupeGroup[];
}

export interface ContentInventoryDedupeResult {
  items: ContentInventoryItem[];
  report: ContentInventoryDedupeReport;
}

const SOURCE_PRIORITY: Record<ContentInventorySource, number> = {
  vocabulary_vault: 80,
  study_deck: 70,
  tech_deck: 60,
  daily_loop: 50,
  english_game: 40,
  math_game: 40,
  dev_game: 40,
  manual: 30,
};

const DIFFICULTY_PRIORITY: Record<ContentInventoryItem["difficulty"], number> =
  {
    expert: 4,
    stretch: 3,
    core: 2,
    foundation: 1,
  };

const toUnique = (values: string[]) =>
  Array.from(new Set(values.filter((value) => value.length > 0)));

const scoreItemForDedup = (item: ContentInventoryItem): number =>
  (item.active ? 1000 : 0) +
  SOURCE_PRIORITY[item.source] * 10 +
  DIFFICULTY_PRIORITY[item.difficulty] * 5 +
  (item.answer ? 2 : 0) +
  item.tags.length +
  item.hints.length * 0.1 +
  item.alternatives.length * 0.1;

const compareItems = (
  left: ContentInventoryItem,
  right: ContentInventoryItem,
) =>
  scoreItemForDedup(right) - scoreItemForDedup(left) ||
  left.id.localeCompare(right.id);

const mergeItems = (
  kept: ContentInventoryItem,
  removed: ContentInventoryItem,
): ContentInventoryItem => {
  const mergedTags = normalizeContentTags([...kept.tags, ...removed.tags]);
  const mergedHints = toUnique([...kept.hints, ...removed.hints]);
  const mergedAlternatives = toUnique([
    ...kept.alternatives,
    ...removed.alternatives,
  ]);

  const keptLineage = Array.isArray(kept.metadata["dedupeLineage"])
    ? (kept.metadata["dedupeLineage"] as string[])
    : [kept.id];
  const removedLineage = Array.isArray(removed.metadata["dedupeLineage"])
    ? (removed.metadata["dedupeLineage"] as string[])
    : [removed.id];

  const dedupeLineage = toUnique([...keptLineage, ...removedLineage]);
  const dedupeSources = toUnique([
    kept.source,
    removed.source,
    ...(Array.isArray(kept.metadata["dedupeSources"])
      ? (kept.metadata["dedupeSources"] as string[])
      : []),
    ...(Array.isArray(removed.metadata["dedupeSources"])
      ? (removed.metadata["dedupeSources"] as string[])
      : []),
  ]);

  return contentInventoryItemSchema.parse({
    ...kept,
    tags: mergedTags,
    hints: mergedHints,
    alternatives: mergedAlternatives,
    metadata: {
      ...removed.metadata,
      ...kept.metadata,
      dedupeLineage,
      dedupeSources,
    },
  });
};

const dedupeByKey = (
  items: ContentInventoryItem[],
  keySelector: (item: ContentInventoryItem) => string,
  reason: DedupeReason,
): ContentInventoryDedupeResult => {
  const grouped = new Map<string, ContentInventoryItem[]>();
  items.forEach((item) => {
    const key = keySelector(item);
    const bucket = grouped.get(key) || [];
    bucket.push(item);
    grouped.set(key, bucket);
  });

  const dedupedItems: ContentInventoryItem[] = [];
  const groups: ContentInventoryDedupeGroup[] = [];

  grouped.forEach((groupItems, key) => {
    if (groupItems.length === 0) return;
    const sorted = [...groupItems].sort(compareItems);
    let kept = sorted[0];
    const removedIds: string[] = [];

    sorted.slice(1).forEach((candidate) => {
      removedIds.push(candidate.id);
      kept = mergeItems(kept, candidate);
    });

    dedupedItems.push(kept);

    if (removedIds.length > 0) {
      groups.push({
        reason,
        key,
        keptId: kept.id,
        removedIds,
        keptSource: kept.source,
      });
    }
  });

  return {
    items: dedupedItems,
    report: {
      originalCount: items.length,
      dedupedCount: dedupedItems.length,
      removedCount: items.length - dedupedItems.length,
      groups,
    },
  };
};

const mergeReports = (
  left: ContentInventoryDedupeReport,
  right: ContentInventoryDedupeReport,
): ContentInventoryDedupeReport => ({
  originalCount: left.originalCount,
  dedupedCount: right.dedupedCount,
  removedCount: left.originalCount - right.dedupedCount,
  groups: [...left.groups, ...right.groups],
});

export const dedupeContentInventoryItems = (
  items: ContentInventoryItem[],
): ContentInventoryDedupeResult => {
  const fingerprintPass = dedupeByKey(
    items,
    (item) => item.fingerprint,
    "fingerprint",
  );
  const idPass = dedupeByKey(
    fingerprintPass.items,
    (item) => item.id,
    "id_collision",
  );

  return {
    items: idPass.items,
    report: mergeReports(fingerprintPass.report, idPass.report),
  };
};
