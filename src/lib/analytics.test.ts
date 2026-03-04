import { beforeEach, describe, expect, test } from "vitest";
import {
  ANALYTICS_EVENTS_KEY,
  clearAnalyticsEventsForTesting,
  getAnalyticsEvents,
  trackAnalyticsEvent,
} from "@/lib/analytics";
import { SENTRY_RUNTIME_CONTEXT_KEY } from "@/lib/sentry";

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

  test("normalizes legacy game ids and duration fields", () => {
    trackAnalyticsEvent("session_end", {
      game: "study_docs_quiz",
      durationSeconds: 75,
    });

    const events = getAnalyticsEvents();
    expect(events).toHaveLength(1);
    expect(events[0].payload.game).toBe("docs_quiz");
    expect(events[0].payload.duration).toBe(75);
  });

  test("synthesizes a session_start when answer events arrive first", () => {
    trackAnalyticsEvent("item_correct", { game: "syntax_builder" });

    const events = getAnalyticsEvents();
    expect(events).toHaveLength(2);
    expect(events[0].name).toBe("session_start");
    expect(events[0].payload.game).toBe("code_syntax_builder");
    expect(events[1].name).toBe("item_correct");
    expect(events[1].payload.game).toBe("code_syntax_builder");
  });

  test("normalizes legacy events already persisted in localStorage", () => {
    localStorage.setItem(
      ANALYTICS_EVENTS_KEY,
      JSON.stringify([
        {
          name: "session_end",
          timestamp: new Date().toISOString(),
          payload: {
            game: "study_docs_game",
            durationSeconds: 120,
          },
        },
      ]),
    );

    const events = getAnalyticsEvents();
    expect(events).toHaveLength(1);
    expect(events[0].payload.game).toBe("docs_game");
    expect(events[0].payload.duration).toBe(120);
  });

  test("stores latest game context for error reporting", () => {
    trackAnalyticsEvent("session_start", { game: "syntax_builder" });

    const runtimeContext = JSON.parse(
      localStorage.getItem(SENTRY_RUNTIME_CONTEXT_KEY) || "{}",
    ) as { game?: string };
    expect(runtimeContext.game).toBe("code_syntax_builder");
  });
});
