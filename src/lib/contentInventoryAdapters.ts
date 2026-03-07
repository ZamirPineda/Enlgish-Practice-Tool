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
import { rankToDifficultyTier, uniqueTags } from "@/lib/practiceContent";
import { getFullTextFromParts } from "@/lib/textUtils";
import { codeBugsData, type CodeBugPrompt } from "@/features/data/codeBugsData";
import {
  codeSyntaxData,
  type CodeSyntaxPrompt,
} from "@/features/data/codeSyntaxData";
import {
  docsQuizQuestions,
  type QuizQuestion,
} from "@/features/data/docs_quiz";
import {
  errorHunterRounds,
  type ErrorHunterRound,
} from "@/features/data/errorHunter";
import {
  paraphraseDuelRounds,
  type ParaphraseDuelRound,
} from "@/features/data/paraphraseDuel";
import {
  speedBuilderRounds,
  type SpeedBuilderRound,
} from "@/features/data/speedBuilder";
import {
  sentenceTransformerRounds,
  type SentenceTransformerRound,
} from "@/features/data/sentenceTransformer";
import { TechDeck } from "@/features/data/techDecks";
import {
  mathPracticeQuestionBankByLevel,
  type MathPracticeQuestion,
} from "@/lib/mathPracticeBank";
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

const mapEnglishLevelToDifficulty = (
  level: SpeedBuilderRound["level"] | ErrorHunterRound["level"],
): ContentInventoryDifficulty => {
  if (level === "A1" || level === "A2") return "foundation";
  if (level === "B1") return "core";
  if (level === "B2") return "stretch";
  return "expert";
};

const buildEnglishGameTags = (
  gameId: string,
  level: string,
  tags: string[],
  extraTags: string[] = [],
) => uniqueTags([gameId, level, ...tags, ...extraTags]);

const buildDocsQuizDifficultyById = (questions: QuizQuestion[]) => {
  const ranked = questions
    .map((question, index) => ({
      question,
      index,
      score:
        question.question.length +
        question.explanation.length +
        Math.round(
          question.options.reduce((total, option) => total + option.length, 0) /
            Math.max(1, question.options.length),
        ) +
        (question.subCategory ? 8 : 0),
    }))
    .sort(
      (left, right) => left.score - right.score || left.index - right.index,
    );

  const difficultyById = new Map<string, ContentInventoryDifficulty>();
  ranked.forEach(({ question }, rank) => {
    difficultyById.set(question.id, rankToDifficultyTier(rank, ranked.length));
  });

  return difficultyById;
};

const normalizeStudyDocsTitle = (fileName: string): string =>
  decodeURIComponent(
    fileName
      .replace(/\.html$/i, "")
      .replace(/Explicacion_Profunda_/gi, "")
      .replace(/Explicaci[oó]n_Profunda_/gi, "")
      .replace(/Guia_Ejecucion_/gi, "")
      .replace(/Gu[ií]a_Ejecuci[oó]n_/gi, "")
      .replace(/Explicacion /gi, "")
      .replace(/Guia Ejecucion /gi, "")
      .replace(/_/g, " ")
      .replace(/\./g, " ")
      .replace(/\s+/g, " ")
      .replace(/\(\d+\)/g, "")
      .trim(),
  );

const buildStudyDocsDifficultyByPath = (
  entries: StudyDocsEntry[],
): Map<string, ContentInventoryDifficulty> => {
  const ranked = entries
    .map((entry, index) => ({
      entry,
      index,
      score:
        entry.title.length +
        entry.category.length +
        entry.path.split("/").length * 16,
    }))
    .sort(
      (left, right) => left.score - right.score || left.index - right.index,
    );

  const difficultyByPath = new Map<string, ContentInventoryDifficulty>();
  ranked.forEach(({ entry }, rank) => {
    difficultyByPath.set(entry.path, rankToDifficultyTier(rank, ranked.length));
  });

  return difficultyByPath;
};

const tokenizeTagWords = (...values: string[]): string[] =>
  uniqueTags(
    values.flatMap((value) =>
      value
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .split(/[^a-z0-9]+/)
        .filter((token) => token.length >= 3 || /^\d+$/.test(token)),
    ),
  );

const buildMathPracticeAliases = (question: MathPracticeQuestion): string[] => {
  const haystack = [
    question.prompt,
    question.expression || "",
    question.answerTypeLabel,
    question.sectionLabel,
    question.referenceLabel || "",
    question.referenceValue || "",
    question.correctAnswer,
    question.topicLabel,
    ...question.tags,
  ].join(" ");
  const normalizedHaystack = haystack
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
  const aliases = [...tokenizeTagWords(haystack)];

  if (question.sourceTopicId === "algebra") {
    aliases.push("algebra", "equations");
  }
  if (
    question.sourceTopicId === "algebra" &&
    question.difficultyTier === "foundation"
  ) {
    aliases.push("arithmetic");
  }
  if (
    normalizedHaystack.includes("/") ||
    normalizedHaystack.includes("fraccion") ||
    normalizedHaystack.includes("cociente")
  ) {
    aliases.push("fractions");
  }
  if (
    question.difficultyTier === "stretch" ||
    question.difficultyTier === "expert"
  ) {
    aliases.push("mixed");
  }

  return uniqueTags(aliases);
};

