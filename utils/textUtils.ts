import { WordPart } from '../types';

export const getFullTextFromParts = (parts: WordPart[]) => parts.map(p => p.word).join(' ');
