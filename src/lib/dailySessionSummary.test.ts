import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  clearAnalyticsEventsForTesting,
  trackAnalyticsEvent,
} from "@/lib/analytics";
import {
  claimDailySessionReward,
  getTodaySessionSummary,
  isDailySessionRewardClaimed,
} from "@/lib/dailySessionSummary";

describe("dailySessionSummary", () => {
  beforeEach(() => {
    localStorage.clear();
    clearAnalyticsEventsForTesting();
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-03-03T12:00:00"));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("returns an empty summary when there are no events today", () => {
    const summary = getTodaySessionSummary();

    expect(summary.sessionsCompleted).toBe(0);
    expect(summary.totalAnswers).toBe(0);
    expect(summary.accuracy).toBe(0);
    expect(summary.rewardEligible).toBe(false);
    expect(summary.rewardClaimed).toBe(false);
  });

  it("builds route stats and supports one-time daily reward claim", () => {
    trackAnalyticsEvent("session_start", { game: "speed_builder" });
    for (let i = 0; i < 6; i++) {
      trackAnalyticsEvent("item_correct", { game: "speed_builder" });
    }
    for (let i = 0; i < 2; i++) {
      trackAnalyticsEvent("item_wrong", { game: "speed_builder" });
    }
    trackAnalyticsEvent("session_end", { game: "speed_builder" });

    trackAnalyticsEvent("session_start", { game: "math_game" });
    for (let i = 0; i < 2; i++) {
      trackAnalyticsEvent("item_correct", { game: "math_game" });
    }
    trackAnalyticsEvent("session_end", { game: "math_game" });

    const summary = getTodaySessionSummary();
    expect(summary.sessionsCompleted).toBe(2);
    expect(summary.totalAnswers).toBe(10);
    expect(summary.correctAnswers).toBe(8);
    expect(summary.wrongAnswers).toBe(2);
    expect(summary.accuracy).toBe(80);
    expect(summary.strongestRoute).toBe("math");
    expect(summary.weakestRoute).toBe("english");
    expect(summary.rewardEligible).toBe(true);
    expect(summary.rewardClaimed).toBe(false);

    expect(claimDailySessionReward(summary.date)).toBe(true);
    expect(isDailySessionRewardClaimed(summary.date)).toBe(true);
    expect(claimDailySessionReward(summary.date)).toBe(false);
  });
});
