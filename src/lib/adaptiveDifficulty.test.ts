import { describe, test, expect } from "vitest";
import {
  ADAPTIVE_DIFFICULTY_LOG_KEY,
  appendAdaptiveDifficultyLog,
  createAdaptiveDifficultyEngine,
  getAdaptiveDifficultyLog,
  getDifficultyIndex,
  setDifficultyLevel,
  shouldDownshiftByWrongStreak,
  shouldUpshiftByCorrectStreak,
  shiftDifficultyLevel,
} from "@/lib/adaptiveDifficulty";
import {
  resetAdaptiveRolloutConfig,
  setAdaptiveDifficultyEnabledForGame,
} from "@/lib/adaptiveRollout";

describe("adaptiveDifficulty", () => {
  test("skips adaptive auto-shift when rollout is disabled for a game", () => {
    const engine = createAdaptiveDifficultyEngine({
      gameId: "docs_game",
      levels: ["easy", "normal", "hard"] as const,
      defaultLevel: "normal",
    });

    setAdaptiveDifficultyEnabledForGame("docs_game", false);
    const transition = engine.increaseLevel("normal", "rule_upshift");
    expect(transition.changed).toBe(false);
    expect(transition.nextLevel).toBe("normal");
    expect(transition.reason).toBe("system_reset");

    resetAdaptiveRolloutConfig();
  });

  test("shifts difficulty up and down within bounds", () => {
    const levels = ["A2", "B1", "B2", "C1"] as const;

    const up = shiftDifficultyLevel({
      gameId: "error_hunter",
      levels,
      currentLevel: "B1",
      direction: "up",
      reason: "manual_up",
      steps: 2,
      timestamp: "2026-03-04T00:00:00.000Z",
    });
    expect(up.nextLevel).toBe("C1");
    expect(up.changed).toBe(true);

    const down = shiftDifficultyLevel({
      gameId: "error_hunter",
      levels,
      currentLevel: "A2",
      direction: "down",
      reason: "manual_down",
      timestamp: "2026-03-04T00:00:00.000Z",
    });
    expect(down.nextLevel).toBe("A2");
    expect(down.changed).toBe(false);
  });

  test("sets difficulty directly and reports changed flag", () => {
    const levels = ["easy", "normal", "hard"] as const;

    const sameLevel = setDifficultyLevel({
      gameId: "tech_matchup",
      levels,
      currentLevel: "normal",
      targetLevel: "normal",
      reason: "manual_select",
      timestamp: "2026-03-04T00:00:00.000Z",
    });
    expect(sameLevel.changed).toBe(false);
    expect(sameLevel.direction).toBe("set");

    const changedLevel = setDifficultyLevel({
      gameId: "tech_matchup",
      levels,
      currentLevel: "normal",
      targetLevel: "hard",
      reason: "manual_select",
      timestamp: "2026-03-04T00:00:00.000Z",
    });
    expect(changedLevel.nextLevel).toBe("hard");
    expect(changedLevel.changed).toBe(true);
  });

  test("engine exposes a unified API for per-game difficulty control", () => {
    const engine = createAdaptiveDifficultyEngine({
      gameId: "taboo_english",
      levels: ["A2", "B1", "B2", "C1"] as const,
      defaultLevel: "B1",
    });

    expect(engine.defaultLevel).toBe("B1");
    expect(getDifficultyIndex(engine.levels, "B2")).toBe(2);

    const up = engine.increaseLevel("B1", "rule_upshift");
    expect(up.nextLevel).toBe("B2");
    expect(up.reason).toBe("rule_upshift");

    const down = engine.decreaseLevel("A2", "rule_downshift");
    expect(down.nextLevel).toBe("A2");
    expect(down.changed).toBe(false);

    const set = engine.setLevel("B2", "C1");
    expect(set.nextLevel).toBe("C1");
    expect(set.reason).toBe("manual_select");
  });

  test("throws for invalid level definitions", () => {
    expect(() =>
      createAdaptiveDifficultyEngine({
        gameId: "invalid",
        levels: [] as const,
        defaultLevel: "B1",
      }),
    ).toThrow(/at least one level/i);

    expect(() =>
      setDifficultyLevel({
        gameId: "invalid",
        levels: ["A2", "B1"] as const,
        currentLevel: "A2",
        targetLevel: "C1" as any,
        reason: "manual_select",
      }),
    ).toThrow(/Unknown target level/i);
  });

  test("downshift rule uses a 2-3 errors minimum threshold", () => {
    expect(shouldDownshiftByWrongStreak(1)).toBe(false);
    expect(shouldDownshiftByWrongStreak(2, 2)).toBe(true);
    expect(shouldDownshiftByWrongStreak(2, 3)).toBe(false);
    expect(shouldDownshiftByWrongStreak(3, 3)).toBe(true);
  });

  test("upshift rule uses a 2-3 correct streak threshold", () => {
    expect(shouldUpshiftByCorrectStreak(1)).toBe(false);
    expect(shouldUpshiftByCorrectStreak(2, 2)).toBe(true);
    expect(shouldUpshiftByCorrectStreak(2, 3)).toBe(false);
    expect(shouldUpshiftByCorrectStreak(3, 3)).toBe(true);
  });

  test("persists adaptive difficulty log entries with cause", () => {
    localStorage.clear();

    appendAdaptiveDifficultyLog({
      gameId: "error_hunter",
      previousLevel: "C1",
      nextLevel: "B2",
      direction: "down",
      reason: "rule_downshift",
      changed: true,
      timestamp: "2026-03-04T00:00:00.000Z",
      trigger: "consecutive_wrong",
      details: { consecutiveErrors: 3 },
    });

    const log = getAdaptiveDifficultyLog();
    expect(log).toHaveLength(1);
    expect(log[0].gameId).toBe("error_hunter");
    expect(log[0].trigger).toBe("consecutive_wrong");
    expect(log[0].details?.consecutiveErrors).toBe(3);
    expect(localStorage.getItem(ADAPTIVE_DIFFICULTY_LOG_KEY)).toContain(
      "rule_downshift",
    );
  });

  test("does not persist log entries while rollout is disabled for that game", () => {
    localStorage.clear();
    setAdaptiveDifficultyEnabledForGame("tech_trivia", false);

    appendAdaptiveDifficultyLog({
      gameId: "tech_trivia",
      previousLevel: "normal",
      nextLevel: "hard",
      direction: "up",
      reason: "rule_upshift",
      changed: true,
      timestamp: "2026-03-04T00:00:00.000Z",
      trigger: "consecutive_correct",
    });

    const log = getAdaptiveDifficultyLog();
    expect(log).toHaveLength(0);

    resetAdaptiveRolloutConfig();
  });
});
