import { StopData } from "@/types";
import { idiomsData } from "@/features/data/stop_categories/definitions/idioms";
import { collocationsData } from "@/features/data/stop_categories/definitions/collocations";
import { oppositesData } from "@/features/data/stop_categories/definitions/opposites";
import { falseFriendsData } from "@/features/data/stop_categories/definitions/false_friends";
import { minimalPairsData } from "@/features/data/stop_categories/definitions/minimal_pairs";
import { compoundWordsData } from "@/features/data/stop_categories/definitions/compound_words";
import { soundsAndNoiseData } from "@/features/data/stop_categories/definitions/sounds_and_noise";
import { slangData } from "@/features/data/stop_categories/definitions/slang";
import { rareLiteraryData } from "@/features/data/stop_categories/definitions/rare_literary";
import { homophonesData } from "@/features/data/stop_categories/definitions/homophones";
import { proverbsData } from "@/features/data/stop_categories/definitions/proverbs";

// Aggregate language extras from modular files
const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
export const languageExtrasData: StopData = {};

alphabet.forEach((letter) => {
  languageExtrasData[letter] = {
    ...(idiomsData[letter] || {}),
    ...(collocationsData[letter] || {}),
    ...(oppositesData[letter] || {}),
    ...(falseFriendsData[letter] || {}),
    ...(minimalPairsData[letter] || {}),
    ...(compoundWordsData[letter] || {}),
    ...(soundsAndNoiseData[letter] || {}),
    ...(slangData[letter] || {}),
    ...(rareLiteraryData[letter] || {}),
    ...(homophonesData[letter] || {}),
    ...(proverbsData[letter] || {}),
  };
});
