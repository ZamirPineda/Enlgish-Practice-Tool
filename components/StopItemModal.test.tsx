import { render, screen } from '@testing-library/react';
import { StopItemModal } from './StopItemModal';
import { StopItem } from '../types';
import { describe, test, expect, vi } from 'vitest';
import React from 'react';

const mockItem: StopItem = {
    word: 'test',
    ipa: 'test',
    translation: 'test',
    definition: 'test definition'
};

describe('StopItemModal Accessibility', () => {
    test('close button has accessible label', () => {
        render(
            <StopItemModal
                item={mockItem}
                category="General"
                onClose={vi.fn()}
                onPlay={vi.fn()}
            />
        );

        // This is expected to fail before the fix
        const button = screen.getByRole('button', { name: /close/i });
        expect(button).toBeInTheDocument();
    });
});
