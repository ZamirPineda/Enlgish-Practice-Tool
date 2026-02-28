import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { SrsVocabularyItem } from "../types";
import {
  calculateStatsMetrics,
  VaultProgress,
  WeeklyActivitySummary,
} from "../utils/statsMetrics";
import { AppSettings, loadSettings } from "../utils/settingsStore";
import { createNewSrsItem, getIsoWeekKey } from "../utils/srs";
import { getGlobalStreak } from "../utils/activityTracker";
import { dailyPhrases } from "../data/dailyPhrases";
import { useGlobalXp } from "../utils/xpStore";
import Card from "./ui/Card";
import Heatmap from "./Heatmap";
import ViewToolbar from "./ui/ViewToolbar";
import {
  Flame,
  Inbox,
  Gamepad2,
  BookOpen,
  Library,
  Zap,
  Search,
  ArrowRight,
  MessageSquare,
  Repeat,
  Calculator,
  Laptop,
  RefreshCw,
  Target,
  Code2,
  Bug,
  MessageCircleHeart,
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

const getDayOfYearUtc = (date: Date): number => {
  const start = Date.UTC(date.getUTCFullYear(), 0, 0);
  const current = Date.UTC(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
  );
  return Math.floor((current - start) / 86400000);
};

const FEATURED_GAMES = [
  {
    id: "collocation",
    path: "/collocation-sprint",
    title: "Collocations",
    desc: "Aprende qué palabras van juntas.",
    icon: Flame,
    color: "text-orange-500",
    border: "border-orange-500",
    bg: "bg-orange-50",
  },
  {
    id: "taboo",
    path: "/taboo-english",
    title: "Taboo English",
    desc: "Describe sin usar las palabras prohibidas.",
    icon: MessageSquare,
    color: "text-purple-500",
    border: "border-purple-500",
    bg: "bg-purple-50",
  },
  {
    id: "speed",
    path: "/speed-builder",
    title: "Speed Builder",
    desc: "Ordena las palabras rápidamente.",
    icon: Zap,
    color: "text-amber-500",
    border: "border-amber-500",
    bg: "bg-amber-50",
  },
  {
    id: "transformer",
    path: "/sentence-transformer",
    title: "Transformer",
    desc: "Practica tu agilidad convirtiendo oraciones.",
    icon: RefreshCw,
    color: "text-sky-500",
    border: "border-sky-500",
    bg: "bg-sky-50",
  },
  {
    id: "diplomatic",
    path: "/diplomatic-reviewer",
    title: "Diplomatic Review",
    desc: "Mejora tus soft skills y feedback.",
    icon: MessageCircleHeart,
    color: "text-violet-500",
    border: "border-violet-500",
    bg: "bg-violet-50",
  },
  {
    id: "error",
    path: "/error-hunter",
    title: "Error Hunter",
    desc: "Encuentra el error gramatical oculto.",
    icon: Search,
    color: "text-rose-500",
    border: "border-rose-500",
    bg: "bg-rose-50",
  },
  {
    id: "math",
    path: "/math-game",
    title: "Math Quiz",
    desc: "Prueba tu vocabulario matemático.",
    icon: Calculator,
    color: "text-indigo-500",
    border: "border-indigo-500",
    bg: "bg-indigo-50",
  },
];

const HomeView: React.FC = () => {
  const currentWeekKey = getIsoWeekKey(new Date());
  const [deck, setDeck] = useState<Record<string, SrsVocabularyItem>>(() =>
    readJson<Record<string, SrsVocabularyItem>>(VAULT_DECK_KEY, {}),
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
  const globalStreak = useMemo(() => getGlobalStreak().current, []);
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

  const dailyPhrase = useMemo(() => {
    const day = getDayOfYearUtc(new Date());
    return dailyPhrases[day % dailyPhrases.length];
  }, []);

  const dailyPhraseKey = dailyPhrase.text.trim().toLowerCase();
  const isDailyPhraseAdded = Boolean(deck[dailyPhraseKey]);

  const featuredGame = useMemo(() => {
    const day = getDayOfYearUtc(new Date());
    return FEATURED_GAMES[day % FEATURED_GAMES.length];
  }, []);

  const handleAddDailyPhrase = () => {
    if (isDailyPhraseAdded) return;

    const nextDeck: Record<string, SrsVocabularyItem> = {
      ...deck,
      [dailyPhraseKey]: {
        ...createNewSrsItem(dailyPhrase.text, dailyPhrase.meaning),
        originalContext: dailyPhrase.context,
        tags: ["Daily Phrase", ...dailyPhrase.tags],
      },
    };

    setDeck(nextDeck);
    localStorage.setItem(VAULT_DECK_KEY, JSON.stringify(nextDeck));
  };

  const { quests } = useGlobalXp();

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
                    className={`w-5 h-5 sm:w-6 sm:h-6 ${globalStreak > 0 ? "text-orange-500 fill-orange-500 animate-pulse" : "text-text-muted"}`}
                  />
                  {globalStreak}
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

        <section>
          <Card className="p-6 border-l-4 border-accent bg-surface-1">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-accent mb-2">
                  Phrase of the day
                </p>
                <h2 className="text-2xl font-black text-text-primary mb-2">
                  “{dailyPhrase.text}”
                </h2>
                <p className="text-sm text-text-secondary mb-2">
                  {dailyPhrase.meaning}
                </p>
                <p className="text-xs font-bold uppercase tracking-widest text-text-muted">
                  Context: {dailyPhrase.context}
                </p>
              </div>
              <div className="flex flex-col gap-2 min-w-[12rem]">
                <button
                  onClick={handleAddDailyPhrase}
                  disabled={isDailyPhraseAdded}
                  className={`min-h-[40px] px-4 rounded-lg text-sm font-black transition-colors ${isDailyPhraseAdded ? "bg-surface-2 text-text-muted border border-border" : "bg-accent hover:bg-accent-hover text-white"}`}
                >
                  {isDailyPhraseAdded
                    ? "Added to Vault"
                    : "Add phrase to Vault"}
                </button>
                <Link
                  to="/vault"
                  className="min-h-[40px] px-4 rounded-lg text-sm font-bold border border-border text-text-secondary hover:text-text-primary hover:bg-surface-2 inline-flex items-center justify-center"
                >
                  Practice in Vault
                </Link>
              </div>
            </div>
          </Card>
        </section>

        {/* Daily Featured Game & Quests */}
        <section>
          <div className="flex flex-col md:flex-row gap-6">
            {/* Featured Game of the Day */}
            <div className="md:w-1/2 flex flex-col">
              <h3 className="text-sm font-black uppercase tracking-widest text-text-muted mb-4 flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-500" /> Juego del Día
              </h3>
              <Link to={featuredGame.path} className="group flex-1 flex">
                <Card
                  className={`w-full p-5 md:p-6 border-l-4 ${featuredGame.border} hover:bg-surface-hover hover:-translate-y-1 transition-all shadow-md group-hover:shadow-xl`}
                >
                  <div className="flex flex-col h-full gap-4">
                    <div className="flex items-start justify-between">
                      <div
                        className={`p-3 rounded-xl ${featuredGame.bg} ${featuredGame.color} group-hover:scale-110 transition-transform`}
                      >
                        <featuredGame.icon className="w-8 h-8" />
                      </div>
                      <span className="hidden sm:inline-flex bg-surface-2 text-xs font-black px-3 py-1 rounded-full text-text-secondary border border-border">
                        Recomendado
                      </span>
                    </div>
                    <div className="flex-1">
                      <h2
                        className={`text-xl font-black ${featuredGame.color} mb-2`}
                      >
                        {featuredGame.title}
                      </h2>
                      <p className="text-sm text-text-secondary">
                        {featuredGame.desc}
                      </p>
                    </div>
                    <div
                      className={`flex items-center gap-2 font-bold ${featuredGame.color} group-hover:translate-x-1 transition-transform mt-auto`}
                    >
                      Jugar <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </Card>
              </Link>
            </div>

            {/* Daily Quests Section */}
            <div className="md:w-1/2 flex flex-col">
              <h3 className="text-sm font-black uppercase tracking-widest text-text-muted mb-4 flex items-center gap-2">
                <Target className="w-4 h-4 text-emerald-500" /> Daily Quests
              </h3>
              <Card className="flex-1 p-5 border border-border bg-surface-1 shadow-sm flex flex-col justify-center gap-3">
                {quests.map((quest) => {
                  const pct = Math.min(
                    100,
                    (quest.current / quest.target) * 100,
                  );
                  return (
                    <div
                      key={quest.id}
                      className={`p-3 rounded-xl border ${quest.completed ? "bg-emerald-500/10 border-emerald-500/30" : "bg-surface-2 border-border"} transition-colors`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div className="font-bold text-sm text-text-primary flex items-center gap-2">
                          {quest.completed ? "✅" : "🎯"} {quest.description}
                        </div>
                        <span className="text-xs font-black text-accent bg-accent/10 px-2 py-0.5 rounded-full inline-flex items-center whitespace-nowrap">
                          +{quest.reward} XP
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex-1 h-2 bg-surface-1 rounded-full overflow-hidden border border-border/50">
                          <div
                            className={`h-full transition-all duration-1000 ${quest.completed ? "bg-emerald-500" : "bg-accent"}`}
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                        <span
                          className={`text-xs font-black tabular-nums ${quest.completed ? "text-emerald-500" : "text-text-muted"}`}
                        >
                          {quest.current} / {quest.target}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </Card>
            </div>
          </div>
        </section>
        {/* Games & Tools Hub */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-text-primary">
              Games & Tools Hub
            </h2>
            <div className="flex items-center gap-2 md:hidden text-xs font-bold uppercase tracking-widest text-text-muted">
              <span>Desliza</span> <ArrowRight className="w-3 h-3" />
            </div>
          </div>

          {/* Horizontal scroll on mobile, grid on desktop */}
          <div className="flex overflow-x-auto pb-4 -mx-4 px-4 md:mx-0 md:px-0 md:grid md:grid-cols-2 lg:grid-cols-4 gap-4 snap-x snap-mandatory hide-scrollbar">
            <Link
              to="/stop"
              className="group block min-w-[260px] md:min-w-0 snap-start"
            >
              <Card
                interactive
                className="h-full p-5 border-t-4 border-emerald-500 bg-surface-1 flex flex-col"
              >
                <div className="mb-3 text-emerald-500 group-hover:scale-110 transition-transform origin-left">
                  <Gamepad2 className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-text-primary mb-1">
                  Stop Game
                </h3>
                <p className="text-text-secondary text-xs flex-1">
                  Vocabulario rápido. Encuentra palabras que empiecen con una
                  letra.
                </p>
              </Card>
            </Link>

            <Link
              to="/syntax-builder"
              className="group block min-w-[260px] md:min-w-0 snap-start"
            >
              <Card
                interactive
                className="h-full p-5 border-t-4 border-blue-400 bg-surface-1 flex flex-col"
              >
                <div className="mb-3 text-blue-400 group-hover:scale-110 transition-transform origin-left">
                  <Code2 className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-text-primary mb-1">
                  Code Syntax Builder
                </h3>
                <p className="text-text-secondary text-xs flex-1">
                  Reconstruye comandos y sintaxis de código contra el tiempo.
                </p>
              </Card>
            </Link>

            <Link
              to="/bug-hunter"
              className="group block min-w-[260px] md:min-w-0 snap-start"
            >
              <Card
                interactive
                className="h-full p-5 border-t-4 border-red-400 bg-surface-1 flex flex-col"
              >
                <div className="mb-3 text-red-400 group-hover:scale-110 transition-transform origin-left">
                  <Bug className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-text-primary mb-1">
                  Code Bug Hunter
                </h3>
                <p className="text-text-secondary text-xs flex-1">
                  Encuentra y selecciona el bug en el bloque de código antes de
                  que acabe el tiempo.
                </p>
              </Card>
            </Link>

            <Link
              to="/speed-builder"
              className="group block min-w-[260px] md:min-w-0 snap-start"
            >
              <Card
                interactive
                className="h-full p-5 border-t-4 border-amber-500 bg-surface-1 flex flex-col"
              >
                <div className="mb-3 text-amber-500 group-hover:scale-110 transition-transform origin-left">
                  <Zap className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-text-primary mb-1">
                  Speed Builder
                </h3>
                <p className="text-text-secondary text-xs flex-1">
                  Ordena palabras para formar oraciones correctas contra el
                  tiempo.
                </p>
              </Card>
            </Link>

            <Link
              to="/error-hunter"
              className="group block min-w-[260px] md:min-w-0 snap-start"
            >
              <Card
                interactive
                className="h-full p-5 border-t-4 border-rose-500 bg-surface-1 flex flex-col"
              >
                <div className="mb-3 text-rose-500 group-hover:scale-110 transition-transform origin-left">
                  <Search className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-text-primary mb-1">
                  Error Hunter
                </h3>
                <p className="text-text-secondary text-xs flex-1">
                  Encuentra y corrige el error gramatical oculto.
                </p>
              </Card>
            </Link>

            <Link
              to="/paraphrase-duel"
              className="group block min-w-[260px] md:min-w-0 snap-start"
            >
              <Card
                interactive
                className="h-full p-5 border-t-4 border-blue-500 bg-surface-1 flex flex-col"
              >
                <div className="mb-3 text-blue-500 group-hover:scale-110 transition-transform origin-left">
                  <Repeat className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-text-primary mb-1">
                  Paraphrase Duel
                </h3>
                <p className="text-text-secondary text-xs flex-1">
                  Reescribe oraciones usando conectores específicos.
                </p>
              </Card>
            </Link>

            <Link
              to="/collocation-sprint"
              className="group block min-w-[260px] md:min-w-0 snap-start"
            >
              <Card
                interactive
                className="h-full p-5 border-t-4 border-orange-500 bg-surface-1 flex flex-col"
              >
                <div className="mb-3 text-orange-500 group-hover:scale-110 transition-transform origin-left">
                  <Flame className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-text-primary mb-1">
                  Collocations
                </h3>
                <p className="text-text-secondary text-xs flex-1">
                  Une verbos con sus sustantivos correctos rápidamente.
                </p>
              </Card>
            </Link>

            <Link
              to="/taboo-english"
              className="group block min-w-[260px] md:min-w-0 snap-start"
            >
              <Card
                interactive
                className="h-full p-5 border-t-4 border-purple-500 bg-surface-1 flex flex-col"
              >
                <div className="mb-3 text-purple-500 group-hover:scale-110 transition-transform origin-left">
                  <MessageSquare className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-text-primary mb-1">
                  Taboo English
                </h3>
                <p className="text-text-secondary text-xs flex-1">
                  Describe una palabra sin usar términos prohibidos.
                </p>
              </Card>
            </Link>

            <Link
              to="/sentence-transformer"
              className="group block min-w-[260px] md:min-w-0 snap-start"
            >
              <Card
                interactive
                className="h-full p-5 border-t-4 border-sky-500 bg-surface-1 flex flex-col"
              >
                <div className="mb-3 text-sky-500 group-hover:scale-110 transition-transform origin-left">
                  <RefreshCw className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-text-primary mb-1">
                  Transformer
                </h3>
                <p className="text-text-secondary text-xs flex-1">
                  Convierte a negativas, preguntas o condicionales.
                </p>
              </Card>
            </Link>

            <Link
              to="/math-game"
              className="group block min-w-[260px] md:min-w-0 snap-start"
            >
              <Card
                interactive
                className="h-full p-5 border-t-4 border-indigo-500 bg-surface-1 flex flex-col"
              >
                <div className="mb-3 text-indigo-500 group-hover:scale-110 transition-transform origin-left">
                  <Calculator className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-text-primary mb-1">
                  Math Quiz
                </h3>
                <p className="text-text-secondary text-xs flex-1">
                  Prueba rápida de fórmulas de cálculo y álgebra en inglés.
                </p>
              </Card>
            </Link>

            <Link
              to="/docs-quiz"
              className="group block min-w-[260px] md:min-w-0 snap-start"
            >
              <Card
                interactive
                className="h-full p-5 border-t-4 border-slate-500 bg-surface-1 flex flex-col"
              >
                <div className="mb-3 text-slate-500 group-hover:scale-110 transition-transform origin-left">
                  <Laptop className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-text-primary mb-1">
                  Tech Interview
                </h3>
                <p className="text-text-secondary text-xs flex-1">
                  Preguntas teóricas de software engineering.
                </p>
              </Card>
            </Link>
          </div>
        </section>

        {/* Global Activity Heatmap */}
        <section className="bg-surface-1 border border-border rounded-3xl p-6 md:p-8 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-text-primary">
              Global Activity
            </h2>
            <Link
              to="/stats"
              className="text-sm font-bold text-accent hover:text-accent-hover transition-colors"
            >
              View full stats →
            </Link>
          </div>
          <div className="flex justify-center w-full overflow-x-auto pb-2">
            <Heatmap />
          </div>
        </section>

        {/* Progress Summary */}
        <section className="bg-surface-1 border border-border rounded-3xl p-6 md:p-8 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-text-primary">
              Your Vault Progress
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
