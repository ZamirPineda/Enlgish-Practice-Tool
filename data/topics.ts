import { EnglishLevel, TopicsByLevel } from "../types";

export const grammarTopicsByLevel: TopicsByLevel = {
  [EnglishLevel.A1]: [
    { id: "verb-to-be", name: 'Verb "to be"' },
    { id: "simple-present", name: "Simple Present" },
    { id: "articles", name: "Articles (a, an, the)" },
    { id: "possessives", name: "Possessive Adjectives" },
    { id: "quantities", name: "Quantities (some, any)" },
  ],
  [EnglishLevel.A2]: [
    { id: "simple-past", name: "Simple Past" },
    { id: "present-continuous", name: "Present Continuous" },
    { id: "comparatives", name: "Comparatives & Superlatives" },
    { id: "prepositions-place", name: "Prepositions of Place" },
    { id: "future-be-going-to", name: 'Future with "be going to"' },
  ],
  [EnglishLevel.B1]: [
    { id: "present-perfect", name: "Present Perfect" },
    { id: "past-continuous", name: "Past Continuous" },
    { id: "conditionals-1", name: "First Conditional" },
    { id: "modals-ability", name: "Modals of Ability/Permission" },
    { id: "reported-speech-simple", name: "Reported Speech (Simple)" },
  ],
  [EnglishLevel.B2]: [
    { id: "conditionals-2-3", name: "Second & Third Conditionals" },
    { id: "passive-voice", name: "Passive Voice (All Tenses)" },
    { id: "past-perfect", name: "Past Perfect" },
    { id: "modals-deduction", name: "Modals of Deduction" },
    { id: "phrasal-verbs-common", name: "Common Phrasal Verbs" },
  ],
  [EnglishLevel.C1]: [
    { id: "mixed-conditionals", name: "Mixed Conditionals" },
    { id: "inversion", name: "Inversion (e.g., Not only...)" },
    { id: "subjunctive", name: "Subjunctive Mood" },
    { id: "advanced-phrasal-verbs", name: "Advanced Phrasal Verbs" },
    { id: "relative-clauses", name: "Defining & Non-defining Clauses" },
  ],
};
