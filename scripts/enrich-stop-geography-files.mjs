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
      "cities.ts",
    ),
    kind: "city",
  },
  {
    file: path.join(
      ROOT,
      "src",
      "features",
      "data",
      "stop_categories",
      "capitals.ts",
    ),
    kind: "capital",
  },
  {
    file: path.join(
      ROOT,
      "src",
      "features",
      "data",
      "stop_categories",
      "countries.ts",
    ),
    kind: "country",
  },
];

const cleanLine = (value = "") => value.trim();
const stripTerminalPunctuation = (value = "") =>
  cleanLine(value).replace(/[.!?]+$/, "");
const lowerFirst = (value = "") => {
  const cleaned = cleanLine(value);
  if (!cleaned) return "";
  return cleaned[0].toLowerCase() + cleaned.slice(1);
};
const toSentenceCase = (value = "") => {
  const cleaned = cleanLine(value);
  if (!cleaned) return "";
  return cleaned[0].toUpperCase() + cleaned.slice(1);
};
const preserveLeadCaps = (value = "") =>
  /^[A-Z0-9][A-Z0-9'".-]*\b/.test(cleanLine(value));
const maybeLowerFirst = (value = "") => {
  const cleaned = cleanLine(value);
  if (!cleaned) return "";
  return preserveLeadCaps(cleaned) ? cleaned : lowerFirst(cleaned);
};
const articleFor = (value = "", preferred = "a") => {
  const cleaned = cleanLine(value);
  if (!cleaned) return preferred;
  if (preferred === "the") return "the";
  if (/^[aeiou]/i.test(cleaned)) return "an";
  return "a";
};
const articleize = (value = "", preferred = "a") => {
  const cleaned = stripTerminalPunctuation(value);
  if (!cleaned) return "";
  if (/^(a|an|the)\b/i.test(cleaned)) return cleaned;
  return `${articleFor(cleaned, preferred)} ${maybeLowerFirst(cleaned)}`;
};
const stripPrefix = (value = "", prefixes = []) => {
  const cleaned = stripTerminalPunctuation(value);
  for (const prefix of prefixes) {
    if (cleaned.startsWith(prefix)) {
      return cleanLine(cleaned.slice(prefix.length));
    }
  }
  return cleaned;
};
const canonicalizeGeoBody = (value = "") =>
  stripTerminalPunctuation(value)
    .replace(/^known as (?:an?|the) known as /i, "known as ")
    .replace(/^known as (?:an?|the) often called /i, "often called ")
    .replace(/^that serves as known as /i, "that serves as ")
    .replace(/^that serves as known for /i, "that serves as ")
    .replace(/^known for known as /i, "known as ")
    .replace(/^known for often called /i, "often called ")
    .replace(/^that is an often called /i, "often called ")
    .replace(/^that is a known as /i, "known as ")
    .trim();

const nounPhraseToPredicate = (value = "") => {
  const cleaned = canonicalizeGeoBody(value);
  if (!cleaned) return "";
  const lowered = lowerFirst(cleaned);
  const titleLike = /^[A-Z].*[A-Z]/.test(cleaned);

  if (/^often called\b/i.test(cleaned)) {
    const rest = stripPrefix(cleaned, ["often called "]);
    return `often called ${articleize(rest, titleLike ? "the" : "a")}`;
  }

  if (/^known as\b/i.test(cleaned)) {
    return lowerFirst(cleaned);
  }

  if (/^that serves as\b/i.test(cleaned) || /^that is\b/i.test(cleaned)) {
    return maybeLowerFirst(cleaned);
  }

  if (
    /^[A-Z][A-Za-z.' -]+\'s (capital city|administrative center|political center)$/i.test(
      cleaned,
    )
  ) {
    return `that serves as ${cleaned}`;
  }

  if (
    /^(known for|famous for|built on|located on|founded by|designed to|once divided by|surrounded by|stretching along|lying on|sitting on|set on|formed by|famous as)\b/i.test(
      cleaned,
    )
  ) {
    return lowered;
  }

  if (
    /^(home of|birthplace of|gateway to|capital of|political capital of|administrative center of|headquarters of|cradle of)\b/i.test(
      cleaned,
    )
  ) {
    return `known as ${articleize(cleaned)}`;
  }

  if (/^home to\b/i.test(cleaned)) {
    return `that is ${lowered}`;
  }

  if (
    /^(one of|planned city|richest city|historical center|lowest lying|lowest-lying|smallest capital|highest capital|second coldest capital|high altitude|high-altitude|oldest town|global banking center|capital on|capital with|crocodile river city)\b/i.test(
      cleaned,
    )
  ) {
    return `that is ${articleize(cleaned, /^(lowest|smallest|highest|second)/i.test(cleaned) ? "the" : "a")}`;
  }

  if (
    /^(the |little |city of|mother of|paris of|venice of|jerusalem of|diamond capital|live music capital|spiritual capital|sea capital|air capital|garden city|floating city|pink city|white city|windy |stone town|royal residence|city of museums|city of flowers|city of music|city of lakes|city of churches|city of sails|city of angels|city of canals|city of birches|city of universities|city of shoes|city of coffee|city of lovers|city of windcatchers|city of dwarves|city of 333 saints|the bride of|the gong|the old pueblo|the co-capital)\b/i.test(
      cleaned,
    )
  ) {
    return `often called ${articleize(cleaned, titleLike ? "the" : "a")}`;
  }

  if (/^(has|uses|contains|includes)\b/i.test(cleaned)) {
    return lowered;
  }

  if (/^measures\b/i.test(cleaned)) {
    return `that ${lowered}`;
  }

  if (/^(famous|well known|best known)\b/i.test(cleaned)) {
    return lowered;
  }

  if (/^(on|in|at|near|off|within|between)\b/i.test(cleaned)) {
    return lowered;
  }

  if (
    /^(landlocked|oil-rich|tiny|twin-island|island|volcanic|archipelago|largest|smallest|most|second|only|easternmost|southernmost|northernmost|former|historic|desert|digital|economic|largest archipelago|second largest)\b/i.test(
      cleaned,
    )
  ) {
    return `that is ${articleize(cleaned, /^(largest|smallest|most|second|only|easternmost|southernmost|northernmost|former|last|first)/i.test(cleaned) ? "the" : "a")}`;
  }

  return `known as ${articleize(cleaned, titleLike ? "the" : "a")}`;
};

const buildCountryPredicate = (value = "") => {
  const cleaned = canonicalizeGeoBody(value);
  if (!cleaned) return "";

  if (/^that is\b/i.test(cleaned)) {
    const rest = stripPrefix(cleaned, ["that is "]);
    if (/^(a|an|the)\b/i.test(rest)) return `that is ${rest}`;
    if (
      /^(landlocked country|island nation|tiny nation|oil-rich nation|twin-island country|volcanic archipelago|archipelago|desert nation|historic island|digital society|economic powerhouse|southernmost baltic state|northernmost baltic state|tiny alpine principality|last grand duchy|largest archipelago nation|largest democracy|smallest country|second largest country|only spanish-speaking african nation|largest country|easternmost caribbean island)\b/i.test(
        rest,
      )
    ) {
      return `that is ${articleize(rest, /^(largest|smallest|second|only|last|easternmost)/i.test(rest) ? "the" : "a")}`;
    }
    return `that is ${rest}`;
  }

  if (/^known for\b/i.test(cleaned)) {
    const rest = stripPrefix(cleaned, ["known for "]);
    if (/^(on|in|at|near|off|within|between)\b/i.test(rest)) return rest;
    return `known for ${rest}`;
  }

  if (/^known as\b/i.test(cleaned)) {
    return lowerFirst(cleaned);
  }

  if (/^often called\b/i.test(cleaned)) {
    const rest = stripPrefix(cleaned, ["often called "]);
    return `often called ${articleize(rest, "the")}`;
  }

  if (/^(home of|birthplace of|cradle of)\b/i.test(cleaned)) {
    return `known as ${articleize(cleaned)}`;
  }

  if (/^home to\b/i.test(cleaned)) {
    return `that is ${lowerFirst(cleaned)}`;
  }

  if (/^land of\b/i.test(cleaned)) {
    return `often called ${articleize(cleaned, "the")}`;
  }

  if (
    /^(landlocked country|island nation|tiny nation|oil-rich nation|twin-island country|volcanic archipelago|archipelago|desert nation|historic island|digital society|economic powerhouse|southernmost baltic state|northernmost baltic state|tiny alpine principality|last grand duchy|largest archipelago nation|largest democracy|smallest country|second largest country|only spanish-speaking african nation)\b/i.test(
      cleaned,
    )
  ) {
    return `that is ${articleize(cleaned, /^(largest|smallest|second|only|last)/i.test(cleaned) ? "the" : "a")}`;
  }

  if (
    /^(largest|smallest|most|second|only|first|former|last|easternmost|southernmost|northernmost)\b/i.test(
      cleaned,
    )
  ) {
    return `that is ${articleize(cleaned, "the")}`;
  }

  if (/^(has|shares|measures|uses|contains|includes)\b/i.test(cleaned)) {
    return `that ${lowerFirst(cleaned)}`;
  }

  if (/^(on|in|at|near|off|within|between)\b/i.test(cleaned)) {
    return lowerFirst(cleaned);
  }

  if (/^(known for|famous for)\b/i.test(cleaned)) {
    return lowerFirst(cleaned);
  }

  return `known as ${articleize(cleaned)}`;
};

const buildLocationDefinition = ({ kind, country, definition }) => {
  const cleaned = stripTerminalPunctuation(definition);
  if (!cleaned) return "";

  if (kind === "city") {
    const body = canonicalizeGeoBody(
      stripPrefix(cleaned, [`A city in ${country} `]),
    );
    return `A city in ${country} ${nounPhraseToPredicate(body)}.`;
  }

  if (kind === "capital") {
    const body = canonicalizeGeoBody(
      stripPrefix(cleaned, [`A capital city in ${country} `]),
    );
    return `A capital city in ${country} ${nounPhraseToPredicate(body)}.`;
  }

  const body = canonicalizeGeoBody(stripPrefix(cleaned, ["A country "]));
  return `A country ${buildCountryPredicate(body)}.`;
};

const buildExamSentence = ({ kind, word, definition }) => {
  const cleaned = stripTerminalPunctuation(definition);
  if (!cleaned) return "";

  if (kind === "city") {
    return `Think of ${lowerFirst(cleaned)}, and you get ${word}.`;
  }

  if (kind === "capital") {
    return `Think of ${lowerFirst(cleaned)}, and the capital is ${word}.`;
  }

  return `Think of ${lowerFirst(cleaned)}, and the country is ${word}.`;
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
    let country;
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
      if (name === "country") country = getStringValue(property.initializer);
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

    const nextDefinition = buildLocationDefinition({
      kind: target.kind,
      country,
      definition,
    });

    if (nextDefinition && nextDefinition !== definition) {
      replacements.push({
        start: definitionNode.getStart(sourceFile),
        end: definitionNode.getEnd(),
        text: JSON.stringify(nextDefinition),
      });
    }

    const nextExamSentence = buildExamSentence({
      kind: target.kind,
      word,
      definition: nextDefinition || definition,
    });

    if (
      hasExamSentence &&
      examSentenceNode &&
      nextExamSentence !== examSentence
    ) {
      replacements.push({
        start: examSentenceNode.getStart(sourceFile),
        end: examSentenceNode.getEnd(),
        text: JSON.stringify(nextExamSentence),
      });
    } else if (!hasExamSentence && nextExamSentence) {
      const objectIndent = getIndent(sourceText, node.getStart(sourceFile));
      const propertyIndent = `${objectIndent}  `;
      replacements.push({
        start: node.end - 1,
        end: node.end - 1,
        text: `\n${propertyIndent}examSentence: ${JSON.stringify(nextExamSentence)},\n${objectIndent}`,
      });
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
