import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { SrsVocabularyItem } from "../types";
import {
  calculateStatsMetrics,
  VaultProgress,
  WeeklyActivitySummary,
} from "../utils/statsMetrics";
import { getIsoWeekKey } from "../utils/srs";
import { AppSettings, loadSettings } from "../utils/settingsStore";
import { AnalyticsEventName, getAnalyticsEvents } from "../utils/analytics";
import { useGlobalXp } from "../utils/xpStore";
import { getRankForLevel } from "../utils/levelRanks";
import Heatmap from "./Heatmap";
import ViewToolbar from "./ui/ViewToolbar";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  BarChart,
  Bar,
} from "recharts";
import {
  buildDailyActivityData,
  buildGameDistributionData,
} from "../utils/chartData";

const VAULT_DECK_KEY = "vocab-vault-deck";
const VAULT_PROGRESS_KEY = "vocab-vault-progress";
const VAULT_WEEKLY_ACTIVITY_KEY = "vocab-vault-weekly-activity";

const DEFAULT_PROGRESS: VaultProgress = {
  currentStreak: 0,
  bestStreak: 0,
  totalReviews: 0,
  lastReviewDate: null,
};

const readJson = <T,>(key: string, fallback: T): T => {
  const value = localStorage.getItem(key);
  if (!value) return fallback;
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
};

const buildAnalyticsSummary = (events: Array<{ name: AnalyticsEventName }>) => {
  const eventCounts: Record<AnalyticsEventName, number> = {
    session_start: 0,
    session_end: 0,
    item_correct: 0,
    item_wrong: 0,
    speaking_used: 0,
    weekly_review_completed: 0,
  };

  events.forEach((event) => {
    eventCounts[event.name] += 1;
  });

  const itemAttempts = eventCounts.item_correct + eventCounts.item_wrong;
  const itemAccuracy =
    itemAttempts > 0
      ? Math.round((eventCounts.item_correct / itemAttempts) * 1000) / 10
      : 0;

  return {
    ...eventCounts,
    itemAttempts,
    itemAccuracy,
  };
};

interface GameErrorBreakdownItem {
  game: string;
  total: number;
  reasons: Array<{ errorType: string; count: number }>;
}

interface ErrorTypeAggregateItem {
  errorType: string;
  count: number;
}

type GameErrorCountMap = Record<string, Record<string, number>>;

const prettifyAnalyticsLabel = (value: string) =>
  value
    .split("_")
    .map((token) => token.charAt(0).toUpperCase() + token.slice(1))
    .join(" ");

const buildGameErrorCountMap = (
  events: Array<{ name: AnalyticsEventName; payload: Record<string, unknown> }>,
): GameErrorCountMap => {
  const grouped: GameErrorCountMap = {};

  events.forEach((event) => {
    if (event.name !== "item_wrong") {
      return;
    }

    const game =
      typeof event.payload.game === "string"
        ? event.payload.game
        : "unknown_game";
    const errorType =
      typeof event.payload.errorType === "string"
        ? event.payload.errorType
        : "unknown_reason";

    if (!grouped[game]) {
      grouped[game] = {};
    }
    grouped[game][errorType] = (grouped[game][errorType] || 0) + 1;
  });

  return grouped;
};

const buildGameErrorBreakdown = (
  events: Array<{ name: AnalyticsEventName; payload: Record<string, unknown> }>,
): GameErrorBreakdownItem[] => {
  const grouped = buildGameErrorCountMap(events);

  return Object.entries(grouped)
    .map(([game, reasonsMap]) => {
      const reasons = Object.entries(reasonsMap)
        .map(([errorType, count]) => ({ errorType, count }))
        .sort((left, right) => right.count - left.count);

      return {
        game,
        total: reasons.reduce(
          (accumulator, item) => accumulator + item.count,
          0,
        ),
        reasons,
      };
    })
    .sort((left, right) => right.total - left.total);
};

const buildTopErrorTypes = (
  events: Array<{ name: AnalyticsEventName; payload: Record<string, unknown> }>,
  limit = 3,
): ErrorTypeAggregateItem[] => {
  const grouped = buildGameErrorCountMap(events);
  const totals: Record<string, number> = {};

  Object.values(grouped).forEach((gameMap) => {
    Object.entries(gameMap).forEach(([errorType, count]) => {
      totals[errorType] = (totals[errorType] || 0) + count;
    });
  });

  return Object.entries(totals)
    .map(([errorType, count]) => ({ errorType, count }))
    .sort((left, right) => right.count - left.count)
    .slice(0, limit);
};

