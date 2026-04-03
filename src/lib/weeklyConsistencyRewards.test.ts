import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  claimWeeklyConsistencyReward,
  getWeeklyConsistencyStatus,
  isWeeklyConsistencyClaimed,
} from "@/lib/weeklyConsistencyRewards";

describe("weeklyConsistencyRewards", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-03-06T12:00:00"));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("returns no eligible tiers when there is no activity this week", () => {
    const status = getWeeklyConsistencyStatus();
    expect(status.activeDays).toBe(0);
    expect(status.tiers.every((tier) => !tier.eligible)).toBe(true);
  });

  it("calculates active days and supports one-time claims", () => {
    localStorage.setItem(
      "global-daily-activity",
      JSON.stringify({
        "2026-03-02": { xp: 10, cards: 0, time: 0, score: 0 },
        "2026-03-03": { xp: 0, cards: 2, time: 0, score: 0 },
        "2026-03-04": { xp: 20, cards: 0, time: 0, score: 0 },
        "2026-03-05": { xp: 0, cards: 0, time: 12, score: 0 },
        "2026-03-06": { xp: 5, cards: 0, time: 0, score: 0 },
      }),
    );

    const status = getWeeklyConsistencyStatus();
    expect(status.activeDays).toBe(5);
    expect(
      status.tiers.find((tier) => tier.id === "consistency_3")?.eligible,
    ).toBe(true);
    expect(
      status.tiers.find((tier) => tier.id === "consistency_5")?.eligible,
    ).toBe(true);
    expect(
      status.tiers.find((tier) => tier.id === "consistency_7")?.eligible,
    ).toBe(false);

    const claim = claimWeeklyConsistencyReward("consistency_5");
    expect(claim.ok).toBe(true);
    if (claim.ok) {
      expect(claim.rewardXp).toBe(60);
    }

    expect(isWeeklyConsistencyClaimed(status.weekKey, "consistency_5")).toBe(
      true,
    );
    expect(claimWeeklyConsistencyReward("consistency_5")).toEqual({
      ok: false,
      reason: "already_claimed",
    });
  });
});
