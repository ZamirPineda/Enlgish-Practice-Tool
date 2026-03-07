import {
  ContentInventoryDifficulty,
  ContentInventoryItem,
  ContentInventoryPack,
  ContentInventorySkill,
  createContentInventoryItem,
  createEmptyContentInventoryPack,
  parseContentInventoryPack,
} from "@/lib/contentInventory";
import {
  ContentInventoryDedupeReport,
  dedupeContentInventoryItems,
} from "@/lib/contentInventoryDedupe";
import { getFullTextFromParts } from "@/lib/textUtils";
import { TechDeck } from "@/features/data/techDecks";
import { DrillsByLevel, DrillTopic, SrsVocabularyItem } from "@/types";

const DEV_TAG_HINTS = [
  "dev",
  "code",
  "backend",
  "frontend",
  "kubernetes",
  "spark",
  "java",
  "python",
  "sql",
  "api",
  "cloud",
  "infra",
  "system",
  "microservice",
];

const MATH_TAG_HINTS = [
  "math",
  "algebra",
  "calculus",
  "geometry",
  "statistics",
  "probability",
  "trigonometry",
];

const includesAnyHint = (value: string, hints: string[]) =>
  hints.some((hint) => value.includes(hint));

const inferSkillFromTags = (tags: string[] = []): ContentInventorySkill => {
  const normalized = tags.map((tag) => tag.toLowerCase());
  const hasMath = normalized.some((tag) =>
    includesAnyHint(tag, MATH_TAG_HINTS),
  );
  const hasDev = normalized.some((tag) => includesAnyHint(tag, DEV_TAG_HINTS));

  if (hasMath && hasDev) return "mixed";
  if (hasMath) return "math";
  if (hasDev) return "dev";
  return "english";
};

const mapVaultStatusToDifficulty = (
  status: SrsVocabularyItem["status"] | undefined,
): ContentInventoryDifficulty => {
  if (status === "new") return "foundation";
  if (status === "learning") return "core";
  if (status === "mastered") return "stretch";
  return "core";
};

const flattenStudyTopics = (drillsByLevel: DrillsByLevel): DrillTopic[] =>
  Object.values(drillsByLevel)
    .filter((topics): topics is DrillTopic[] => Array.isArray(topics))
    .flat();

export const adaptStudyDeckToInventoryItems = (
  drillsByLevel: DrillsByLevel,
): ContentInventoryItem[] => {
  const topics = flattenStudyTopics(drillsByLevel);

  return topics.flatMap((topic, topicIndex) =>
    topic.examples.flatMap((example, exampleIndex) => {
      if (
        example.parts &&
        example.parts.length > 0 &&
        example.parts[0].word.startsWith("---")
      ) {
        return [];
      }

      if (example.parts && example.parts.length > 0) {
        return [
          createContentInventoryItem({
            source: "study_deck",
            skill: "english",
            difficulty: "core",
            format: "flashcard",
            prompt: getFullTextFromParts(example.parts),
            answer: example.translation_es,
            tags: [topic.id, topic.name, "study-deck"],
            metadata: {
              topic: topic.name,
              moduleId: topic.id,
              gameId: "study_deck",
              sequence: topicIndex * 10000 + exampleIndex,
              ipa: example.ipa,
            },
            hints: example.ipa ? [example.ipa] : [],
            active: true,
          }),
        ];
      }

      if (example.comparison && example.comparison.length === 2) {
        return [
          createContentInventoryItem({
            source: "study_deck",
            skill: "english",
            difficulty: "stretch",
            format: "pair_match",
            prompt: getFullTextFromParts(example.comparison[0].parts),
            answer: example.comparison[0].translation_es,
            alternatives: [getFullTextFromParts(example.comparison[1].parts)],
            tags: [topic.id, topic.name, "comparison", "study-deck"],
            metadata: {
              topic: topic.name,
              moduleId: topic.id,
              gameId: "study_deck",
              sequence: topicIndex * 10000 + exampleIndex,
              comparisonIpaA: example.comparison[0].ipa,
              comparisonIpaB: example.comparison[1].ipa,
            },
            hints: [example.comparison[0].ipa, example.comparison[1].ipa],
            active: true,
          }),
        ];
      }

      return [];
    }),
  );
};

export const adaptVocabularyVaultToInventoryItems = (
  deck: Record<string, SrsVocabularyItem>,
): ContentInventoryItem[] =>
  Object.entries(deck || {}).map(([wordKey, item]) =>
    createContentInventoryItem({
      source: "vocabulary_vault",
      skill: inferSkillFromTags(item.tags || []),
      difficulty: mapVaultStatusToDifficulty(item.status),
      format: "flashcard",
      prompt: item.word,
      answer: item.definition,
      alternatives: item.example ? [item.example] : [],
      hints: [
        item.ipa,
        item.partOfSpeech,
        item.originalContext,
        ...(item.tags || []),
      ].filter((value): value is string => Boolean(value)),
      tags: ["vault", ...(item.tags || [])],
      metadata: {
        gameId: "vocabulary_vault",
        deckId: "vocab-vault-deck",
        topic: item.partOfSpeech,
        sourceWordKey: wordKey,
        nextReviewDate: item.nextReviewDate,
      },
      active: true,
    }),
  );

export const adaptTechDecksToInventoryItems = (
  decks: TechDeck[],
): ContentInventoryItem[] =>
  decks.flatMap((deck, deckIndex) =>
    deck.cards.map((card, cardIndex) =>
      createContentInventoryItem({
        source: "tech_deck",
        skill: "dev",
        difficulty: "core",
        format: "open_response",
        prompt: card.prompt,
        answer: card.answer,
        tags: ["tech", deck.id, deck.name],
        metadata: {
          deckId: deck.id,
          topic: deck.name,
          gameId: "tech_flashcards",
          routeObjective: "dev_reasoning",
          sequence: deckIndex * 10000 + cardIndex,
        },
        active: true,
      }),
    ),
  );

export interface BuildInventoryAdaptersInput {
  studyDeckByLevel?: DrillsByLevel;
  vocabularyVaultDeck?: Record<string, SrsVocabularyItem>;
  techDecks?: TechDeck[];
}

export interface BuildInventoryAdaptersResult {
  pack: ContentInventoryPack;
  dedupeReport: ContentInventoryDedupeReport;
}

export const buildContentInventoryFromAdaptersWithReport = (
  input: BuildInventoryAdaptersInput,
): BuildInventoryAdaptersResult => {
  const pack = createEmptyContentInventoryPack();
  const studyDeckItems = input.studyDeckByLevel
    ? adaptStudyDeckToInventoryItems(input.studyDeckByLevel)
    : [];
  const vaultItems = input.vocabularyVaultDeck
    ? adaptVocabularyVaultToInventoryItems(input.vocabularyVaultDeck)
    : [];
  const techItems = input.techDecks
    ? adaptTechDecksToInventoryItems(input.techDecks)
    : [];

  const merged = [...studyDeckItems, ...vaultItems, ...techItems];
  const deduped = dedupeContentInventoryItems(merged);
  const parsedPack = parseContentInventoryPack({
    ...pack,
    items: deduped.items,
  });

  return {
    pack: parsedPack,
    dedupeReport: deduped.report,
  };
};

export const buildContentInventoryFromAdapters = (
  input: BuildInventoryAdaptersInput,
): ContentInventoryPack => buildContentInventoryFromAdaptersWithReport(input).pack;
