import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Flame,
  Zap,
  Award,
  CheckCircle2,
  ChevronRight,
  TrendingUp,
} from "lucide-react";
import { loadSettings } from "@/lib/settingsStore";
import {
  getGlobalStreak,
  getGlobalActivityData,
  toDateKey,
} from "@/lib/activityTracker";
import { addGlobalXp } from "@/lib/xpStore";
import { toast } from "@/components/ui/Toast";
import {
  FOCUS_ROUTE_LABEL,
  claimDailySessionReward,
  getTodaySessionSummary,
} from "@/lib/dailySessionSummary";
import {
  claimWeeklyConsistencyReward,
  getWeeklyConsistencyStatus,
} from "@/lib/weeklyConsistencyRewards";

const DailyProgressWidget: React.FC = () => {
  const [refreshToken, setRefreshToken] = useState(0);

  useEffect(() => {
    const forceRefresh = () => setRefreshToken((prev) => prev + 1);
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        forceRefresh();
      }
    };

    const intervalId = window.setInterval(forceRefresh, 60000);

    window.addEventListener("activityUpdated", forceRefresh);
    window.addEventListener("analyticsUpdated", forceRefresh);
    window.addEventListener("globalXpUpdated", forceRefresh);
    window.addEventListener("dailySessionRewardUpdated", forceRefresh);
    window.addEventListener("weeklyConsistencyUpdated", forceRefresh);
    window.addEventListener("storage", forceRefresh);
    window.addEventListener("focus", forceRefresh);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.clearInterval(intervalId);
      window.removeEventListener("activityUpdated", forceRefresh);
      window.removeEventListener("analyticsUpdated", forceRefresh);
      window.removeEventListener("globalXpUpdated", forceRefresh);
      window.removeEventListener("dailySessionRewardUpdated", forceRefresh);
      window.removeEventListener("weeklyConsistencyUpdated", forceRefresh);
      window.removeEventListener("storage", forceRefresh);
      window.removeEventListener("focus", forceRefresh);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  const settings = useMemo(() => loadSettings(), [refreshToken]);
  const { current: currentStreak, best: bestStreak } = useMemo(
    () => getGlobalStreak(),
    [refreshToken],
  );

  const todayStr = useMemo(() => toDateKey(new Date()), [refreshToken]);
  const todayData = useMemo(() => {
    const data = getGlobalActivityData();
    return data[todayStr] || { cards: 0, time: 0, xp: 0, score: 0 };
  }, [todayStr, refreshToken]);

  const { goalType, target, currentVal, unit } = useMemo(() => {
    const type = settings.dailyGoalType;
    let val = 0;
    let u = "";

    if (type === "cards") {
      val = todayData.cards || 0;
      u = "cards";
    } else if (type === "time") {
      val = todayData.time || 0;
      u = "mins";
    } else {
      val = todayData.xp || 0;
      u = "XP";
    }

    return {
      goalType: type,
      target: settings.dailyGoalTarget || 50,
      currentVal: val,
      unit: u,
    };
  }, [settings, todayData]);

  const progressPct = Math.min(100, Math.max(0, (currentVal / target) * 100));
  const isGoalMet = currentVal >= target;
  const sessionSummary = useMemo(
    () => getTodaySessionSummary(todayStr),
    [todayStr, refreshToken],
  );
  const weeklyConsistency = useMemo(
    () => getWeeklyConsistencyStatus(),
    [refreshToken],
  );

  const strongestRouteLabel = sessionSummary.strongestRoute
    ? FOCUS_ROUTE_LABEL[sessionSummary.strongestRoute]
    : "No data yet";
  const weakestRouteLabel = sessionSummary.weakestRoute
    ? FOCUS_ROUTE_LABEL[sessionSummary.weakestRoute]
    : "No data yet";

  const handleClaimSessionReward = () => {
    if (!sessionSummary.rewardEligible) {
      toast.error("Haz 2 sesiones con 70%+ para reclamar.");
      return;
    }

    if (!claimDailySessionReward(sessionSummary.date)) {
      toast.info("Reward diaria ya reclamada.");
      setRefreshToken((prev) => prev + 1);
      return;
    }

    addGlobalXp(sessionSummary.rewardXp);
    toast.success(`+${sessionSummary.rewardXp} XP`);
    setRefreshToken((prev) => prev + 1);
  };

  const handleClaimWeeklyTier = (tierId: string) => {
    const result = claimWeeklyConsistencyReward(tierId);
    if (!result.ok) {
      if ("reason" in result && result.reason === "already_claimed") {
        toast.info("Reward semanal ya reclamada.");
      } else {
        toast.error("Mantén la racha semanal para desbloquear.");
      }
      setRefreshToken((prev) => prev + 1);
      return;
    }

    addGlobalXp(result.rewardXp);
    toast.success(`+${result.rewardXp} XP semanal`);
    setRefreshToken((prev) => prev + 1);
  };

  return (
    <div className="bg-surface-1 border border-border shadow-sm rounded-3xl p-5 sm:p-6 mb-8 hover:shadow-md transition-shadow">
      <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
        {/* Circle Progress */}
        <div className="relative w-28 h-28 flex-shrink-0 flex items-center justify-center">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
            {/* Background UI Ring */}
            <circle
              cx="50"
              cy="50"
              r="42"
              fill="none"
              strokeWidth="10"
              className="stroke-surface-2"
            />
            {/* Foreground Fill */}
            <circle
              cx="50"
              cy="50"
              r="42"
              fill="none"
              strokeWidth="10"
              strokeLinecap="round"
              className={isGoalMet ? "stroke-emerald-500" : "stroke-accent"}
              strokeDasharray="264" // approx 2 * pi * 42
              strokeDashoffset={264 - (264 * progressPct) / 100}
              style={{
                transition: "stroke-dashoffset 1s ease-out, stroke 0.5s",
              }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            {isGoalMet ? (
              <CheckCircle2 className="w-8 h-8 text-emerald-500 mb-1 animate-bounce" />
            ) : (
              <>
                <span className="text-xl font-black text-text-primary">
                  {currentVal}
                </span>
                <span className="text-xs text-text-secondary font-bold uppercase tracking-wide">
                  / {target}
                </span>
              </>
            )}
          </div>
        </div>

        {/* Info Area */}
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-xl sm:text-2xl font-black text-text-primary flex items-center justify-center md:justify-start gap-2 mb-1">
            {isGoalMet ? "Goal Completed!" : "Daily Goal"}
            {isGoalMet && <Zap className="w-5 h-5 text-emerald-500" />}
          </h2>
          <p className="text-text-secondary text-sm md:text-base mb-4">
            {isGoalMet
              ? `You've crushed your goal of ${target} ${unit} today.`
              : `${target - currentVal} more ${unit} needed to reach your goal.`}
          </p>

          <div className="flex items-center justify-center md:justify-start gap-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-orange-500/10 text-orange-500 font-bold rounded-lg text-sm border border-orange-500/20">
              <Flame
                className={`w-4 h-4 ${currentStreak > 0 ? "fill-orange-500" : ""}`}
              />
              {currentStreak} Day Streak
            </span>
            {bestStreak > currentStreak && (
              <span className="text-xs font-bold text-text-muted flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> Best: {bestStreak}
              </span>
            )}
          </div>
        </div>

        {/* Action Area */}
        <div className="w-full md:w-auto flex flex-col gap-3">
          <Link
            to="/vault"
            className="w-full md:w-auto whitespace-nowrap px-6 py-3 bg-accent hover:bg-accent-hover text-white font-black rounded-xl transition-transform hover:-translate-y-0.5 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
          >
            Study Now <ChevronRight className="w-4 h-4" />
          </Link>
          <div className="text-center">
            <Link
              to="/settings"
              className="text-xs font-bold text-text-muted hover:text-text-primary"
            >
              Change Goal
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 md:grid-cols-4 gap-3">
        <div className="rounded-xl border border-border bg-surface-2 p-3">
          <p className="text-[10px] font-bold uppercase tracking-widest text-text-muted">
            Sessions
          </p>
          <p className="text-xl font-black text-text-primary">
            {sessionSummary.sessionsCompleted}
          </p>
        </div>
        <div className="rounded-xl border border-border bg-surface-2 p-3">
          <p className="text-[10px] font-bold uppercase tracking-widest text-text-muted">
            Accuracy
          </p>
          <p className="text-xl font-black text-text-primary">
            {sessionSummary.accuracy}%
          </p>
        </div>
        <div className="rounded-xl border border-border bg-surface-2 p-3">
          <p className="text-[10px] font-bold uppercase tracking-widest text-text-muted">
            Strongest
          </p>
          <p className="text-sm font-bold text-emerald-500 mt-1">
            {strongestRouteLabel}
          </p>
        </div>
        <div className="rounded-xl border border-border bg-surface-2 p-3">
          <p className="text-[10px] font-bold uppercase tracking-widest text-text-muted">
            Needs Focus
          </p>
          <p className="text-sm font-bold text-amber-500 mt-1">
            {weakestRouteLabel}
          </p>
        </div>
      </div>

      <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 rounded-xl border border-border bg-surface-2 px-4 py-3">
        <p className="text-sm text-text-secondary">
          {sessionSummary.rewardEligible
            ? "Daily session reward ready."
            : "Play 2 sessions with 70%+ accuracy to unlock daily reward."}
        </p>
        <button
          type="button"
          onClick={handleClaimSessionReward}
          disabled={
            !sessionSummary.rewardEligible || sessionSummary.rewardClaimed
          }
          className={`inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-black transition-colors ${sessionSummary.rewardEligible && !sessionSummary.rewardClaimed ? "bg-emerald-500 hover:bg-emerald-600 text-white" : "bg-surface-1 text-text-muted border border-border"}`}
        >
          <Award className="w-4 h-4" />
          {sessionSummary.rewardClaimed
            ? "Reward Claimed"
            : `Claim +${sessionSummary.rewardXp} XP`}
        </button>
      </div>

      <div className="mt-4 rounded-xl border border-border bg-surface-2 px-4 py-3">
        <div className="flex items-center justify-between gap-2">
          <p className="text-xs font-bold uppercase tracking-widest text-text-muted">
            Weekly Consistency
          </p>
          <p className="text-xs font-black text-text-secondary">
            {weeklyConsistency.activeDays} / 7 active days
          </p>
        </div>
        <div className="mt-2 h-2 rounded-full bg-surface-1 overflow-hidden">
          <div
            className="h-full bg-sky-500 transition-all duration-500"
            style={{
              width: `${Math.min(100, (weeklyConsistency.activeDays / 7) * 100)}%`,
            }}
          />
        </div>

        <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-2">
          {weeklyConsistency.tiers.map((tier) => (
            <div
              key={tier.id}
              className="rounded-lg border border-border bg-surface-1 p-2"
            >
              <p className="text-xs font-black text-text-primary">
                {tier.title}
              </p>
              <p className="text-[10px] text-text-muted mb-2">
                {tier.requiredDays} days • +{tier.rewardXp} XP
              </p>
              <button
                type="button"
                onClick={() => handleClaimWeeklyTier(tier.id)}
                disabled={!tier.eligible || tier.claimed}
                className={`w-full rounded-md px-2 py-1 text-[11px] font-black transition-colors ${tier.eligible && !tier.claimed ? "bg-sky-500 hover:bg-sky-600 text-white" : "bg-surface-2 text-text-muted border border-border"}`}
              >
                {tier.claimed
                  ? "Claimed"
                  : tier.eligible
                    ? "Claim Reward"
                    : "Locked"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DailyProgressWidget;
