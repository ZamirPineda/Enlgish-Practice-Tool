import { createNewSrsItem } from "@/lib/srs";
import {
  SrsVocabularyItem,
  StopCategory,
  StopItem,
  VaultAddOptions,
} from "@/types";

const VAULT_ENTRY_OVERRIDES: Record<
  string,
  Partial<
    Pick<
      SrsVocabularyItem,
      "definition" | "example" | "originalContext" | "partOfSpeech" | "tags"
    >
  >
> = {
  desertification: {
    definition:
      "Desertificacion. The process in which fertile land becomes dry, damaged, and starts turning into desert.",
    originalContext:
      "After years of drought and heat, farms failed as the soil slowly turned into desert.",
    partOfSpeech: "Noun",
    tags: ["Environment"],
  },
  menacingly: {
    definition:
      "Amenazadoramente. In a way that makes you feel danger, aggression, or harm is coming.",
    originalContext:
      "The dog moved toward us menacingly, showing its teeth and making everyone step back.",
    partOfSpeech: "Adverb",
  },
  threateningly: {
    definition:
      "Amenazadoramente. In a way that suggests violence, danger, or the intention to hurt someone.",
    originalContext:
      "He leaned forward threateningly, and the room went completely silent.",
    partOfSpeech: "Adverb",
  },
};

