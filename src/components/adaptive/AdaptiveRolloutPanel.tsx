import React, { useEffect, useMemo, useState } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import {
  ADAPTIVE_ROLLOUT_GAME_IDS,
  ADAPTIVE_ROLLOUT_UPDATED_EVENT,
  getAdaptiveRolloutConfig,
  isAdaptiveDifficultyEnabledForGame,
  resetAdaptiveRolloutConfig,
  setAdaptiveDifficultyEnabledForGame,
  setAdaptiveDifficultyGlobalEnabled,
} from "@/lib/adaptiveRollout";

const prettifyGameId = (value: string) =>
  value
    .split("_")
    .map((token) => token.charAt(0).toUpperCase() + token.slice(1))
    .join(" ");

const AdaptiveRolloutPanel: React.FC = () => {
  const [refreshToken, setRefreshToken] = useState(0);

  const config = useMemo(() => getAdaptiveRolloutConfig(), [refreshToken]);

  useEffect(() => {
    const refresh = () => setRefreshToken((previous) => previous + 1);
    window.addEventListener(ADAPTIVE_ROLLOUT_UPDATED_EVENT, refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener(ADAPTIVE_ROLLOUT_UPDATED_EVENT, refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);

  return (
    <Card className="space-y-4 border-amber-500/30 bg-amber-500/5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-black text-text-primary">
            Adaptive Rollout Controls
          </h2>
          <p className="text-xs text-text-secondary mt-1">
            Toggle global/per-game adaptive rules and rollback quickly on regressions.
          </p>
          <p className="text-[11px] text-text-muted mt-2">
            Checklist: <code>docs/adaptive-rollout-checklist.md</code>
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            size="sm"
            variant={config.globalEnabled ? "secondary" : "success"}
            onClick={() => setAdaptiveDifficultyGlobalEnabled(!config.globalEnabled)}
          >
            {config.globalEnabled ? "Disable Global" : "Enable Global"}
          </Button>
          <Button size="sm" variant="secondary" onClick={resetAdaptiveRolloutConfig}>
            Reset
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {ADAPTIVE_ROLLOUT_GAME_IDS.map((gameId) => {
          const isEnabled = isAdaptiveDifficultyEnabledForGame(gameId);
          return (
            <div
              key={gameId}
              className="flex items-center justify-between gap-2 rounded-lg border border-border bg-surface-1 px-3 py-2"
            >
              <div>
                <p className="text-sm font-bold text-text-primary">
                  {prettifyGameId(gameId)}
                </p>
                <p
                  className={`text-[10px] font-black uppercase tracking-widest ${isEnabled ? "text-emerald-400" : "text-red-400"}`}
                >
                  {isEnabled ? "adaptive on" : "adaptive off"}
                </p>
              </div>
              <Button
                size="sm"
                variant={isEnabled ? "secondary" : "primary"}
                onClick={() => setAdaptiveDifficultyEnabledForGame(gameId, !isEnabled)}
              >
                {isEnabled ? "Disable" : "Enable"}
              </Button>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default AdaptiveRolloutPanel;
