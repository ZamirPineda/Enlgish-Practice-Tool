import { getStreakFreezes } from "@/lib/xpStore";

const GLOBAL_ACTIVITY_KEY = "global-daily-activity";

import { loadSettings } from "./settingsStore";

interface DailyActivity {
  score?: number; // legacy backwards compatibility
  xp: number;
  cards: number;
  time: number; // in minutes
}

/**
 * Key format: YYYY-MM-DD
 * Applies the dayOffsetHours from settings to calculate which local day a timestamp belongs to.
 */
export const toDateKey = (date: number | Date = new Date()): string => {
  const settings = loadSettings();
  const offsetHours = settings.dayOffsetHours ?? 3;

  const d = new Date(date);
  // Subtract the offset hours so that, e.g., 2 AM Tuesday becomes Monday
  d.setHours(d.getHours() - offsetHours);

  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const getGlobalActivityData = (): Record<string, DailyActivity> => {
  if (typeof window === "undefined" || !window.localStorage) return {};
  const raw = localStorage.getItem(GLOBAL_ACTIVITY_KEY);
  if (!raw) return {};
  try {
    return JSON.parse(raw);
  } catch {
    return {};
  }
};

export const saveGlobalActivityData = (data: Record<string, DailyActivity>) => {
  if (typeof window === "undefined" || !window.localStorage) return;
  localStorage.setItem(GLOBAL_ACTIVITY_KEY, JSON.stringify(data));
};

export const trackActivity = (activity: {
  intensity?: number;
  xp?: number;
  cards?: number;
  time?: number;
}) => {
  const data = getGlobalActivityData();
  const today = toDateKey();

  if (!data[today]) {
    data[today] = { score: 0, xp: 0, cards: 0, time: 0 };
  } else {
    // Migrate old format to new format on the fly if needed
    if (data[today].xp === undefined) data[today].xp = 0;
    if (data[today].cards === undefined) data[today].cards = 0;
    if (data[today].time === undefined) data[today].time = 0;
  }

  // legacy backwards compatibility for external callers using intensity
  if (activity.intensity) {
    data[today].score = (data[today].score || 0) + activity.intensity;
  }
  if (activity.xp) data[today].xp += activity.xp;
  if (activity.cards) data[today].cards += activity.cards;
  if (activity.time) data[today].time += activity.time;

  saveGlobalActivityData(data);
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("activityUpdated"));
  }
};

export const getGlobalStreak = (): { current: number; best: number } => {
  const data = getGlobalActivityData();
  const dates = Object.keys(data).sort(); // Sorts YYYY-MM-DD alphabetically/chronologically

  if (dates.length === 0) return { current: 0, best: 0 };

  let currentStreak = 0;
  let bestStreak = 0;
  let tempStreak = 0;

  const todayStr = toDateKey();
  const yesterdayDate = new Date();
  yesterdayDate.setDate(yesterdayDate.getDate() - 1);
  const yesterdayStr = toDateKey(yesterdayDate);

  let expectedNextDay = -1;

  // Track consumed freezes for logic
  let consumedFreezes = 0;
  let initialFreezes = getStreakFreezes();

  for (let i = 0; i < dates.length; i++) {
    const dStr = dates[i];
    const timestamp = new Date(dStr).getTime();

    if (tempStreak === 0) {
      tempStreak = 1;
    } else {
      // Check if it's the exact next day
      const daysDiff = Math.round(
        (timestamp - expectedNextDay) / (1000 * 60 * 60 * 24),
      );

      if (daysDiff <= 0) {
        // Less than 24h due to timezone/DST, perfectly valid next day or same day
        tempStreak++;
      } else if (daysDiff > 0 && daysDiff <= initialFreezes - consumedFreezes) {
        // Missed some days, but we have enough freezes to cover the gap
        consumedFreezes += daysDiff;
        tempStreak += 1; // You don't get streak points for missed days, you just don't lose the streak

        // Remove freeze from storage right now if we are on the current streak evaluation
        if (typeof window !== "undefined" && window.localStorage) {
          const actualFreezes = parseInt(
            localStorage.getItem("skillpal-streak-freezes") || "0",
            10,
          );
          if (actualFreezes >= daysDiff) {
            localStorage.setItem(
              "skillpal-streak-freezes",
              (actualFreezes - daysDiff).toString(),
            );
            window.dispatchEvent(new Event("streakFreezesUpdated"));
          }
        }
      } else {
        tempStreak = 1; // broken streak
        consumedFreezes = 0; // reset logic consumed freezes for the new streak
      }
    }

    if (tempStreak > bestStreak) {
      bestStreak = tempStreak;
    }

    // Set expectation for next iteration
    expectedNextDay = timestamp + 1000 * 60 * 60 * 24;

    // If this is the last item, check if the streak reaches today or yesterday
    if (i === dates.length - 1) {
      if (dStr === todayStr || dStr === yesterdayStr) {
        currentStreak = tempStreak;
      }
    }
  }

  return { current: currentStreak, best: bestStreak };
};

export const getGlobalHeatmapData = (days = 365) => {
  const data = getGlobalActivityData();

  // Build the range using already-offset date keys to avoid shifting
  // each cell one day back when dayOffsetHours > 0.
  const toPlainDateKey = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const parseDateKey = (dateKey: string): Date => {
    const [year, month, day] = dateKey.split("-").map(Number);
    return new Date(year, month - 1, day, 12, 0, 0, 0);
  };

  const endDate = parseDateKey(toDateKey());
  const startDate = new Date(endDate);
  startDate.setDate(startDate.getDate() - (days - 1));

  // Pad back to Sunday so the first grid cell is always Sunday
  const padDays = startDate.getDay();
  const gridStartDate = new Date(startDate);
  gridStartDate.setDate(gridStartDate.getDate() - padDays);
  const totalDays = days + padDays;

  return Array.from({ length: totalDays }, (_, index) => {
    const cellDate = new Date(gridStartDate);
    cellDate.setDate(gridStartDate.getDate() + index);
    const dateStr = toPlainDateKey(cellDate);
    const score = (data[dateStr]?.score || 0) + (data[dateStr]?.cards || 0); // fallback or cards for heatmap visual
    return { date: dateStr, count: score };
  });
};
