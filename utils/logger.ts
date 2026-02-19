import { APP_VERSION } from "./appVersion";

const LOG_PREFIX = `[EnglishPal v${APP_VERSION}]`;
const originalConsoleError = console.error.bind(console);
let isGlobalLoggingInstalled = false;

const errorToString = (error: unknown): string => {
  if (error instanceof Error)
    return `${error.name}: ${error.message}\n${error.stack ?? ""}`.trim();
  if (typeof error === "string") return error;
  try {
    return JSON.stringify(error);
  } catch {
    return String(error);
  }
};

export const logError = (
  source: string,
  error: unknown,
  metadata?: Record<string, unknown>,
) => {
  originalConsoleError(`${LOG_PREFIX} ${source}`, {
    build: APP_VERSION,
    error: errorToString(error),
    ...metadata,
  });
};

export const createIssueReport = (error: unknown, componentStack?: string) => {
  const details = [
    `build=${APP_VERSION}`,
    `url=${window.location.href}`,
    `userAgent=${navigator.userAgent}`,
    `timestamp=${new Date().toISOString()}`,
    "",
    "error:",
    errorToString(error),
  ];

  if (componentStack) {
    details.push("", "componentStack:", componentStack.trim());
  }

  return details.join("\n");
};

export const installGlobalErrorLogging = () => {
  if (isGlobalLoggingInstalled) return;
  isGlobalLoggingInstalled = true;

  console.error = (...args: unknown[]) => {
    originalConsoleError(LOG_PREFIX, ...args);
  };

  window.addEventListener("error", (event) => {
    logError("window.error", event.error ?? event.message, {
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno,
    });
  });

  window.addEventListener("unhandledrejection", (event) => {
    logError("window.unhandledrejection", event.reason);
  });
};
