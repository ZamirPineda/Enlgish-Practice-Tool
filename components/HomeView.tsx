import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { SrsVocabularyItem } from "../types";
import { calculateStatsMetrics, VaultProgress } from "../utils/statsMetrics";
import Card from "./ui/Card";

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

const HomeView: React.FC = () => {
  const deck = useMemo(
    () => readJson<Record<string, SrsVocabularyItem>>(VAULT_DECK_KEY, {}),
    [],
  );
  const progress = useMemo(
    () => readJson<VaultProgress>(VAULT_PROGRESS_KEY, DEFAULT_PROGRESS),
    [],
  );
  const metrics = useMemo(
    () => calculateStatsMetrics(deck, { ...DEFAULT_PROGRESS, ...progress }),
    [deck, progress],
  );

  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  }, []);

  return (
    <div className="flex-1 overflow-y-auto bg-slate-900 p-4 sm:p-8 animate-fade-in">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-4xl font-black text-white tracking-tight mb-2">
              {greeting}! 👋
            </h1>
            <p className="text-slate-400 text-lg">
              Ready to improve your English today?
            </p>
          </div>
          <div className="flex items-center gap-4 bg-slate-800/50 p-4 rounded-2xl border border-slate-700/50">
            <div className="text-center">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                Streak
              </div>
              <div className="text-2xl font-black text-orange-400 flex items-center gap-1">
                🔥 {metrics.currentStreak}
              </div>
            </div>
            <div className="w-px h-10 bg-slate-700"></div>
            <div className="text-center">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                Pending
              </div>
              <div className="text-2xl font-black text-amber-400">
                {metrics.pendingCards}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <section>
          <h2 className="text-xl font-bold text-white mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link to="/vault" className="group block">
              <Card className="h-full p-6 border-t-4 border-sky-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-sky-500/10 transition-all duration-300">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform origin-left">
                  🗂️
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Vocabulary Vault
                </h3>
                <p className="text-slate-400 text-sm">
                  Review your saved words and learn new ones with spaced
                  repetition.
                </p>
              </Card>
            </Link>

            <Link to="/stop" className="group block">
              <Card className="h-full p-6 border-t-4 border-emerald-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-500/10 transition-all duration-300">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform origin-left">
                  🎮
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Stop Game</h3>
                <p className="text-slate-400 text-sm">
                  Test your vocabulary speed and accuracy in this fun mini-game.
                </p>
              </Card>
            </Link>

            <Link to="/study" className="group block">
              <Card className="h-full p-6 border-t-4 border-purple-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform origin-left">
                  📚
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Study Decks
                </h3>
                <p className="text-slate-400 text-sm">
                  Browse curated lists of words, minimal pairs, and phrases by
                  level.
                </p>
              </Card>
            </Link>
          </div>
        </section>

        {/* Progress Summary */}
        <section className="bg-slate-800/50 border border-slate-700/50 rounded-3xl p-6 md:p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">Your Progress</h2>
            <Link
              to="/stats"
              className="text-sm font-bold text-sky-400 hover:text-sky-300 transition-colors"
            >
              View full stats →
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-slate-900/50 p-4 rounded-2xl border border-slate-800">
              <div className="text-sm text-slate-400 mb-1">Total Cards</div>
              <div className="text-3xl font-black text-white">
                {metrics.totalCards}
              </div>
            </div>
            <div className="bg-slate-900/50 p-4 rounded-2xl border border-slate-800">
              <div className="text-sm text-slate-400 mb-1">Learned</div>
              <div className="text-3xl font-black text-emerald-400">
                {metrics.learnedCards}
              </div>
            </div>
            <div className="bg-slate-900/50 p-4 rounded-2xl border border-slate-800">
              <div className="text-sm text-slate-400 mb-1">Accuracy</div>
              <div className="text-3xl font-black text-blue-400">
                {metrics.globalAccuracy}%
              </div>
            </div>
            <div className="bg-slate-900/50 p-4 rounded-2xl border border-slate-800">
              <div className="text-sm text-slate-400 mb-1">Study Time</div>
              <div className="text-3xl font-black text-purple-400">
                {metrics.estimatedStudyMinutes || 0}m
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomeView;
