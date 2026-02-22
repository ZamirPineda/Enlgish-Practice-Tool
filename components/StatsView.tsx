import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { SrsVocabularyItem } from "../types";
import { calculateStatsMetrics, VaultProgress } from "../utils/statsMetrics";
import Heatmap from "./Heatmap";

const VAULT_DECK_KEY = "vocab-vault-deck";
const VAULT_PROGRESS_KEY = "vocab-vault-progress";

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
  const [deck] = useState<Record<string, SrsVocabularyItem>>(() =>
    readJson<Record<string, SrsVocabularyItem>>(VAULT_DECK_KEY, {}),
  );
  const [progress] = useState<VaultProgress>(() =>
    readJson<VaultProgress>(VAULT_PROGRESS_KEY, DEFAULT_PROGRESS),
  );

  const metrics = useMemo(
    () => calculateStatsMetrics(deck, { ...DEFAULT_PROGRESS, ...progress }),
    [deck, progress],
  );

  return (
    <div className="flex-1 overflow-y-auto bg-slate-900 p-4 sm:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-black text-white tracking-tight">
            Dashboard
          </h1>
        </div>

        {metrics.totalCards === 0 && (
          <section className="bg-slate-800 border border-slate-700 rounded-2xl p-8 text-center">
            <h2 className="text-white text-2xl font-black mb-3">No data yet</h2>
            <p className="text-slate-400 mb-6 max-w-md mx-auto">
              Start your first review session in the Vocabulary Vault to unlock
              your learning statistics and track your progress.
            </p>
            <Link
              to="/vault"
              className="inline-flex px-6 py-3 rounded-xl bg-sky-500 hover:bg-sky-400 transition-colors text-slate-900 font-black"
            >
              Start First Session
            </Link>
          </section>
        )}

        {metrics.totalCards > 0 && (
          <>
            {/* Top KPI Cards */}
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <article className="bg-slate-800 border border-slate-700 rounded-2xl p-5 flex items-start gap-4">
                <div className="p-3 bg-orange-500/10 rounded-xl">
                  <FireIcon />
                </div>
                <div>
                  <h2 className="text-xs uppercase text-slate-400 font-bold mb-1">
                    Current Streak
                  </h2>
                  <p className="text-white text-3xl font-black">
                    {metrics.currentStreak}{" "}
                    <span className="text-sm font-normal text-slate-500">
                      days
                    </span>
                  </p>
                  <p className="text-slate-500 text-xs mt-1">
                    Best: {metrics.bestStreak} days
                  </p>
                </div>
              </article>

              <article className="bg-slate-800 border border-slate-700 rounded-2xl p-5 flex items-start gap-4">
                <div className="p-3 bg-sky-500/10 rounded-xl">
                  <BookIcon />
                </div>
                <div>
                  <h2 className="text-xs uppercase text-slate-400 font-bold mb-1">
                    Total Cards
                  </h2>
                  <p className="text-white text-3xl font-black">
                    {metrics.totalCards}
                  </p>
                  <p className="text-slate-500 text-xs mt-1">
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

              <article className="bg-slate-800 border border-slate-700 rounded-2xl p-5 flex items-start gap-4">
                <div className="p-3 bg-emerald-500/10 rounded-xl">
                  <TargetIcon />
                </div>
                <div>
                  <h2 className="text-xs uppercase text-slate-400 font-bold mb-1">
                    Global Accuracy
                  </h2>
                  <p className="text-white text-3xl font-black">
                    {metrics.globalAccuracy}%
                  </p>
                  <div className="w-full bg-slate-700 h-1.5 rounded-full mt-2">
                    <div
                      className="bg-emerald-500 h-full rounded-full"
                      style={{ width: `${metrics.globalAccuracy}%` }}
                    ></div>
                  </div>
                </div>
              </article>

              <article className="bg-slate-800 border border-slate-700 rounded-2xl p-5 flex items-start gap-4">
                <div className="p-3 bg-purple-500/10 rounded-xl">
                  <ClockIcon />
                </div>
                <div>
                  <h2 className="text-xs uppercase text-slate-400 font-bold mb-1">
                    Est. Study Time
                  </h2>
                  <p className="text-white text-3xl font-black">
                    {metrics.estimatedStudyMinutes === null
                      ? "--"
                      : metrics.estimatedStudyMinutes}{" "}
                    <span className="text-sm font-normal text-slate-500">
                      min
                    </span>
                  </p>
                  <p className="text-slate-500 text-xs mt-1">
                    Total time spent
                  </p>
                </div>
              </article>
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column: Charts & Breakdowns */}
              <div className="lg:col-span-2 space-y-6">
                <section className="bg-slate-800 border border-slate-700 rounded-2xl p-6">
                  <h2 className="text-lg font-black text-white mb-6">
                    Category Accuracy
                  </h2>
                  {metrics.categoryAccuracy.length === 0 ? (
                    <p className="text-slate-400 text-center py-8">
                      No category data available yet.
                    </p>
                  ) : (
                    <div className="space-y-4">
                      {metrics.categoryAccuracy.map((item) => (
                        <div key={item.category}>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-slate-300 font-medium">
                              {item.category}
                            </span>
                            <span className="text-slate-400">
                              {item.accuracy}%{" "}
                              <span className="text-xs">
                                ({item.totalCards} cards)
                              </span>
                            </span>
                          </div>
                          <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
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

                <section className="bg-slate-800 border border-slate-700 rounded-2xl p-6">
                  <h2 className="text-lg font-black text-white mb-6">
                    CEFR Level Breakdown
                  </h2>
                  {metrics.levelBreakdown.length === 0 ? (
                    <p className="text-slate-400 text-center py-8">
                      No level tags (A1, B2, etc.) found in your cards.
                    </p>
                  ) : (
                    <div className="flex flex-wrap gap-4">
                      {metrics.levelBreakdown.map((item) => (
                        <div
                          key={item.level}
                          className="flex-1 min-w-[120px] bg-slate-900/50 border border-slate-700 rounded-xl p-4 text-center"
                        >
                          <div className="text-2xl font-black text-sky-400 mb-1">
                            {item.level}
                          </div>
                          <div className="text-xs text-slate-400 uppercase font-bold">
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
                <section className="bg-slate-800 border border-slate-700 rounded-2xl p-6">
                  <h2 className="text-lg font-black text-white mb-4">
                    Recent Activity
                  </h2>
                  {metrics.recentActivity.length === 0 ? (
                    <p className="text-slate-400 text-sm text-center py-4">
                      No recent activity.
                    </p>
                  ) : (
                    <div className="space-y-3">
                      {metrics.recentActivity.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between p-3 bg-slate-900/50 rounded-xl border border-slate-700/50"
                        >
                          <div>
                            <p className="text-white font-bold">{item.word}</p>
                            <p className="text-xs text-slate-500">
                              {item.date}
                            </p>
                          </div>
                          <span
                            className={`text-xs font-bold uppercase px-2 py-1 rounded-md ${
                              item.status === "mastered"
                                ? "bg-emerald-500/20 text-emerald-400"
                                : item.status === "learning"
                                  ? "bg-sky-500/20 text-sky-400"
                                  : "bg-slate-700 text-slate-300"
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
            <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 overflow-hidden">
              <h2 className="text-lg font-black text-white mb-4">
                Activity Heatmap
              </h2>
              <div className="flex justify-center w-full overflow-x-auto pb-2">
                <Heatmap
                  deck={deck}
                  progress={{ ...DEFAULT_PROGRESS, ...progress }}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default StatsView;
