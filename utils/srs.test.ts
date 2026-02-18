import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { getDueReviewWords } from './srs';
import { SrsVocabularyItem } from '../types';

// Helper to create a partial SRS item
const createItem = (word: string, nextReviewDate: string): SrsVocabularyItem => ({
  word,
  nextReviewDate,
  definition: 'test definition',
  repetition: 0,
  efactor: 2.5,
  interval: 1,
  status: 'learning'
});

describe('getDueReviewWords', () => {
  beforeEach(() => {
    // Set a fixed date: 2024-02-20
    // Using a specific time to avoid timezone issues, although the code uses split('T')[0]
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2024-02-20T12:00:00Z'));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should return words due today', () => {
    const deck: Record<string, SrsVocabularyItem> = {
      'today': createItem('today', '2024-02-20'),
    };
    const result = getDueReviewWords(deck);
    expect(result).toEqual(['today']);
  });

  it('should return words due in the past (overdue)', () => {
    const deck: Record<string, SrsVocabularyItem> = {
      'overdue': createItem('overdue', '2024-02-19'),
    };
    const result = getDueReviewWords(deck);
    expect(result).toEqual(['overdue']);
  });

  it('should NOT return words due in the future', () => {
    const deck: Record<string, SrsVocabularyItem> = {
      'future': createItem('future', '2024-02-21'),
    };
    const result = getDueReviewWords(deck);
    expect(result).toEqual([]);
  });

  it('should handle mixed deck correctly', () => {
    const deck: Record<string, SrsVocabularyItem> = {
      'due': createItem('due', '2024-02-20'),
      'overdue': createItem('overdue', '2024-02-10'),
      'future': createItem('future', '2024-02-25'),
    };
    const result = getDueReviewWords(deck);
    expect(result).toContain('due');
    expect(result).toContain('overdue');
    expect(result).not.toContain('future');
    expect(result.length).toBe(2);
  });

  it('should handle empty deck', () => {
    const result = getDueReviewWords({});
    expect(result).toEqual([]);
  });

  it('should handle null/undefined deck gracefully', () => {
      // @ts-ignore
      expect(getDueReviewWords(null)).toEqual([]);
      // @ts-ignore
      expect(getDueReviewWords(undefined)).toEqual([]);
  });

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { calculateSrsData } from './srs';
import { SrsVocabularyItem } from '../types';

describe('calculateSrsData', () => {
    // Mock the date to ensure deterministic results
    const MOCK_TODAY = new Date('2023-01-01T00:00:00.000Z');

    beforeEach(() => {
        vi.useFakeTimers();
        vi.setSystemTime(MOCK_TODAY);
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    const createBaseItem = (): SrsVocabularyItem => ({
        word: 'test',
        definition: 'test definition',
        repetition: 0,
        efactor: 2.5,
        interval: 0,
        nextReviewDate: '2023-01-01',
        status: 'new'
    });

    describe('when answer is correct', () => {
        it('handles the first review (repetition 0 -> 1)', () => {
            const item = createBaseItem();
            const result = calculateSrsData(item, true);

            expect(result.repetition).toBe(1);
            expect(result.interval).toBe(1);
            expect(result.nextReviewDate).toBe('2023-01-02'); // Today + 1 day
            expect(result.efactor).toBeGreaterThan(2.5); // Should increase slightly
            expect(result.status).toBe('learning');
        });

        it('handles the second review (repetition 1 -> 2)', () => {
            const item = { ...createBaseItem(), repetition: 1, interval: 1 };
            const result = calculateSrsData(item, true);

            expect(result.repetition).toBe(2);
            expect(result.interval).toBe(6);
            expect(result.nextReviewDate).toBe('2023-01-07'); // Today + 6 days
            expect(result.status).toBe('learning');
        });

        it('calculates subsequent intervals based on efactor (repetition > 2)', () => {
            // interval * efactor => 6 * 2.6 (approx) => ~15.6 => 16
            const item = { ...createBaseItem(), repetition: 2, interval: 6, efactor: 2.6 };
            const result = calculateSrsData(item, true);

            expect(result.repetition).toBe(3);
            expect(result.interval).toBe(16); // Math.round(6 * 2.6) = 16
            // 2023-01-01 + 16 days = 2023-01-17
            expect(result.nextReviewDate).toBe('2023-01-17');
        });

        it('transitions status to "mastered" when interval > 14', () => {
            // interval * efactor => 6 * 2.6 => 16 (> 14)
            const item = { ...createBaseItem(), repetition: 2, interval: 6, efactor: 2.6 };
            const result = calculateSrsData(item, true);

            expect(result.status).toBe('mastered');
        });

        it('keeps status as "mastered" if already mastered', () => {
            const item = { ...createBaseItem(), status: 'mastered', repetition: 5, interval: 20 };
            const result = calculateSrsData(item, true);

            expect(result.status).toBe('mastered');
            expect(result.interval).toBeGreaterThan(20);
        });
    });

    describe('when answer is incorrect', () => {
        it('resets repetition and interval', () => {
            const item = { ...createBaseItem(), repetition: 5, interval: 20, efactor: 2.8 };
            const result = calculateSrsData(item, false);

            expect(result.repetition).toBe(0);
            expect(result.interval).toBe(1);
            expect(result.nextReviewDate).toBe('2023-01-02'); // Today + 1 day
            expect(result.status).toBe('learning');

            // Current implementation preserves efactor on failure
            expect(result.efactor).toBe(2.8);
        });

        it('downgrades status from "mastered" to "learning"', () => {
            const item = { ...createBaseItem(), status: 'mastered', repetition: 5, interval: 20 };
            const result = calculateSrsData(item, false);

            expect(result.status).toBe('learning');
        });
    });
});
