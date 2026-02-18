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
});