const normalizeText = (value?: string) =>
  (value || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const cleanLine = (value?: string) => (value || "").trim();

const isDefinitionWeak = (word: string, definition?: string) => {
  const normalizedWord = normalizeText(word);
  const normalizedDefinition = normalizeText(definition);

  if (!normalizedDefinition) return true;

  const definitionWords = normalizedDefinition.split(" ").filter(Boolean);
  const shortDefinition = definitionWords.length <= 3;
  const sharedStem =
    definitionWords.length <= 6 &&
    normalizedWord.length >= 6 &&
    normalizedDefinition.length >= 6 &&
    (normalizedWord.includes(normalizedDefinition.slice(0, 6)) ||
      normalizedDefinition.includes(normalizedWord.slice(0, 6)));

  return shortDefinition || sharedStem;
};

const inferPartOfSpeech = (word: string) => {
  const lower = word.toLowerCase();
  if (lower.endsWith("ly")) return "Adverb";
  if (
    lower.endsWith("tion") ||
    lower.endsWith("sion") ||
    lower.endsWith("ment") ||
    lower.endsWith("ness") ||
    lower.endsWith("ity")
  ) {
    return "Noun";
  }
  if (lower.includes(" ")) return "Phrase";
  return undefined;
};

const dedupeMeaningLines = (lines: Array<string | undefined>) => {
  const seen = new Set<string>();
  const result: string[] = [];

  for (const line of lines) {
    const cleaned = cleanLine(line);
    if (!cleaned) continue;
    const normalized = normalizeText(cleaned);
    if (!normalized || seen.has(normalized)) continue;
    seen.add(normalized);
    result.push(cleaned);
  }

  return result;
};

const cleanTransformation = (value?: string) =>
  cleanLine(value).replace(/^[A-Za-z ]+:\s*/, "");

const stripTerminalPunctuation = (value?: string) =>
  cleanLine(value).replace(/[.!?]+$/, "");

const toSentenceCase = (value?: string) => {
  const cleaned = cleanLine(value);
  if (!cleaned) return "";
  return cleaned[0].toUpperCase() + cleaned.slice(1);
};

const CATEGORY_USAGE_HINTS: Array<[string, string]> = [
  [
    "emphasis",
    "Used to emphasize the degree, attitude, or effect of an action or description.",
  ],
  ["adverbs", "Used to describe how an action happens or how it feels."],
  ["connectors", "Used to connect one idea to the next in a clear way."],
  [
    "collocations",
    "A natural English word combination that is usually learned as a fixed phrase.",
  ],
  [
    "phrasal verbs",
    "A phrasal verb whose meaning depends on the full combination, not only the base verb.",
  ],
  [
    "idioms",
    "An idiomatic expression whose meaning depends on the whole phrase, not each word alone.",
  ],
  [
    "false friends",
    "Often confused by Spanish speakers because it looks familiar but means something different.",
  ],
  [
    "verbs",
    "Used to describe an action, process, or change happening in a real situation.",
  ],
];

const WEAK_GLOSS_EXPANSIONS: Record<string, string> = {
  completely: "Completely, with total certainty or no limit.",
  "very badly": "In an extremely bad or unsuccessful way.",
  correctly: "In a correct and exact way, without mistakes.",
  intensely: "With strong force, feeling, or awareness.",
  inflexibly: "Without changing position, accepting compromise, or giving way.",
  sufficiently: "Enough for the purpose or situation.",
  "in a worthy manner": "In a way that deserves respect or praise.",
  "conceding a point":
    "Used when admitting that part of another point is true before continuing.",
  harmfully: "In a way that causes damage, difficulty, or negative effects.",
  "painfully slow difficult":
    "In a way that feels painfully slow, hard, or frustrating.",
  disturbingly: "In a way that makes people worried, uneasy, or alarmed.",
  surprisingly: "In a way that feels unexpected or causes surprise.",
  "showing regret": "In a way that shows regret, apology, or embarrassment.",
  seemingly:
    "Based on what appears to be true, even if it is not fully certain.",
  significantly: "To a noticeable or meaningful degree.",
  passionately: "With strong feeling, energy, or emotional force.",
  possibly:
    "Used to show that something may be true or can be reasonably argued.",
  diligently: "With steady effort, care, and persistence.",
  amazingly: "In a way that feels astonishing or hard to believe.",
  "huge amount": "To an extremely large or unrealistic degree.",
  boldly: "In a confident and daring way.",
  commandingly: "In a way that sounds confident, authoritative, or in control.",
  enthusiastically: "With strong interest, energy, or enjoyment.",
  very: "Used to add strong emphasis and make the statement feel stronger.",
  "severely very much":
    "To a severe degree or with a strong sense of need, damage, or urgency.",
  scarcely: "Only just, by a very small margin, or almost not at all.",
  fundamentally: "At the most basic or essential level.",
  "in a beautiful way": "In a very beautiful, graceful, or pleasing way.",
  reluctantly: "In a way that shows unwillingness or resentment.",
  "in a credible way":
    "In a way that feels real, convincing, or easy to accept.",
  confusingly: "In a way that is difficult to understand or follow.",
  "resentfully coldly": "With resentment, bitterness, or emotional coldness.",
  strangely: "In a way that feels unusual or hard to explain.",
  "openly unashamed":
    "In an obvious way, without hiding the truth or the disrespect.",
  also: "Used to add another related point.",
  although: "Used to introduce contrast or an unexpected second idea.",
  "most importantly": "Used to highlight the most important point.",
  "appropriately to circumstances":
    "Used to show that the next result or action matches the situation.",
  "remembering a fact":
    "Used to remind people of a fact that changes how the situation should be judged.",
  "considering everything":
    "Used when giving a final judgment after looking at the whole situation.",
  "in addition to": "Used to add one person, thing, or point to another.",
  "another option": "Used to introduce a different possible choice.",
  "adding info": "Used to add a new supporting point.",
  illegal: "Illegal and not allowed by law.",
};

const buildUsageHint = (category?: string) => {
  const normalizedCategory = normalizeText(category);
  for (const [pattern, hint] of CATEGORY_USAGE_HINTS) {
    if (normalizedCategory.includes(pattern)) {
      return hint;
    }
  }
  return "Used in context, not just as an isolated synonym.";
};

const buildEnhancedWeakDefinition = ({
  word,
  category,
  translation,
  baseDefinition,
}: {
  word: string;
  category?: string;
  translation?: string;
  baseDefinition?: string;
}) => {
  const cleanedGloss = stripTerminalPunctuation(baseDefinition);
  const normalizedGloss = normalizeText(cleanedGloss);
  if (!cleanedGloss) return undefined;

  const mappedExpansion = WEAK_GLOSS_EXPANSIONS[normalizedGloss];
  const usageHint = buildUsageHint(category);
  const prefix = translation ? `${toSentenceCase(translation)}. ` : "";

  if (mappedExpansion) {
    return `${prefix}${mappedExpansion} ${usageHint}`.trim();
  }

  if (normalizeText(category).includes("collocations") && word.includes(" ")) {
    return `${prefix}A natural English collocation meaning "${cleanedGloss.toLowerCase()}". ${usageHint}`.trim();
  }

  if (normalizeText(category).includes("connectors")) {
    return `${prefix}${toSentenceCase(cleanedGloss)}. ${usageHint}`.trim();
  }

  if (
    normalizeText(category).includes("emphasis") ||
    normalizeText(category).includes("adverbs")
  ) {
    return `${prefix}${toSentenceCase(cleanedGloss)}. ${usageHint}`.trim();
  }

  if (word.includes(" ")) {
    return `${prefix}${toSentenceCase(cleanedGloss)}. This phrase is best learned as a full chunk in context.`.trim();
  }

  return `${prefix}${toSentenceCase(cleanedGloss)}. ${usageHint}`.trim();
};

const inferStopPartOfSpeech = (
  item: StopItem,
  category?: StopCategory,
): string | undefined => {
  if (category === "Adverbs") {
    return item.word.includes(" ") ? "Adverb phrase" : "Adverb";
  }
  if (
    category === "Verbs" ||
    category === "Phrasal Verbs" ||
    category === "Modal Verbs"
  ) {
    return item.word.includes(" ") ? "Verb phrase" : "Verb";
  }
  if (category === "Adjectives" || category === "Compound Adjectives") {
    return item.word.includes(" ") ? "Adjective phrase" : "Adjective";
  }
  if (category === "Connectors") return "Connector";
  if (category === "Idioms") return "Idiom";
  if (category === "Collocations") return "Collocation";
  if (category === "Interjections") return "Interjection";
  if (category === "Proverbs") return "Proverb";
  if (category === "Minimal Pairs") return "Pronunciation pair";
  return undefined;
};

export const buildVaultAddOptionsFromStopItem = (
  item: StopItem,
  category?: StopCategory,
): VaultAddOptions => ({
  category,
  tags: item.tag ? [item.tag] : undefined,
  ipa: item.ipa,
  example: item.example,
  partOfSpeech: inferStopPartOfSpeech(item, category),
  translation: item.translation,
  sourceDefinition: item.definition,
  examSentence: item.examSentence,
  context: item.context,
  transformation: item.transformation,
  level: item.level,
  synonyms: item.synonyms,
});

export const buildVaultItem = (
  word: string,
  fallbackDefinition: string,
  options: VaultAddOptions = {},
): SrsVocabularyItem => {
  const wordKey = word.trim().toLowerCase();
  const override = VAULT_ENTRY_OVERRIDES[wordKey];

  const baseDefinition = cleanLine(
    options.sourceDefinition || fallbackDefinition,
  );
  const translation = cleanLine(options.translation);
  const example = cleanLine(options.example || options.examSentence);
  const enhancedWeakDefinition =
    !override?.definition && isDefinitionWeak(word, baseDefinition)
      ? buildEnhancedWeakDefinition({
          word,
          category: options.category,
          translation,
          baseDefinition,
        })
      : undefined;
  const originalContext = cleanLine(
    options.originalContext ||
      options.context ||
      example ||
      cleanTransformation(options.transformation),
  );

  const definitionLines = override?.definition
    ? [override.definition]
    : enhancedWeakDefinition
      ? dedupeMeaningLines([
          enhancedWeakDefinition,
          !example && isDefinitionWeak(word, baseDefinition)
            ? cleanTransformation(options.transformation)
            : undefined,
        ])
      : dedupeMeaningLines([
          translation,
          baseDefinition,
          isDefinitionWeak(word, baseDefinition)
            ? cleanTransformation(options.transformation)
            : undefined,
        ]);

  const definition =
    definitionLines.join("\n") ||
    baseDefinition ||
    translation ||
    "Meaning unavailable.";

  const item = {
    ...createNewSrsItem(word.trim(), definition),
    ipa: options.ipa,
    example: override?.example || example || undefined,
    partOfSpeech:
      override?.partOfSpeech || options.partOfSpeech || inferPartOfSpeech(word),
    tags: Array.from(
      new Set(
        [
          ...(options.tags || []),
          ...(options.category ? [options.category] : []),
          ...(options.level ? [options.level] : []),
          ...((override?.tags as string[] | undefined) || []),
        ].filter(Boolean),
      ),
    ),
    originalContext: override?.originalContext || originalContext || undefined,
  } satisfies SrsVocabularyItem;

  return item;
};

export const hasVaultEnrichment = (item: SrsVocabularyItem) =>
  Boolean(
    item.ipa ||
    item.example ||
    item.originalContext ||
    item.partOfSpeech ||
    (item.tags && item.tags.length > 0),
  );

export const mergeVaultItem = (
  existing: SrsVocabularyItem,
  incoming: SrsVocabularyItem,
): SrsVocabularyItem => {
  const shouldReplaceDefinition =
    !existing.definition ||
    (isDefinitionWeak(existing.word, existing.definition) &&
      normalizeText(existing.definition) !==
        normalizeText(incoming.definition));

  return {
    ...existing,
    definition: shouldReplaceDefinition
      ? incoming.definition
      : existing.definition,
    ipa: existing.ipa || incoming.ipa,
    example:
      existing.example &&
      existing.example.length >= (incoming.example || "").length
        ? existing.example
        : incoming.example || existing.example,
    originalContext:
      existing.originalContext &&
      existing.originalContext.length >= (incoming.originalContext || "").length
        ? existing.originalContext
        : incoming.originalContext || existing.originalContext,
    partOfSpeech: existing.partOfSpeech || incoming.partOfSpeech,
    tags: Array.from(
      new Set([...(existing.tags || []), ...(incoming.tags || [])]),
    ),
  };
};

export const upgradeVaultItem = (item: SrsVocabularyItem): SrsVocabularyItem =>
  mergeVaultItem(
    item,
    buildVaultItem(item.word, item.definition, {
      ipa: item.ipa,
      example: item.example,
      originalContext: item.originalContext,
      partOfSpeech: item.partOfSpeech,
      tags: item.tags,
      sourceDefinition: item.definition,
    }),
  );

export const upgradeDeckEntries = (
  deck: Record<string, SrsVocabularyItem>,
): Record<string, SrsVocabularyItem> => {
  const upgradedDeck: Record<string, SrsVocabularyItem> = {};

  Object.entries(deck).forEach(([key, item]) => {
    upgradedDeck[key] = upgradeVaultItem(item);
  });

  return upgradedDeck;
};
