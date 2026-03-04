import { describe, expect, test, vi } from "vitest";
import {
  clearWebVitalsMetricsForTesting,
  getWebVitalRating,
  getWebVitalsMetrics,
  recordWebVitalMetric,
  startWebVitalsTracking,
  WEB_VITALS_STORAGE_KEY,
} from "@/lib/webVitals";

describe("webVitals", () => {
  test("classifies LCP, INP and CLS using Core Web Vitals thresholds", () => {
    expect(getWebVitalRating("LCP", 2400)).toBe("good");
    expect(getWebVitalRating("LCP", 3000)).toBe("needs-improvement");
    expect(getWebVitalRating("LCP", 4100)).toBe("poor");

    expect(getWebVitalRating("INP", 180)).toBe("good");
    expect(getWebVitalRating("INP", 300)).toBe("needs-improvement");
    expect(getWebVitalRating("INP", 700)).toBe("poor");

    expect(getWebVitalRating("CLS", 0.08)).toBe("good");
    expect(getWebVitalRating("CLS", 0.2)).toBe("needs-improvement");
    expect(getWebVitalRating("CLS", 0.3)).toBe("poor");
  });

  test("persists local metrics and enforces max storage size", () => {
    clearWebVitalsMetricsForTesting();

    for (let index = 0; index < 130; index += 1) {
      recordWebVitalMetric("LCP", 2000 + index, {
        timestamp: `2026-03-04T00:00:${String(index).padStart(2, "0")}.000Z`,
        route: "#/stats",
        navigationType: "navigate",
      });
    }

    const metrics = getWebVitalsMetrics();
    expect(metrics).toHaveLength(120);
    expect(metrics[0].value).toBe(2010);
    expect(metrics[119].value).toBe(2129);
    expect(localStorage.getItem(WEB_VITALS_STORAGE_KEY)).toBeTruthy();
  });

  test("captures buffered entries for LCP, CLS and INP when page becomes hidden", () => {
    clearWebVitalsMetricsForTesting();
    window.location.hash = "#/stats";

    const observed: Array<{
      type: string;
      callback: (entryList: { getEntries: () => PerformanceEntry[] }) => void;
    }> = [];
    const originalPerformanceObserver = (
      window as Window & { PerformanceObserver?: unknown }
    ).PerformanceObserver;
    const originalVisibilityState = Object.getOwnPropertyDescriptor(
      document,
      "visibilityState",
    );
    const getEntriesByTypeSpy = vi
      .spyOn(window.performance, "getEntriesByType")
      .mockImplementation((type: string) => {
        if (type === "navigation") {
          return [{ type: "reload" } as unknown as PerformanceEntry];
        }
        return [];
      });

    class PerformanceObserverMock {
      static supportedEntryTypes = [
        "largest-contentful-paint",
        "layout-shift",
        "event",
      ];

      private callback: (entryList: {
        getEntries: () => PerformanceEntry[];
      }) => void;

      constructor(
        callback: (entryList: { getEntries: () => PerformanceEntry[] }) => void,
      ) {
        this.callback = callback;
      }

      observe(options: PerformanceObserverInit) {
        observed.push({
          type: options.type || "unknown",
          callback: this.callback,
        });
      }

      disconnect() {}
    }

    (window as Window & { PerformanceObserver?: unknown }).PerformanceObserver =
      PerformanceObserverMock as unknown as typeof PerformanceObserver;

    const stopTracking = startWebVitalsTracking();

    observed
      .find((observer) => observer.type === "largest-contentful-paint")
      ?.callback({
        getEntries: () => [{ startTime: 2450 } as PerformanceEntry],
      });

    observed
      .find((observer) => observer.type === "layout-shift")
      ?.callback({
        getEntries: () =>
          [
            { value: 0.07, hadRecentInput: false },
            { value: 0.08, hadRecentInput: true },
            { value: 0.06, hadRecentInput: false },
          ] as unknown as PerformanceEntry[],
      });

    observed
      .find((observer) => observer.type === "event")
      ?.callback({
        getEntries: () =>
          [
            { duration: 180, interactionId: 11 },
            { duration: 340, interactionId: 12 },
          ] as unknown as PerformanceEntry[],
      });

    Object.defineProperty(document, "visibilityState", {
      configurable: true,
      get: () => "hidden",
    });
    document.dispatchEvent(new Event("visibilitychange"));
    stopTracking();

    const metrics = getWebVitalsMetrics();
    expect(metrics).toHaveLength(3);

    const lcp = metrics.find((metric) => metric.name === "LCP");
    const cls = metrics.find((metric) => metric.name === "CLS");
    const inp = metrics.find((metric) => metric.name === "INP");

    expect(lcp?.value).toBe(2450);
    expect(lcp?.rating).toBe("good");
    expect(cls?.value).toBe(0.13);
    expect(cls?.rating).toBe("needs-improvement");
    expect(inp?.value).toBe(340);
    expect(inp?.rating).toBe("needs-improvement");
    expect(lcp?.route).toBe("#/stats");
    expect(lcp?.navigationType).toBe("reload");

    getEntriesByTypeSpy.mockRestore();
    if (originalVisibilityState) {
      Object.defineProperty(
        document,
        "visibilityState",
        originalVisibilityState,
      );
    }
    (window as Window & { PerformanceObserver?: unknown }).PerformanceObserver =
      originalPerformanceObserver;
  });
});
