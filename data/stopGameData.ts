import { StopData } from "../types";
import { countriesData } from "./stop_categories/countries";
import { citiesData } from "./stop_categories/cities";
import { capitalsData } from "./stop_categories/capitals";
import { grammarData } from "./stop_categories/grammar";
import { natureData } from "./stop_categories/nature";
import { scienceData } from "./stop_categories/science";
import { animalsData } from "./stop_categories/animals";
import { fruitsData } from "./stop_categories/fruits";
import { vegetablesData } from "./stop_categories/vegetables";
import { colorsData } from "./stop_categories/colors";
import { dailyData } from "./stop_categories/daily";
import { mediaData } from "./stop_categories/media";
import { academicData } from "./stop_categories/academic";
import { specializedData } from "./stop_categories/specialized";
import { landmarksData } from "./stop_categories/landmarks";
import { historyData } from "./stop_categories/history";
import { lifestyleData } from "./stop_categories/lifestyle";
import { technologyData } from "./stop_categories/technology";
import { languageExtrasData } from "./stop_categories/language_extras";
import { educationData } from "./stop_categories/education";
import { vocabularyChallengeData } from "./stop_categories/vocabulary_challenge";
import { philosophyData } from "./stop_categories/philosophy";
import { floraAndGeologyData } from "./stop_categories/flora_and_geology";

// This file aggregates all the categorized data into the master structure used by the UI
const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
export const stopGameData: StopData = {};
const advancedPhrasalVerbsData: StopData = {
  B: {
    "Phrasal Verbs": [
      {
        word: "Bear up under",
        ipa: "/beər ʌp ˈʌndər/",
        translation: "Soportar con entereza",
        level: "C2",
        definition: "To endure a difficult situation in a strong and calm way.",
        examSentence:
          "She bore up under intense public scrutiny without losing focus.",
      },
    ],
  },
  C: {
    "Phrasal Verbs": [
      {
        word: "Come in for",
        ipa: "/kʌm ɪn fɔːr/",
        translation: "Recibir (críticas/elogios)",
        level: "C1",
        definition: "To receive something, especially criticism or praise.",
        examSentence:
          "The minister came in for fierce criticism after the announcement.",
      },
    ],
  },
  D: {
    "Phrasal Verbs": [
      {
        word: "Double down on",
        ipa: "/ˈdʌbəl daʊn ɒn/",
        translation: "Redoblar la apuesta",
        level: "C1",
        definition:
          "To increase commitment to a strategy despite opposition or risk.",
        examSentence:
          "Instead of apologizing, the company doubled down on its original stance.",
      },
    ],
  },
  E: {
    "Phrasal Verbs": [
      {
        word: "Edge out",
        ipa: "/edʒ aʊt/",
        translation: "Superar por poco",
        level: "C1",
        definition: "To defeat or surpass someone by a very small margin.",
        examSentence:
          "Our proposal edged out the competition in the final round.",
      },
    ],
  },
  G: {
    "Phrasal Verbs": [
      {
        word: "Get round to",
        ipa: "/ɡet raʊnd tuː/",
        translation: "Encontrar tiempo para",
        level: "C1",
        definition: "To finally do something after delaying it.",
        examSentence:
          "I finally got round to revising the final chapter last night.",
      },
    ],
  },
  H: {
    "Phrasal Verbs": [
      {
        word: "Hammer out",
        ipa: "/ˈhæmər aʊt/",
        translation: "Concretar tras negociación",
        level: "C1",
        definition: "To reach an agreement after detailed discussion.",
        examSentence:
          "After weeks of talks, both sides hammered out a workable compromise.",
      },
      {
        word: "Harken back to",
        ipa: "/ˈhɑːrkən bæk tuː/",
        translation: "Remontarse a",
        level: "C2",
        definition: "To evoke or refer to something from the past.",
        examSentence: "Its visual style harkens back to classic noir cinema.",
      },
      {
        word: "Hold over",
        ipa: "/hoʊld ˈoʊvər/",
        translation: "Posponer",
        level: "C1",
        definition: "To postpone something until a later time.",
        examSentence:
          "The committee agreed to hold over the vote until next week.",
      },
      {
        word: "Home in on",
        ipa: "/hoʊm ɪn ɒn/",
        translation: "Centrarse en",
        level: "C1",
        definition: "To focus attention precisely on a target or issue.",
        examSentence:
          "The analyst homed in on the key inconsistency in the report.",
      },
    ],
  },
  K: {
    "Phrasal Verbs": [
      {
        word: "Keep abreast of",
        ipa: "/kiːp əˈbrest əv/",
        translation: "Mantenerse al día con",
        level: "C1",
        definition: "To stay informed about the latest developments.",
        examSentence:
          "Researchers must keep abreast of emerging evidence in their field.",
      },
    ],
  },
  L: {
    "Phrasal Verbs": [
      {
        word: "Latch on to",
        ipa: "/lætʃ ɒn tuː/",
        translation: "Aferrarse a",
        level: "C1",
        definition: "To become strongly attached to an idea or person.",
        examSentence:
          "The media quickly latched on to the most controversial claim.",
      },
    ],
  },
  M: {
    "Phrasal Verbs": [
      {
        word: "Measure up to",
        ipa: "/ˈmeʒər ʌp tuː/",
        translation: "Estar a la altura de",
        level: "C1",
        definition: "To be as good as a required standard.",
        examSentence: "The sequel failed to measure up to the original film.",
      },
    ],
  },
  O: {
    "Phrasal Verbs": [
      {
        word: "Opt out of",
        ipa: "/ɒpt aʊt əv/",
        translation: "Excluirse de",
        level: "C1",
        definition: "To choose not to participate in something.",
        examSentence: "Several participants opted out of the final assessment.",
      },
    ],
  },
  P: {
    "Phrasal Verbs": [
      {
        word: "Parlay into",
        ipa: "/ˈpɑːrleɪ ˈɪntuː/",
        translation: "Transformar en oportunidad",
        level: "C2",
        definition:
          "To turn one success or advantage into another opportunity.",
        examSentence: "She parlayed her internship into a full-time position.",
      },
      {
        word: "Phase out",
        ipa: "/feɪz aʊt/",
        translation: "Eliminar gradualmente",
        level: "C2",
        definition: "To gradually stop using or producing something.",
        examSentence:
          "The company plans to phase out single-use plastic packaging.",
      },
      {
        word: "Pass off as",
        ipa: "/pɑːs ɒf æz/",
        translation: "Hacer pasar por",
        level: "C2",
        definition: "To present something falsely as genuine.",
        examSentence: "He tried to pass off the copied essay as his own work.",
      },
    ],
  },
  R: {
    "Phrasal Verbs": [
      {
        word: "Root out",
        ipa: "/ruːt aʊt/",
        translation: "Erradicar",
        level: "C1",
        definition: "To find and eliminate something harmful.",
        examSentence: "The audit was designed to root out systemic fraud.",
      },
    ],
  },
  S: {
    "Phrasal Verbs": [
      {
        word: "Stave off",
        ipa: "/steɪv ɒf/",
        translation: "Evitar temporalmente",
        level: "C1",
        definition: "To prevent something bad from happening for a time.",
        examSentence:
          "Early intervention may stave off a deeper economic crisis.",
      },
    ],
  },
  T: {
    "Phrasal Verbs": [
      {
        word: "Tide over",
        ipa: "/taɪd ˈoʊvər/",
        translation: "Ayudar a superar temporalmente",
        level: "C1",
        definition:
          "To provide enough support to last through a difficult period.",
        examSentence:
          "A short-term grant will tide over the project until funding arrives.",
      },
    ],
  },
  W: {
    "Phrasal Verbs": [
      {
        word: "Wean off",
        ipa: "/wiːn ɒf/",
        translation: "Deshabituar de",
        level: "C1",
        definition: "To gradually stop someone from depending on something.",
        examSentence: "Doctors helped him wean off the medication safely.",
      },
    ],
  },
};

