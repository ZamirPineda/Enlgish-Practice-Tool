import { beforeEach, describe, expect, test, vi } from "vitest";
import * as Sentry from "@sentry/react";

const mockScope = {
  setTag: vi.fn(),
  setExtras: vi.fn(),
};

vi.mock("@sentry/react", () => ({
  init: vi.fn(),
  setTag: vi.fn(),
  captureException: vi.fn(),
  browserTracingIntegration: vi.fn(() => ({ name: "browser-tracing" })),
  withScope: vi.fn((callback: (scope: typeof mockScope) => void) =>
    callback(mockScope),
  ),
}));

const loadSentryModule = async () => import("@/lib/sentry");

describe("sentry integration", () => {
  beforeEach(() => {
    vi.resetModules();
    vi.unstubAllEnvs();
    localStorage.clear();
    mockScope.setTag.mockClear();
    mockScope.setExtras.mockClear();
    vi.mocked(Sentry.init).mockClear();
    vi.mocked(Sentry.setTag).mockClear();
    vi.mocked(Sentry.captureException).mockClear();
    vi.mocked(Sentry.browserTracingIntegration).mockClear();
    vi.mocked(Sentry.withScope).mockClear();
  });

  test("does not initialize when DSN is missing", async () => {
    const sentryModule = await loadSentryModule();
    sentryModule.initializeSentry();

    expect(Sentry.init).not.toHaveBeenCalled();
  });

  test("initializes and injects route/game context in beforeSend", async () => {
    vi.stubEnv("VITE_SENTRY_DSN", "https://public@sentry.example/1");
    vi.stubEnv("VITE_SENTRY_TRACES_SAMPLE_RATE", "0.5");

    const sentryModule = await loadSentryModule();
    sentryModule.setSentryRouteContext("#/stats");
    sentryModule.setSentryGameContext("syntax_builder");
    sentryModule.initializeSentry();

    expect(Sentry.init).toHaveBeenCalledTimes(1);
    const initArg = vi.mocked(Sentry.init).mock.calls[0][0] as {
      beforeSend?: (event: any) => any;
      tracesSampleRate?: number;
    };
    expect(initArg.tracesSampleRate).toBe(0.5);
    expect(typeof initArg.beforeSend).toBe("function");

    const transformed = initArg.beforeSend?.({ tags: {}, extra: {} });
    expect(transformed.tags.route).toBe("#/stats");
    expect(transformed.tags.game).toBe("code_syntax_builder");
    expect(transformed.extra.runtimeRoute).toBe("#/stats");
    expect(transformed.extra.runtimeGame).toBe("code_syntax_builder");
  });

  test("captures exception with source, route and game tags", async () => {
    vi.stubEnv("VITE_SENTRY_DSN", "https://public@sentry.example/1");

    const sentryModule = await loadSentryModule();
    sentryModule.setSentryRouteContext("#/error-hunter");
    sentryModule.setSentryGameContext("error_hunter");
    sentryModule.initializeSentry();
    sentryModule.captureSentryException("window.error", new Error("boom"), {
      feature: "test",
    });

    expect(Sentry.withScope).toHaveBeenCalledTimes(1);
    expect(mockScope.setTag).toHaveBeenCalledWith("source", "window.error");
    expect(mockScope.setTag).toHaveBeenCalledWith("route", "#/error-hunter");
    expect(mockScope.setTag).toHaveBeenCalledWith("game", "error_hunter");
    expect(mockScope.setExtras).toHaveBeenCalledWith({ feature: "test" });
    expect(Sentry.captureException).toHaveBeenCalledTimes(1);
  });
});
