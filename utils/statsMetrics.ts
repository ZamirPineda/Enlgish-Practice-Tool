import { SrsVocabularyItem } from "../types";

export interface VaultProgress {
  currentStreak: number;
  bestStreak: number;
  totalReviews: number;
  lastReviewDate: string | null;
}

export interface StatsMetrics {
  currentStreak: number;
  bestStreak: number;
  totalCards: number;
  learnedCards: number;
  pendingCards: number;
  globalAccuracy: number;
  categoryAccuracy: Array<{
    category: string;
    accuracy: number;
    totalCards: number;
  }>;
  levelBreakdown: Array<{
    level: string;
    count: number;
  }>;
  recentActivity: Array<{
    word: string;
    date: string;
    status: string;
  }>;
  estimatedStudyMinutes: number | null;
}

const getCategory = (item: SrsVocabularyItem): string => {
  const firstTag = item.tags?.[0]?.trim();
  if (firstTag) return firstTag;
  const pos = item.partOfSpeech?.trim();
  return pos || "General";
};

const getLevel = (item: SrsVocabularyItem): string => {
  const levelTag = item.tags?.find((t) => t.match(/^[A-C][1-2]$/i));
  return levelTag ? levelTag.toUpperCase() : "Uncategorized";
};

const parseMaybeDate = (value: unknown): number | null => {
  if (typeof value !== "string" && typeof value !== "number") return null;
  const date = new Date(value);
  const timestamp = date.getTime();
  return Number.isNaN(timestamp) ? null : timestamp;
};

const roundToOneDecimal = (value: number): number =>
  Math.round(value * 10) / 10;

export const calculateStatsMetrics = (
  deck: Record<string, SrsVocabularyItem>,
  progress: VaultProgress,
): StatsMetrics => {
  const items = Object.values(deck || {});
  const totalCards = items.length;
  const learnedCards = items.filter(
    (item) => item.status === "mastered",
  ).length;
  const pendingCards = totalCards - learnedCards;

  const totals = items.reduce(
    (acc, item) => {
      const repetition = item.repetition ?? 0;
      const lapses = item.lapses ?? 0;
      const attempts = repetition + lapses;
      acc.correct += repetition;
      acc.attempts += attempts;

      const category = getCategory(item);
      const categoryTotals = acc.byCategory.get(category) ?? {
        correct: 0,
        attempts: 0,
        totalCards: 0,
      };
      categoryTotals.correct += repetition;
      categoryTotals.attempts += attempts;
      categoryTotals.totalCards += 1;
      acc.byCategory.set(category, categoryTotals);
      return acc;
    },
    {
      correct: 0,
      attempts: 0,
      byCategory: new Map<
        string,
        { correct: number; attempts: number; totalCards: number }
      >(),
    },
  );

  const globalAccuracy =
    totals.attempts > 0
      ? roundToOneDecimal((totals.correct / totals.attempts) * 100)
      : 0;

  const categoryAccuracy = Array.from(totals.byCategory.entries())
    .map(([category, data]) => ({
      category,
      totalCards: data.totalCards,
      accuracy:
        data.attempts > 0
          ? roundToOneDecimal((data.correct / data.attempts) * 100)
          : 0,
    }))
    .sort((a, b) => a.category.localeCompare(b.category));

  const levelCounts = new Map<string, number>();
  items.forEach((item) => {
    const level = getLevel(item);
    levelCounts.set(level, (levelCounts.get(level) || 0) + 1);
  });

  const levelBreakdown = Array.from(levelCounts.entries())
    .map(([level, count]) => ({ level, count }))
    .sort((a, b) => {
      if (a.level === "Uncategorized") return 1;
      if (b.level === "Uncategorized") return -1;
      return a.level.localeCompare(b.level);
    });

  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const recentActivity = items
    .filter((item) => {
      // We don't have a strict 'lastReviewedAt' in SrsVocabularyItem, but we can infer from nextReviewDate
      // or if it's mastered/learning. Let's just show recently added/modified if we can't find a date.
      // For now, let's just take the ones with the highest interval (most recently reviewed successfully)
      return item.interval > 0;
    })
    .sort((a, b) => b.interval - a.interval) // Sort by highest interval (most recently successful)
    .slice(0, 5)
    .map((item) => ({
      word: item.word,
      date: "Recently", // Placeholder since we don't store exact review dates per item
      status: item.status,
    }));

  const timestamps = items.flatMap((item) => {
    const dynamicItem = item as SrsVocabularyItem & Record<string, unknown>;
    return [
      parseMaybeDate(dynamicItem.createdAt),
      parseMaybeDate(dynamicItem.updatedAt),
      parseMaybeDate(dynamicItem.reviewedAt),
      parseMaybeDate(dynamicItem.lastReviewedAt),
    ].filter((value): value is number => value !== null);
  });

  const estimatedStudyMinutes =
    timestamps.length >= 2
      ? Math.max(
          1,
          Math.round(
            (Math.max(...timestamps) - Math.min(...timestamps)) / 60000,
          ),
        )
      : null;

  return {
    currentStreak: progress.currentStreak,
    bestStreak: progress.bestStreak,
    totalCards,
    learnedCards,
    pendingCards,
    globalAccuracy,
    categoryAccuracy,
    levelBreakdown,
    recentActivity,
    estimatedStudyMinutes,
  };
};
