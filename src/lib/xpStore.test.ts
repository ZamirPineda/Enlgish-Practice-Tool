import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { getDailyQuests } from "./xpStore";
import { loadSettings, saveSettings } from "./settingsStore";

describe("xpStore daily quests", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("resets quests after the configured day offset boundary", () => {
    const settings = loadSettings();
    saveSettings({ ...settings, dayOffsetHours: 3 });

    vi.setSystemTime(new Date("2026-03-03T23:30:00"));
    const dayOne = getDailyQuests();
    expect(dayOne.date).toBe("2026-03-03");

    const completedQuests = dayOne.quests.map((quest) => ({
      ...quest,
      current: quest.target,
      completed: true,
    }));

    localStorage.setItem(
      "skillpal-daily-quests",
      JSON.stringify({
        date: dayOne.date,
        quests: completedQuests,
      }),
    );

    vi.setSystemTime(new Date("2026-03-04T02:30:00"));
    const beforeCutoff = getDailyQuests();
    expect(beforeCutoff.date).toBe("2026-03-03");
    expect(beforeCutoff.quests.every((quest) => quest.completed)).toBe(true);

    vi.setSystemTime(new Date("2026-03-04T03:30:00"));
    const afterCutoff = getDailyQuests();
    expect(afterCutoff.date).toBe("2026-03-04");
    expect(afterCutoff.quests.every((quest) => !quest.completed)).toBe(true);
    expect(afterCutoff.quests.every((quest) => quest.current === 0)).toBe(true);
  });
});
