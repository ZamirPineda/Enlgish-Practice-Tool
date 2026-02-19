import { SrsVocabularyItem } from "../types";

const INITIAL_EFACTOR = 2.5;

/**
 * Calculates the next review data for an SRS item based on the SM-2 algorithm.
 */
export function calculateSrsData(
  item: SrsVocabularyItem,
  correct: boolean,
): SrsVocabularyItem {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

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

    const quality = 5;
    const efactor = Math.max(
      1.3,
      item.efactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02)),
    );

    const nextReviewDate = new Date(today);
    nextReviewDate.setDate(today.getDate() + interval);

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
      nextReviewDate: nextReviewDate.toISOString().split("T")[0],
      status,
    };
  } else {
    const nextReviewDate = new Date(today);
    nextReviewDate.setDate(today.getDate() + 1);

    return {
      ...item,
      repetition: 0,
      interval: 1,
      lapses: (item.lapses ?? 0) + 1,
      nextReviewDate: nextReviewDate.toISOString().split("T")[0],
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
  const today = new Date().toISOString().split("T")[0];

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
  const today = new Date().toISOString().split("T")[0];
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

export const getSrsLocalStorageKey = (level: string) =>
  `srs-vocabulary-deck-${level}`;
