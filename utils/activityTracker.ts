const GLOBAL_ACTIVITY_KEY = "global-daily-activity";

interface DailyActivity {
  score: number;
}

/**
 * Key format: YYYY-MM-DD
 */
const toDateKey = (date: number | Date = new Date()): string => {
  const d = new Date(date);
  return d.toISOString().split("T")[0];
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

export const trackActivity = (intensity: number = 1) => {
  const data = getGlobalActivityData();
  const today = toDateKey();

  if (!data[today]) {
    data[today] = { score: 0 };
  }

  data[today].score += intensity;
  saveGlobalActivityData(data);
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

  for (let i = 0; i < dates.length; i++) {
    const dStr = dates[i];
    const timestamp = new Date(dStr).getTime();

    if (tempStreak === 0) {
      tempStreak = 1;
    } else {
      // Check if it's the exact next day
      if (Math.abs(timestamp - expectedNextDay) < 1000 * 60 * 60 * 24 * 1.5) {
        // within 36 hours to account for DST
        tempStreak++;
      } else {
        tempStreak = 1; // broken streak
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

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const end = today.getTime();
  const DAY_MS = 86400000;
  const start = end - (days - 1) * DAY_MS;

  return Array.from({ length: days }, (_, index) => {
    const timestamp = start + index * DAY_MS;
    const dateStr = toDateKey(timestamp);
    const score = data[dateStr]?.score || 0;
    return { date: dateStr, count: score };
  });
};
