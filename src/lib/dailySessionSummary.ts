import { getAnalyticsEvents } from "@/lib/analytics";
import { toDateKey } from "@/lib/activityTracker";
import { GAME_CATEGORY, getGameFromEvent } from "@/lib/chartData";

export type FocusRoute = "english" | "math" | "dev";

export interface RouteSummary {
  attempts: number;
  correct: number;
  accuracy: number;
}

export interface DailySessionSummary {
  date: string;
  sessionsCompleted: number;
  totalAnswers: number;
  correctAnswers: number;
  wrongAnswers: number;
  accuracy: number;
  routes: Record<FocusRoute, RouteSummary>;
  strongestRoute: FocusRoute | null;
  weakestRoute: FocusRoute | null;
  rewardXp: number;
  rewardEligible: boolean;
  rewardClaimed: boolean;
}

const DAILY_SESSION_REWARD_KEY = "skillpal-daily-session-reward-claims";
const DAILY_SUMMARY_REWARD_XP = 40;

const ROUTES: FocusRoute[] = ["english", "math", "dev"];

const emptyRouteSummary = (): RouteSummary => ({
  attempts: 0,
  correct: 0,
  accuracy: 0,
});

const readRewardClaims = (): Record<string, boolean> => {
  if (typeof window === "undefined" || !window.localStorage) return {};
  try {
    const raw = localStorage.getItem(DAILY_SESSION_REWARD_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      return {};
    }
    return Object.fromEntries(
      Object.entries(parsed).filter(
        (entry): entry is [string, boolean] => typeof entry[1] === "boolean",
      ),
    );
  } catch {
    return {};
  }
};

const writeRewardClaims = (claims: Record<string, boolean>) => {
  if (typeof window === "undefined" || !window.localStorage) return;
  localStorage.setItem(DAILY_SESSION_REWARD_KEY, JSON.stringify(claims));
};

const toPercent = (value: number) => Math.round(value * 10) / 10;

const pickStrongestRoute = (
  routes: Record<FocusRoute, RouteSummary>,
): FocusRoute | null => {
  const candidates = ROUTES.filter((route) => routes[route].attempts > 0);
  if (candidates.length === 0) return null;

  const sorted = [...candidates].sort((left, right) => {
    const accuracyDelta = routes[right].accuracy - routes[left].accuracy;
    if (accuracyDelta !== 0) return accuracyDelta;
    return routes[right].attempts - routes[left].attempts;
  });

  return sorted[0] ?? null;
};

const pickWeakestRoute = (
  routes: Record<FocusRoute, RouteSummary>,
  strongestRoute: FocusRoute | null,
): FocusRoute | null => {
  const candidates = ROUTES.filter((route) => routes[route].attempts > 0);
  if (candidates.length <= 1) return null;

  const sorted = [...candidates].sort((left, right) => {
    const accuracyDelta = routes[left].accuracy - routes[right].accuracy;
    if (accuracyDelta !== 0) return accuracyDelta;
    return routes[right].attempts - routes[left].attempts;
  });

  const weakest = sorted[0] ?? null;
  if (!weakest || weakest === strongestRoute) return null;
  return weakest;
};

export const isDailySessionRewardClaimed = (dateKey = toDateKey()): boolean => {
  const claims = readRewardClaims();
  return Boolean(claims[dateKey]);
};

export const claimDailySessionReward = (dateKey = toDateKey()): boolean => {
  if (isDailySessionRewardClaimed(dateKey)) return false;
  const claims = readRewardClaims();
  claims[dateKey] = true;
  writeRewardClaims(claims);
  return true;
};

export const getTodaySessionSummary = (
  dateKey = toDateKey(),
): DailySessionSummary => {
  const events = getAnalyticsEvents().filter(
    (event) => toDateKey(new Date(event.timestamp)) === dateKey,
  );

  const routeBuckets: Record<FocusRoute, RouteSummary> = {
    english: emptyRouteSummary(),
    math: emptyRouteSummary(),
    dev: emptyRouteSummary(),
  };

  let sessionsCompleted = 0;
  let correctAnswers = 0;
  let wrongAnswers = 0;

  events.forEach((event) => {
    if (event.name === "session_end") {
      sessionsCompleted += 1;
      return;
    }

    if (event.name !== "item_correct" && event.name !== "item_wrong") {
      return;
    }

    const game = getGameFromEvent(event);
    const route = GAME_CATEGORY[game] ?? "english";
    const bucket = routeBuckets[route];
    bucket.attempts += 1;
    if (event.name === "item_correct") {
      bucket.correct += 1;
      correctAnswers += 1;
    } else {
      wrongAnswers += 1;
    }
  });

  ROUTES.forEach((route) => {
    const bucket = routeBuckets[route];
    bucket.accuracy =
      bucket.attempts > 0 ? toPercent((bucket.correct / bucket.attempts) * 100) : 0;
  });

  const totalAnswers = correctAnswers + wrongAnswers;
  const accuracy =
    totalAnswers > 0 ? toPercent((correctAnswers / totalAnswers) * 100) : 0;
  const strongestRoute = pickStrongestRoute(routeBuckets);
  const weakestRoute = pickWeakestRoute(routeBuckets, strongestRoute);
  const rewardEligible =
    sessionsCompleted >= 2 && totalAnswers >= 10 && accuracy >= 70;

  return {
    date: dateKey,
    sessionsCompleted,
    totalAnswers,
    correctAnswers,
    wrongAnswers,
    accuracy,
    routes: routeBuckets,
    strongestRoute,
    weakestRoute,
    rewardXp: DAILY_SUMMARY_REWARD_XP,
    rewardEligible,
    rewardClaimed: isDailySessionRewardClaimed(dateKey),
  };
};

export const FOCUS_ROUTE_LABEL: Record<FocusRoute, string> = {
  english: "English Interview",
  math: "Math Speed",
  dev: "Dev Reasoning",
};
