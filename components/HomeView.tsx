import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { SrsVocabularyItem } from "../types";
import {
  calculateStatsMetrics,
  VaultProgress,
  WeeklyActivitySummary,
} from "../utils/statsMetrics";
import { AppSettings, loadSettings } from "../utils/settingsStore";
import { getIsoWeekKey } from "../utils/srs";
import Card from "./ui/Card";
import ViewToolbar from "./ui/ViewToolbar";
import {
  Flame,
  Inbox,
  Gamepad2,
  BookOpen,
  Library,
  Zap,
  ArrowRight,
} from "lucide-react";

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

const HomeView: React.FC = () => {
  const currentWeekKey = getIsoWeekKey(new Date());
  const deck = useMemo(
    () => readJson<Record<string, SrsVocabularyItem>>(VAULT_DECK_KEY, {}),
    [],
  );
  const progress = useMemo(
    () => readJson<VaultProgress>(VAULT_PROGRESS_KEY, DEFAULT_PROGRESS),
    [],
  );
  const weeklyActivity = useMemo(
    () =>
      readJson<WeeklyActivitySummary>(VAULT_WEEKLY_ACTIVITY_KEY, {
        weekKey: currentWeekKey,
        sessions: 0,
        attempts: 0,
        correct: 0,
        studyMinutes: 0,
      }),
    [currentWeekKey],
  );
  const settings = useMemo<AppSettings>(() => loadSettings(), []);
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

  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  }, []);

  return (
    <div className="flex-1 overflow-y-auto overscroll-y-contain bg-background p-4 sm:p-8 pb-24 sm:pb-8 animate-fade-in">
      <div className="max-w-5xl mx-auto space-y-8">
        <ViewToolbar
          left={
            <div>
              <h1 className="text-3xl sm:text-4xl font-black text-text-primary tracking-tight mb-1">
                {greeting}! 👋
              </h1>
              <p className="text-text-secondary text-sm sm:text-lg">
                Ready to improve your English today?
              </p>
            </div>
          }
          right={
            <div className="flex items-center gap-3 bg-surface-2 p-3 rounded-xl border border-border shadow-sm w-full md:w-auto justify-between md:justify-start">
              <div className="text-center min-w-[5rem]">
                <div className="text-xs font-bold text-text-muted uppercase tracking-wider mb-1">
                  Streak
                </div>
                <div className="text-xl sm:text-2xl font-black text-orange-500 flex items-center justify-center gap-1">
                  <Flame
                    className={`w-5 h-5 sm:w-6 sm:h-6 ${metrics.currentStreak > 0 ? "text-orange-500 fill-orange-500 animate-pulse" : "text-text-muted"}`}
                  />
                  {metrics.currentStreak}
                </div>
              </div>
              <div className="w-px h-10 bg-border"></div>
              <div className="text-center min-w-[5rem]">
                <div className="text-xs font-bold text-text-muted uppercase tracking-wider mb-1">
                  Pending
                </div>
                <div className="text-xl sm:text-2xl font-black text-accent flex items-center justify-center gap-1">
                  <Inbox className="w-5 h-5 sm:w-6 sm:h-6 text-accent" />
                  {metrics.pendingCards}
                </div>
              </div>
            </div>
          }
        />

        {/* Dynamic CTA */}
        {metrics.pendingCards > 0 && (
          <section>
            <Link to="/vault" className="block group">
              <div className="bg-gradient-to-r from-accent to-emerald-500 rounded-3xl p-6 sm:p-8 text-white shadow-lg shadow-accent/20 transition-transform hover:-translate-y-1">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                  <div>
                    <h2 className="text-2xl font-black mb-2">
                      You have {metrics.pendingCards} reviews pending!
                    </h2>
                    <p className="text-white/80">
                      Keep your memory fresh and maintain your streak.
                    </p>
                  </div>
                  <div className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-6 py-3 rounded-xl font-bold transition-colors backdrop-blur-sm">
                    Start Review{" "}
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          </section>
        )}

        {/* Quick Actions */}
        <section>
          <h2 className="text-xl font-bold text-text-primary mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Link to="/vault" className="group block">
              <Card
                interactive
                className="h-full p-6 border-t-4 border-accent bg-surface-1"
              >
                <div className="mb-4 text-accent group-hover:scale-110 transition-transform origin-left">
                  <Library className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-bold text-text-primary mb-2">
                  Vocabulary Vault
                </h3>
                <p className="text-text-secondary text-sm">
                  Review your saved words and learn new ones with spaced
                  repetition.
                </p>
              </Card>
            </Link>

            <Link to="/stop" className="group block">
              <Card
                interactive
                className="h-full p-6 border-t-4 border-emerald-500 bg-surface-1"
              >
                <div className="mb-4 text-emerald-500 group-hover:scale-110 transition-transform origin-left">
                  <Gamepad2 className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-bold text-text-primary mb-2">
                  Stop Game
                </h3>
                <p className="text-text-secondary text-sm">
                  Test your vocabulary speed and accuracy in this fun mini-game.
                </p>
              </Card>
            </Link>

            <Link to="/study" className="group block">
              <Card
                interactive
                className="h-full p-6 border-t-4 border-purple-500 bg-surface-1"
              >
                <div className="mb-4 text-purple-500 group-hover:scale-110 transition-transform origin-left">
                  <BookOpen className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-bold text-text-primary mb-2">
                  Study Decks
                </h3>
                <p className="text-text-secondary text-sm">
                  Browse curated lists of words, minimal pairs, and phrases by
                  level.
                </p>
              </Card>
            </Link>

            <Link to="/speed-builder" className="group block">
              <Card
                interactive
                className="h-full p-6 border-t-4 border-amber-500 bg-surface-1"
              >
                <div className="mb-4 text-amber-500 group-hover:scale-110 transition-transform origin-left">
                  <Zap className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-bold text-text-primary mb-2">
                  Speed Builder
                </h3>
                <p className="text-text-secondary text-sm">
                  Build correct sentences by ordering words as fast as you can.
                </p>
              </Card>
            </Link>
          </div>
        </section>

        {/* Progress Summary */}
        <section className="bg-surface-1 border border-border rounded-3xl p-6 md:p-8 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-text-primary">
              Your Progress
            </h2>
            <Link
              to="/stats"
              className="text-sm font-bold text-accent hover:text-accent-hover transition-colors"
            >
              View full stats →
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-surface-2 p-4 rounded-2xl border border-border">
              <div className="text-sm text-text-secondary mb-1">
                Total Cards
              </div>
              <div className="text-3xl font-black text-text-primary">
                {metrics.totalCards}
              </div>
            </div>
            <div className="bg-surface-2 p-4 rounded-2xl border border-border">
              <div className="text-sm text-text-secondary mb-1">Learned</div>
              <div className="text-3xl font-black text-emerald-500">
                {metrics.learnedCards}
              </div>
            </div>
            <div className="bg-surface-2 p-4 rounded-2xl border border-border">
              <div className="text-sm text-text-secondary mb-1">Accuracy</div>
              <div className="text-3xl font-black text-sky-500">
                {metrics.globalAccuracy}%
              </div>
            </div>
            <div className="bg-surface-2 p-4 rounded-2xl border border-border">
              <div className="text-sm text-text-secondary mb-1">Study Time</div>
              <div className="text-3xl font-black text-purple-500">
                {metrics.estimatedStudyMinutes || 0}m
              </div>
            </div>
          </div>

          <div className="mt-6 bg-surface-2 p-4 rounded-2xl border border-border">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-bold text-text-primary">Weekly Goal</p>
              <p className="text-xs font-bold text-text-secondary uppercase tracking-widest">
                {metrics.weeklySummary.sessions} / {settings.weeklyGoalSessions}{" "}
                sessions
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
      </div>
    </div>
  );
};

export default HomeView;