const buildDocsQuizAliases = (question: QuizQuestion): string[] => {
  const tokens = tokenizeTagWords(
    question.category,
    question.subCategory || "",
    question.question,
  );
  const aliases = ["docs", "retrieval", "quiz", ...tokens];

  if (tokens.includes("google") && tokens.includes("cloud")) {
    aliases.push("gcp");
  }
  if (tokens.includes("arquitectura")) {
    aliases.push("architecture");
  }
  if (tokens.includes("microservicios")) {
    aliases.push("microservices");
  }

  return uniqueTags(aliases);
};

const buildStudyDocsAliases = (entry: StudyDocsEntry): string[] => {
  const tokens = tokenizeTagWords(entry.category, entry.title, entry.path);
  const aliases = ["docs", "retrieval", ...tokens];

  if (tokens.includes("arquitectura")) {
    aliases.push("architecture");
  }
  if (tokens.includes("diseno")) {
    aliases.push("design");
  }
  if (tokens.includes("algoritmos")) {
    aliases.push("algorithms");
  }
  if (tokens.includes("microservicios")) {
    aliases.push("microservices");
  }
  if (tokens.includes("google") && tokens.includes("cloud")) {
    aliases.push("gcp");
  }
  if (tokens.includes("java") && tokens.includes("17")) {
    aliases.push("java_17");
  }

  return uniqueTags(aliases);
};

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

export const adaptSpeedBuilderToInventoryItems = (
  rounds: SpeedBuilderRound[],
): ContentInventoryItem[] =>
  rounds.map((round, roundIndex) =>
    createContentInventoryItem({
      source: "english_game",
      skill: "english",
      difficulty: mapEnglishLevelToDifficulty(round.level),
      format: "sentence_transform",
      prompt: round.sentence,
      answer: round.sentence,
      tags: buildEnglishGameTags("speed_builder", round.level, round.tags),
      metadata: {
        gameId: "speed_builder",
        routeObjective: "english_interview",
        topic: round.tags[0],
        cefr: round.level,
        sequence: roundIndex,
        sourceRoundId: round.id,
      },
      active: true,
    }),
  );

export const adaptErrorHunterToInventoryItems = (
  rounds: ErrorHunterRound[],
): ContentInventoryItem[] =>
  rounds.map((round, roundIndex) =>
    createContentInventoryItem({
      source: "english_game",
      skill: "english",
      difficulty: mapEnglishLevelToDifficulty(round.level),
      format: "sentence_transform",
      prompt: round.incorrectSentence,
      answer: round.correctedSentence,
      hints: [round.errorType],
      tags: buildEnglishGameTags("error_hunter", round.level, round.tags, [
        round.errorType,
        "grammar",
      ]),
      metadata: {
        gameId: "error_hunter",
        routeObjective: "english_interview",
        topic: round.tags[0],
        cefr: round.level,
        sequence: roundIndex,
        sourceRoundId: round.id,
        errorType: round.errorType,
      },
      active: true,
    }),
  );

export const adaptParaphraseDuelToInventoryItems = (
  rounds: ParaphraseDuelRound[],
): ContentInventoryItem[] =>
  rounds.map((round, roundIndex) =>
    createContentInventoryItem({
      source: "english_game",
      skill: "english",
      difficulty: mapEnglishLevelToDifficulty(round.level),
      format: "sentence_transform",
      prompt: round.sentence,
      answer: round.acceptedAnswers[0],
      alternatives: round.acceptedAnswers.slice(1),
      hints: [round.targetConnector],
      tags: buildEnglishGameTags("paraphrase_duel", round.level, round.tags, [
        round.targetConnector,
        "paraphrase",
      ]),
      metadata: {
        gameId: "paraphrase_duel",
        routeObjective: "english_interview",
        topic: round.tags[0],
        cefr: round.level,
        sequence: roundIndex,
        sourceRoundId: round.id,
        connector: round.targetConnector,
      },
      active: true,
    }),
  );

