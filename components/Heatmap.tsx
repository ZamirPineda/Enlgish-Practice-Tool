import React, { useMemo } from "react";
import { SrsVocabularyItem } from "../types";
import { VaultProgress } from "../utils/statsMetrics";

interface HeatmapProps {
  deck: Record<string, SrsVocabularyItem>;
  progress: VaultProgress;
}

const DAYS = 365;
const DAY_MS = 86400000;
const DAYS_IN_WEEK = 7;
const LOW_INTENSITY_THRESHOLD = 0.34;
const MEDIUM_INTENSITY_THRESHOLD = 0.67;

const toDateKey = (value: number): string =>
  new Date(value).toISOString().split("T")[0];

const parseDate = (value: unknown): number | null => {
  if (typeof value !== "string" && typeof value !== "number") return null;
  const timestamp = new Date(value).getTime();
  return Number.isNaN(timestamp) ? null : timestamp;
};

const getIntensityClass = (count: number, maxCount: number): string => {
  if (count <= 0 || maxCount <= 0) return "bg-slate-700";
  const ratio = count / maxCount;
  if (ratio < LOW_INTENSITY_THRESHOLD) return "bg-emerald-900";
  if (ratio < MEDIUM_INTENSITY_THRESHOLD) return "bg-emerald-700";
  return "bg-emerald-500";
};

const Heatmap: React.FC<HeatmapProps> = ({ deck, progress }) => {
  const days = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const end = today.getTime();
    const start = end - (DAYS - 1) * DAY_MS;

    const counts = new Map<string, number>();
    const addCount = (timestamp: number, increment = 1) => {
      if (timestamp < start || timestamp > end) return;
      const key = toDateKey(timestamp);
      counts.set(key, (counts.get(key) ?? 0) + increment);
    };

    Object.values(deck || {}).forEach((item) => {
      const itemWithOptionalFields = item as SrsVocabularyItem &
        Record<string, unknown>;
      const explicitReviewTime =
        parseDate(itemWithOptionalFields.reviewedAt) ??
        parseDate(itemWithOptionalFields.lastReviewedAt);

      if (explicitReviewTime !== null) {
        addCount(explicitReviewTime);
        return;
      }

      if (item.interval > 0) {
        const nextReviewTime = parseDate(item.nextReviewDate);
        if (nextReviewTime !== null) {
          addCount(nextReviewTime - item.interval * DAY_MS);
        }
      }
    });

    const progressTime = parseDate(progress.lastReviewDate);
    if (
      counts.size === 0 &&
      progressTime !== null &&
      progress.totalReviews > 0
    ) {
      addCount(progressTime, progress.totalReviews);
    }

    return Array.from({ length: DAYS }, (_, index) => {
      const timestamp = start + index * DAY_MS;
      const date = toDateKey(timestamp);
      return { date, count: counts.get(date) ?? 0 };
    });
  }, [deck, progress.lastReviewDate, progress.totalReviews]);

  const maxCount = useMemo(
    () => Math.max(...days.map((day) => day.count), 0),
    [days],
  );

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
          <div className="w-3 h-3 rounded-sm bg-emerald-700"></div>
          <div className="w-3 h-3 rounded-sm bg-emerald-500"></div>
          <span>Más</span>
        </div>
      </div>
    </div>
  );
};

export default Heatmap;
