export interface ContentSelectionHistoryScope {
  gameId: string;
  sessionId?: string;
  gameWindow?: number;
  sessionWindow?: number;
}

export interface ContentSelectionHistorySnapshot {
  gameRecentIds: string[];
  sessionRecentIds: string[];
}

interface ContentSelectionHistoryStore {
  games: Record<string, string[]>;
}

const STORAGE_KEY = "content-selection-history:v1";
const DEFAULT_HISTORY_STORE: ContentSelectionHistoryStore = {
  games: {},
};
const DEFAULT_GAME_WINDOW = 12;
const DEFAULT_SESSION_WINDOW = 24;

const sessionRecentIds = new Map<string, string[]>();
let sessionCounter = 0;

const isBrowser = () =>
  typeof window !== "undefined" && typeof window.localStorage !== "undefined";

const toUniqueOrdered = (values: string[]) =>
  Array.from(new Set(values.filter((value) => value.length > 0)));

const trimWindow = (values: string[], maxItems: number) =>
  toUniqueOrdered(values).slice(0, Math.max(0, maxItems));

const loadHistoryStore = (): ContentSelectionHistoryStore => {
  if (!isBrowser()) {
    return DEFAULT_HISTORY_STORE;
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return DEFAULT_HISTORY_STORE;
    }

    const parsed = JSON.parse(raw) as Partial<ContentSelectionHistoryStore>;
    return {
      games: parsed.games || {},
    };
  } catch {
    return DEFAULT_HISTORY_STORE;
  }
};

const saveHistoryStore = (store: ContentSelectionHistoryStore) => {
  if (!isBrowser()) {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
};

export const createContentSelectionSession = (gameId: string): string => {
  sessionCounter += 1;
  return `${gameId}:${sessionCounter.toString(36)}`;
};

export const getContentSelectionHistory = ({
  gameId,
  sessionId,
  gameWindow = DEFAULT_GAME_WINDOW,
  sessionWindow = DEFAULT_SESSION_WINDOW,
}: ContentSelectionHistoryScope): ContentSelectionHistorySnapshot => {
  const store = loadHistoryStore();

  return {
    gameRecentIds: trimWindow(store.games[gameId] || [], gameWindow),
    sessionRecentIds: sessionId
      ? trimWindow(sessionRecentIds.get(sessionId) || [], sessionWindow)
      : [],
  };
};

export const recordContentSelectionHistory = ({
  gameId,
  sessionId,
  gameWindow = DEFAULT_GAME_WINDOW,
  sessionWindow = DEFAULT_SESSION_WINDOW,
  ids,
}: ContentSelectionHistoryScope & { ids: string[] }) => {
  const nextIds = toUniqueOrdered(ids);
  if (nextIds.length === 0) {
    return;
  }

  const store = loadHistoryStore();
  store.games[gameId] = trimWindow(
    [...nextIds, ...(store.games[gameId] || [])],
    gameWindow,
  );
  saveHistoryStore(store);

  if (sessionId) {
    const previous = sessionRecentIds.get(sessionId) || [];
    sessionRecentIds.set(
      sessionId,
      trimWindow([...nextIds, ...previous], sessionWindow),
    );
  }
};

export const resetContentSelectionHistory = () => {
  sessionRecentIds.clear();
  sessionCounter = 0;

  if (!isBrowser()) {
    return;
  }

  window.localStorage.removeItem(STORAGE_KEY);
};
