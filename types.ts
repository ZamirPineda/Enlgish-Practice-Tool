
export enum EnglishLevel {
  A1 = 'A1 (Beginner)',
  A2 = 'A2 (Elementary)',
  B1 = 'B1 (Intermediate)',
  B2 = 'B2 (Upper-Intermediate)',
  C1 = 'C1 (Advanced)',
  C2 = 'C2 (Proficient)',
}

export enum PracticeMode {
  Conversation = 'General Conversation',
  TargetedGrammar = 'Targeted Grammar Practice',
  StructuredPractice = 'Structured Practice',
  RolePlayOrderingFood = 'Role Play: Ordering Food',
  RolePlayJobInterview = 'Role Play: Job Interview',
  CustomScenario = 'Custom Scenario (Roleplay)',
  ExamPreparation = 'Exam Preparation (Oral Quiz)',
  VocabularyTravel = 'Vocabulary: Travel',
  SpeakingPractice = 'Speaking Practice',
  StudyDeck = 'Study Deck',
  StopGame = 'STOP Game (Vocabulary)',
  VerbDrills = 'Irregular Verbs Drill',
  PersonalPhrases = 'My Personal Scripts',
  ReadingPractice = 'Reading Practice (Monologue) 📖',
  ImageDescription = 'Describe the Image',
  LiveDebate = 'Live Debate (Real-time)',
  IPAMaster = 'IPA Master (Pronunciation) 🗣️',
  VocabularyVault = 'Vocabulary Vault (Memorization) 🧠',
}

export interface CustomScenarioConfig {
  userRole: string;
  aiRole: string;
  situation: string;
}

export interface Topic {
  id: string;
  name: string;
}

export type TopicsByLevel = Partial<Record<EnglishLevel, Topic[]>>;


export interface PronunciationFeedback {
  word: string;
  userPronunciation: string; // Inferred incorrect pronunciation
  correctPronunciation: string; // Simplified phonetic guide
  ipa: string; // International Phonetic Alphabet
  explanation: string;
}

// New SRS types
export interface SrsVocabularyItem {
  word: string;
  definition: string;
  ipa?: string;
  example?: string;
  partOfSpeech?: string; // e.g., "Noun", "Verb"
  tags?: string[]; // e.g., ["Business", "Slang"]
  originalContext?: string; // The sentence where the user found the word
  repetition: number;
  efactor: number;
  interval: number;
  nextReviewDate: string; // YYYY-MM-DD
  status: 'new' | 'learning' | 'mastered';
}

// This is the structure the AI will return
export interface SrsFeedback {
  word: string;
  definition: string;
  correct: boolean;
  isNew: boolean;
}

// ReportCard and Message types removed as they were AI-specific

// Study Deck Types
export type AdjectiveCategory = 'Quantity' | 'Opinion' | 'Size' | 'Condition' | 'Age' | 'Shape' | 'Color' | 'Sound/texture' | 'Origin' | 'Material' | 'Purpose';
export type PrepositionCategory = 'in' | 'on' | 'at';
export type GrammarCategory = 'Simple Present (3rd Person)' | 'Quantifier' | 'Adverb of Frequency' | 'Demonstrative' | 'Question Word' | 'Simple Past';
export type VerbPatternCategory = 'Verb + Gerund' | 'Verb + Infinitive';
export type IdiomCategory = 'Idiom';
export type SentenceStructureCategory = 'Negative Adverb' | 'Auxiliary' | 'Subject';
// New IELTS Categories
export type IeltsCategory = 'Trend Verb' | 'Trend Adjective' | 'Trend Noun' | 'Environmental Term' | 'Academic Noun' | 'Cultural Concept';

export type AdvancedCategory = 'Connectors' | 'Adjectives';
export type WordCategory = AdjectiveCategory | PrepositionCategory | GrammarCategory | VerbPatternCategory | IdiomCategory | SentenceStructureCategory | IeltsCategory | AdvancedCategory;

export interface WordPart {
  word: string;
  category?: WordCategory;
}

export interface DrillExample {
  parts?: WordPart[];
  ipa?: string;
  definition?: string; // For phrasal verbs
  translation_es?: string; // For Spanish translation
  comparison?: [ // For minimal pairs
    { parts: WordPart[]; ipa: string, translation_es: string },
    { parts: WordPart[]; ipa: string, translation_es: string }
  ];
}

