import { SrsVocabularyItem } from "../types";
import {
  fsrs,
  Rating,
  createEmptyCard,
  type Card as FsrsCard,
  State,
} from "ts-fsrs";

const INITIAL_EFACTOR = 2.5;

const f = fsrs({
  request_retention: 0.9,
});

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
 * Calculates the next review data for an SRS item based on the FSRS algorithm.
 * It maps the old 'correct' boolean to Good (3) or Again (1) if no explicit rating is provided.
 */
export function calculateSrsData(
  item: SrsVocabularyItem,
  correct: boolean,
  rating?: Rating,
): SrsVocabularyItem {
  const now = new Date();

  // Default to Good or Again if no explicit FSRS rating is given
  const actualRating = rating ?? (correct ? Rating.Good : Rating.Again);

  // Fallback to a new card if fsrsData was not migrated for some reason
  let card: FsrsCard;
  if (item.fsrsData) {
    card = item.fsrsData;
    // We need to ensure stringified dates from local storage are parsed back into Date objects
    if (typeof card.due === "string") card.due = new Date(card.due);
    if (typeof card.last_review === "string")
      card.last_review = new Date(card.last_review);
  } else {
    card = createEmptyCard(now);
  }

  // FSRS calculate repetitions
  const schedulingCards = f.repeat(card, now);
  const recordLog = schedulingCards[actualRating];
  const updatedCard = Object.assign({}, recordLog.card); // Remove immutable references if any

  let status: "new" | "learning" | "mastered" = "learning";
  if (updatedCard.state === State.New) {
    status = "new";
  } else if (
    updatedCard.state === State.Review &&
    updatedCard.scheduled_days > 14
  ) {
    status = "mastered";
  }

  return {
    ...item,
    repetition: updatedCard.reps, // Keep old SM-2 fields semi-updated for UX/stats
    efactor: item.efactor || INITIAL_EFACTOR,
    interval: updatedCard.scheduled_days,
    lapses: updatedCard.lapses,
    nextReviewDate: formatDateKey(updatedCard.due),
    status,
    fsrsData: updatedCard,
  };
}

/**
 * Creates a new SRS item for a word that has just been introduced.
 * Set to TODAY so it can be practiced immediately.
 */
export function createNewSrsItem(
  word: string,
  definition: string,
): SrsVocabularyItem {
  const now = new Date();
  const today = formatDateKey(now);
  const card = createEmptyCard(now); // Initialize default FSRS card

  return {
    word,
    definition,
    repetition: 0,
    efactor: INITIAL_EFACTOR,
    interval: 0, // Starts at 0 to indicate it's brand new
    lapses: 0,
    nextReviewDate: today, // Review immediately
    status: "new",
    fsrsData: card,
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

/**
 * Migrates a legacy SM-2 item to an FSRS card if it's missing 'fsrsData'.
 */
export function migrateSrsItemToFsrs(
  item: SrsVocabularyItem,
): SrsVocabularyItem {
  if (item.fsrsData) return item;

  const now = new Date();
  const card = createEmptyCard(now);

  card.due = new Date(`${item.nextReviewDate}T00:00:00Z`);
  card.scheduled_days = item.interval;
  card.elapsed_days = item.interval;
  card.reps = item.repetition;
  card.lapses = item.lapses || 0;

  if (item.status === "mastered" || item.interval > 14) {
    card.state = State.Review;
  } else if (item.interval > 0) {
    card.state = State.Learning; // Or Review if it graduated, but Learning is safer fallback
  } else {
    card.state = State.New;
  }

  // Approximate default stability and difficulty if they are zero
  card.stability = item.interval > 0 ? item.interval : 0;
  // SM-2 efactor 2.5 -> diff ~ 5, SM-2 efactor 1.3 -> diff ~ 10
  const difficultyMatch = Math.min(
    10,
    Math.max(1, 10 - ((item.efactor - 1.3) / 1.2) * 9),
  );
  card.difficulty = difficultyMatch;

  const lastReview = new Date(card.due);
  lastReview.setUTCDate(lastReview.getUTCDate() - item.interval);
  card.last_review = lastReview;

  return {
    ...item,
    fsrsData: card,
  };
}

/**
 * Checks a deck and returns a migrated copy if any items were missing FSRS data.
 * Returns null if no migration was needed.
 */
export function migrateDeckToFsrsIfNeeded(
  deck: Record<string, SrsVocabularyItem>,
): Record<string, SrsVocabularyItem> | null {
  if (!deck) return null;
  let neededMigration = false;
  const newDeck: Record<string, SrsVocabularyItem> = {};

  for (const [key, item] of Object.entries(deck)) {
    if (!item.fsrsData) {
      neededMigration = true;
      newDeck[key] = migrateSrsItemToFsrs(item);
    } else {
      newDeck[key] = item;
    }
  }

  return neededMigration ? newDeck : null;
}
