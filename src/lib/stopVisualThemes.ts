import { StopCategory } from "@/types";
import { GroupName } from "@/lib/stopGameHelpers";

export type StopVisualTopic =
  | "geo"
  | "language"
  | "professional"
  | "nature"
  | "daily"
  | "culture"
  | "challenge";

export type StopVisualAccent = "amber" | "emerald" | "violet" | "sky";
export type StopVisualScene = "sunset" | "emerald" | "violet" | "sky";

export interface StopVisualTheme {
  topic: StopVisualTopic;
  accent: StopVisualAccent;
  scene: StopVisualScene;
}

const THEME_BY_GROUP: Partial<Record<GroupName, StopVisualTheme>> = {
  "Geography & Travel": { topic: "geo", accent: "emerald", scene: "emerald" },
  "Grammar & Language": { topic: "language", accent: "sky", scene: "sky" },
  Professional: { topic: "professional", accent: "violet", scene: "violet" },
  "Nature & Science": { topic: "nature", accent: "emerald", scene: "sky" },
  "Daily Life": { topic: "daily", accent: "amber", scene: "sunset" },
  "Media & Fun": { topic: "culture", accent: "violet", scene: "sunset" },
  "Knowledge & Culture": {
    topic: "culture",
    accent: "violet",
    scene: "violet",
  },
  Lifestyle: { topic: "daily", accent: "amber", scene: "sunset" },
  "Word Challenge": { topic: "challenge", accent: "amber", scene: "sky" },
};

const CATEGORY_SETS: Array<{
  categories: StopCategory[];
  theme: StopVisualTheme;
}> = [
  {
    categories: ["Countries", "Cities", "Capitals", "World Landmarks"],
    theme: { topic: "geo", accent: "emerald", scene: "emerald" },
  },
  {
    categories: [
      "Verbs",
      "Modal Verbs",
      "Adjectives",
      "Compound Adjectives",
      "Adverbs",
      "Phrasal Verbs",
      "Phrasal Nouns",
      "Connectors",
      "Emotions",
      "Collocations",
      "Idioms",
      "Proverbs",
      "Homophones",
      "Opposites & Synonyms",
      "Emphasis",
      "Interjections",
      "False Friends",
      "Minimal Pairs",
      "Abstract Nouns",
      "Compound Words",
      "Slang & Colloquial",
    ],
    theme: { topic: "language", accent: "sky", scene: "sky" },
  },
  {
    categories: [
      "Business",
      "Architecture",
      "Dev Terms",
      "Technology & Internet",
    ],
    theme: { topic: "professional", accent: "violet", scene: "violet" },
  },
  {
    categories: [
      "Nature",
      "Science",
      "Animals",
      "Fruits & Vegetables",
      "Colors",
      "Environment",
      "Flowers",
      "Flowers (Fancy)",
      "Plants",
      "Trees",
      "Mushrooms",
      "Spices & Herbs",
      "Space Objects",
      "Minerals & Gems",
    ],
    theme: { topic: "nature", accent: "emerald", scene: "sky" },
  },
  {
    categories: [
      "Objects",
      "Clothing",
      "Body Parts",
      "Occupations",
      "Tools",
      "Household Items",
      "Housing & Rooms",
      "Food & Drinks",
      "Health & Fitness",
      "Personality Traits",
      "Relationships & Social",
      "Sounds & Noise",
    ],
    theme: { topic: "daily", accent: "amber", scene: "sunset" },
  },
  {
    categories: [
      "Movies",
      "Songs",
      "Sports",
      "Mythology",
      "IELTS Trends",
      "Culture",
      "Historical Figures",
      "Education & Learning",
      "Philosophy & Concepts",
    ],
    theme: { topic: "culture", accent: "violet", scene: "violet" },
  },
  {
    categories: ["Short & Rare", "Long & Rare", "Rare & Literary"],
    theme: { topic: "challenge", accent: "amber", scene: "sky" },
  },
];

export const getStopVisualThemeFromGroup = (
  group: GroupName,
): StopVisualTheme => {
  return (
    THEME_BY_GROUP[group] ?? {
      topic: "language",
      accent: "sky",
      scene: "sky",
    }
  );
};

export const getStopVisualThemeFromCategory = (
  category: StopCategory | "",
): StopVisualTheme => {
  if (!category) {
    return { topic: "language", accent: "sky", scene: "sky" };
  }

  const match = CATEGORY_SETS.find(({ categories }) =>
    categories.includes(category),
  );

  return (
    match?.theme ?? {
      topic: "language",
      accent: "sky",
      scene: "sky",
    }
  );
};
