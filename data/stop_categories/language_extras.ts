
import { StopData } from '../../types';
import { idiomsData } from './definitions/idioms';
import { collocationsData } from './definitions/collocations';
import { oppositesData } from './definitions/opposites';
import { falseFriendsData } from './definitions/false_friends';
import { minimalPairsData } from './definitions/minimal_pairs';
import { compoundWordsData } from './definitions/compound_words';
import { soundsAndNoiseData } from './definitions/sounds_and_noise';
import { slangData } from './definitions/slang';
import { rareLiteraryData } from './definitions/rare_literary';

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
        ...(compoundWordsData[letter] || {}),
        ...(soundsAndNoiseData[letter] || {}),
        ...(slangData[letter] || {}),
        ...(rareLiteraryData[letter] || {})
    };
});
