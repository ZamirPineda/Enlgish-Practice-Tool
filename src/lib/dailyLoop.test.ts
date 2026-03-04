import { describe, test, expect, beforeEach, afterEach, vi } from "vitest";
import { AnalyticsEvent } from "@/lib/analytics";
import {
  claimDailyLoopReward,
  getTodayDailyLoop,
  markDailyLoopStepComplete,
  startDailyLoop,
  syncDailyLoopWithAnalytics,
} from "@/lib/dailyLoop";

describe("dailyLoop", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-03-03T12:00:00.000Z"));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  test("creates a 4-step loop with 2 english + 1 math + 1 dev", () => {
    const loop = startDailyLoop("english_interview", "2026-03-03");

    expect(loop.steps).toHaveLength(4);
    expect(
      loop.steps.filter((step) => step.category === "english"),
    ).toHaveLength(2);
    expect(loop.steps.filter((step) => step.category === "math")).toHaveLength(
      1,
    );
    expect(loop.steps.filter((step) => step.category === "dev")).toHaveLength(
      1,
    );

    expect(getTodayDailyLoop("2026-03-03")?.steps).toHaveLength(4);
  });

  test("marks steps as completed from analytics session_end events", () => {
    const loop = startDailyLoop("dev_reasoning", "2026-03-03");

    const events: AnalyticsEvent[] = loop.steps.map((step, index) => ({
      name: "session_end",
      timestamp: `2026-03-03T12:0${index}:00.000Z`,
      payload: { game: step.gameId, duration: 45 },
    }));

    const synced = syncDailyLoopWithAnalytics(loop, events);

    expect(synced.steps.every((step) => Boolean(step.completedAt))).toBe(true);
    expect(synced.completedAt).toBeTruthy();
  });

  test("claims reward only once after completion", () => {
    let loop = startDailyLoop("math_speed", "2026-03-03");
    loop.steps.forEach((step, index) => {
      loop = markDailyLoopStepComplete(
        loop,
        step.id,
        `2026-03-03T12:0${index}:00.000Z`,
      );
    });

    localStorage.setItem("skillpal-daily-loop-state", JSON.stringify(loop));

    expect(claimDailyLoopReward("2026-03-03")).toBe(true);
    expect(claimDailyLoopReward("2026-03-03")).toBe(false);
    expect(getTodayDailyLoop("2026-03-03")?.rewardClaimed).toBe(true);
  });
});
