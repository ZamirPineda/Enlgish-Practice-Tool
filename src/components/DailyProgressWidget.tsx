import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Flame,
  Zap,
  Clock,
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

const DailyProgressWidget: React.FC = () => {
  const settings = useMemo(() => loadSettings(), []);
  const { current: currentStreak, best: bestStreak } = useMemo(
    () => getGlobalStreak(),
    [],
  );

  const todayStr = useMemo(() => toDateKey(new Date()), []);
  const todayData = useMemo(() => {
    const data = getGlobalActivityData();
    return data[todayStr] || { cards: 0, time: 0, xp: 0, score: 0 };
  }, [todayStr]);

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
    </div>
  );
};

export default DailyProgressWidget;
