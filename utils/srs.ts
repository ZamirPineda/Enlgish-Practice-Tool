import { SrsVocabularyItem } from "../types";

const INITIAL_EFACTOR = 2.5;
const INTERVAL_FUZZ_PERCENT = 0.05;

const formatDateKey = (date: Date): string => {
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const getTodayUtcDate = (): Date => {
  const now = new Date();
  return new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()),
  );
};

/**
 * Calculates the next review data for an SRS item based on the SM-2 algorithm.
 */
export function calculateSrsData(
  item: SrsVocabularyItem,
  correct: boolean,
): SrsVocabularyItem {
  const today = getTodayUtcDate();

  if (correct) {
    const repetition = item.repetition + 1;
    let interval: number;

    if (repetition === 1) {
      interval = 1;
    } else if (repetition === 2) {
      interval = 6;
    } else {
      interval = Math.round(item.interval * item.efactor);
    }
    const intervalMultiplier =
      1 + (Math.random() * 2 - 1) * INTERVAL_FUZZ_PERCENT;
    interval = Math.max(1, Math.round(interval * intervalMultiplier));

    const quality = 5;
    const efactor = Math.max(
      1.3,
      item.efactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02)),
    );

    const nextReviewDate = new Date(today);
    nextReviewDate.setUTCDate(today.getUTCDate() + interval);

    let status: "learning" | "mastered" = "learning";
    if (interval > 14 || item.status === "mastered") {
      status = "mastered";
    }

    return {
      ...item,
      repetition,
      efactor,
      interval,
      lapses: item.lapses ?? 0,
      nextReviewDate: formatDateKey(nextReviewDate),
      status,
    };
  } else {
    const nextReviewDate = new Date(today);
    nextReviewDate.setUTCDate(today.getUTCDate() + 1);

    return {
      ...item,
      repetition: 0,
      interval: 1,
      lapses: (item.lapses ?? 0) + 1,
      nextReviewDate: formatDateKey(nextReviewDate),
      status: "learning",
    };
  }
}

/**
 * Creates a new SRS item for a word that has just been introduced.
 * Set to TODAY so it can be practiced immediately.
 */
export function createNewSrsItem(
  word: string,
  definition: string,
): SrsVocabularyItem {
  const today = formatDateKey(new Date());

  return {
    word,
    definition,
    repetition: 0,
    efactor: INITIAL_EFACTOR,
    interval: 0, // Starts at 0 to indicate it's brand new
    lapses: 0,
    nextReviewDate: today, // Review immediately
    status: "new",
  };
}

/**
 * Filters a vocabulary deck to find full items that are due for review today.
 */
export function getDueReviewItems(
  deck: Record<string, SrsVocabularyItem>,
): SrsVocabularyItem[] {
  if (!deck) return [];
  const today = formatDateKey(new Date());
  return Object.values(deck)
    .filter((item) => item && item.nextReviewDate <= today)
    .sort((a, b) => {
      const lapsesDiff = (b.lapses ?? 0) - (a.lapses ?? 0);
      if (lapsesDiff !== 0) return lapsesDiff;
      return a.nextReviewDate.localeCompare(b.nextReviewDate);
    });
}

/**
 * Filters a vocabulary deck to find words that are due for review today.
 */
export function getDueReviewWords(
  deck: Record<string, SrsVocabularyItem>,
): string[] {
  return getDueReviewItems(deck).map((item) => item.word);
}

export const getIsoWeekKey = (dateInput: Date = new Date()): string => {
  const utcDate = new Date(
    Date.UTC(
      dateInput.getUTCFullYear(),
      dateInput.getUTCMonth(),
      dateInput.getUTCDate(),
    ),
  );

  const dayNumber = utcDate.getUTCDay() || 7;
  utcDate.setUTCDate(utcDate.getUTCDate() + 4 - dayNumber);

  const yearStart = new Date(Date.UTC(utcDate.getUTCFullYear(), 0, 1));
  const weekNo = Math.ceil(
    ((utcDate.getTime() - yearStart.getTime()) / 86400000 + 1) / 7,
  );

  return `${utcDate.getUTCFullYear()}-W${String(weekNo).padStart(2, "0")}`;
};

export function getWeeklyBossReviewItems(
  deck: Record<string, SrsVocabularyItem>,
  maxItems = 20,
): SrsVocabularyItem[] {
  const allItems = Object.values(deck || {}).filter(
    (item): item is SrsVocabularyItem => !!item,
  );
  if (allItems.length === 0 || maxItems <= 0) return [];

  const today = getTodayUtcDate();
  const todayStr = formatDateKey(today);

  const upcomingDate = new Date(today);
  upcomingDate.setUTCDate(today.getUTCDate() + 7);
  const upcomingStr = formatDateKey(upcomingDate);

  const dueItems = allItems
    .filter((item) => item.nextReviewDate <= todayStr)
    .sort((a, b) => {
      const lapsesDiff = (b.lapses ?? 0) - (a.lapses ?? 0);
      if (lapsesDiff !== 0) return lapsesDiff;
      return a.nextReviewDate.localeCompare(b.nextReviewDate);
    });

  const upcomingItems = allItems
    .filter(
      (item) =>
        item.nextReviewDate > todayStr && item.nextReviewDate <= upcomingStr,
    )
    .sort((a, b) => a.nextReviewDate.localeCompare(b.nextReviewDate));

  const newItems = allItems
    .filter((item) => item.status === "new" || item.interval === 0)
    .sort((a, b) => a.word.localeCompare(b.word));

  const selected: SrsVocabularyItem[] = [];
  const seenWords = new Set<string>();

  const pushUnique = (items: SrsVocabularyItem[]) => {
    for (const item of items) {
      if (selected.length >= maxItems) return;
      const key = item.word.trim().toLowerCase();
      if (seenWords.has(key)) continue;
      seenWords.add(key);
      selected.push(item);
    }
  };

  pushUnique(dueItems);
  pushUnique(upcomingItems);
  pushUnique(newItems);

  return selected;
}

export const getSrsLocalStorageKey = (level: string) =>
  `srs-vocabulary-deck-${level}`;
