
import { StopData } from '../../types';
import { idiomsData } from './definitions/idioms';
import { collocationsData } from './definitions/collocations';
import { oppositesData } from './definitions/opposites';
import { falseFriendsData } from './definitions/false_friends';
import { minimalPairsData } from './definitions/minimal_pairs';
import { creativeLanguageData } from './definitions/creative_language';

// Aggregate language extras from modular files
const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');
export const languageExtrasData: StopData = {};

alphabet.forEach(letter => {
    languageExtrasData[letter] = {
        ...(idiomsData[letter] || {}),
        ...(collocationsData[letter] || {}),
        ...(oppositesData[letter] || {}),
        ...(falseFriendsData[letter] || {}),
        ...(minimalPairsData[letter] || {}),
        ...(creativeLanguageData[letter] || {})
    };
});