alphabet.forEach((letter) => {
  // Merge Fruits & Vegetables arrays if they exist in both files
  const fruitList = fruitsData[letter]?.["Fruits & Vegetables"] || [];
  const vegList = vegetablesData[letter]?.["Fruits & Vegetables"] || [];
  const mergedFood = [...fruitList, ...vegList];
  const grammarCategories = grammarData[letter] || {};
  const mergedPhrasalVerbs = [
    ...(grammarCategories["Phrasal Verbs"] || []),
    ...(advancedPhrasalVerbsData[letter]?.["Phrasal Verbs"] || []),
  ];

  stopGameData[letter] = {
    // Merge Geography (Countries, Cities, Capitals) from separate files
    ...(countriesData[letter] || {}),
    ...(citiesData[letter] || {}),
    ...(capitalsData[letter] || {}),

    // Merge Landmarks
    ...(landmarksData[letter] || {}),

    // Merge Grammar (Verbs, Adj, Phrasal, Connectors, Emotions)
    ...grammarCategories,
    ...(mergedPhrasalVerbs.length > 0
      ? { "Phrasal Verbs": mergedPhrasalVerbs }
      : {}),

    // Merge Nature (General Nature, Science, Animals, Colors)
    ...(natureData[letter] || {}),
    ...(scienceData[letter] || {}),
    ...(animalsData[letter] || {}),
    ...(colorsData[letter] || {}),

    // Merge Fruits & Vegetables (combined key)
    ...(mergedFood.length > 0 ? { "Fruits & Vegetables": mergedFood } : {}),

    // Merge Daily (Objects, Clothing, Body, Tools, Occupations, Business)
    ...(dailyData[letter] || {}),

    // Merge Media (Movies, Songs, Sports, Colors - note: Colors moved to separate file but kept in Media grouping logic if needed, though strictly it's usually Nature/Art)
    ...(mediaData[letter] || {}),

    // Merge Academic (Trends, Environment, Culture, Emphasis)
    ...(academicData[letter] || {}),

    // Merge Specialized (Architecture, Dev Terms, Abstract, Mythology)
    ...(specializedData[letter] || {}),

    // Merge History
    ...(historyData[letter] || {}),

    // Merge Lifestyle (Food, Health, Personality, Relationships)
    ...(lifestyleData[letter] || {}),

    // Merge Technology
    ...(technologyData[letter] || {}),

    // Merge Language Extras (Collocations, Idioms)
    ...(languageExtrasData[letter] || {}),

    // Merge Education
    ...(educationData[letter] || {}),

    // Merge Vocabulary Challenges
    ...(vocabularyChallengeData[letter] || {}),

    // Merge Philosophy
    ...(philosophyData[letter] || {}),

    // Merge Flora & Geology (Flowers, Plants, Trees, Mushrooms, Spices, Space, Minerals)
    ...(floraAndGeologyData[letter] || {}),
  };
});
