export type AnalyticsEventName =
  | "session_start"
  | "session_end"
  | "item_correct"
  | "item_wrong"
  | "speaking_used"
  | "weekly_review_completed";

export interface AnalyticsEvent {
  name: AnalyticsEventName;
  timestamp: string;
  payload: Record<string, unknown>;
}

export const ANALYTICS_EVENTS_KEY = "vocab-vault-analytics-events";
const MAX_EVENTS = 500;

const safeReadEvents = (): AnalyticsEvent[] => {
  if (typeof window === "undefined" || !window.localStorage) return [];

  const raw = localStorage.getItem(ANALYTICS_EVENTS_KEY);
  if (!raw) return [];

  try {
    const parsed = JSON.parse(raw) as AnalyticsEvent[];
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (event): event is AnalyticsEvent =>
        !!event &&
        typeof event.name === "string" &&
        typeof event.timestamp === "string" &&
        typeof event.payload === "object" &&
        event.payload !== null,
    );
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
  const event: AnalyticsEvent = {
    name,
    timestamp: new Date().toISOString(),
    payload,
  };

  const next = [...existing, event].slice(-MAX_EVENTS);
  localStorage.setItem(ANALYTICS_EVENTS_KEY, JSON.stringify(next));
};
