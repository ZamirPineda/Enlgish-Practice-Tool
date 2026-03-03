import { beforeEach, describe, expect, test } from "vitest";
import {
  ANALYTICS_EVENTS_KEY,
  clearAnalyticsEventsForTesting,
  getAnalyticsEvents,
  trackAnalyticsEvent,
} from "@/lib/analytics";

describe("analytics tracker", () => {
  beforeEach(() => {
    localStorage.clear();
    clearAnalyticsEventsForTesting();
  });

  test("stores events in localStorage", () => {
    trackAnalyticsEvent("session_start", { mode: "daily", items: 5 });

    const events = getAnalyticsEvents();
    expect(events).toHaveLength(1);
    expect(events[0].name).toBe("session_start");
    expect(events[0].payload).toEqual({ mode: "daily", items: 5 });
    expect(localStorage.getItem(ANALYTICS_EVENTS_KEY)).toContain(
      "session_start",
    );
  });

  test("keeps only the latest 500 events", () => {
    for (let index = 0; index < 510; index += 1) {
      trackAnalyticsEvent("item_correct", { index });
    }

    const events = getAnalyticsEvents();
    expect(events).toHaveLength(500);
    expect(events[0].payload).toEqual({ index: 10 });
    expect(events[499].payload).toEqual({ index: 509 });
  });
});
