import React, { useMemo, useState, useEffect } from "react";
import { getGlobalHeatmapData } from "@/lib/activityTracker";

interface HeatmapProps {
  days?: number;
}

const DAYS = 365;
const DAY_MS = 86400000;
const DAYS_IN_WEEK = 7;
const LOW_INTENSITY_THRESHOLD = 0.34;
const MEDIUM_INTENSITY_THRESHOLD = 0.67;

const getIntensityClass = (count: number, maxCount: number): string => {
  if (count <= 0 || maxCount <= 0) return "bg-slate-700";
  const ratio = count / maxCount;
  if (ratio < MEDIUM_INTENSITY_THRESHOLD) return "bg-emerald-500";
  return "bg-emerald-400";
};

const Heatmap: React.FC<HeatmapProps> = ({ days: daysCount = DAYS }) => {
  const [trigger, setTrigger] = useState(0);

  useEffect(() => {
    const handleUpdate = () => setTrigger((prev) => prev + 1);
    window.addEventListener("activityUpdated", handleUpdate);
    return () => window.removeEventListener("activityUpdated", handleUpdate);
  }, []);

  const days = useMemo(
    () => getGlobalHeatmapData(daysCount),
    [daysCount, trigger],
  );

  // Determine dynamic max count for coloring, but cap the min maxCount to avoid
  // turning standard 1-2 points into the darkest green initially
  const maxCount = useMemo(() => {
    const actualMax = Math.max(...days.map((day) => day.count), 0);
    return Math.max(actualMax, 5); // ensures "low intensity" threshold behaves normally
  }, [days]);

  return (
    <div className="w-full max-w-full">
      <div
        className="grid grid-flow-col gap-1 overflow-x-auto pb-2"
        style={{ gridTemplateRows: `repeat(${DAYS_IN_WEEK}, minmax(0, 1fr))` }}
        aria-label="Heatmap de repaso"
      >
        {days.map((day) => (
          <div
            key={day.date}
            className={`h-3 w-3 rounded-sm ${getIntensityClass(day.count, maxCount)}`}
            title={`${day.date}: ${day.count} tarjetas repasadas`}
            aria-label={`${day.date}: ${day.count} tarjetas repasadas`}
          />
        ))}
      </div>
      <div className="flex justify-between items-center mt-3 text-xs text-slate-400">
        <p>Últimos 365 días</p>
        <div className="flex items-center gap-2">
          <span>Menos</span>
          <div className="w-3 h-3 rounded-sm bg-slate-700"></div>
          <div className="w-3 h-3 rounded-sm bg-emerald-900"></div>
          <div className="w-3 h-3 rounded-sm bg-emerald-500"></div>
          <div className="w-3 h-3 rounded-sm bg-emerald-400"></div>
          <span>Más</span>
        </div>
      </div>
    </div>
  );
};

export default Heatmap;
