import { z } from "zod";
import { trackActivity } from "./activityTracker";

export const analyticsEventNameSchema = z.enum([
  "session_start",
  "session_end",
  "item_correct",
  "item_wrong",
  "speaking_used",
  "weekly_review_completed",
]);

export type AnalyticsEventName = z.infer<typeof analyticsEventNameSchema>;

export const analyticsEventSchema = z.object({
  name: analyticsEventNameSchema,
  timestamp: z.string(),
  payload: z.record(z.string(), z.unknown()),
});

export type AnalyticsEvent = z.infer<typeof analyticsEventSchema>;

export const ANALYTICS_EVENTS_KEY = "vocab-vault-analytics-events";
const MAX_EVENTS = 500;

const safeReadEvents = (): AnalyticsEvent[] => {
  if (typeof window === "undefined" || !window.localStorage) return [];

  const raw = localStorage.getItem(ANALYTICS_EVENTS_KEY);
  if (!raw) return [];

  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    // Filter out any invalid events rather than failing the whole batch
    const validEvents: AnalyticsEvent[] = [];
    for (const evt of parsed) {
      const result = analyticsEventSchema.safeParse(evt);
      if (result.success) {
        validEvents.push(result.data);
      }
    }
    return validEvents;
  } catch {
    return [];
  }
};

export const getAnalyticsEvents = (): AnalyticsEvent[] => safeReadEvents();

export const clearAnalyticsEventsForTesting = () => {
  if (typeof window === "undefined" || !window.localStorage) return;
  localStorage.removeItem(ANALYTICS_EVENTS_KEY);
};

export const trackAnalyticsEvent = (
  name: AnalyticsEventName,
  payload: Record<string, unknown> = {},
) => {
  if (typeof window === "undefined" || !window.localStorage) return;

  const existing = safeReadEvents();
  const event = {
    name,
    timestamp: new Date().toISOString(),
    payload,
  };

  const parsedEvent = analyticsEventSchema.safeParse(event);
  if (!parsedEvent.success) {
    console.warn("Invalid analytics event payload", parsedEvent.error);
    return;
  }

  // Automatically track activity for the heatmap whenever an item is answered (reviewed)
  if (name === "item_correct" || name === "item_wrong") {
    trackActivity({ cards: 1 });
  }

  const next = [...existing, parsedEvent.data].slice(-MAX_EVENTS);
  localStorage.setItem(ANALYTICS_EVENTS_KEY, JSON.stringify(next));
};
