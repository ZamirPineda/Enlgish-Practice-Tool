import { z } from "zod";

export const WEB_VITALS_STORAGE_KEY = "skillpal-web-vitals";
export const WEB_VITALS_UPDATED_EVENT = "webVitalsUpdated";
const MAX_WEB_VITALS_ENTRIES = 120;

const webVitalNameSchema = z.enum(["LCP", "INP", "CLS"]);
const webVitalRatingSchema = z.enum(["good", "needs-improvement", "poor"]);

export type WebVitalName = z.infer<typeof webVitalNameSchema>;
export type WebVitalRating = z.infer<typeof webVitalRatingSchema>;

const webVitalMetricSchema = z.object({
  id: z.string(),
  name: webVitalNameSchema,
  value: z.number().nonnegative(),
  rating: webVitalRatingSchema,
  timestamp: z.string(),
  route: z.string(),
  navigationType: z.string(),
});

export type WebVitalMetric = z.infer<typeof webVitalMetricSchema>;

interface RecordWebVitalMetricOptions {
  timestamp?: string;
  route?: string;
  navigationType?: string;
}

let activeStopTracking: (() => void) | null = null;

const getCurrentRoute = (): string => {
  if (typeof window === "undefined") return "unknown";
  if (window.location.hash) return window.location.hash;
  return `${window.location.pathname}${window.location.search}`;
};

const getNavigationType = (): string => {
  if (
    typeof window === "undefined" ||
    typeof window.performance === "undefined" ||
    typeof window.performance.getEntriesByType !== "function"
  ) {
    return "unknown";
  }

  const [navigationEntry] = window.performance.getEntriesByType("navigation");
  if (
    navigationEntry &&
    typeof (navigationEntry as PerformanceNavigationTiming).type === "string"
  ) {
    return (navigationEntry as PerformanceNavigationTiming).type;
  }

  return "navigate";
};

const safeReadStoredMetrics = (): WebVitalMetric[] => {
  if (typeof window === "undefined" || !window.localStorage) return [];

  const raw = localStorage.getItem(WEB_VITALS_STORAGE_KEY);
  if (!raw) return [];

  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    return parsed.reduce<WebVitalMetric[]>((accumulator, item) => {
      const result = webVitalMetricSchema.safeParse(item);
      if (result.success) {
        accumulator.push(result.data);
      }
      return accumulator;
    }, []);
  } catch {
    return [];
  }
};

const safePersistStoredMetrics = (metrics: WebVitalMetric[]) => {
  if (typeof window === "undefined" || !window.localStorage) return;
  localStorage.setItem(WEB_VITALS_STORAGE_KEY, JSON.stringify(metrics));
  window.dispatchEvent(new Event(WEB_VITALS_UPDATED_EVENT));
};

export const getWebVitalRating = (
  name: WebVitalName,
  value: number,
): WebVitalRating => {
  if (name === "LCP") {
    if (value <= 2500) return "good";
    if (value <= 4000) return "needs-improvement";
    return "poor";
  }

  if (name === "INP") {
    if (value <= 200) return "good";
    if (value <= 500) return "needs-improvement";
    return "poor";
  }

  if (value <= 0.1) return "good";
  if (value <= 0.25) return "needs-improvement";
  return "poor";
};

export const getWebVitalsMetrics = (): WebVitalMetric[] =>
  safeReadStoredMetrics();

export const clearWebVitalsMetricsForTesting = () => {
  if (typeof window === "undefined" || !window.localStorage) return;
  localStorage.removeItem(WEB_VITALS_STORAGE_KEY);
};

export const recordWebVitalMetric = (
  name: WebVitalName,
  value: number,
  options: RecordWebVitalMetricOptions = {},
) => {
  if (typeof window === "undefined" || !window.localStorage) return;

  const normalizedValue =
    name === "CLS"
      ? Math.round(value * 1000) / 1000
      : Math.round(value * 10) / 10;
  const metric: WebVitalMetric = {
    id: `${name}-${Date.now()}-${Math.round(normalizedValue * 100)}`,
    name,
    value: Math.max(normalizedValue, 0),
    rating: getWebVitalRating(name, Math.max(normalizedValue, 0)),
    timestamp: options.timestamp || new Date().toISOString(),
    route: options.route || getCurrentRoute(),
    navigationType: options.navigationType || getNavigationType(),
  };

  const stored = safeReadStoredMetrics();
  const next = [...stored, metric].slice(-MAX_WEB_VITALS_ENTRIES);
  safePersistStoredMetrics(next);
};