const formatDelta = (value: number) => (value > 0 ? `+${value}` : `${value}`);

const getDeltaClass = (value: number) => {
  if (value > 0) return "text-emerald-400";
  if (value < 0) return "text-red-400";
  return "text-text-muted";
};

const FireIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6 text-orange-500"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z"
    />
  </svg>
);

const BookIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6 text-sky-500"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
    />
  </svg>
);

const TargetIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6 text-emerald-500"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M13 10V3L4 14h7v7l9-11h-7z"
    />
  </svg>
);

const ClockIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6 text-purple-500"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const StatsView: React.FC = () => {
  const currentWeekKey = getIsoWeekKey(new Date());
  const [activeTab, setActiveTab] = useState<"overview" | "charts">("overview");
  const [analyticsRange, setAnalyticsRange] = useState<"week" | "30d">("week");
  const [selectedErrorGame, setSelectedErrorGame] = useState<string>("all");

  const [deck] = useState<Record<string, SrsVocabularyItem>>(() =>
    readJson<Record<string, SrsVocabularyItem>>(VAULT_DECK_KEY, {}),
  );
  const [progress] = useState<VaultProgress>(() =>
    readJson<VaultProgress>(VAULT_PROGRESS_KEY, DEFAULT_PROGRESS),
  );
  const [weeklyActivity] = useState<WeeklyActivitySummary>(() =>
    readJson<WeeklyActivitySummary>(VAULT_WEEKLY_ACTIVITY_KEY, {
      weekKey: currentWeekKey,
      sessions: 0,
      attempts: 0,
      correct: 0,
      studyMinutes: 0,
    }),
  );
  const [settings] = useState<AppSettings>(() => loadSettings());
  const [analyticsEvents] = useState(() => getAnalyticsEvents());
  const { level } = useGlobalXp();
  const currentRank = useMemo(() => getRankForLevel(level), [level]);

  const metrics = useMemo(
    () =>
      calculateStatsMetrics(
        deck,
        { ...DEFAULT_PROGRESS, ...progress },
        weeklyActivity,
      ),
    [deck, progress, weeklyActivity],
  );
  const weeklyGoalProgress = Math.min(
    100,
    (metrics.weeklySummary.sessions / settings.weeklyGoalSessions) * 100,
  );

  const filteredAnalytics = useMemo(() => {
    if (analyticsRange === "week") {
      return analyticsEvents.filter(
        (event) => getIsoWeekKey(new Date(event.timestamp)) === currentWeekKey,
      );
    }

    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - 30);
    return analyticsEvents.filter(
      (event) => new Date(event.timestamp).getTime() >= cutoff.getTime(),
    );
  }, [analyticsEvents, analyticsRange, currentWeekKey]);

  const previousAnalytics = useMemo(() => {
    if (analyticsRange === "week") {
      const previousWeekDate = new Date();
      previousWeekDate.setDate(previousWeekDate.getDate() - 7);
      const previousWeekKey = getIsoWeekKey(previousWeekDate);

      return analyticsEvents.filter(
        (event) => getIsoWeekKey(new Date(event.timestamp)) === previousWeekKey,
      );
    }

    const now = new Date();
    const previousStart = new Date(now);
    previousStart.setDate(previousStart.getDate() - 60);
    const previousEnd = new Date(now);
    previousEnd.setDate(previousEnd.getDate() - 30);

    return analyticsEvents.filter((event) => {
      const time = new Date(event.timestamp).getTime();
      return time >= previousStart.getTime() && time < previousEnd.getTime();
    });
  }, [analyticsEvents, analyticsRange]);

  const analyticsSummary = useMemo(() => {
    return buildAnalyticsSummary(filteredAnalytics);
  }, [filteredAnalytics]);

  const previousAnalyticsSummary = useMemo(() => {
    return buildAnalyticsSummary(previousAnalytics);
  }, [previousAnalytics]);

  const analyticsErrorBreakdown = useMemo(() => {
    return buildGameErrorBreakdown(filteredAnalytics);
  }, [filteredAnalytics]);

  const topErrorTypes = useMemo(() => {
    return buildTopErrorTypes(filteredAnalytics, 3);
  }, [filteredAnalytics]);

  const previousErrorCountMap = useMemo(() => {
    return buildGameErrorCountMap(previousAnalytics);
  }, [previousAnalytics]);

  const availableErrorGames = useMemo(
    () => analyticsErrorBreakdown.map((item) => item.game),
    [analyticsErrorBreakdown],
  );

  useEffect(() => {
    if (selectedErrorGame === "all") {
      return;
    }

    if (!availableErrorGames.includes(selectedErrorGame)) {
      setSelectedErrorGame("all");
    }
  }, [availableErrorGames, selectedErrorGame]);

  const visibleErrorBreakdown = useMemo(() => {
    if (selectedErrorGame === "all") {
      return analyticsErrorBreakdown;
    }

    return analyticsErrorBreakdown.filter(
      (item) => item.game === selectedErrorGame,
    );
  }, [analyticsErrorBreakdown, selectedErrorGame]);

  const dailyActivityData = useMemo(
    () => buildDailyActivityData(analyticsEvents, 14),
    [analyticsEvents],
  );
  const gameDistributionData = useMemo(
    () => buildGameDistributionData(filteredAnalytics),
    [filteredAnalytics],
  );

  const sessionStartsDelta =
    analyticsSummary.session_start - previousAnalyticsSummary.session_start;
  const sessionEndsDelta =
    analyticsSummary.session_end - previousAnalyticsSummary.session_end;
  const itemAccuracyDelta =
    Math.round(
      (analyticsSummary.itemAccuracy - previousAnalyticsSummary.itemAccuracy) *
        10,
    ) / 10;
  const speakingUsedDelta =
    analyticsSummary.speaking_used - previousAnalyticsSummary.speaking_used;

  return (
    <div className="flex-1 overflow-y-auto overscroll-y-contain bg-background p-4 sm:p-8 pb-4 sm:pb-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <ViewToolbar
          className="bg-surface-1 border-border"
          left={
            <h1 className="text-3xl sm:text-4xl font-black text-text-primary tracking-tight">
              Dashboard
            </h1>
          }
          right={
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex flex-col items-end mr-2">
                <span className="text-xs text-text-muted font-bold uppercase tracking-wider">
                  Level {level}
                </span>
                <span className={`text-sm font-black ${currentRank.color}`}>
                  {currentRank.emoji} {currentRank.title}
                </span>
              </div>
              <Link
                to="/vault"
                className="inline-flex items-center justify-center min-h-[40px] px-4 py-2 rounded-lg bg-accent/20 hover:bg-accent/30 transition-colors text-accent font-bold text-sm"
              >
                Open Vault
              </Link>
            </div>
          }
        />

        <div className="flex bg-surface-2 p-1 rounded-xl w-fit">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === "overview" ? "bg-surface-1 text-text-primary shadow-sm" : "text-text-muted hover:text-text-primary"}`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab("charts")}
            className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === "charts" ? "bg-surface-1 text-text-primary shadow-sm" : "text-text-muted hover:text-text-primary"}`}
          >
            Stats for Nerds
          </button>
        </div>

        {metrics.totalCards === 0 ? (
          <section className="bg-surface-1 border border-border rounded-2xl p-12 text-center flex flex-col items-center justify-center animate-fade-in shadow-xl shadow-black/5">
            <div className="w-24 h-24 bg-surface-2 rounded-full flex items-center justify-center mb-6 shadow-inner ring-4 ring-surface-1">
              <span className="text-4xl drop-shadow-sm opacity-80 filter grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                📊
              </span>
            </div>
            <h2 className="text-text-primary text-3xl font-black mb-3 text-transparent bg-clip-text bg-gradient-to-r from-text-primary to-text-secondary">
              No data yet
            </h2>
            <p className="text-text-secondary mb-8 max-w-md mx-auto leading-relaxed text-base">
              Start your first review session in the Vocabulary Vault to unlock
              your learning statistics and track your progress over time.
            </p>
            <Link
              to="/vault"
              className="inline-flex px-8 py-4 rounded-xl bg-accent hover:bg-accent-hover transition-all duration-300 text-white font-black shadow-[0_8px_30px_rgb(0,0,0,0.12)] shadow-accent/20 hover:-translate-y-1 hover:shadow-accent/40"
            >
              Start first session
            </Link>
          </section>
        ) : activeTab === "overview" ? (
          <>
            {/* Top KPI Cards */}
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <article className="bg-surface-1 border border-border rounded-2xl p-5 flex items-start gap-4">
                <div className="p-3 bg-orange-500/10 rounded-xl">
                  <FireIcon />
                </div>
                <div>
                  <h2 className="text-xs uppercase text-text-muted font-bold mb-1">
                    Current Streak
                  </h2>
                  <p className="text-text-primary text-3xl font-black">
                    {metrics.currentStreak}{" "}
                    <span className="text-sm font-normal text-text-muted">
                      days
                    </span>
                  </p>
                  <p className="text-text-muted text-xs mt-1">
                    Best: {metrics.bestStreak} days
                  </p>
                </div>
              </article>

              <article className="bg-surface-1 border border-border rounded-2xl p-5 flex items-start gap-4">
                <div className="p-3 bg-sky-500/10 rounded-xl">
                  <BookIcon />
                </div>
                <div>
                  <h2 className="text-xs uppercase text-text-muted font-bold mb-1">
                    Total Cards
                  </h2>
                  <p className="text-text-primary text-3xl font-black">
                    {metrics.totalCards}
                  </p>
                  <p className="text-text-muted text-xs mt-1">
                    <span className="text-emerald-400">
                      {metrics.learnedCards} learned
                    </span>{" "}
                    ·{" "}
                    <span className="text-amber-400">
                      {metrics.pendingCards} pending
                    </span>
                  </p>
                </div>
              </article>

              <article className="bg-surface-1 border border-border rounded-2xl p-5 flex items-start gap-4">
                <div className="p-3 bg-emerald-500/10 rounded-xl">
                  <TargetIcon />
                </div>
                <div>
                  <h2 className="text-xs uppercase text-text-muted font-bold mb-1">
                    Global Accuracy
                  </h2>
                  <p className="text-text-primary text-3xl font-black">
                    {metrics.globalAccuracy}%
                  </p>
                  <div className="w-full bg-surface-2 h-1.5 rounded-full mt-2">
                    <div
                      className="bg-emerald-500 h-full rounded-full"
                      style={{ width: `${metrics.globalAccuracy}%` }}
                    ></div>
                  </div>
                </div>
              </article>

              <article className="bg-surface-1 border border-border rounded-2xl p-5 flex items-start gap-4">
                <div className="p-3 bg-purple-500/10 rounded-xl">
                  <ClockIcon />
                </div>
                <div>
                  <h2 className="text-xs uppercase text-text-muted font-bold mb-1">
                    Est. Study Time
                  </h2>
                  <p className="text-text-primary text-3xl font-black">
                    {metrics.estimatedStudyMinutes === null
                      ? "--"
                      : metrics.estimatedStudyMinutes}{" "}
                    <span className="text-sm font-normal text-text-muted">
                      min
                    </span>
                  </p>
                  <p className="text-text-muted text-xs mt-1">
                    Total time spent
                  </p>
                </div>
              </article>
            </section>

            <section className="bg-surface-1 border border-border rounded-2xl p-6">
              <h2 className="text-lg font-black text-text-primary mb-6">
                Weekly Summary
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <article className="bg-surface-2 border border-border rounded-xl p-4">
                  <p className="text-xs uppercase font-bold text-text-muted mb-1">
                    Sessions
                  </p>
                  <p className="text-2xl font-black text-text-primary">
                    {metrics.weeklySummary.sessions}
                  </p>
                </article>
                <article className="bg-surface-2 border border-border rounded-xl p-4">
                  <p className="text-xs uppercase font-bold text-text-muted mb-1">
                    Accuracy
                  </p>
                  <p className="text-2xl font-black text-emerald-400">
                    {metrics.weeklySummary.accuracy}%
                  </p>
                </article>
                <article className="bg-surface-2 border border-border rounded-xl p-4">
                  <p className="text-xs uppercase font-bold text-text-muted mb-1">
                    Study Time
                  </p>
                  <p className="text-2xl font-black text-purple-400">
                    {metrics.weeklySummary.studyMinutes} min
                  </p>
                </article>
                <article className="bg-surface-2 border border-border rounded-xl p-4">
                  <p className="text-xs uppercase font-bold text-text-muted mb-1">
                    Suggested Focus
                  </p>
                  <p className="text-sm font-bold text-text-primary">
                    {metrics.weeklySummary.focusSuggested}
                  </p>
                  <p className="text-xs text-success mt-2 font-bold uppercase tracking-widest">
                    Boss review{" "}
                    {metrics.weeklySummary.bossCompletedThisWeek
                      ? "done"
                      : "pending"}
                  </p>
                </article>
              </div>
              <div className="mt-4 bg-surface-2 border border-border rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs uppercase font-bold text-text-muted">
                    Weekly goal progress
                  </p>
                  <p className="text-xs font-bold text-text-secondary uppercase tracking-widest">
                    {metrics.weeklySummary.sessions} /{" "}
                    {settings.weeklyGoalSessions}
                  </p>
                </div>
                <div className="w-full bg-surface-1 h-2 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-accent transition-all duration-500"
                    style={{ width: `${weeklyGoalProgress}%` }}
                  ></div>
                </div>
              </div>
            </section>

            <section className="bg-surface-1 border border-border rounded-2xl p-6">
              <h2 className="text-lg font-black text-text-primary mb-6">
                Analytics (MVP)
              </h2>
              <div className="flex items-center gap-2 mb-4">
                <button
                  onClick={() => setAnalyticsRange("week")}
                  className={`min-h-[36px] px-3 py-1.5 rounded-md text-xs font-bold uppercase tracking-widest border transition-colors ${analyticsRange === "week" ? "bg-accent text-white border-accent" : "bg-surface-2 text-text-secondary border-border hover:bg-surface-hover"}`}
                >
                  This week
                </button>
                <button
                  onClick={() => setAnalyticsRange("30d")}
                  className={`min-h-[36px] px-3 py-1.5 rounded-md text-xs font-bold uppercase tracking-widest border transition-colors ${analyticsRange === "30d" ? "bg-accent text-white border-accent" : "bg-surface-2 text-text-secondary border-border hover:bg-surface-hover"}`}
                >
                  Last 30 days
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <article className="bg-surface-2 border border-border rounded-xl p-4">
                  <p className="text-xs uppercase font-bold text-text-muted mb-1">
                    Session Starts
                  </p>
                  <p className="text-2xl font-black text-text-primary">
                    {analyticsSummary.session_start}
                  </p>
                  <p
                    className={`text-xs mt-1 ${getDeltaClass(sessionStartsDelta)}`}
                  >
                    vs prev: {formatDelta(sessionStartsDelta)}
                  </p>
                </article>
                <article className="bg-surface-2 border border-border rounded-xl p-4">
                  <p className="text-xs uppercase font-bold text-text-muted mb-1">
                    Session Ends
                  </p>
                  <p className="text-2xl font-black text-text-primary">
                    {analyticsSummary.session_end}
                  </p>
                  <p
                    className={`text-xs mt-1 ${getDeltaClass(sessionEndsDelta)}`}
                  >
                    vs prev: {formatDelta(sessionEndsDelta)}
                  </p>
                </article>
                <article className="bg-surface-2 border border-border rounded-xl p-4">
                  <p className="text-xs uppercase font-bold text-text-muted mb-1">
                    Item Accuracy
                  </p>
                  <p className="text-2xl font-black text-emerald-400">
                    {analyticsSummary.itemAccuracy}%
                  </p>
                  <p className="text-xs text-text-muted mt-1">
                    {analyticsSummary.item_correct} correct ·{" "}
                    {analyticsSummary.item_wrong} wrong
                  </p>
                  <p
                    className={`text-xs mt-1 ${getDeltaClass(itemAccuracyDelta)}`}
                  >
                    vs prev: {formatDelta(itemAccuracyDelta)}%
                  </p>
                </article>
                <article className="bg-surface-2 border border-border rounded-xl p-4">
                  <p className="text-xs uppercase font-bold text-text-muted mb-1">
                    Speaking Used
                  </p>
                  <p className="text-2xl font-black text-sky-400">
                    {analyticsSummary.speaking_used}
                  </p>
                  <p className="text-xs text-success mt-1 uppercase font-bold tracking-widest">
                    Weekly reviews: {analyticsSummary.weekly_review_completed}
                  </p>
                  <p
                    className={`text-xs mt-1 ${getDeltaClass(speakingUsedDelta)}`}
                  >
                    vs prev: {formatDelta(speakingUsedDelta)}
                  </p>
                </article>
              </div>

              <div className="mt-6 bg-surface-2 border border-border rounded-xl p-4">
                <h3 className="text-sm font-black uppercase tracking-widest text-text-primary mb-3">
                  Error Breakdown by Game
                </h3>
                {analyticsErrorBreakdown.length === 0 ? (
                  <p className="text-sm text-text-muted">
                    No wrong answers tracked in this range.
                  </p>
                ) : (
                  <div className="space-y-3">
                    <div className="bg-surface-1 border border-border rounded-lg p-3">
                      <p className="text-xs font-black uppercase tracking-widest text-text-secondary mb-2">
                        Top 3 errores
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {topErrorTypes.map((item, index) => (
                          <span
                            key={`top-${item.errorType}`}
                            className="px-2 py-1 rounded-md bg-surface-2 border border-border text-xs font-bold text-text-primary"
                          >
                            {index + 1}.{" "}
                            {prettifyAnalyticsLabel(item.errorType)} —{" "}
                            {item.count}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => setSelectedErrorGame("all")}
                        className={`min-h-[32px] px-3 py-1 rounded-md text-xs font-bold uppercase tracking-widest border transition-colors ${
                          selectedErrorGame === "all"
                            ? "bg-accent text-white border-accent"
                            : "bg-surface-1 text-text-secondary border-border hover:bg-surface-hover"
                        }`}
                      >
                        All games
                      </button>
                      {availableErrorGames.map((game) => (
                        <button
                          key={`filter-${game}`}
                          onClick={() => setSelectedErrorGame(game)}
                          className={`min-h-[32px] px-3 py-1 rounded-md text-xs font-bold uppercase tracking-widest border transition-colors ${
                            selectedErrorGame === game
                              ? "bg-accent text-white border-accent"
                              : "bg-surface-1 text-text-secondary border-border hover:bg-surface-hover"
                          }`}
                        >
                          {prettifyAnalyticsLabel(game)}
                        </button>
                      ))}
                    </div>

                    {visibleErrorBreakdown.map((item) => (
                      <div
                        key={item.game}
                        className="bg-surface-1 border border-border rounded-lg p-3"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-sm font-bold text-text-primary">
                            {prettifyAnalyticsLabel(item.game)}
                          </p>
                          <p className="text-xs font-bold uppercase tracking-widest text-amber-400">
                            {item.total} wrong
                          </p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {item.reasons.map((reason) => {
                            const previousCount =
                              previousErrorCountMap[item.game]?.[
                                reason.errorType
                              ] || 0;
                            const delta = reason.count - previousCount;

                            return (
                              <span
                                key={`${item.game}-${reason.errorType}`}
                                className={`px-2 py-1 rounded-md bg-surface-2 border border-border text-xs font-bold ${getDeltaClass(delta)}`}
                              >
                                {prettifyAnalyticsLabel(reason.errorType)}:{" "}
                                {reason.count} (vs prev: {formatDelta(delta)})
                              </span>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column: Charts & Breakdowns */}
              <div className="lg:col-span-2 space-y-6">
                <section className="bg-surface-1 border border-border rounded-2xl p-6">
                  <h2 className="text-lg font-black text-text-primary mb-6">
                    Category Accuracy
                  </h2>
                  {metrics.categoryAccuracy.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-10 bg-surface-2/50 rounded-xl border border-dashed border-border/60">
                      <span className="text-3xl mb-3 opacity-40 filter grayscale">
                        🏷️
                      </span>
                      <p className="text-text-muted text-sm font-bold">
                        No category data available yet.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {metrics.categoryAccuracy.map((item) => (
                        <div key={item.category}>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-text-secondary font-medium">
                              {item.category}
                            </span>
                            <span className="text-text-muted">
                              {item.accuracy}%{" "}
                              <span className="text-xs">
                                ({item.totalCards} cards)
                              </span>
                            </span>
                          </div>
                          <div className="w-full bg-surface-2 h-2 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full ${item.accuracy > 80 ? "bg-emerald-500" : item.accuracy > 50 ? "bg-amber-500" : "bg-red-500"}`}
                              style={{ width: `${item.accuracy}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </section>

                <section className="bg-surface-1 border border-border rounded-2xl p-6">
                  <h2 className="text-lg font-black text-text-primary mb-6">
                    CEFR Level Breakdown
                  </h2>
                  {metrics.levelBreakdown.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-10 bg-surface-2/50 rounded-xl border border-dashed border-border/60">
                      <span className="text-3xl mb-3 opacity-40 filter grayscale">
                        🎓
                      </span>
                      <p className="text-text-muted text-sm font-bold">
                        No level tags (A1, B2, etc.) found in your cards.
                      </p>
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-4">
                      {metrics.levelBreakdown.map((item) => (
                        <div
                          key={item.level}
                          className="flex-1 min-w-[120px] bg-surface-2 border border-border rounded-xl p-4 text-center"
                        >
                          <div className="text-2xl font-black text-sky-400 mb-1">
                            {item.level}
                          </div>
                          <div className="text-xs text-text-muted uppercase font-bold">
                            {item.count} words
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </section>
              </div>

              {/* Right Column: Activity */}
              <div className="space-y-6">
                <section className="bg-surface-1 border border-border rounded-2xl p-6">
                  <h2 className="text-lg font-black text-text-primary mb-4">
                    Recent Activity
                  </h2>
                  {metrics.recentActivity.length === 0 ? (
                    <p className="text-text-muted text-sm text-center py-4">
                      No recent activity.
                    </p>
                  ) : (
                    <div className="space-y-3">
                      {metrics.recentActivity.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between p-3 bg-surface-2 rounded-xl border border-border"
                        >
                          <div>
                            <p className="text-text-primary font-bold">
                              {item.word}
                            </p>
                            <p className="text-xs text-text-muted">
                              {item.date}
                            </p>
                          </div>
                          <span
                            className={`text-xs font-bold uppercase px-2 py-1 rounded-md ${
                              item.status === "mastered"
                                ? "bg-emerald-500/20 text-emerald-400"
                                : item.status === "learning"
                                  ? "bg-sky-500/20 text-sky-400"
                                  : "bg-surface-1 text-text-secondary"
                            }`}
                          >
                            {item.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </section>
              </div>
            </div>

            {/* Bottom Full-Width Row: Heatmap */}
            <div className="bg-surface-1 border border-border rounded-2xl p-6 overflow-hidden">
              <h2 className="text-lg font-black text-text-primary mb-4">
                Activity Heatmap
              </h2>
              <div className="flex justify-center w-full overflow-x-auto pb-2">
                <Heatmap />
              </div>
            </div>
          </>
        ) : (
          <div className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Daily Activity Chart */}
              <section className="bg-surface-1 border border-border rounded-2xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-lg font-black text-text-primary">
                      Playtime Trend
                    </h2>
                    <p className="text-sm text-text-muted">
                      Total interactions over the last 14 days
                    </p>
                  </div>
                </div>
                <div className="h-72 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={dailyActivityData}
                      margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient
                          id="colorAttempts"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#38bdf8"
                            stopOpacity={0.3}
                          />
                          <stop
                            offset="95%"
                            stopColor="#38bdf8"
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="#334155"
                        vertical={false}
                      />
                      <XAxis
                        dataKey="date"
                        stroke="#94a3b8"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                      />
                      <YAxis
                        stroke="#94a3b8"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#1e293b",
                          borderColor: "#334155",
                          borderRadius: "12px",
                          color: "#f8fafc",
                        }}
                        itemStyle={{ color: "#38bdf8" }}
                      />
                      <Area
                        type="monotone"
                        dataKey="attempts"
                        stroke="#38bdf8"
                        strokeWidth={3}
                        fillOpacity={1}
                        fill="url(#colorAttempts)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </section>

              {/* Game Distribution Pie Chart */}
              <section className="bg-surface-1 border border-border rounded-2xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-lg font-black text-text-primary">
                      Game Distribution
                    </h2>
                    <p className="text-sm text-text-muted">
                      Where you spend your time
                    </p>
                  </div>
                </div>
                {gameDistributionData.length === 0 ? (
                  <div className="h-72 w-full flex items-center justify-center">
                    <p className="text-text-muted text-sm font-bold">
                      No game data yet.
                    </p>
                  </div>
                ) : (
                  <div className="h-72 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={gameDistributionData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={90}
                          paddingAngle={5}
                          dataKey="value"
                          animationDuration={1000}
                        >
                          {gameDistributionData.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={entry.fill}
                              stroke="rgba(255,255,255,0.05)"
                              strokeWidth={2}
                            />
                          ))}
                        </Pie>
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "#1e293b",
                            borderColor: "#334155",
                            borderRadius: "12px",
                            color: "#f8fafc",
                          }}
                        />
                        <Legend
                          verticalAlign="bottom"
                          height={36}
                          iconType="circle"
                          formatter={(value) => (
                            <span
                              style={{ color: "#cbd5e1", fontSize: "13px" }}
                            >
                              {value}
                            </span>
                          )}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </section>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StatsView;
