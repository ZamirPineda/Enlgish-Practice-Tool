import React, { useEffect, useMemo, useState } from "react";
import { getGlobalActivityData, toDateKey } from "@/lib/activityTracker";

interface HeatmapProps {
  days?: number;
}

interface HeatmapCell {
  date: string;
  count: number;
  inRange: boolean;
}

const DAYS_IN_WEEK = 7;
const CELL_SIZE = 12;
const CELL_GAP = 3;
const WEEK_WIDTH = CELL_SIZE + CELL_GAP;
const DAY_MS = 86400000;

const LEVEL_CLASSES = [
  "bg-slate-700",
  "bg-emerald-900",
  "bg-emerald-700",
  "bg-emerald-500",
  "bg-emerald-400",
];

const WEEKDAY_LABELS = ["", "L", "", "M", "", "V", ""];

const MONTH_FORMATTER = new Intl.DateTimeFormat("es-CO", { month: "short" });
const RANGE_FORMATTER = new Intl.DateTimeFormat("es-CO", {
  month: "short",
  year: "numeric",
});

const toPlainDateKey = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const parseDateKey = (dateKey: string): Date => {
  const [year, month, day] = dateKey.split("-").map(Number);
  return new Date(year, month - 1, day, 12, 0, 0, 0);
};

const getUtcDayNumber = (date: Date): number =>
  Math.floor(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) / DAY_MS,
  );

const quantile = (values: number[], q: number): number => {
  if (values.length === 0) return 0;

  const pos = (values.length - 1) * q;
  const base = Math.floor(pos);
  const fraction = pos - base;
  const next = values[base + 1];

  if (next === undefined) {
    return values[base];
  }

  return values[base] + (next - values[base]) * fraction;
};

