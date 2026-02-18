
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { calculateSrsData, getDueReviewItems } from './srs';
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

describe('getDueReviewItems', () => {
    // Mock the date to ensure deterministic results: 2023-01-01
    const MOCK_TODAY = new Date('2023-01-01T00:00:00.000Z');

    beforeEach(() => {
        vi.useFakeTimers();
        vi.setSystemTime(MOCK_TODAY);
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    // Helper to create a partial SRS item for testing filtering
    const createItem = (word: string, nextReviewDate: string): SrsVocabularyItem => ({
        word,
        definition: 'test definition',
        repetition: 0,
        efactor: 2.5,
        interval: 0,
        nextReviewDate,
        status: 'learning'
    });

    it('returns empty array if deck is undefined or null', () => {
        // @ts-expect-error testing invalid input
        expect(getDueReviewItems(null)).toEqual([]);
        // @ts-expect-error testing invalid input
        expect(getDueReviewItems(undefined)).toEqual([]);
    });

    it('returns empty array if deck is empty object', () => {
        expect(getDueReviewItems({})).toEqual([]);
    });

    it('returns items that are due today', () => {
        const deck: Record<string, SrsVocabularyItem> = {
            'word1': createItem('word1', '2023-01-01') // Due today (MOCK_TODAY)
        };
        const result = getDueReviewItems(deck);
        expect(result).toHaveLength(1);
        expect(result[0].word).toBe('word1');
    });

    it('returns items that are overdue (due in past)', () => {
        const deck: Record<string, SrsVocabularyItem> = {
            'word1': createItem('word1', '2022-12-31') // Due yesterday
        };
        const result = getDueReviewItems(deck);
        expect(result).toHaveLength(1);
        expect(result[0].word).toBe('word1');
    });

    it('does NOT return items that are due in the future', () => {
        const deck: Record<string, SrsVocabularyItem> = {
            'word1': createItem('word1', '2023-01-02') // Due tomorrow
        };
        const result = getDueReviewItems(deck);
        expect(result).toHaveLength(0);
    });

    it('filters mixed deck correctly (returns only due/overdue items)', () => {
        const deck: Record<string, SrsVocabularyItem> = {
            'due': createItem('due', '2023-01-01'),
            'overdue': createItem('overdue', '2022-12-31'),
            'future': createItem('future', '2023-01-02'),
        };
        const result = getDueReviewItems(deck);

        expect(result).toHaveLength(2);
        const words = result.map(i => i.word).sort();
        expect(words).toEqual(['due', 'overdue']);
    });

    it('handles invalid items in the deck gracefully', () => {
        const deck = {
            'valid': createItem('valid', '2023-01-01'),
            'invalid': null, // Simulate potential corrupted data
        };
        // @ts-expect-error testing corrupted data
        const result = getDueReviewItems(deck);

        expect(result).toHaveLength(1);
        expect(result[0].word).toBe('valid');
    });
});
