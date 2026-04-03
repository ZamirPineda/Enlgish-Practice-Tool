import React from "react";
import Card from "@/components/ui/Card";

interface GameHudCardProps {
  title: string;
  description: string;
  controls?: React.ReactNode;
  meta?: React.ReactNode;
  status?: React.ReactNode;
  timeLeft: number;
  roundTime: number;
  timerLabel?: string;
}

const GameHudCard: React.FC<GameHudCardProps> = ({
  title,
  description,
  controls,
  meta,
  status,
  timeLeft,
  roundTime,
  timerLabel = "Tiempo",
}) => {
  return (
    <Card elevated>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black text-text-primary tracking-tight">
            {title}
          </h1>
          <p className="text-text-secondary text-sm mt-1">{description}</p>
          {meta ? <div className="mt-1">{meta}</div> : null}
          {controls ? (
            <div className="mt-3 flex items-center gap-2 flex-wrap">
              {controls}
            </div>
          ) : null}
        </div>
        {status ? (
          <div className="text-xs font-bold uppercase tracking-widest text-text-secondary">
            {status}
          </div>
        ) : null}
        <div className="w-full sm:w-auto flex-1 max-w-xs">
          <div className="flex justify-between text-xs font-black uppercase tracking-widest text-amber-400 mb-1">
            <span>{timerLabel}</span>
            <span>{timeLeft}s</span>
          </div>
          <div className="w-full h-2 bg-surface-2 rounded-full overflow-hidden shadow-inner border border-border">
            <div
              className={`h-full transition-all duration-1000 ease-linear rounded-full ${timeLeft <= 10 ? "bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.8)] animate-pulse" : timeLeft <= roundTime / 2 ? "bg-amber-400" : "bg-success"}`}
              style={{ width: `${(timeLeft / roundTime) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default GameHudCard;
