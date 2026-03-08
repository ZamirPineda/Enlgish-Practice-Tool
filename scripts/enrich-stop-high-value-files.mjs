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
      "history.ts",
    ),
    kind: "history",
  },
  {
    file: path.join(
      ROOT,
      "src",
      "features",
      "data",
      "stop_categories",
      "academic_ielts.ts",
    ),
    kind: "ielts",
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
const wordCount = (value = "") =>
  normalizeText(value).split(" ").filter(Boolean).length;
const toSentenceCase = (value = "") => {
  const cleaned = cleanLine(value);
  if (!cleaned) return "";
  return cleaned[0].toUpperCase() + cleaned.slice(1);
};
const lowerFirst = (value = "") => {
  const cleaned = cleanLine(value);
  if (!cleaned) return "";
  return cleaned[0].toLowerCase() + cleaned.slice(1);
};
const preserveLeadWordCase = (value = "") =>
  /^(US\b|UK\b|WWI\b|WWII\b|Greek\b|Roman\b|Jewish\b|Welsh\b|French\b|German\b|Italian\b|Iranian\b|Burmese\b|English\b|Mexican\b|Pakistani\b|Israeli\b|African\b|American\b|Scottish\b|Chinese\b|Russian\b|Egyptian\b|Indian\b|Spanish\b|Argentine\b|Brazilian\b|Canadian\b|Australian\b|Irish\b|Dutch\b|Polish\b|Turkish\b|Syrian\b|Saudi\b|Japanese\b|Korean\b|Cuban\b|Venezuelan\b|Colombian\b|Chilean\b|Peruvian\b|Ecuadorian\b|Ukrainian\b|Soviet\b|Ottoman\b)/.test(
    cleanLine(value),
  );

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

const looksLikeActionClause = (value = "") =>
  /^(abolished|developed|created|established|discovered|invented|founded|led|won|wrote|directed|played|named|beheaded|served|ruled|pioneered|formed|built|composed|explored|helped|launched|introduced|walked|flew|crossed|studied)\b/i.test(
    cleanLine(value),
  );

const startsWithRoleThatNeedsThe = (value = "") =>
  /^(\d+(st|nd|rd|th)\b|first\b|second\b|third\b|last\b|only\b|president\b|prime minister\b|king\b|queen\b|emperor\b|ruler\b|leader\b|pope\b|pharaoh\b|chief\b|chancellor\b|tsar\b|czar\b|duke\b|general\b|commander\b|inventor\b|discoverer\b|creator\b|author\b|founder\b|father\b|mother\b)/i.test(
    cleanLine(value),
  );

const withArticle = (value = "") => {
  const cleaned = stripTerminalPunctuation(value);
  if (!cleaned) return "";
  if (/^(a|an|the)\b/i.test(cleaned)) return toSentenceCase(cleaned);
  if (/^us\b/i.test(cleaned)) {
    const formatted = `US${cleaned.slice(2)}`;
    return `a ${formatted}`;
  }
  const formatted =
    preserveLeadWordCase(cleaned) || /^[A-Z]{2,}\b/.test(cleaned)
      ? cleaned
      : lowerFirst(cleaned);
  if (startsWithRoleThatNeedsThe(cleaned)) return `the ${formatted}`;
  const firstToken = cleaned.split(/\s+/)[0] || "";
  const article = /^US\b/.test(firstToken)
    ? "a"
    : /^([AEFHILMNORSX])\b/.test(firstToken)
      ? "an"
      : /[aeiou]/i.test(firstToken[0] || "")
        ? "an"
        : "a";
  return `${article} ${formatted}`;
};

const expandHistoryDefinition = (definition = "") => {
  const cleaned = stripTerminalPunctuation(definition);
  if (!cleaned) return "";

  if (/who beheaded$/i.test(cleaned)) {
    return `${stripTerminalPunctuation(cleaned.replace(/who beheaded$/i, "who was beheaded"))}.`;
  }

  if (/america named after him/i.test(cleaned)) {
    return "An explorer after whom America was named.";
  }

  if (/^an us\b/i.test(cleaned)) {
    return `A US${cleaned.slice(5)}.`;
  }

  const commaIndex = cleaned.indexOf(",");
  if (commaIndex >= 0) {
    const head = cleanLine(cleaned.slice(0, commaIndex));
    const tail = cleanLine(cleaned.slice(commaIndex + 1));
    if (head && tail) {
      const subject = toSentenceCase(withArticle(head));
      if (/named after him$/i.test(tail)) {
        const namedThing = cleanLine(tail.replace(/named after him$/i, ""));
        if (namedThing) {
          return `${subject}, and ${lowerFirst(namedThing)} was named after him.`;
        }
      }
      if (/^(beheaded|assassinated|executed|imprisoned|exiled)$/i.test(tail)) {
        return `${subject} who was ${tail.toLowerCase()}.`;
      }
      if (looksLikeActionClause(tail)) {
        return `${subject} who ${lowerFirst(tail)}.`;
      }
      return `${subject} who was ${withArticle(tail)}.`;
    }
  }

  const masterMatch = cleaned.match(/^Master of (.+) filmmaker$/i);
  if (masterMatch) {
    return `A filmmaker known as the Master of ${masterMatch[1]}.`;
  }

  const parenMatch = cleaned.match(/^(.+?)\s*\((.+)\)$/);
  if (parenMatch) {
    const [, main, detail] = parenMatch;
    return `${toSentenceCase(withArticle(main))} associated with ${detail}.`;
  }

  const creatorMatch = cleaned.match(
    /^(Creator|Author|Discoverer|Inventor|Founder) of ([^,]+)$/i,
  );
  if (creatorMatch) {
    const [, role, thing] = creatorMatch;
    return `The ${role.toLowerCase()} of ${thing}.`;
  }

  const fatherMatch = cleaned.match(/^(Father|Mother) of (.+)$/i);
  if (fatherMatch) {
    const [, role, field] = fatherMatch;
    return `A figure often called the ${role.toLowerCase()} of ${field}.`;
  }

  const knownAsMatch = cleaned.match(/^(Queen|King) of ([^,]+)$/i);
  if (knownAsMatch) {
    return `A public figure known as the ${knownAsMatch[1]} of ${knownAsMatch[2]}.`;
  }

  if (
    /^(first|second|third|\d+(st|nd|rd|th)\b)/i.test(cleaned) ||
    startsWithRoleThatNeedsThe(cleaned)
  ) {
    return `${toSentenceCase(withArticle(cleaned))}.`;
  }

  if (wordCount(cleaned) <= 3) {
    return `A historical figure known as ${withArticle(cleaned)}.`;
  }

  return `${toSentenceCase(withArticle(cleaned))}.`;
};

const buildHistoryExamSentence = (word, definition) => {
  const cleaned = stripTerminalPunctuation(definition);
  if (!cleaned) return undefined;
  return `In history, ${word} is remembered as ${lowerFirst(cleaned)}.`;
};

const buildIeltsDefinition = ({ translation, definition }) => {
  const cleanedGloss = stripTerminalPunctuation(definition);
  if (!cleanedGloss) return "";
  const prefix = translation ? `${toSentenceCase(translation)}. ` : "";
  return `${prefix}${toSentenceCase(cleanedGloss)}. Often used in formal English to describe data, change, comparison, or trends.`.trim();
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

const getIndent = (sourceText, pos) => {
  const lineStart = sourceText.lastIndexOf("\n", pos - 1) + 1;
  const lineText = sourceText.slice(lineStart, pos);
  return lineText.match(/^\s*/)?.[0] || "";
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
      !ts.isObjectLiteralExpression(node) ||
      !node.parent ||
      !ts.isArrayLiteralExpression(node.parent)
    ) {
      ts.forEachChild(node, visit);
      return;
    }

    let word;
    let translation;
    let definition;
    let definitionNode;
    let examSentence;
    let examSentenceNode;
    let hasExamSentence = false;

    for (const property of node.properties) {
      if (!ts.isPropertyAssignment(property)) continue;
      const name = getPropertyName(property.name);
      if (!name) continue;

      if (name === "word") word = getStringValue(property.initializer);
      if (name === "translation")
        translation = getStringValue(property.initializer);
      if (name === "definition") {
        definition = getStringValue(property.initializer);
        definitionNode = property.initializer;
      }
      if (name === "examSentence") {
        examSentence = getStringValue(property.initializer);
        examSentenceNode = property.initializer;
        hasExamSentence = true;
      }
    }

    if (!word || !definition || !definitionNode) {
      ts.forEachChild(node, visit);
      return;
    }

    if (target.kind === "ielts" && isWeakDefinition(word, definition)) {
      const nextDefinition = buildIeltsDefinition({ translation, definition });
      if (nextDefinition && nextDefinition !== definition) {
        replacements.push({
          start: definitionNode.getStart(sourceFile),
          end: definitionNode.getEnd(),
          text: JSON.stringify(nextDefinition),
        });
      }
    }

    if (target.kind === "history") {
      const nextDefinition = expandHistoryDefinition(definition);
      if (nextDefinition && nextDefinition !== definition) {
        replacements.push({
          start: definitionNode.getStart(sourceFile),
          end: definitionNode.getEnd(),
          text: JSON.stringify(nextDefinition),
        });
      }

      const nextExamSentence = buildHistoryExamSentence(
        word,
        nextDefinition || definition,
      );

      if (hasExamSentence && nextExamSentence && examSentenceNode) {
        if (nextExamSentence !== examSentence) {
          replacements.push({
            start: examSentenceNode.getStart(sourceFile),
            end: examSentenceNode.getEnd(),
            text: JSON.stringify(nextExamSentence),
          });
        }
      } else if (!hasExamSentence && nextExamSentence) {
        if (nextExamSentence && nextExamSentence !== examSentence) {
          const objectIndent = getIndent(sourceText, node.getStart(sourceFile));
          const propertyIndent = `${objectIndent}  `;
          replacements.push({
            start: node.end - 1,
            end: node.end - 1,
            text: `\n${propertyIndent}examSentence: ${JSON.stringify(nextExamSentence)},\n${objectIndent}`,
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
    `Updated ${replacements.length} entries in ${path.relative(ROOT, target.file)}`,
  );
}