export const startWebVitalsTracking = (): (() => void) => {
  if (activeStopTracking) {
    return activeStopTracking;
  }

  if (
    typeof window === "undefined" ||
    typeof document === "undefined" ||
    !window.localStorage ||
    typeof window.PerformanceObserver !== "function"
  ) {
    return () => {};
  }

  const supported = Array.isArray(
    window.PerformanceObserver.supportedEntryTypes,
  )
    ? window.PerformanceObserver.supportedEntryTypes
    : [];
  const observers: PerformanceObserver[] = [];

  let latestLcp: number | null = null;
  let cumulativeCls = 0;
  let maxInp = 0;
  let reportedLcp = false;
  let reportedCls = false;
  let reportedInp = false;
  let stopped = false;

  const flushPendingMetrics = () => {
    if (reportedLcp === false && latestLcp !== null) {
      recordWebVitalMetric("LCP", latestLcp);
      reportedLcp = true;
    }
    if (reportedCls === false) {
      recordWebVitalMetric("CLS", cumulativeCls);
      reportedCls = true;
    }
    if (reportedInp === false && maxInp > 0) {
      recordWebVitalMetric("INP", maxInp);
      reportedInp = true;
    }
  };

  const handleVisibilityChange = () => {
    if (document.visibilityState === "hidden") {
      flushPendingMetrics();
    }
  };

  const handlePageHide = () => {
    flushPendingMetrics();
  };

  document.addEventListener("visibilitychange", handleVisibilityChange);
  window.addEventListener("pagehide", handlePageHide);

  if (supported.includes("largest-contentful-paint")) {
    try {
      const observer = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const latestEntry = entries[entries.length - 1];
        if (latestEntry) {
          latestLcp = latestEntry.startTime;
        }
      });
      observer.observe({ type: "largest-contentful-paint", buffered: true });
      observers.push(observer);
    } catch {
      // no-op in unsupported environments
    }
  }

  if (supported.includes("layout-shift")) {
    try {
      const observer = new PerformanceObserver((entryList) => {
        entryList.getEntries().forEach((entry) => {
          const castEntry = entry as PerformanceEntry & {
            value?: number;
            hadRecentInput?: boolean;
          };
          if (
            typeof castEntry.value === "number" &&
            castEntry.hadRecentInput !== true
          ) {
            cumulativeCls += castEntry.value;
          }
        });
      });
      observer.observe({ type: "layout-shift", buffered: true });
      observers.push(observer);
    } catch {
      // no-op in unsupported environments
    }
  }

  if (supported.includes("event")) {
    try {
      const observer = new PerformanceObserver((entryList) => {
        entryList.getEntries().forEach((entry) => {
          const castEntry = entry as PerformanceEntry & {
            duration?: number;
            interactionId?: number;
          };
          if (typeof castEntry.duration !== "number") return;
          if (
            typeof castEntry.interactionId === "number" &&
            castEntry.interactionId <= 0
          ) {
            return;
          }
          if (castEntry.duration > maxInp) {
            maxInp = castEntry.duration;
          }
        });
      });
      observer.observe({
        type: "event",
        buffered: true,
        durationThreshold: 40,
      } as PerformanceObserverInit);
      observers.push(observer);
    } catch {
      // no-op in unsupported environments
    }
  }

  const stop = () => {
    if (stopped) return;
    stopped = true;
    flushPendingMetrics();
    observers.forEach((observer) => observer.disconnect());
    document.removeEventListener("visibilitychange", handleVisibilityChange);
    window.removeEventListener("pagehide", handlePageHide);
    activeStopTracking = null;
  };

  activeStopTracking = stop;
  return stop;
};