export interface DrillTopic {
  id: string;
  name: string;
  description: string;
  examples: DrillExample[];
}

export type DrillsByLevel = Partial<Record<EnglishLevel, DrillTopic[]>>;

// STOP Game Types
export type StopCategory =
  'Countries' | 'Cities' | 'Capitals' |
  'Fruits & Vegetables' | // Renamed from Fruits
  'Colors' | 'Verbs' |
  'Animals' | 'Adjectives' | 'Objects' | 'Movies' | 'Songs' |
  'Body Parts' | 'Clothing' | 'Occupations' |
  'Tools' | 'Phrasal Verbs' | 'Sports' | 'Connectors' |
  'Emotions' | 'Nature' | 'Science' | 'Business' |
  // New Daily Life Additions
  'Household Items' | 'Housing & Rooms' |
  // New Advanced Categories
  'IELTS Trends' | 'Environment' | 'Culture' | 'Emphasis' |
  // Specialized Categories
  'Architecture' | 'Dev Terms' | 'Abstract Nouns' | 'Mythology' |
  // New Landmark Category
  'World Landmarks' |
  // New History Category
  'Historical Figures' |
  // NEW CATEGORIES ADDED
  'Food & Drinks' | 'Health & Fitness' | 'Technology & Internet' |
  'Personality Traits' | 'Education & Learning' | 'Relationships & Social' |
  'Collocations' | 'Idioms' | 'Opposites & Synonyms' | 'False Friends' | 'Minimal Pairs' |
  // NEW CREATIVE CATEGORIES
  'Compound Words' | 'Sounds & Noise' | 'Philosophy & Concepts' | 'Slang & Colloquial' |
  // NEW CHALLENGE CATEGORIES
  'Short & Rare' | 'Long & Rare' |
  // LATEST ADDITIONS
  'Compound Adjectives' | 'Modal Verbs' | 'Rare & Literary';

export interface WordFamily {
  noun?: string;
  verb?: string;
  adj?: string;
  adv?: string;
}

export interface StopItem {
  word: string;
  ipa: string;
  translation: string;
  level?: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2'; // Word difficulty level
  definition?: string; // Basic context/usage (Layer 1)
  examSentence?: string; // Advanced Context (Layer 2)
  example?: string; // Alternative for example sentence
  transformation?: string; // Passive/Inversion/Causal transform (Layer 3)
  synonyms?: string[]; // Layer 3 Extra
  writingSwap?: string; // Layer 3 Extra (Formal alternative)
  wordFamily?: WordFamily; // New Feature
  country?: string;
  tag?: string;
  artist?: string;
  genre?: string;
  director?: string;
  production?: string;
  location?: string;
  clothingType?: string;
  roomType?: string;
  toolType?: string;
  context?: string;
  hex?: string;
}

export interface StopData {
  [letter: string]: Partial<Record<StopCategory, StopItem[]>>;
}

export interface IrregularVerb {
  base: string;
  past: string;
  participle: string;
  translation: string;
  example: string;
}

// Personal Phrases Types
export interface PersonalScript {
  id: string;
  question: string;
  context: string;
  formal: string;
  casual: string;
  nativeTip: string;
}

export interface PersonalCategory {
  title: string;
  scripts: PersonalScript[];
}

// Exam / Quiz Types
export interface ExamExamplePhrase {
  text: string;
  translation: string;
}

export interface ExamTaskExample {
  taskDescription: string;
  phrases: ExamExamplePhrase[];
}

export interface ExamDefinition {
  id: string;
  name: string;
  description: string;
  tasks: string[];
  examples?: ExamTaskExample[];
}

export type ExamsByLevel = Partial<Record<EnglishLevel, ExamDefinition[]>>;

// FirebaseConfig removed

// IPA Master Types
export interface IPASound {
  symbol: string;
  name: string;
  description: string;
  mouthPosition: string;
  category: 'Vowel' | 'Consonant' | 'Diphthong';
  examples: {
    word: string;
    ipa: string;
    audioText: string;
  }[];
  connectedSpeech?: {
    exact: string;
    fast: string;
    context: string;
  }[];
  similar?: string[]; // Array of symbols that are often confused with this one
}