export const adaptSentenceTransformerToInventoryItems = (
  rounds: SentenceTransformerRound[],
): ContentInventoryItem[] =>
  rounds.map((round, roundIndex) =>
    createContentInventoryItem({
      source: "english_game",
      skill: "english",
      difficulty: mapEnglishLevelToDifficulty(round.level),
      format: "sentence_transform",
      prompt: round.baseSentence,
      answer: round.expectedSentence,
      hints: [round.mode],
      tags: buildEnglishGameTags(
        "sentence_transformer",
        round.level,
        round.tags,
        [round.mode, "transformations", "followup"],
      ),
      metadata: {
        gameId: "sentence_transformer",
        routeObjective: "english_interview",
        topic: round.tags[0],
        cefr: round.level,
        sequence: roundIndex,
        sourceRoundId: round.id,
        mode: round.mode,
      },
      active: true,
    }),
  );

export const adaptMathPracticeToInventoryItems = (
  bankByLevel: Record<string, MathPracticeQuestion[]>,
): ContentInventoryItem[] =>
  Object.entries(bankByLevel).flatMap(
    ([adaptiveLevel, questions], levelIndex) =>
      questions.map((question, questionIndex) =>
        createContentInventoryItem({
          source: "math_game",
          skill: "math",
          difficulty: question.difficultyTier,
          format: "formula_drill",
          prompt: question.expression
            ? `${question.prompt}: ${question.expression}`
            : question.prompt,
          answer: question.correctAnswer,
          alternatives: question.options.filter(
            (option) => option !== question.correctAnswer,
          ),
          hints: [
            question.sectionLabel,
            question.referenceLabel,
            question.referenceValue,
            question.answerTypeLabel,
          ].filter((value): value is string => Boolean(value)),
          tags: uniqueTags([
            adaptiveLevel,
            question.topicLabel,
            question.sectionLabel,
            ...question.tags,
            ...buildMathPracticeAliases(question),
          ]),
          metadata: {
            gameId: "math_game",
            routeObjective: question.routeObjective,
            topic: question.topicLabel,
            sequence: levelIndex * 100000 + questionIndex,
            sourceQuestionId: question.id,
            answerTypeLabel: question.answerTypeLabel,
            sourceTopicId: question.sourceTopicId,
          },
          active: true,
        }),
      ),
  );

export const adaptCodeSyntaxToInventoryItems = (
  prompts: CodeSyntaxPrompt[],
): ContentInventoryItem[] =>
  prompts.map((prompt, promptIndex) =>
    createContentInventoryItem({
      source: "dev_game",
      skill: "dev",
      difficulty: prompt.difficultyTier,
      format: "code_snippet",
      prompt: prompt.prompt,
      answer: prompt.tokens.join(" "),
      tags: uniqueTags([
        "code_syntax_builder",
        prompt.language,
        ...prompt.tags,
      ]),
      metadata: {
        gameId: "code_syntax_builder",
        routeObjective: prompt.routeObjective,
        topic: prompt.language,
        sequence: promptIndex,
        sourcePromptId: prompt.id,
        language: prompt.language,
      },
      active: true,
    }),
  );

export const adaptCodeBugsToInventoryItems = (
  prompts: CodeBugPrompt[],
): ContentInventoryItem[] =>
  prompts.map((prompt, promptIndex) =>
    createContentInventoryItem({
      source: "dev_game",
      skill: "dev",
      difficulty: prompt.difficultyTier,
      format: "code_snippet",
      prompt: prompt.codeLines.join("\n"),
      answer: prompt.explanation,
      hints: [String(prompt.bugLineIndex + 1), prompt.language],
      tags: uniqueTags([
        "code_bug_hunter",
        "bug",
        prompt.language,
        ...prompt.tags,
      ]),
      metadata: {
        gameId: "code_bug_hunter",
        routeObjective: prompt.routeObjective,
        topic: prompt.language,
        sequence: promptIndex,
        sourcePromptId: prompt.id,
        bugLineIndex: prompt.bugLineIndex,
      },
      active: true,
    }),
  );

export const adaptDocsQuizToInventoryItems = (
  questions: QuizQuestion[],
): ContentInventoryItem[] => {
  const difficultyById = buildDocsQuizDifficultyById(questions);

  return questions.map((question, questionIndex) =>
    createContentInventoryItem({
      source: "dev_game",
      skill: "dev",
      difficulty: difficultyById.get(question.id) || "core",
      format: "multiple_choice",
      prompt: question.question,
      answer: question.correctAnswer,
      alternatives: question.options.filter(
        (option) => option !== question.correctAnswer,
      ),
      hints: [question.explanation],
      tags: uniqueTags([
        "study_docs_quiz",
        ...buildDocsQuizAliases(question),
        question.category,
        question.subCategory || "",
      ]),
      metadata: {
        gameId: "study_docs_quiz",
        routeObjective: "dev_reasoning",
        topic: question.category,
        sequence: questionIndex,
        sourceQuestionId: question.id,
        subCategory: question.subCategory,
      },
      active: true,
    }),
  );
};

export interface StudyDocsTreeNode {
  name: string;
  path: string;
  type: "file" | "directory";
  children?: StudyDocsTreeNode[];
}

