import { describe, expect, test, beforeEach } from "vitest";
import {
  ADAPTIVE_ROLLOUT_STORAGE_KEY,
  getAdaptiveRolloutConfig,
  isAdaptiveDifficultyEnabledForGame,
  resetAdaptiveRolloutConfig,
  setAdaptiveDifficultyEnabledForGame,
  setAdaptiveDifficultyGlobalEnabled,
} from "@/lib/adaptiveRollout";

describe("adaptiveRollout", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("enables adaptive difficulty by default", () => {
    expect(isAdaptiveDifficultyEnabledForGame("error_hunter")).toBe(true);
    expect(isAdaptiveDifficultyEnabledForGame("tech_trivia")).toBe(true);
  });

  test("disables and re-enables a single game with local toggle", () => {
    setAdaptiveDifficultyEnabledForGame("docs_game", false);
    expect(isAdaptiveDifficultyEnabledForGame("docs_game")).toBe(false);

    setAdaptiveDifficultyEnabledForGame("docs_game", true);
    expect(isAdaptiveDifficultyEnabledForGame("docs_game")).toBe(true);
  });

  test("global toggle disables all games and can be restored", () => {
    setAdaptiveDifficultyGlobalEnabled(false);
    expect(isAdaptiveDifficultyEnabledForGame("error_hunter")).toBe(false);
    expect(isAdaptiveDifficultyEnabledForGame("tech_boss")).toBe(false);

    setAdaptiveDifficultyGlobalEnabled(true);
    expect(isAdaptiveDifficultyEnabledForGame("error_hunter")).toBe(true);
  });

  test("normalizes alias game ids in disabled list", () => {
    setAdaptiveDifficultyEnabledForGame("bug_hunter", false);
    expect(isAdaptiveDifficultyEnabledForGame("bug_hunter")).toBe(false);
    expect(isAdaptiveDifficultyEnabledForGame("code_bug_hunter")).toBe(false);
  });

  test("reset restores default rollout state", () => {
    setAdaptiveDifficultyGlobalEnabled(false);
    setAdaptiveDifficultyEnabledForGame("docs_game", false);
    resetAdaptiveRolloutConfig();

    const config = getAdaptiveRolloutConfig();
    expect(config.globalEnabled).toBe(true);
    expect(config.disabledGames).toHaveLength(0);
    expect(localStorage.getItem(ADAPTIVE_ROLLOUT_STORAGE_KEY)).toContain(
      '"globalEnabled":true',
    );
  });
});
