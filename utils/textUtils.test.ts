import { describe, it, expect } from 'vitest';
import { getFullTextFromParts } from './textUtils';
import { WordPart } from '../types';

describe('getFullTextFromParts', () => {
    it('joins multiple word parts with a space', () => {
        const parts: WordPart[] = [
            { word: 'Hello' },
            { word: 'world' }
        ];
        expect(getFullTextFromParts(parts)).toBe('Hello world');
    });

    it('returns an empty string for an empty array', () => {
        expect(getFullTextFromParts([])).toBe('');
    });

    it('returns a single word without spaces', () => {
        const parts: WordPart[] = [{ word: 'Hello' }];
        expect(getFullTextFromParts(parts)).toBe('Hello');
    });

    it('preserves punctuation within words', () => {
        const parts: WordPart[] = [
            { word: 'Hello,' },
            { word: 'world!' }
        ];
        expect(getFullTextFromParts(parts)).toBe('Hello, world!');
    });

    it('handles parts with categories', () => {
        const parts: WordPart[] = [
            { word: 'The', category: 'Determiner' },
            { word: 'big', category: 'Size' },
            { word: 'red', category: 'Color' },
            { word: 'dog' }
        ];
        expect(getFullTextFromParts(parts)).toBe('The big red dog');
    });
});