interface StudyDocsEntry {
  path: string;
  category: string;
  title: string;
}

const collectStudyDocsEntries = (
  nodes: StudyDocsTreeNode[],
  parentCategory?: string,
): StudyDocsEntry[] =>
  nodes.flatMap((node) => {
    if (node.type === "file") {
      return [
        {
          path: node.path,
          category: parentCategory || "General",
          title: normalizeStudyDocsTitle(node.name),
        },
      ];
    }

    const nextCategory = parentCategory || node.name;
    return collectStudyDocsEntries(node.children || [], nextCategory);
  });

export const adaptStudyDocsTreeToInventoryItems = (
  tree: StudyDocsTreeNode[],
): ContentInventoryItem[] => {
  const entries = collectStudyDocsEntries(tree).filter(
    (entry) => !entry.category.toLowerCase().includes("ejecuci"),
  );
  const difficultyByPath = buildStudyDocsDifficultyByPath(entries);

  return entries.map((entry, entryIndex) =>
    createContentInventoryItem({
      source: "dev_game",
      skill: "dev",
      difficulty: difficultyByPath.get(entry.path) || "core",
      format: "open_response",
      prompt: entry.title,
      answer: entry.category,
      tags: uniqueTags([
        "study_docs_game",
        ...buildStudyDocsAliases(entry),
        entry.category,
        entry.title,
        entry.path,
        ...entry.path.split("/"),
      ]),
      metadata: {
        gameId: "study_docs_game",
        routeObjective: "dev_reasoning",
        topic: entry.category,
        sequence: entryIndex,
        path: entry.path,
      },
      active: true,
    }),
  );
};

export interface BuildInventoryAdaptersInput {
  studyDeckByLevel?: DrillsByLevel;
  vocabularyVaultDeck?: Record<string, SrsVocabularyItem>;
  techDecks?: TechDeck[];
  speedBuilderRounds?: SpeedBuilderRound[];
  errorHunterRounds?: ErrorHunterRound[];
  paraphraseDuelRounds?: ParaphraseDuelRound[];
  sentenceTransformerRounds?: SentenceTransformerRound[];
  mathPracticeBankByLevel?: Record<string, MathPracticeQuestion[]>;
  codeSyntaxPrompts?: CodeSyntaxPrompt[];
  codeBugPrompts?: CodeBugPrompt[];
  docsQuizQuestions?: QuizQuestion[];
  studyDocsTree?: StudyDocsTreeNode[];
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
  const speedBuilderItems = input.speedBuilderRounds
    ? adaptSpeedBuilderToInventoryItems(input.speedBuilderRounds)
    : [];
  const errorHunterItems = input.errorHunterRounds
    ? adaptErrorHunterToInventoryItems(input.errorHunterRounds)
    : [];
  const paraphraseItems = input.paraphraseDuelRounds
    ? adaptParaphraseDuelToInventoryItems(input.paraphraseDuelRounds)
    : [];
  const transformerItems = input.sentenceTransformerRounds
    ? adaptSentenceTransformerToInventoryItems(input.sentenceTransformerRounds)
    : [];
  const mathItems = input.mathPracticeBankByLevel
    ? adaptMathPracticeToInventoryItems(input.mathPracticeBankByLevel)
    : [];
  const codeSyntaxItems = input.codeSyntaxPrompts
    ? adaptCodeSyntaxToInventoryItems(input.codeSyntaxPrompts)
    : [];
  const codeBugItems = input.codeBugPrompts
    ? adaptCodeBugsToInventoryItems(input.codeBugPrompts)
    : [];
  const docsQuizItems = input.docsQuizQuestions
    ? adaptDocsQuizToInventoryItems(input.docsQuizQuestions)
    : [];
  const studyDocsItems = input.studyDocsTree
    ? adaptStudyDocsTreeToInventoryItems(input.studyDocsTree)
    : [];

  const merged = [
    ...studyDeckItems,
    ...vaultItems,
    ...techItems,
    ...speedBuilderItems,
    ...errorHunterItems,
    ...paraphraseItems,
    ...transformerItems,
    ...mathItems,
    ...codeSyntaxItems,
    ...codeBugItems,
    ...docsQuizItems,
    ...studyDocsItems,
  ];
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
): ContentInventoryPack =>
  buildContentInventoryFromAdaptersWithReport(input).pack;

export const DEFAULT_ROADMAP_ADAPTERS_INPUT: BuildInventoryAdaptersInput = {
  speedBuilderRounds,
  errorHunterRounds,
  paraphraseDuelRounds,
  sentenceTransformerRounds,
  mathPracticeBankByLevel: mathPracticeQuestionBankByLevel,
  codeSyntaxPrompts: codeSyntaxData,
  codeBugPrompts: codeBugsData,
  docsQuizQuestions,
};
