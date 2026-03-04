import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, Circle, Trophy } from "lucide-react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { getAnalyticsEvents, trackAnalyticsEvent } from "@/lib/analytics";
import {
  claimDailyLoopReward,
  DAILY_LOOP_FOCUS_LABEL,
  DAILY_LOOP_REWARD_XP,
  DailyLoopFocusRoute,
  DailyLoopState,
  getTodayDailyLoop,
  markDailyLoopStepComplete,
  saveDailyLoopState,
  startDailyLoop,
  syncDailyLoopWithAnalytics,
} from "@/lib/dailyLoop";
import { addGlobalXp } from "@/lib/xpStore";
import { toast } from "@/components/ui/Toast";

const STEP_CATEGORY_LABEL = {
  english: "English",
  math: "Math",
  dev: "Dev",
} as const;

const PROGRESS_STYLE = {
  english:
    "border-emerald-500/40 bg-emerald-500/10 text-emerald-500 shadow-emerald-500/20",
  math: "border-sky-500/40 bg-sky-500/10 text-sky-500 shadow-sky-500/20",
  dev: "border-violet-500/40 bg-violet-500/10 text-violet-500 shadow-violet-500/20",
};

const DailyLoopView: React.FC = () => {
  const [selectedFocusRoute, setSelectedFocusRoute] =
    useState<DailyLoopFocusRoute>("english_interview");
  const [loop, setLoop] = useState<DailyLoopState | null>(() =>
    getTodayDailyLoop(),
  );

  const syncLoopState = useCallback(() => {
    const storedLoop = getTodayDailyLoop();
    if (!storedLoop) {
      setLoop(null);
      return;
    }

    const syncedLoop = syncDailyLoopWithAnalytics(
      storedLoop,
      getAnalyticsEvents(),
    );
    const changed = JSON.stringify(storedLoop) !== JSON.stringify(syncedLoop);

    if (changed) {
      saveDailyLoopState(syncedLoop);
      if (!storedLoop.completedAt && syncedLoop.completedAt) {
        const durationSeconds = Math.max(
          0,
          Math.round(
            (new Date(syncedLoop.completedAt).getTime() -
              new Date(syncedLoop.startedAt).getTime()) /
              1000,
          ),
        );
        trackAnalyticsEvent("session_end", {
          game: "daily_loop",
          focusRoute: syncedLoop.focusRoute,
          duration: durationSeconds,
          stepsCompleted: syncedLoop.steps.length,
        });
        toast.success("Daily loop completado. Ya puedes reclamar tu reward.");
      }
    }

    setLoop(syncedLoop);
  }, []);

  useEffect(() => {
    syncLoopState();

    const handleRefresh = () => syncLoopState();
    const handleVisibility = () => {
      if (document.visibilityState === "visible") {
        syncLoopState();
      }
    };

    window.addEventListener("analyticsUpdated", handleRefresh);
    window.addEventListener("dailyLoopUpdated", handleRefresh);
    window.addEventListener("storage", handleRefresh);
    window.addEventListener("focus", handleRefresh);
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      window.removeEventListener("analyticsUpdated", handleRefresh);
      window.removeEventListener("dailyLoopUpdated", handleRefresh);
      window.removeEventListener("storage", handleRefresh);
      window.removeEventListener("focus", handleRefresh);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [syncLoopState]);

  const progress = useMemo(() => {
    if (!loop) {
      return { completed: 0, total: 4, percent: 0 };
    }
    const completed = loop.steps.filter((step) =>
      Boolean(step.completedAt),
    ).length;
    const total = loop.steps.length;
    const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
    return { completed, total, percent };
  }, [loop]);

  const handleStartLoop = () => {
    const nextLoop = startDailyLoop(selectedFocusRoute);
    setLoop(nextLoop);
    trackAnalyticsEvent("session_start", {
      game: "daily_loop",
      focusRoute: nextLoop.focusRoute,
      totalSteps: nextLoop.steps.length,
    });
    toast.success("Daily loop iniciado. Completa 4 sesiones.");
  };

  const handleManualComplete = (stepId: string) => {
    if (!loop) return;

    const updatedLoop = markDailyLoopStepComplete(loop, stepId);
    const changed = JSON.stringify(updatedLoop) !== JSON.stringify(loop);
    if (!changed) return;

    saveDailyLoopState(updatedLoop);
    setLoop(updatedLoop);

    if (!loop.completedAt && updatedLoop.completedAt) {
      const durationSeconds = Math.max(
        0,
        Math.round(
          (new Date(updatedLoop.completedAt).getTime() -
            new Date(updatedLoop.startedAt).getTime()) /
            1000,
        ),
      );
      trackAnalyticsEvent("session_end", {
        game: "daily_loop",
        focusRoute: updatedLoop.focusRoute,
        duration: durationSeconds,
        stepsCompleted: updatedLoop.steps.length,
      });
      toast.success("Daily loop completado. Ya puedes reclamar tu reward.");
    }
  };

  const handleClaimReward = () => {
    if (!loop || !loop.completedAt) return;

    const claimed = claimDailyLoopReward(loop.dateKey);
    if (!claimed) {
      toast.info("El reward del daily loop ya fue reclamado.");
      syncLoopState();
      return;
    }

    addGlobalXp(DAILY_LOOP_REWARD_XP);
    toast.success(`Reward reclamado: +${DAILY_LOOP_REWARD_XP} XP`);
    syncLoopState();
  };

  return (
    <div className="flex-1 overflow-y-auto overscroll-y-contain bg-background p-4 sm:p-8 pb-4 sm:pb-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <Card elevated>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h1 className="text-3xl sm:text-4xl font-black text-text-primary tracking-tight">
                Daily Loop
              </h1>
              <p className="text-sm text-text-secondary mt-1">
                Bloque guiado de 15-25 min: 2 English + 1 Math + 1 Dev.
              </p>
            </div>
            {loop && (
              <div className="text-xs font-bold uppercase tracking-widest text-text-secondary">
                Focus: {DAILY_LOOP_FOCUS_LABEL[loop.focusRoute]}
              </div>
            )}
          </div>
        </Card>

        {!loop && (
          <Card className="space-y-5">
            <div className="space-y-2">
              <h2 className="text-xl font-black text-text-primary">
                Configura tu ruta de hoy
              </h2>
              <p className="text-sm text-text-secondary">
                El loop se guarda automaticamente para que puedas reanudarlo.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {(
                Object.keys(DAILY_LOOP_FOCUS_LABEL) as DailyLoopFocusRoute[]
              ).map((route) => (
                <button
                  key={route}
                  type="button"
                  onClick={() => setSelectedFocusRoute(route)}
                  className={`rounded-xl border px-4 py-3 text-left transition-all ${selectedFocusRoute === route ? "border-accent bg-accent/10 text-text-primary" : "border-border bg-surface-2 text-text-secondary hover:bg-surface-hover"}`}
                >
                  <p className="text-sm font-black">
                    {DAILY_LOOP_FOCUS_LABEL[route]}
                  </p>
                  <p className="text-xs mt-1">Ruta objetivo para hoy.</p>
                </button>
              ))}
            </div>

            <Button variant="primary" size="lg" onClick={handleStartLoop}>
              Iniciar Daily Loop
            </Button>
          </Card>
        )}

        {loop && (
          <>
            <Card className="space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-sm font-bold text-text-primary">
                  Progreso: {progress.completed} / {progress.total} sesiones
                </p>
                <p className="text-xs font-bold uppercase tracking-widest text-text-secondary">
                  {progress.percent}%
                </p>
              </div>
              <div className="h-2 rounded-full bg-surface-2 border border-border overflow-hidden">
                <div
                  className="h-full bg-accent transition-all duration-500"
                  style={{ width: `${progress.percent}%` }}
                />
              </div>
            </Card>

            <div className="space-y-3">
              {loop.steps.map((step, index) => {
                const isCompleted = Boolean(step.completedAt);
                return (
                  <Card
                    key={step.id}
                    className={`transition-colors ${isCompleted ? "bg-emerald-500/5 border-emerald-500/30" : ""}`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          {isCompleted ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                          ) : (
                            <Circle className="w-4 h-4 text-text-muted" />
                          )}
                          <p className="text-xs font-bold uppercase tracking-widest text-text-muted">
                            Paso {index + 1}
                          </p>
                          <span
                            className={`text-[10px] font-black uppercase tracking-widest rounded-full border px-2 py-0.5 shadow-sm ${PROGRESS_STYLE[step.category]}`}
                          >
                            {STEP_CATEGORY_LABEL[step.category]}
                          </span>
                        </div>
                        <h3 className="text-lg font-black text-text-primary">
                          {step.title}
                        </h3>
                        <p className="text-sm text-text-secondary">
                          {step.description}
                        </p>
                      </div>

                      <div className="flex flex-col sm:items-end gap-2">
                        <Link
                          to={step.path}
                          className="inline-flex min-h-[40px] items-center justify-center rounded-lg border border-border bg-surface-2 px-4 text-sm font-bold text-text-primary transition-colors hover:bg-surface-hover"
                        >
                          Abrir juego
                        </Link>
                        <Button
                          size="sm"
                          variant={isCompleted ? "success" : "secondary"}
                          onClick={() => handleManualComplete(step.id)}
                          disabled={isCompleted}
                        >
                          {isCompleted ? "Completada" : "Marcar completada"}
                        </Button>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>

            {loop.completedAt && (
              <Card className="space-y-4 border-emerald-500/30 bg-emerald-500/5">
                <div className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-emerald-500" />
                  <h2 className="text-xl font-black text-text-primary">
                    Loop terminado
                  </h2>
                </div>
                <p className="text-sm text-text-secondary">
                  Cerraste tu bloque diario. Reclama tu recompensa y sigue con
                  tu siguiente sesion.
                </p>
                <Button
                  variant="success"
                  onClick={handleClaimReward}
                  disabled={loop.rewardClaimed}
                >
                  {loop.rewardClaimed
                    ? "Reward ya reclamada"
                    : `Reclamar +${DAILY_LOOP_REWARD_XP} XP`}
                </Button>
              </Card>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default DailyLoopView;
