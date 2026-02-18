import { describe, it, expect } from 'vitest';
import { getFlagUrl } from './stopGameHelpers';

describe('getFlagUrl', () => {
    it('returns the correct flag URL for a valid country name', () => {
        expect(getFlagUrl('Argentina')).toBe('https://flagcdn.com/w40/ar.png');
        expect(getFlagUrl('United Kingdom')).toBe('https://flagcdn.com/w40/gb.png');
    });

    it('returns the correct flag URL for a country name with slashes', () => {
        expect(getFlagUrl('Nepal/China')).toBe('https://flagcdn.com/w40/np.png');
        expect(getFlagUrl('Jordan/Israel')).toBe('https://flagcdn.com/w40/jo.png');
    });

    it('returns null for an invalid country name', () => {
        expect(getFlagUrl('UnknownCountry')).toBeNull();
        expect(getFlagUrl('')).toBeNull();
    });

    it('returns null for undefined input', () => {
        expect(getFlagUrl(undefined)).toBeNull();
    });

    it('is case-sensitive and returns null for lowercase country names', () => {
        // The current implementation relies on exact key match in COUNTRY_CODES
        expect(getFlagUrl('argentina')).toBeNull();
    });

    it('handles leading/trailing spaces correctly', () => {
        expect(getFlagUrl(' Argentina ')).toBe('https://flagcdn.com/w40/ar.png');
        expect(getFlagUrl(' Nepal/China ')).toBe('https://flagcdn.com/w40/np.png');
    });
});
