import { z } from "zod";
import { trackActivity } from "./activityTracker";
import { normalizeAnalyticsPayload, normalizeGameId } from "./gameAnalytics";
import { setSentryGameContext } from "./sentry";
import { toast } from "@/components/ui/Toast";

export const analyticsEventNameSchema = z.enum([
  "session_start",
  "session_end",
  "item_correct",
  "item_wrong",
  "content_selected",
  "speaking_used",
  "weekly_review_completed",
  "daily_loop_started",
  "daily_loop_step_completed",
  "daily_loop_completed",
  "daily_loop_reward_claimed",
]);

export type AnalyticsEventName = z.infer<typeof analyticsEventNameSchema>;

export const analyticsEventSchema = z.object({
  name: analyticsEventNameSchema,
  timestamp: z.string(),
  payload: z.record(z.string(), z.unknown()),
});

export type AnalyticsEvent = z.infer<typeof analyticsEventSchema>;

export const ANALYTICS_EVENTS_KEY = "vocab-vault-analytics-events";
const ACTIVE_ANALYTICS_SESSIONS_KEY = "vocab-vault-active-analytics-sessions";
const MAX_EVENTS = 500;
const FEEDBACK_TOAST_THROTTLE_MS = 1200;
let lastFeedbackToastAt = 0;
let feedbackToastIndex = 0;
const POSITIVE_FEEDBACK = ["Acierto", "Bien", "Perfecto"];
const NEGATIVE_FEEDBACK = ["Error", "Casi", "Reintenta"];

const maybeShowGameplayFeedback = (name: AnalyticsEventName) => {
  if (typeof window === "undefined") return;
  if (name !== "item_correct" && name !== "item_wrong") return;

  const now = Date.now();
  if (now - lastFeedbackToastAt < FEEDBACK_TOAST_THROTTLE_MS) return;
  lastFeedbackToastAt = now;

  const messages =
    name === "item_correct" ? POSITIVE_FEEDBACK : NEGATIVE_FEEDBACK;
  const message = messages[feedbackToastIndex % messages.length];
  feedbackToastIndex += 1;

  if (name === "item_correct") {
    toast.success(message, 900);
    return;
  }

  toast.error(message, 1100);
};

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
      let normalizedEvent = evt;
      if (
        evt &&
        typeof evt === "object" &&
        "payload" in evt &&
        evt.payload &&
        typeof evt.payload === "object" &&
        !Array.isArray(evt.payload)
      ) {
        normalizedEvent = {
          ...evt,
          payload: normalizeAnalyticsPayload(
            evt.payload as Record<string, unknown>,
          ),
        };
      }

      const result = analyticsEventSchema.safeParse(normalizedEvent);
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

const safeReadActiveSessions = (): Record<string, string> => {
  if (typeof window === "undefined" || !window.localStorage) return {};

  const raw = localStorage.getItem(ACTIVE_ANALYTICS_SESSIONS_KEY);
  if (!raw) return {};

  try {
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      return {};
    }

    const sessions: Record<string, string> = {};
    Object.entries(parsed as Record<string, unknown>).forEach(
      ([gameId, timestamp]) => {
        if (typeof gameId === "string" && typeof timestamp === "string") {
          sessions[normalizeGameId(gameId)] = timestamp;
        }
      },
    );
    return sessions;
  } catch {
    return {};
  }
};

const saveActiveSessions = (sessions: Record<string, string>) => {
  if (typeof window === "undefined" || !window.localStorage) return;
  localStorage.setItem(ACTIVE_ANALYTICS_SESSIONS_KEY, JSON.stringify(sessions));
};

export const clearAnalyticsEventsForTesting = () => {
  if (typeof window === "undefined" || !window.localStorage) return;
  localStorage.removeItem(ANALYTICS_EVENTS_KEY);
  localStorage.removeItem(ACTIVE_ANALYTICS_SESSIONS_KEY);
};

export const trackAnalyticsEvent = (
  name: AnalyticsEventName,
  payload: Record<string, unknown> = {},
) => {
  if (typeof window === "undefined" || !window.localStorage) return;

  const existing = safeReadEvents();
  const activeSessions = safeReadActiveSessions();
  const normalizedPayload = normalizeAnalyticsPayload(payload);

  const event: AnalyticsEvent = {
    name,
    timestamp: new Date().toISOString(),
    payload: normalizedPayload,
  };

  const parsedEvent = analyticsEventSchema.safeParse(event);
  if (!parsedEvent.success) {
    console.warn("Invalid analytics event payload", parsedEvent.error);
    return;
  }

  maybeShowGameplayFeedback(name);

  const gameId =
    typeof parsedEvent.data.payload.game === "string"
      ? parsedEvent.data.payload.game
      : null;

  if (gameId && name !== "session_end") {
    setSentryGameContext(gameId);
  } else if (name === "session_end") {
    setSentryGameContext(null);
  }

  const eventsToPersist: AnalyticsEvent[] = [...existing];

  // If a game emits answers without opening a session, synthesize session_start.
  if (
    gameId &&
    (name === "item_correct" || name === "item_wrong") &&
    !activeSessions[gameId]
  ) {
    const syntheticSessionStart = analyticsEventSchema.safeParse({
      name: "session_start",
      timestamp: parsedEvent.data.timestamp,
      payload: { game: gameId, source: "synthetic_autostart" },
    });

    if (syntheticSessionStart.success) {
      eventsToPersist.push(syntheticSessionStart.data);
      activeSessions[gameId] = syntheticSessionStart.data.timestamp;
    }
  }

  if (name === "session_start" && gameId) {
    activeSessions[gameId] = parsedEvent.data.timestamp;
  }

  if (name === "session_end" && gameId) {
    delete activeSessions[gameId];
  }

  // Automatically track activity for the heatmap whenever an item is answered (reviewed)
  if (name === "item_correct" || name === "item_wrong") {
    trackActivity({ cards: 1 });
  }

  const next = [...eventsToPersist, parsedEvent.data].slice(-MAX_EVENTS);
  localStorage.setItem(ANALYTICS_EVENTS_KEY, JSON.stringify(next));
  saveActiveSessions(activeSessions);
  window.dispatchEvent(new Event("analyticsUpdated"));
};
