
import { StopData } from '../../types';
import { grammarVerbs } from './grammar_verbs';
import { adjectivesData } from './definitions/adjectives';
import { emotionsData } from './definitions/emotions';
import { phrasalVerbsData } from './definitions/phrasal_verbs';
import { connectorsData } from './definitions/connectors';
import { emphasisData } from './definitions/emphasis';
import { compoundAdjectivesData } from './definitions/compound_adjectives';
import { modalVerbsData } from './definitions/modal_verbs';

// This file aggregates all grammar data modules
const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');
export const grammarData: StopData = {};

alphabet.forEach(letter => {
    // Start with the base verbs
    const baseData = {
        ...(grammarVerbs[letter] || {})
    };

    // Overlay the new, rich modular data
    grammarData[letter] = {
        ...baseData,
        ... (adjectivesData[letter] ? { 'Adjectives': adjectivesData[letter]['Adjectives'] } : {}),
        ... (emotionsData[letter] ? { 'Emotions': emotionsData[letter]['Emotions'] } : {}),
        ... (phrasalVerbsData[letter] ? { 'Phrasal Verbs': phrasalVerbsData[letter]['Phrasal Verbs'] } : {}),
        ... (connectorsData[letter] ? { 'Connectors': connectorsData[letter]['Connectors'] } : {}),
        ... (emphasisData[letter] ? { 'Emphasis': emphasisData[letter]['Emphasis'] } : {}),
        ... (compoundAdjectivesData[letter] ? { 'Compound Adjectives': compoundAdjectivesData[letter]['Compound Adjectives'] } : {}),
        ... (modalVerbsData[letter] ? { 'Modal Verbs': modalVerbsData[letter]['Modal Verbs'] } : {})
    };
});
