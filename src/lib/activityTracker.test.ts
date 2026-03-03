import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";
import {
  trackActivity,
  getGlobalActivityData,
  toDateKey,
  getGlobalStreak,
} from "./activityTracker";
import { loadSettings } from "./settingsStore";

// Mock the settings Store to control dayOffsetHours
vi.mock("./settingsStore", () => ({
  loadSettings: vi.fn(),
  appSettingsSchema: { parse: vi.fn() },
}));

// Mock the xp store (streak freezes)
vi.mock("./xpStore", () => ({
  getStreakFreezes: vi.fn().mockReturnValue(0),
}));

describe("activityTracker API & logic", () => {
  beforeEach(() => {
    localStorage.clear();
    // Default mock setup: 3 AM cutoff, similar to the default schema
    vi.mocked(loadSettings).mockReturnValue({
      dayOffsetHours: 3,
      theme: "dark",
    });

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.clearAllMocks();
  });

  it("adds to cards, time, and xp independently", () => {
    trackActivity({ xp: 50, time: 10, cards: 5 });
    trackActivity({ cards: 10 });
    trackActivity({ xp: 20 });
    const today = toDateKey();
    const data = getGlobalActivityData();

    expect(data[today]).toBeDefined();
    expect(data[today].xp).toBe(70);
    expect(data[today].time).toBe(10);
    expect(data[today].cards).toBe(15);
  });

  it("calculates midnight timezone boundary using offset 3 AM", () => {
    // 2:59 AM on a Tuesday - should fall into Monday
    const lateNightDate = new Date("2026-03-03T02:59:59");
    vi.setSystemTime(lateNightDate);

    vi.mocked(loadSettings).mockReturnValue({
      dayOffsetHours: 3,
      theme: "dark",
    });

    trackActivity({ xp: 10 });

    const key = toDateKey(lateNightDate);
    expect(key).toBe("2026-03-02"); // Monday
    const data = getGlobalActivityData();
    expect(data["2026-03-02"].xp).toBe(10);
  });

  it("crosses the 3 AM boundary safely into the new day", () => {
    // 3:01 AM on a Tuesday - should fall into Tuesday
    const morningDate = new Date("2026-03-03T03:01:00");
    vi.setSystemTime(morningDate);

    trackActivity({ xp: 20 });

    const key = toDateKey(morningDate);
    expect(key).toBe("2026-03-03"); // Tuesday
    const data = getGlobalActivityData();
    expect(data["2026-03-03"].xp).toBe(20);
  });

  it("maintains the global streak ignoring timezone oddities based on the offset local day", () => {
    // Register activity on Monday (2:59 AM Tuesday = local Monday)
    vi.setSystemTime(new Date("2026-03-03T02:59:59"));
    trackActivity({ cards: 5 });

    // Register activity on Tuesday (10:00 PM Tuesday = local Tuesday)
    vi.setSystemTime(new Date("2026-03-03T22:00:00"));
    trackActivity({ cards: 5 });

    // Both are different local days, streak should be 2.
    // Ensure we are testing the query from "Today" (Wednesday) or late Tuesday to accurately track.
    const { current, best } = getGlobalStreak();

    expect(current).toBe(2);
    expect(best).toBe(2);
  });
});
