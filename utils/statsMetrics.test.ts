import { describe, expect, test } from "vitest";
import {
  calculateStatsMetrics,
  VaultProgress,
  WeeklyActivitySummary,
} from "./statsMetrics";
import { getIsoWeekKey } from "./srs";
import { SrsVocabularyItem } from "../types";

const progress: VaultProgress = {
  currentStreak: 3,
  bestStreak: 7,
  totalReviews: 10,
  lastReviewDate: "2026-02-18",
  lastBossReviewWeek: getIsoWeekKey(new Date()),
  bossReviewsCompleted: 2,
};

const weeklyActivity: WeeklyActivitySummary = {
  weekKey: getIsoWeekKey(new Date()),
  sessions: 4,
  attempts: 20,
  correct: 15,
  studyMinutes: 55,
};

describe("calculateStatsMetrics", () => {
  test("calculates streak, card totals and global/category accuracy", () => {
    const deck: Record<string, SrsVocabularyItem> = {
      alpha: {
        word: "alpha",
        definition: "first",
        repetition: 4,
        lapses: 1,
        efactor: 2.5,
        interval: 3,
        nextReviewDate: "2026-02-20",
        status: "learning",
        tags: ["Business"],
      },
      beta: {
        word: "beta",
        definition: "second",
        repetition: 3,
        lapses: 0,
        efactor: 2.5,
        interval: 8,
        nextReviewDate: "2026-02-22",
        status: "mastered",
        tags: ["Business"],
      },
      gamma: {
        word: "gamma",
        definition: "third",
        repetition: 1,
        lapses: 3,
        efactor: 2.5,
        interval: 1,
        nextReviewDate: "2026-02-19",
        status: "new",
        partOfSpeech: "Verb",
      },
    };

    const result = calculateStatsMetrics(deck, progress, weeklyActivity);

    expect(result.currentStreak).toBe(3);
    expect(result.bestStreak).toBe(7);
    expect(result.totalCards).toBe(3);
    expect(result.learnedCards).toBe(1);
    expect(result.pendingCards).toBe(2);
    expect(result.globalAccuracy).toBe(66.7);
    expect(result.categoryAccuracy).toEqual([
      { category: "Business", accuracy: 87.5, totalCards: 2 },
      { category: "Verb", accuracy: 25, totalCards: 1 },
    ]);
    expect(result.weeklySummary).toEqual({
      sessions: 4,
      accuracy: 75,
      studyMinutes: 55,
      focusSuggested: "Focus on Verb",
      bossCompletedThisWeek: true,
    });
  });

  test("returns estimated study minutes when timestamp fields exist", () => {
    const deck = {
      alpha: {
        word: "alpha",
        definition: "first",
        repetition: 1,
        lapses: 0,
        efactor: 2.5,
        interval: 1,
        nextReviewDate: "2026-02-20",
        status: "learning",
        createdAt: "2026-02-19T10:00:00.000Z",
      },
      beta: {
        word: "beta",
        definition: "second",
        repetition: 2,
        lapses: 0,
        efactor: 2.5,
        interval: 2,
        nextReviewDate: "2026-02-20",
        status: "learning",
        updatedAt: "2026-02-19T10:45:00.000Z",
      },
    } as Record<string, SrsVocabularyItem>;

    const result = calculateStatsMetrics(deck, progress, weeklyActivity);
    expect(result.estimatedStudyMinutes).toBe(45);
  });
});
