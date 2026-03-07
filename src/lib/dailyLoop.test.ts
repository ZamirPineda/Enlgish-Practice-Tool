import { describe, test, expect, beforeEach, afterEach, vi } from "vitest";
import { AnalyticsEvent } from "@/lib/analytics";
import { ADAPTIVE_DIFFICULTY_LOG_KEY } from "@/lib/adaptiveDifficulty";
import { resetContentSelectionHistory } from "@/lib/contentSelectionHistory";
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
    resetContentSelectionHistory();
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

  test("keeps ordered sequence english, english, math, dev for any focus route", () => {
    const expectedOrder = ["english", "english", "math", "dev"];
    const focusRoutes = [
      "english_interview",
      "math_speed",
      "dev_reasoning",
    ] as const;

    focusRoutes.forEach((focusRoute) => {
      const loop = startDailyLoop(focusRoute, "2026-03-03");
      expect(loop.steps.map((step) => step.category)).toEqual(expectedOrder);
    });
  });

  test("adapts selected games by focus route while keeping the same category mix", () => {
    const englishLoop = startDailyLoop("english_interview", "2026-03-03");
    const devLoop = startDailyLoop("dev_reasoning", "2026-03-03");

    const englishGameIds = englishLoop.steps
      .filter((step) => step.category === "english")
      .map((step) => step.gameId);
    const devGameIds = devLoop.steps
      .filter((step) => step.category === "english")
      .map((step) => step.gameId);

    expect(englishLoop.focusRoute).toBe("english_interview");
    expect(devLoop.focusRoute).toBe("dev_reasoning");
    expect(englishLoop.steps).toHaveLength(4);
    expect(devLoop.steps).toHaveLength(4);
    expect(englishGameIds).not.toEqual(devGameIds);
  });

  test("rotates english games across different loop days using inventory history", () => {
    const firstLoop = startDailyLoop("english_interview", "2026-03-03");
    const secondLoop = startDailyLoop("english_interview", "2026-03-04");

    const firstEnglishGameIds = firstLoop.steps
      .filter((step) => step.category === "english")
      .map((step) => step.gameId);
    const secondEnglishGameIds = secondLoop.steps
      .filter((step) => step.category === "english")
      .map((step) => step.gameId);

    expect(firstEnglishGameIds).toHaveLength(2);
    expect(secondEnglishGameIds).toHaveLength(2);
    expect(secondEnglishGameIds).not.toEqual(firstEnglishGameIds);
    expect(
      secondEnglishGameIds.some((gameId) => firstEnglishGameIds.includes(gameId)),
    ).toBe(false);
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

  test("injects suggested adaptive level per game from latest adaptive logs", () => {
    localStorage.setItem(
      ADAPTIVE_DIFFICULTY_LOG_KEY,
      JSON.stringify([
        {
          gameId: "math_game",
          previousLevel: "normal",
          nextLevel: "hard",
          direction: "up",
          reason: "rule_upshift",
          changed: true,
          timestamp: "2026-03-03T11:50:00.000Z",
          trigger: "consecutive_correct",
        },
      ]),
    );

    const loop = startDailyLoop("english_interview", "2026-03-03");
    const mathStep = loop.steps.find((step) => step.gameId === "math_game");
    expect(mathStep).toBeDefined();
    expect(mathStep?.adaptiveLevel).toBe("hard");
  });
});
