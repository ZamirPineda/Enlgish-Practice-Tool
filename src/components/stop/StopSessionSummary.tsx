import React, { useMemo } from "react";
import { motion } from "framer-motion";
import {
  Activity,
  CheckCircle2,
  Clock3,
  Flame,
  RotateCcw,
  SkipForward,
  Trophy,
  XCircle,
} from "lucide-react";
import Button from "@/components/ui/Button";
import AmbientOrbScene from "@/components/visual/AmbientOrbScene";
import InsightPanel from "@/components/visual/InsightPanel";
import { StopCategory } from "@/types";
import { getStopVisualThemeFromCategory } from "@/lib/stopVisualThemes";

interface StopSessionSummaryProps {
  score: number;
  bestStreak: number;
  selectedGroup: string;
  difficulty: 15 | 30 | 60;
  sessionDurationSeconds: number;
  gameStats: {
    correct: number;
    skipped: number;
    incorrect: number;
    history: {
      letter: string;
      category: string;
      word: string;
      status: "correct" | "skipped" | "incorrect" | "self-corrected";
    }[];
  };
  onPlayAgain: () => void;
  onBackToMenu: () => void;
}

const StopSessionSummary: React.FC<StopSessionSummaryProps> = ({
  score,
  bestStreak,
  selectedGroup,
  difficulty,
  sessionDurationSeconds,
  gameStats,
  onPlayAgain,
  onBackToMenu,
}) => {
  const accuracy =
    gameStats.correct + gameStats.incorrect > 0
      ? Math.round(
          (gameStats.correct / (gameStats.correct + gameStats.incorrect)) * 100,
        )
      : 0;

  const durationLabel =
    sessionDurationSeconds >= 60
      ? `${Math.floor(sessionDurationSeconds / 60)}m ${sessionDurationSeconds % 60}s`
      : `${sessionDurationSeconds}s`;

  const roundsPerMinute =
    sessionDurationSeconds > 0
      ? ((gameStats.history.length / sessionDurationSeconds) * 60).toFixed(1)
      : "0.0";

  const gradeInfo = (() => {
    if (score >= 50) {
      return {
        grade: "S",
        message: "Vocabulary master",
        accent: "violet" as const,
        scene: "violet" as const,
      };
    }
    if (score >= 30) {
      return {
        grade: "A",
        message: "Excellent run",
        accent: "emerald" as const,
        scene: "emerald" as const,
      };
    }
    if (score >= 15) {
      return {
        grade: "B",
        message: "Strong session",
        accent: "sky" as const,
        scene: "sky" as const,
      };
    }
    return {
      grade: score >= 5 ? "C" : "D",
      message: score >= 5 ? "Good effort" : "Keep practicing",
      accent: "amber" as const,
      scene: "sunset" as const,
    };
  })();

  const summary = useMemo(() => {
    const categoryCounts = new Map<string, number>();
    for (const item of gameStats.history) {
      categoryCounts.set(
        item.category,
        (categoryCounts.get(item.category) ?? 0) + 1,
      );
    }

    const dominantCategory =
      [...categoryCounts.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] ??
      "Mixed";

    const recentHighlights = gameStats.history
      .filter(
        (item) => item.status === "correct" || item.status === "self-corrected",
      )
      .slice(-3)
      .reverse();

    const pressurePoints = gameStats.history
      .filter(
        (item) => item.status === "incorrect" || item.status === "skipped",
      )
      .slice(-3)
      .reverse();

    return {
      dominantCategory,
      recentHighlights,
      pressurePoints,
    };
  }, [gameStats.history]);

  const dominantTheme = getStopVisualThemeFromCategory(
    summary.dominantCategory as StopCategory,
  );

  const statCards = [
    {
      label: "Total Score",
      value: `${score}`,
      tone: "text-white",
      icon: Trophy,
    },
    {
      label: "Best Streak",
      value: `${bestStreak}`,
      tone: "text-amber-300",
      icon: Flame,
    },
    {
      label: "Accuracy",
      value: `${accuracy}%`,
      tone: "text-emerald-300",
      icon: Activity,
    },
    {
      label: "Pace",
      value: `${roundsPerMinute}/min`,
      tone: "text-sky-300",
      icon: Clock3,
    },
  ];

  return (
    <div className="flex-1 overflow-y-auto overscroll-y-contain bg-background p-4 pb-[calc(env(safe-area-inset-bottom)+6.5rem)] sm:p-6 md:pb-6">
      <div className="mx-auto flex min-h-full w-full max-w-5xl flex-col gap-4">
        <div className="grid gap-4 xl:grid-cols-[minmax(0,1.15fr)_minmax(19rem,0.85fr)]">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative overflow-hidden rounded-[2rem]"
          >
            <AmbientOrbScene
              variant={gradeInfo.scene}
              label="Session Summary"
              title={`${gradeInfo.grade} rank - ${score} points`}
              description={`${gradeInfo.message}. ${selectedGroup} mode, ${difficulty}s rounds, ${durationLabel} total.`}
              intensity={Math.min(1, 0.45 + bestStreak / 10)}
              energy={Math.min(1, 0.35 + accuracy / 120)}
            />
            <div className="pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between p-5">
              <div className="rounded-[1.5rem] border border-white/10 bg-black/20 px-4 py-3 backdrop-blur-md">
                <div className="text-[11px] font-black uppercase tracking-[0.22em] text-white/45">
                  Session Grade
                </div>
                <div className="mt-1 text-5xl font-black text-white">
                  {gradeInfo.grade}
                </div>
              </div>
              <div className="rounded-[1.5rem] border border-white/10 bg-black/20 px-4 py-3 text-right backdrop-blur-md">
                <div className="text-[11px] font-black uppercase tracking-[0.22em] text-white/45">
                  Dominant Category
                </div>
                <div className="mt-1 text-lg font-black text-white">
                  {summary.dominantCategory}
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <InsightPanel
              eyebrow="Session Readout"
              title="Final round profile"
              description="The closing view now reads the whole run: pace, consistency, and category gravity."
              accent={gradeInfo.accent}
              motif="game"
              topic={dominantTheme.topic}
              statALabel="Rounds"
              statAValue={`${gameStats.history.length}`}
              statBLabel="Correct"
              statBValue={`${gameStats.correct}`}
              intensity={Math.min(1, 0.38 + gameStats.history.length / 24)}
              energy={Math.min(1, 0.34 + bestStreak / 12)}
            />
          </motion.div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {statCards.map(({ label, value, tone, icon: Icon }, index) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.04 * index }}
              className="rounded-[1.6rem] border border-white/10 bg-[linear-gradient(180deg,rgba(15,23,42,0.96),rgba(15,23,42,0.78))] p-4 shadow-[0_20px_60px_rgba(2,6,23,0.35)]"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-[11px] font-black uppercase tracking-[0.2em] text-white/45">
                    {label}
                  </div>
                  <div className={`mt-3 text-3xl font-black ${tone}`}>
                    {value}
                  </div>
                </div>
                <div className="rounded-full border border-white/10 bg-white/5 p-2 text-white/70">
                  <Icon className="h-4 w-4" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1.15fr)]">
          <div className="rounded-[1.75rem] border border-white/10 bg-[linear-gradient(180deg,rgba(6,78,59,0.18),rgba(15,23,42,0.92))] p-4 backdrop-blur-md">
            <div className="flex items-center gap-2 text-emerald-200">
              <CheckCircle2 className="h-4 w-4" />
              <div className="text-[11px] font-black uppercase tracking-[0.2em]">
                Locked In
              </div>
            </div>
            <div className="mt-3 space-y-2">
              {summary.recentHighlights.length > 0 ? (
                summary.recentHighlights.map((item) => (
                  <div
                    key={`${item.letter}-${item.category}-${item.word}`}
                    className="rounded-2xl border border-emerald-400/15 bg-black/15 px-3 py-2"
                  >
                    <div className="text-[10px] font-black uppercase tracking-[0.18em] text-white/40">
                      {item.letter} • {item.category}
                    </div>
                    <div className="mt-1 text-sm font-bold text-white">
                      {item.word}
                    </div>
                  </div>
                ))
              ) : (
                <div className="rounded-2xl border border-white/10 bg-black/15 px-3 py-4 text-sm text-white/70">
                  No correct answers were locked in this run.
                </div>
              )}
            </div>
          </div>

          <div className="rounded-[1.75rem] border border-white/10 bg-[linear-gradient(180deg,rgba(120,53,15,0.18),rgba(15,23,42,0.92))] p-4 backdrop-blur-md">
            <div className="flex items-center gap-2 text-amber-200">
              <XCircle className="h-4 w-4" />
              <div className="text-[11px] font-black uppercase tracking-[0.2em]">
                Pressure Points
              </div>
            </div>
            <div className="mt-3 space-y-2">
              {summary.pressurePoints.length > 0 ? (
                summary.pressurePoints.map((item) => (
                  <div
                    key={`${item.letter}-${item.category}-${item.word}-${item.status}`}
                    className="rounded-2xl border border-amber-400/15 bg-black/15 px-3 py-2"
                  >
                    <div className="text-[10px] font-black uppercase tracking-[0.18em] text-white/40">
                      {item.status} • {item.category}
                    </div>
                    <div className="mt-1 text-sm font-bold text-white">
                      {item.word}
                    </div>
                  </div>
                ))
              ) : (
                <div className="rounded-2xl border border-white/10 bg-black/15 px-3 py-4 text-sm text-white/70">
                  The run stayed clean without misses or skips.
                </div>
              )}
            </div>
          </div>

          <div className="rounded-[1.75rem] border border-white/10 bg-[linear-gradient(180deg,rgba(15,23,42,0.98),rgba(15,23,42,0.82))] p-4 backdrop-blur-md">
            <div className="flex items-center gap-2 text-white/75">
              <Activity className="h-4 w-4" />
              <div className="text-[11px] font-black uppercase tracking-[0.2em]">
                Session Timeline
              </div>
            </div>
            <div className="mt-3 max-h-80 space-y-2 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-border">
              {gameStats.history
                .slice()
                .reverse()
                .map((item) => {
                  const statusTone =
                    item.status === "correct" ||
                    item.status === "self-corrected"
                      ? "border-emerald-400/15 bg-emerald-400/10 text-emerald-100"
                      : item.status === "skipped"
                        ? "border-white/10 bg-white/5 text-white/75"
                        : "border-red-400/15 bg-red-400/10 text-red-100";
                  const StatusIcon =
                    item.status === "correct" ||
                    item.status === "self-corrected"
                      ? CheckCircle2
                      : item.status === "skipped"
                        ? SkipForward
                        : XCircle;

                  return (
                    <div
                      key={`${item.letter}-${item.category}-${item.word}-${item.status}`}
                      className={`flex items-center justify-between gap-3 rounded-2xl border px-3 py-3 ${statusTone}`}
                    >
                      <div className="min-w-0">
                        <div className="text-[10px] font-black uppercase tracking-[0.18em] text-white/45">
                          {item.letter} • {item.category}
                        </div>
                        <div className="mt-1 truncate text-sm font-bold text-white">
                          {item.word}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 rounded-full border border-white/10 bg-black/15 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em]">
                        <StatusIcon className="h-3.5 w-3.5" />
                        {item.status === "self-corrected"
                          ? "Recovered"
                          : item.status}
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Button
            onClick={onPlayAgain}
            variant="primary"
            className="flex-1 py-3 text-lg font-bold"
          >
            <span className="inline-flex items-center gap-2">
              <RotateCcw className="h-4 w-4" />
              Play Again
            </span>
          </Button>
          <Button
            onClick={onBackToMenu}
            variant="secondary"
            className="flex-1 py-3 text-lg"
          >
            Back to Menu
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StopSessionSummary;
