import { describe, it, expect } from 'vitest';
import { getCategoryIcon } from './stopGameHelpers';
import { StopCategory } from '../types';

describe('getCategoryIcon', () => {
    it('returns correct icon for standard categories', () => {
        const testCases: { category: StopCategory; expected: string }[] = [
            { category: 'Countries', expected: '🌍' },
            { category: 'Cities', expected: '🏙️' },
            { category: 'Fruits & Vegetables', expected: '🥕' },
            { category: 'Technology & Internet', expected: '🌐' },
            { category: 'Science', expected: '🔬' },
        ];

        testCases.forEach(({ category, expected }) => {
            expect(getCategoryIcon(category)).toBe(expected);
        });
    });

    it('returns default icon for unmapped categories', () => {
        // 'Rare & Literary' exists in StopCategory type but is not in the switch case in stopGameHelpers.tsx
        const unmappedCategory: StopCategory = 'Rare & Literary';
        expect(getCategoryIcon(unmappedCategory)).toBe('📝');
    });

    it('returns default icon for unknown categories (runtime safety)', () => {
         // Casting to unknown then StopCategory to bypass TS checks for testing runtime behavior
         const unknownCategory = 'Completely Unknown Category' as unknown as StopCategory;
         expect(getCategoryIcon(unknownCategory)).toBe('📝');
    });
});
