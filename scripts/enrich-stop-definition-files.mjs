import fs from "node:fs";
import path from "node:path";
import ts from "typescript";

const ROOT = process.cwd();

const TARGETS = [
  {
    file: path.join(
      ROOT,
      "src",
      "features",
      "data",
      "stop_categories",
      "definitions",
      "emphasis.ts",
    ),
    category: "Emphasis",
  },
  {
    file: path.join(
      ROOT,
      "src",
      "features",
      "data",
      "stop_categories",
      "definitions",
      "connectors.ts",
    ),
    category: "Connectors",
  },
  {
    file: path.join(
      ROOT,
      "src",
      "features",
      "data",
      "stop_categories",
      "definitions",
      "collocations.ts",
    ),
    category: "Collocations",
  },
];

const normalizeText = (value = "") =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const cleanLine = (value = "") => value.trim();
const stripTerminalPunctuation = (value = "") =>
  cleanLine(value).replace(/[.!?]+$/, "");
const splitSentences = (value = "") =>
  cleanLine(value)
    .match(/[^.!?]+[.!?]*/g)
    ?.map((sentence) => cleanLine(sentence))
    .filter(Boolean) || [];
const dedupeSentences = (sentences = []) => {
  const seen = new Set();
  const result = [];

  for (const sentence of sentences) {
    const cleaned = stripTerminalPunctuation(sentence);
    const normalized = normalizeText(cleaned);
    if (!normalized || seen.has(normalized)) continue;
    seen.add(normalized);
    result.push(cleaned);
  }

  return result;
};
const joinSentences = (sentences = []) =>
  sentences.length === 0 ? "" : `${sentences.join(". ")}.`;
const toSentenceCase = (value = "") => {
  const cleaned = cleanLine(value);
  if (!cleaned) return "";
  return cleaned[0].toUpperCase() + cleaned.slice(1);
};

const NOISE_MARKERS = [
  "a natural english collocation meaning",
  "a natural english word combination that is usually learned as a fixed phrase",
  "used to emphasize the degree, attitude, or effect of an action or description",
  "used to connect one idea to the next in a clear way",
];
const COLLOCATION_MARKER = 'a natural english collocation meaning "';

const CATEGORY_USAGE_HINTS = [
  [
    "emphasis",
    "Used to emphasize the degree, attitude, or effect of an action or description.",
  ],
  ["connectors", "Used to connect one idea to the next in a clear way."],
  [
    "collocations",
    "A natural English word combination that is usually learned as a fixed phrase.",
  ],
];

const WEAK_GLOSS_EXPANSIONS = {
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

const isWeakDefinition = (word, definition) => {
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

const buildUsageHint = (category) => {
  const normalizedCategory = normalizeText(category);
  for (const [pattern, hint] of CATEGORY_USAGE_HINTS) {
    if (normalizedCategory.includes(pattern)) return hint;
  }
  return "Used in context, not just as an isolated synonym.";
};

const stripNoiseFromQuotedPhrase = (value = "") => {
  const cleaned = cleanLine(value);
  const normalized = cleaned.toLowerCase();
  let cutIndex = cleaned.length;

  for (const marker of NOISE_MARKERS) {
    const markerIndex = normalized.indexOf(marker);
    if (markerIndex >= 0) {
      cutIndex = Math.min(cutIndex, markerIndex);
    }
  }

  return stripTerminalPunctuation(cleaned.slice(0, cutIndex));
};

const extractLastCollocationGloss = (definition = "") => {
  const lower = definition.toLowerCase();
  const markerIndex = lower.lastIndexOf(COLLOCATION_MARKER);
  if (markerIndex < 0) return undefined;

  const startIndex = markerIndex + COLLOCATION_MARKER.length;
  const endIndex = definition.indexOf('"', startIndex);
  if (endIndex < 0) return undefined;

  return stripNoiseFromQuotedPhrase(definition.slice(startIndex, endIndex));
};

const cleanupDefinition = ({ definition, translation, category }) => {
  const normalizedCategory = normalizeText(category);
  const usageHint = buildUsageHint(category);
  const prefix = translation ? `${toSentenceCase(translation)}. ` : "";

  if (
    normalizedCategory.includes("collocations") &&
    normalizeText(definition).includes("a natural english collocation meaning")
  ) {
    const lastQuotedPhrase = extractLastCollocationGloss(definition);

    if (
      lastQuotedPhrase &&
      normalizeText(lastQuotedPhrase) !== normalizeText(translation)
    ) {
      return `${prefix}A natural English collocation meaning "${lastQuotedPhrase.toLowerCase()}". ${usageHint}`.trim();
    }
  }

  const cleanedSentences = dedupeSentences(splitSentences(definition));
  return joinSentences(cleanedSentences) || cleanLine(definition);
};

const buildEnhancedWeakDefinition = ({
  word,
  category,
  translation,
  definition,
}) => {
  const cleanedGloss = stripTerminalPunctuation(definition);
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

  return `${prefix}${toSentenceCase(cleanedGloss)}. ${usageHint}`.trim();
};

const getPropertyName = (name) => {
  if (ts.isIdentifier(name) || ts.isStringLiteral(name)) return name.text;
  return null;
};

const getStringValue = (node) => {
  if (!node) return undefined;
  if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) {
    return node.text;
  }
  return undefined;
};

for (const target of TARGETS) {
  const sourceText = fs.readFileSync(target.file, "utf8");
  const sourceFile = ts.createSourceFile(
    target.file,
    sourceText,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TS,
  );

  const replacements = [];

  const visit = (node) => {
    if (
      ts.isObjectLiteralExpression(node) &&
      node.parent &&
      ts.isArrayLiteralExpression(node.parent)
    ) {
      let word;
      let translation;
      let definition;
      let definitionNode;

      for (const property of node.properties) {
        if (!ts.isPropertyAssignment(property)) continue;
        const name = getPropertyName(property.name);
        if (!name) continue;

        if (name === "word") word = getStringValue(property.initializer);
        if (name === "translation") {
          translation = getStringValue(property.initializer);
        }
        if (name === "definition") {
          definition = getStringValue(property.initializer);
          definitionNode = property.initializer;
        }
      }

      if (word && translation && definition && definitionNode) {
        const cleanedDefinition = cleanupDefinition({
          definition,
          translation,
          category: target.category,
        });

        let nextDefinition = cleanedDefinition;

        if (isWeakDefinition(word, cleanedDefinition)) {
          const enhanced = buildEnhancedWeakDefinition({
            word,
            category: target.category,
            translation,
            definition: cleanedDefinition,
          });

          if (enhanced) nextDefinition = enhanced;
        }

        if (nextDefinition && nextDefinition !== definition) {
          replacements.push({
            start: definitionNode.getStart(sourceFile),
            end: definitionNode.getEnd(),
            text: JSON.stringify(nextDefinition),
          });
        }
      }
    }

    ts.forEachChild(node, visit);
  };

  visit(sourceFile);

  if (replacements.length === 0) {
    console.log(`No changes needed in ${path.relative(ROOT, target.file)}`);
    continue;
  }

  let nextText = sourceText;
  for (const replacement of replacements.sort((a, b) => b.start - a.start)) {
    nextText =
      nextText.slice(0, replacement.start) +
      replacement.text +
      nextText.slice(replacement.end);
  }

  fs.writeFileSync(target.file, nextText, "utf8");
  console.log(
    `Updated ${replacements.length} weak definitions in ${path.relative(ROOT, target.file)}`,
  );
}
