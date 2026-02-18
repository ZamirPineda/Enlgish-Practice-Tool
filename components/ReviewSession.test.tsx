import { render, screen } from '@testing-library/react';
import ReviewSession from './ReviewSession';
import { SrsVocabularyItem } from '../types';
import { describe, test, expect, vi } from 'vitest';
import React from 'react';

const mockItem: SrsVocabularyItem = {
    word: 'test',
    definition: 'a test',
    repetition: 0,
    efactor: 2.5,
    interval: 1,
    nextReviewDate: '2024-01-01',
    status: 'new'
};

describe('ReviewSession Accessibility', () => {
    test('audio button has accessible label', () => {
        render(
            <ReviewSession
                item={mockItem}
                progress={{ current: 1, total: 10 }}
                onComplete={vi.fn()}
                onFinishSession={vi.fn()}
                onPlayAudio={vi.fn()}
            />
        );

        // This is expected to fail before the fix
        // Using getAllByRole to debug what roles are present if getByLabelText fails
        const button = screen.getByRole('button', { name: /listen/i });
        expect(button).toBeInTheDocument();
    });
});
