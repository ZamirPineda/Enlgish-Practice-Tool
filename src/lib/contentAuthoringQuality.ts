import { normalizeContentTags } from "@/lib/contentInventory";
import type { AuthoredContentRecord } from "@/lib/contentAuthoringPipeline";

export interface ContentAuthoringQualityIssue {
  field: string;
  message: string;
}

const MIN_PROMPT_LENGTH = 8;
const MAX_PROMPT_LENGTH = 280;
const MIN_ANSWER_LENGTH = 1;
const MAX_ANSWER_LENGTH = 280;
const MIN_TAG_COUNT = 1;
const MAX_TAG_COUNT = 8;
const MAX_HINT_COUNT = 4;
const MAX_ALTERNATIVE_COUNT = 6;

const normalizeInlineText = (value: string) =>
  value.trim().toLowerCase().replace(/\s+/g, " ");

const buildIssue = (
  field: string,
  message: string,
): ContentAuthoringQualityIssue => ({
  field,
  message,
});

const hasMeaningfulAnswer = (value: string | undefined) =>
  typeof value === "string" && value.trim().length >= MIN_ANSWER_LENGTH;

const validateLengthRules = (
  record: AuthoredContentRecord,
): ContentAuthoringQualityIssue[] => {
  const issues: ContentAuthoringQualityIssue[] = [];
  const promptLength = record.prompt.trim().length;

  if (promptLength < MIN_PROMPT_LENGTH) {
    issues.push(
      buildIssue(
        "prompt",
        `Prompt must be at least ${MIN_PROMPT_LENGTH} characters long`,
      ),
    );
  }

  if (promptLength > MAX_PROMPT_LENGTH) {
    issues.push(
      buildIssue(
        "prompt",
        `Prompt must be at most ${MAX_PROMPT_LENGTH} characters long`,
      ),
    );
  }

  if (!hasMeaningfulAnswer(record.answer)) {
    issues.push(buildIssue("answer", "Answer is required for authored content"));
  } else if (record.answer!.trim().length > MAX_ANSWER_LENGTH) {
    issues.push(
      buildIssue(
        "answer",
        `Answer must be at most ${MAX_ANSWER_LENGTH} characters long`,
      ),
    );
  }

  return issues;
};

const validateTagRules = (
  record: AuthoredContentRecord,
): ContentAuthoringQualityIssue[] => {
  const issues: ContentAuthoringQualityIssue[] = [];
  const trimmedTags = record.tags.map((tag) => tag.trim()).filter(Boolean);
  const normalizedTags = normalizeContentTags(trimmedTags);

  if (trimmedTags.length < MIN_TAG_COUNT) {
    issues.push(
      buildIssue("tags", `At least ${MIN_TAG_COUNT} tag is required`),
    );
  }

  if (trimmedTags.length > MAX_TAG_COUNT) {
    issues.push(
      buildIssue("tags", `At most ${MAX_TAG_COUNT} tags are allowed`),
    );
  }

  if (normalizedTags.length !== trimmedTags.length) {
    issues.push(
      buildIssue("tags", "Tags must be unique after normalization"),
    );
  }

  if (trimmedTags.some((tag) => tag.length < 2)) {
    issues.push(
      buildIssue("tags", "Each tag must be at least 2 characters long"),
    );
  }

  return issues;
};

const validateFormatRules = (
  record: AuthoredContentRecord,
): ContentAuthoringQualityIssue[] => {
  const issues: ContentAuthoringQualityIssue[] = [];

  if (record.alternatives.length > MAX_ALTERNATIVE_COUNT) {
    issues.push(
      buildIssue(
        "alternatives",
        `At most ${MAX_ALTERNATIVE_COUNT} alternatives are allowed`,
      ),
    );
  }

  if (record.hints.length > MAX_HINT_COUNT) {
    issues.push(
      buildIssue("hints", `At most ${MAX_HINT_COUNT} hints are allowed`),
    );
  }

  if (
    record.format === "multiple_choice" &&
    record.alternatives.length < 2
  ) {
    issues.push(
      buildIssue(
        "alternatives",
        "Multiple choice items require at least 2 alternatives",
      ),
    );
  }

  if (record.format === "pair_match" && record.alternatives.length < 1) {
    issues.push(
      buildIssue(
        "alternatives",
        "Pair match items require at least 1 alternative",
      ),
    );
  }

  if (
    record.format === "sentence_transform" &&
    hasMeaningfulAnswer(record.answer) &&
    normalizeInlineText(record.prompt) === normalizeInlineText(record.answer!)
  ) {
    issues.push(
      buildIssue(
        "answer",
        "Sentence transform answer must differ from the prompt",
      ),
    );
  }

  return issues;
};

const validateDifficultyRules = (
  record: AuthoredContentRecord,
): ContentAuthoringQualityIssue[] => {
  const issues: ContentAuthoringQualityIssue[] = [];
  const routeObjective = record.metadata.routeObjective;
  const cefr = record.metadata.cefr;

  const allowedSkillsByRoute = {
    english_interview: new Set(["english", "mixed"]),
    math_speed: new Set(["math", "mixed"]),
    dev_reasoning: new Set(["dev", "mixed"]),
  } as const;

  if (
    routeObjective &&
    !allowedSkillsByRoute[routeObjective].has(record.skill)
  ) {
    issues.push(
      buildIssue(
        "metadata.routeObjective",
        `Route objective ${routeObjective} is incompatible with skill ${record.skill}`,
      ),
    );
  }

  if (!cefr) {
    return issues;
  }

  const allowedCefrByDifficulty = {
    foundation: new Set(["A1", "A2"]),
    core: new Set(["A2", "B1", "B2"]),
    stretch: new Set(["B1", "B2", "C1"]),
    expert: new Set(["C1", "C2"]),
  } as const;

  if (!allowedCefrByDifficulty[record.difficulty].has(cefr)) {
    issues.push(
      buildIssue(
        "difficulty",
        `Difficulty ${record.difficulty} is not aligned with CEFR ${cefr}`,
      ),
    );
  }

  return issues;
};

export const validateAuthoredContentRecordQuality = (
  record: AuthoredContentRecord,
): ContentAuthoringQualityIssue[] => [
  ...validateLengthRules(record),
  ...validateTagRules(record),
  ...validateFormatRules(record),
  ...validateDifficultyRules(record),
];
