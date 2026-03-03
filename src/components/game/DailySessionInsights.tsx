import React, { useEffect, useMemo, useState } from "react";
import { Award } from "lucide-react";
import { addGlobalXp } from "@/lib/xpStore";
import { toast } from "@/components/ui/Toast";
import {
  FOCUS_ROUTE_LABEL,
  claimDailySessionReward,
  getTodaySessionSummary,
} from "@/lib/dailySessionSummary";
import { toDateKey } from "@/lib/activityTracker";

interface DailySessionInsightsProps {
  className?: string;
}

const DailySessionInsights: React.FC<DailySessionInsightsProps> = ({
  className = "",
}) => {
  const [refreshToken, setRefreshToken] = useState(0);

  const summary = useMemo(
    () => getTodaySessionSummary(toDateKey()),
    [refreshToken],
  );

  useEffect(() => {
    const refresh = () => setRefreshToken((previous) => previous + 1);
    const timeoutId = window.setTimeout(refresh, 0);

    window.addEventListener("activityUpdated", refresh);
    window.addEventListener("analyticsUpdated", refresh);
    window.addEventListener("dailySessionRewardUpdated", refresh);
    window.addEventListener("focus", refresh);

    return () => {
      window.clearTimeout(timeoutId);
      window.removeEventListener("activityUpdated", refresh);
      window.removeEventListener("analyticsUpdated", refresh);
      window.removeEventListener("dailySessionRewardUpdated", refresh);
      window.removeEventListener("focus", refresh);
    };
  }, []);

  const strongestRouteLabel = summary.strongestRoute
    ? FOCUS_ROUTE_LABEL[summary.strongestRoute]
    : "No data yet";

  const weakestRouteLabel = summary.weakestRoute
    ? FOCUS_ROUTE_LABEL[summary.weakestRoute]
    : "No data yet";

  const handleClaimReward = () => {
    if (!summary.rewardEligible) {
      toast.error("Complete 2 sessions and keep 70%+ accuracy to claim reward.");
      return;
    }

    if (!claimDailySessionReward(summary.date)) {
      toast.info("Today's session reward was already claimed.");
      setRefreshToken((previous) => previous + 1);
      return;
    }

    addGlobalXp(summary.rewardXp);
    toast.success(`Session reward claimed: +${summary.rewardXp} XP`);
    setRefreshToken((previous) => previous + 1);
  };

  return (
    <div className={`rounded-xl border border-border bg-surface-2 p-4 ${className}`}>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-text-muted">
            Sessions
          </p>
          <p className="text-lg font-black text-text-primary">
            {summary.sessionsCompleted}
          </p>
        </div>
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-text-muted">
            Accuracy
          </p>
          <p className="text-lg font-black text-text-primary">
            {summary.accuracy}%
          </p>
        </div>
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-text-muted">
            Strongest
          </p>
          <p className="text-sm font-bold text-emerald-500 mt-1">
            {strongestRouteLabel}
          </p>
        </div>
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-text-muted">
            Needs Focus
          </p>
          <p className="text-sm font-bold text-amber-500 mt-1">
            {weakestRouteLabel}
          </p>
        </div>
      </div>

      <div className="mt-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <p className="text-xs text-text-secondary">
          {summary.rewardEligible
            ? "Daily session reward ready."
            : "Play 2 sessions with 70%+ accuracy to unlock daily reward."}
        </p>
        <button
          type="button"
          onClick={handleClaimReward}
          disabled={!summary.rewardEligible || summary.rewardClaimed}
          className={`inline-flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-xs font-black transition-colors ${summary.rewardEligible && !summary.rewardClaimed ? "bg-emerald-500 hover:bg-emerald-600 text-white" : "bg-surface-1 text-text-muted border border-border"}`}
        >
          <Award className="w-4 h-4" />
          {summary.rewardClaimed
            ? "Reward Claimed"
            : `Claim +${summary.rewardXp} XP`}
        </button>
      </div>
    </div>
  );
};

export default DailySessionInsights;
