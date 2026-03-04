import * as Sentry from "@sentry/react";
import { APP_VERSION } from "@/lib/appVersion";
import { normalizeGameId } from "@/lib/gameAnalytics";

export const SENTRY_RUNTIME_CONTEXT_KEY = "skillpal-sentry-runtime-context";

interface SentryRuntimeContext {
  route: string;
  game: string | null;
  updatedAt: string;
}

const DEFAULT_TRACES_SAMPLE_RATE = 0.2;
let sentryInitialized = false;

const safeReadRuntimeContext = (): SentryRuntimeContext => {
  if (typeof window === "undefined" || !window.localStorage) {
    return {
      route: "unknown",
      game: null,
      updatedAt: new Date().toISOString(),
    };
  }

  const raw = localStorage.getItem(SENTRY_RUNTIME_CONTEXT_KEY);
  if (!raw) {
    return {
      route: `${window.location.pathname}${window.location.search}${window.location.hash}`,
      game: null,
      updatedAt: new Date().toISOString(),
    };
  }

  try {
    const parsed = JSON.parse(raw) as Partial<SentryRuntimeContext>;
    return {
      route:
        typeof parsed.route === "string"
          ? parsed.route
          : `${window.location.pathname}${window.location.search}${window.location.hash}`,
      game: typeof parsed.game === "string" ? parsed.game : null,
      updatedAt:
        typeof parsed.updatedAt === "string"
          ? parsed.updatedAt
          : new Date().toISOString(),
    };
  } catch {
    return {
      route: `${window.location.pathname}${window.location.search}${window.location.hash}`,
      game: null,
      updatedAt: new Date().toISOString(),
    };
  }
};

const safePersistRuntimeContext = (context: SentryRuntimeContext) => {
  if (typeof window === "undefined" || !window.localStorage) return;
  localStorage.setItem(SENTRY_RUNTIME_CONTEXT_KEY, JSON.stringify(context));
};

const setSentryTagSafely = (key: string, value: string | null) => {
  if (!sentryInitialized) return;
  try {
    if (value === null) {
      Sentry.setTag(key, "none");
      return;
    }
    Sentry.setTag(key, value);
  } catch {
    // no-op to avoid breaking app flow when telemetry provider fails
  }
};

const parseSampleRate = (value: string | undefined): number => {
  if (!value) return DEFAULT_TRACES_SAMPLE_RATE;
  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed < 0 || parsed > 1) {
    return DEFAULT_TRACES_SAMPLE_RATE;
  }
  return parsed;
};

export const isSentryEnabled = () =>
  Boolean((import.meta.env as ImportMetaEnv).VITE_SENTRY_DSN);

export const initializeSentry = () => {
  if (sentryInitialized || typeof window === "undefined") return;

  const dsn = (import.meta.env as ImportMetaEnv).VITE_SENTRY_DSN;
  if (!dsn) return;

  const runtimeContext = safeReadRuntimeContext();
  const tracesSampleRate = parseSampleRate(
    (import.meta.env as ImportMetaEnv).VITE_SENTRY_TRACES_SAMPLE_RATE,
  );
  const integrations =
    typeof Sentry.browserTracingIntegration === "function"
      ? [Sentry.browserTracingIntegration()]
      : undefined;

  Sentry.init({
    dsn,
    environment: import.meta.env.MODE,
    release: APP_VERSION,
    integrations,
    tracesSampleRate,
    beforeSend(event) {
      const context = safeReadRuntimeContext();
      const nextTags = { ...(event.tags ?? {}) };
      nextTags.route = context.route;
      if (context.game) {
        nextTags.game = context.game;
      }

      return {
        ...event,
        tags: nextTags,
        extra: {
          ...(event.extra ?? {}),
          runtimeRoute: context.route,
          runtimeGame: context.game,
          runtimeContextUpdatedAt: context.updatedAt,
        },
      };
    },
  });

  sentryInitialized = true;
  setSentryRouteContext(runtimeContext.route);
  setSentryGameContext(runtimeContext.game);
  setSentryTagSafely("app_version", APP_VERSION);
};

export const setSentryRouteContext = (route: string) => {
  const context = safeReadRuntimeContext();
  const next: SentryRuntimeContext = {
    ...context,
    route,
    updatedAt: new Date().toISOString(),
  };
  safePersistRuntimeContext(next);
  setSentryTagSafely("route", route);
};

export const setSentryGameContext = (gameId: string | null) => {
  const context = safeReadRuntimeContext();
  const normalizedGameId =
    typeof gameId === "string" ? normalizeGameId(gameId) : null;
  const next: SentryRuntimeContext = {
    ...context,
    game: normalizedGameId,
    updatedAt: new Date().toISOString(),
  };
  safePersistRuntimeContext(next);
  setSentryTagSafely("game", normalizedGameId);
};

export const captureSentryException = (
  source: string,
  error: unknown,
  metadata?: Record<string, unknown>,
) => {
  if (!sentryInitialized) return;

  const runtimeContext = safeReadRuntimeContext();
  Sentry.withScope((scope) => {
    scope.setTag("source", source);
    scope.setTag("route", runtimeContext.route);
    if (runtimeContext.game) {
      scope.setTag("game", runtimeContext.game);
    }

    if (metadata) {
      scope.setExtras(metadata);
    }

    if (error instanceof Error) {
      Sentry.captureException(error);
      return;
    }

    Sentry.captureException(new Error(String(error)));
  });
};

export const clearSentryRuntimeContextForTesting = () => {
  if (typeof window === "undefined" || !window.localStorage) return;
  localStorage.removeItem(SENTRY_RUNTIME_CONTEXT_KEY);
};
