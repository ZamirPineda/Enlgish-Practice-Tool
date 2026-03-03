import { APP_VERSION } from "@/lib/appVersion";

const LOG_PREFIX = `[EnglishPal v${APP_VERSION}]`;
const originalConsoleError = console.error.bind(console);
const originalConsoleWarn = console.warn.bind(console);
const MAX_RECENT_LOGS = 20;
const recentLogs: string[] = [];
let isGlobalLoggingInstalled = false;
let errorHandler: ((event: ErrorEvent) => void) | null = null;
let rejectionHandler: ((event: PromiseRejectionEvent) => void) | null = null;

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

const addRecentLog = (level: "error" | "warn", args: unknown[]) => {
  const message = args.map((arg) => errorToString(arg)).join(" ");
  recentLogs.push(
    `[${new Date().toISOString()}] ${level.toUpperCase()}: ${message}`,
  );
  while (recentLogs.length > MAX_RECENT_LOGS) {
    recentLogs.shift();
  }
};

export const getRecentLogs = () => [...recentLogs];

export const clearRecentLogsForTesting = () => {
  recentLogs.length = 0;
};

export const logError = (
  source: string,
  error: unknown,
  metadata?: Record<string, unknown>,
) => {
  addRecentLog("error", [source, error, metadata ?? {}]);
  originalConsoleError(`${LOG_PREFIX} ${source}`, {
    build: APP_VERSION,
    error: errorToString(error),
    ...metadata,
  });
};

export const createIssueReport = (error: unknown, componentStack?: string) => {
  const currentRoute = `${window.location.pathname}${window.location.search}${window.location.hash}`;
  const logs = getRecentLogs();
  const details = [
    `build=${APP_VERSION}`,
    `route=${currentRoute}`,
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

  details.push("", "recentLogs:");
  details.push(...(logs.length ? logs : ["(none)"]));

  return details.join("\n");
};

export const installGlobalErrorLogging = () => {
  if (isGlobalLoggingInstalled) return;
  isGlobalLoggingInstalled = true;

  console.error = (...args: unknown[]) => {
    addRecentLog("error", args);
    originalConsoleError(LOG_PREFIX, ...args);
  };
  console.warn = (...args: unknown[]) => {
    addRecentLog("warn", args);
    originalConsoleWarn(LOG_PREFIX, ...args);
  };

  errorHandler = (event) => {
    logError("window.error", event.error ?? event.message, {
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno,
    });
  };
  window.addEventListener("error", errorHandler);

  rejectionHandler = (event) => {
    logError("window.unhandledrejection", event.reason);
  };
  window.addEventListener("unhandledrejection", rejectionHandler);
};

export const uninstallGlobalErrorLogging = () => {
  if (!isGlobalLoggingInstalled) return;
  isGlobalLoggingInstalled = false;
  console.error = originalConsoleError;
  console.warn = originalConsoleWarn;
  if (errorHandler) window.removeEventListener("error", errorHandler);
  if (rejectionHandler)
    window.removeEventListener("unhandledrejection", rejectionHandler);
  errorHandler = null;
  rejectionHandler = null;
};