const Heatmap: React.FC<HeatmapProps> = ({ days }) => {
  const [trigger, setTrigger] = useState(0);
  const [selectedPeriod, setSelectedPeriod] = useState<string>("rolling");
  const hasCustomDays = typeof days === "number" && days > 0;

  useEffect(() => {
    const handleUpdate = () => setTrigger((prev) => prev + 1);
    window.addEventListener("activityUpdated", handleUpdate);
    window.addEventListener("storage", handleUpdate);

    return () => {
      window.removeEventListener("activityUpdated", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, []);

  const activityData = useMemo(() => getGlobalActivityData(), [trigger]);
  const todayKey = useMemo(() => toDateKey(), [trigger]);
  const todayDate = useMemo(() => parseDateKey(todayKey), [todayKey]);

  const availableYears = useMemo(() => {
    const years = new Set<number>();

    Object.keys(activityData).forEach((key) => {
      const year = Number(key.slice(0, 4));
      if (Number.isFinite(year)) years.add(year);
    });

    years.add(todayDate.getFullYear());
    return Array.from(years).sort((a, b) => b - a);
  }, [activityData, todayDate]);

  const selectedYear =
    selectedPeriod === "rolling" ? null : Number(selectedPeriod);

  const { startDate, endDate } = useMemo(() => {
    if (hasCustomDays) {
      const start = new Date(todayDate);
      start.setDate(todayDate.getDate() - (days - 1));
      return { startDate: start, endDate: new Date(todayDate) };
    }

    if (selectedYear === null || !Number.isFinite(selectedYear)) {
      const start = new Date(
        todayDate.getFullYear() - 1,
        todayDate.getMonth(),
        1,
        12,
        0,
        0,
        0,
      );

      return { startDate: start, endDate: new Date(todayDate) };
    }

    const start = new Date(selectedYear, 0, 1, 12, 0, 0, 0);
    const end =
      selectedYear === todayDate.getFullYear()
        ? new Date(todayDate)
        : new Date(selectedYear, 11, 31, 12, 0, 0, 0);

    return { startDate: start, endDate: end };
  }, [selectedYear, todayDate, hasCustomDays, days]);

  const { weeks, monthLabels, cells } = useMemo(() => {
    const gridStart = new Date(startDate);
    gridStart.setDate(startDate.getDate() - startDate.getDay());

    const gridEnd = new Date(endDate);
    gridEnd.setDate(endDate.getDate() + (DAYS_IN_WEEK - 1 - endDate.getDay()));

    const builtCells: HeatmapCell[] = [];

    for (
      const cursor = new Date(gridStart);
      cursor <= gridEnd;
      cursor.setDate(cursor.getDate() + 1)
    ) {
      const dateStr = toPlainDateKey(cursor);
      const inRange = cursor >= startDate && cursor <= endDate;
      const score =
        (activityData[dateStr]?.score || 0) +
        (activityData[dateStr]?.cards || 0);

      builtCells.push({
        date: dateStr,
        count: inRange ? score : 0,
        inRange,
      });
    }

    const builtWeeks: HeatmapCell[][] = [];
    for (let i = 0; i < builtCells.length; i += DAYS_IN_WEEK) {
      builtWeeks.push(builtCells.slice(i, i + DAYS_IN_WEEK));
    }

    const labels: Array<{ weekIndex: number; label: string }> = [];

    const firstMonthStart = new Date(
      startDate.getFullYear(),
      startDate.getMonth(),
      1,
      12,
      0,
      0,
      0,
    );

    for (
      const monthStart = new Date(firstMonthStart);
      monthStart <= endDate;
      monthStart.setMonth(monthStart.getMonth() + 1)
    ) {
      const dayDiff = getUtcDayNumber(monthStart) - getUtcDayNumber(gridStart);
      const weekIndex = Math.floor(dayDiff / DAYS_IN_WEEK);
      const label = MONTH_FORMATTER.format(monthStart).replace(".", "");

      if (labels[labels.length - 1]?.weekIndex !== weekIndex) {
        labels.push({ weekIndex, label });
      }
    }

    return { weeks: builtWeeks, monthLabels: labels, cells: builtCells };
  }, [activityData, startDate, endDate]);

  const thresholds = useMemo(() => {
    const nonZeroCounts = cells
      .filter((cell) => cell.inRange && cell.count > 0)
      .map((cell) => cell.count)
      .sort((a, b) => a - b);

    return [
      quantile(nonZeroCounts, 0.25),
      quantile(nonZeroCounts, 0.5),
      quantile(nonZeroCounts, 0.75),
    ];
  }, [cells]);

  const getIntensityClass = (count: number): string => {
    if (count <= 0) return LEVEL_CLASSES[0];
    if (count <= thresholds[0]) return LEVEL_CLASSES[1];
    if (count <= thresholds[1]) return LEVEL_CLASSES[2];
    if (count <= thresholds[2]) return LEVEL_CLASSES[3];
    return LEVEL_CLASSES[4];
  };

  const rangeLabel = `${RANGE_FORMATTER.format(startDate).replace(".", "")} - ${RANGE_FORMATTER.format(endDate).replace(".", "")}`;

  return (
    <div className="w-full max-w-full">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs text-slate-400">{rangeLabel}</p>
        {!hasCustomDays && (
          <label className="flex items-center gap-2 text-xs text-slate-300">
            <span className="uppercase tracking-wide">Periodo</span>
            <select
              value={selectedPeriod}
              onChange={(event) => setSelectedPeriod(event.target.value)}
              className="rounded-md border border-slate-700 bg-slate-900 px-2 py-1 text-xs text-slate-200"
              aria-label="Filtrar heatmap por periodo"
            >
              <option value="rolling">Ultimos 12 meses</option>
              {availableYears.map((year) => (
                <option key={year} value={String(year)}>
                  {year}
                </option>
              ))}
            </select>
          </label>
        )}
      </div>

      <div className="overflow-x-auto pb-2">
        <div className="inline-block min-w-max">
          <div
            className="relative mb-2 pl-8"
            style={{ width: `${weeks.length * WEEK_WIDTH}px`, height: "12px" }}
          >
            {monthLabels.map((month) => (
              <span
                key={`${month.weekIndex}-${month.label}`}
                className="absolute text-[10px] leading-none text-slate-500"
                style={{ left: `${month.weekIndex * WEEK_WIDTH}px` }}
              >
                {month.label}
              </span>
            ))}
          </div>

          <div className="flex">
            <div
              className="mr-2 grid text-[10px] leading-none text-slate-500"
              style={{
                gridTemplateRows: `repeat(${DAYS_IN_WEEK}, ${CELL_SIZE}px)`,
              }}
            >
              {WEEKDAY_LABELS.map((label, index) => (
                <span key={`weekday-${index}`} className="flex items-center">
                  {label}
                </span>
              ))}
            </div>

            <div className="flex gap-[3px]" aria-label="Heatmap de repaso">
              {weeks.map((week, weekIndex) => (
                <div
                  key={`week-${weekIndex}`}
                  className="grid gap-[3px]"
                  style={{
                    gridTemplateRows: `repeat(${DAYS_IN_WEEK}, ${CELL_SIZE}px)`,
                  }}
                >
                  {week.map((day) => (
                    <div
                      key={day.date}
                      className={`h-3 w-3 rounded-[2px] ${day.inRange ? getIntensityClass(day.count) : "bg-transparent"}`}
                      title={`${day.date}: ${day.count} tarjetas repasadas`}
                      aria-label={`${day.date}: ${day.count} tarjetas repasadas`}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div
        className="flex justify-end items-center mt-3 text-xs text-slate-400"
        aria-label="Leyenda de intensidad"
      >
        <div className="flex items-center gap-2">
          <span>Menos</span>
          {LEVEL_CLASSES.map((className, index) => (
            <div
              key={`legend-${index}`}
              className={`w-3 h-3 rounded-sm ${className}`}
            ></div>
          ))}
          <span>Mas</span>
        </div>
      </div>
    </div>
  );
};

export default Heatmap;
