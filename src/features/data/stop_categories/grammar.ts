import { StopData } from "@/types";
import { grammarVerbs } from "@/features/data/stop_categories/grammar_verbs";
import { adjectivesData } from "@/features/data/stop_categories/definitions/adjectives";
import { emotionsData } from "@/features/data/stop_categories/definitions/emotions";
import { phrasalVerbsData } from "@/features/data/stop_categories/definitions/phrasal_verbs";
import { connectorsData } from "@/features/data/stop_categories/definitions/connectors";
import { emphasisData } from "@/features/data/stop_categories/definitions/emphasis";
import { compoundAdjectivesData } from "@/features/data/stop_categories/definitions/compound_adjectives";
import { modalVerbsData } from "@/features/data/stop_categories/definitions/modal_verbs";
import { adverbsData } from "@/features/data/stop_categories/definitions/adverbs";
import { phrasalNounsData } from "@/features/data/stop_categories/definitions/phrasal_nouns";
import { interjectionsData } from "@/features/data/stop_categories/definitions/interjections";

// This file aggregates all grammar data modules
const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
export const grammarData: StopData = {};

alphabet.forEach((letter) => {
  // Start with the base verbs
  const baseData = {
    ...(grammarVerbs[letter] || {}),
  };

  // Overlay the new, rich modular data
  grammarData[letter] = {
    ...baseData,
    ...(adjectivesData[letter]
      ? { Adjectives: adjectivesData[letter]["Adjectives"] }
      : {}),
    ...(emotionsData[letter]
      ? { Emotions: emotionsData[letter]["Emotions"] }
      : {}),
    ...(phrasalVerbsData[letter]
      ? { "Phrasal Verbs": phrasalVerbsData[letter]["Phrasal Verbs"] }
      : {}),
    ...(connectorsData[letter]
      ? { Connectors: connectorsData[letter]["Connectors"] }
      : {}),
    ...(emphasisData[letter]
      ? { Emphasis: emphasisData[letter]["Emphasis"] }
      : {}),
    ...(compoundAdjectivesData[letter]
      ? {
          "Compound Adjectives":
            compoundAdjectivesData[letter]["Compound Adjectives"],
        }
      : {}),
    ...(modalVerbsData[letter]
      ? { "Modal Verbs": modalVerbsData[letter]["Modal Verbs"] }
      : {}),
    ...(adverbsData[letter] ? { Adverbs: adverbsData[letter]["Adverbs"] } : {}),
    ...(phrasalNounsData[letter]
      ? { "Phrasal Nouns": phrasalNounsData[letter]["Phrasal Nouns"] }
      : {}),
    ...(interjectionsData[letter]
      ? { Interjections: interjectionsData[letter]["Interjections"] }
      : {}),
  };
});
