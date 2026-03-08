import fs from "node:fs";
import path from "node:path";
import ts from "typescript";

const ROOT = process.cwd();
const DATA_DIR = path.join(ROOT, "src", "features", "data", "stop_categories");

const FIELDS = [
  "translation",
  "definition",
  "example",
  "examSentence",
  "context",
  "transformation",
  "ipa",
  "level",
];

const normalizeText = (value = "") =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const isDefinitionWeak = (word, definition) => {
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

const readSourceFiles = (dir) => {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...readSourceFiles(fullPath));
      continue;
    }

    if (entry.name.endsWith(".ts") && !entry.name.endsWith(".test.ts")) {
      files.push(fullPath);
    }
  }

  return files;
};

const getPropertyName = (name) => {
  if (ts.isIdentifier(name) || ts.isStringLiteral(name)) {
    return name.text;
  }

  if (ts.isNumericLiteral(name)) {
    return name.text;
  }

  return null;
};

const getStringValue = (node) => {
  if (!node) return undefined;
  if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) {
    return node.text.trim();
  }
  return undefined;
};

const getStringArray = (node) => {
  if (!node || !ts.isArrayLiteralExpression(node)) return [];

  return node.elements
    .map((element) => getStringValue(element))
    .filter(Boolean);
};

const extractItem = (node) => {
  const item = {};

  for (const property of node.properties) {
    if (!ts.isPropertyAssignment(property)) continue;
    const name = getPropertyName(property.name);
    if (!name) continue;

    if (name === "synonyms" || name === "tags") {
      item[name] = getStringArray(property.initializer);
      continue;
    }

    item[name] = getStringValue(property.initializer);
  }

  return item;
};

const analyzeFiles = () => {
  const items = [];

  for (const filePath of readSourceFiles(DATA_DIR)) {
    const sourceText = fs.readFileSync(filePath, "utf8");
    const sourceFile = ts.createSourceFile(
      filePath,
      sourceText,
      ts.ScriptTarget.Latest,
      true,
      ts.ScriptKind.TS,
    );

    const visit = (node) => {
      if (
        ts.isObjectLiteralExpression(node) &&
        node.parent &&
        ts.isArrayLiteralExpression(node.parent)
      ) {
        const rawItem = extractItem(node);
        if (typeof rawItem.word === "string" && rawItem.word.trim()) {
          const categoryProperty = node.parent.parent;
          const category = ts.isPropertyAssignment(categoryProperty)
            ? getPropertyName(categoryProperty.name)
            : null;
          const letterProperty = ts.isPropertyAssignment(
            categoryProperty?.parent?.parent,
          )
            ? getPropertyName(categoryProperty.parent.parent.name)
            : null;

          items.push({
            ...rawItem,
            category: category || "Unknown",
            letter: letterProperty || "?",
            file: path.relative(ROOT, filePath),
          });
        }
      }

      ts.forEachChild(node, visit);
    };

    visit(sourceFile);
  }

  return items;
};

const asPercent = (value, total) =>
  total === 0 ? "0.0%" : `${((value / total) * 100).toFixed(1)}%`;

const summarizeCategory = (categoryItems) => {
  const total = categoryItems.length;
  const withTranslation = categoryItems.filter(
    (item) => item.translation,
  ).length;
  const withDefinition = categoryItems.filter((item) => item.definition).length;
  const withStrongDefinition = categoryItems.filter(
    (item) => item.definition && !isDefinitionWeak(item.word, item.definition),
  ).length;
  const withExample = categoryItems.filter((item) => item.example).length;
  const withExamSentence = categoryItems.filter(
    (item) => item.examSentence,
  ).length;
  const withContext = categoryItems.filter((item) => item.context).length;
  const withTransformation = categoryItems.filter(
    (item) => item.transformation,
  ).length;
  const withSceneClue = categoryItems.filter(
    (item) => item.example || item.examSentence || item.context,
  ).length;
  const withAnyClue = categoryItems.filter(
    (item) =>
      item.example || item.examSentence || item.context || item.transformation,
  ).length;
  const vaultReady = categoryItems.filter(
    (item) =>
      item.translation &&
      item.definition &&
      !isDefinitionWeak(item.word, item.definition) &&
      (item.example || item.examSentence || item.context),
  ).length;

  return {
    total,
    withTranslation,
    withDefinition,
    withStrongDefinition,
    withExample,
    withExamSentence,
    withContext,
    withTransformation,
    withSceneClue,
    withAnyClue,
    vaultReady,
  };
};

const topExamples = (items, predicate, limit = 5) =>
  items
    .filter(predicate)
    .slice(0, limit)
    .map(
      (item) =>
        `${item.word} [${item.category}/${item.letter}] (${item.file.replaceAll("\\", "/")})`,
    );

const items = analyzeFiles();
const totalItems = items.length;

const categoryMap = new Map();
for (const item of items) {
  const list = categoryMap.get(item.category) || [];
  list.push(item);
  categoryMap.set(item.category, list);
}

const fileMap = new Map();
for (const item of items) {
  const list = fileMap.get(item.file) || [];
  list.push(item);
  fileMap.set(item.file, list);
}

const categorySummaries = [...categoryMap.entries()]
  .map(([category, categoryItems]) => ({
    category,
    ...summarizeCategory(categoryItems),
  }))
  .sort((a, b) => a.category.localeCompare(b.category));

const totals = summarizeCategory(items);

const weakestDefinitions = items.filter(
  (item) => item.definition && isDefinitionWeak(item.word, item.definition),
);

const noTranslation = items.filter((item) => !item.translation);
const noDefinition = items.filter((item) => !item.definition);
const noSceneClue = items.filter(
  (item) => !item.example && !item.examSentence && !item.context,
);
const noAnyClue = items.filter(
  (item) =>
    !item.example &&
    !item.examSentence &&
    !item.context &&
    !item.transformation,
);

const priorityCategories = [...categorySummaries]
  .sort((a, b) => {
    const aReady = a.vaultReady / a.total;
    const bReady = b.vaultReady / b.total;
    if (aReady !== bReady) return aReady - bReady;
    return b.total - a.total;
  })
  .slice(0, 12);

const priorityFiles = [...fileMap.entries()]
  .map(([file, fileItems]) => ({
    file,
    ...summarizeCategory(fileItems),
  }))
  .sort((a, b) => {
    const aReady = a.vaultReady / a.total;
    const bReady = b.vaultReady / b.total;
    if (aReady !== bReady) return aReady - bReady;
    return b.total - a.total;
  })
  .slice(0, 15);

console.log("STOP GAME DATA AUDIT");
console.log("====================");
console.log(`Total items: ${totalItems}`);
console.log("");
console.log("Global coverage");
console.log("---------------");
console.log(
  `translation:       ${totals.withTranslation}/${totalItems} (${asPercent(totals.withTranslation, totalItems)})`,
);
console.log(
  `definition:        ${totals.withDefinition}/${totalItems} (${asPercent(totals.withDefinition, totalItems)})`,
);
console.log(
  `strong definition: ${totals.withStrongDefinition}/${totalItems} (${asPercent(totals.withStrongDefinition, totalItems)})`,
);
console.log(
  `example:           ${totals.withExample}/${totalItems} (${asPercent(totals.withExample, totalItems)})`,
);
console.log(
  `examSentence:      ${totals.withExamSentence}/${totalItems} (${asPercent(totals.withExamSentence, totalItems)})`,
);
console.log(
  `context:           ${totals.withContext}/${totalItems} (${asPercent(totals.withContext, totalItems)})`,
);
console.log(
  `scene clue:        ${totals.withSceneClue}/${totalItems} (${asPercent(totals.withSceneClue, totalItems)})`,
);
console.log(
  `any clue:          ${totals.withAnyClue}/${totalItems} (${asPercent(totals.withAnyClue, totalItems)})`,
);
console.log(
  `vault ready*:      ${totals.vaultReady}/${totalItems} (${asPercent(totals.vaultReady, totalItems)})`,
);
console.log("");
console.log(
  "* vault ready = translation + strong definition + scene clue (example/examSentence/context)",
);
console.log("");

console.log("Priority categories");
console.log("-------------------");
for (const category of priorityCategories) {
  console.log(
    `${category.category.padEnd(24)} total=${String(category.total).padStart(4)} | ready=${String(category.vaultReady).padStart(4)} (${asPercent(category.vaultReady, category.total)}) | strongDef=${asPercent(category.withStrongDefinition, category.total)} | sceneClue=${asPercent(category.withSceneClue, category.total)}`,
  );
}

console.log("");
console.log("Top issue buckets");
console.log("-----------------");
console.log(
  `missing translation: ${noTranslation.length} (${asPercent(noTranslation.length, totalItems)})`,
);
console.log(
  `missing definition:  ${noDefinition.length} (${asPercent(noDefinition.length, totalItems)})`,
);
console.log(
  `weak definition:     ${weakestDefinitions.length} (${asPercent(weakestDefinitions.length, totalItems)})`,
);
console.log(
  `missing scene clue:  ${noSceneClue.length} (${asPercent(noSceneClue.length, totalItems)})`,
);
console.log(
  `missing any clue:    ${noAnyClue.length} (${asPercent(noAnyClue.length, totalItems)})`,
);

console.log("");
console.log("Priority files");
console.log("--------------");
for (const file of priorityFiles) {
  console.log(
    `${file.file.replaceAll("\\", "/").padEnd(72)} total=${String(file.total).padStart(4)} | ready=${String(file.vaultReady).padStart(4)} (${asPercent(file.vaultReady, file.total)}) | def=${asPercent(file.withDefinition, file.total)} | strongDef=${asPercent(file.withStrongDefinition, file.total)} | clue=${asPercent(file.withSceneClue, file.total)}`,
  );
}

console.log("");
console.log("Sample rows to inspect");
console.log("----------------------");
console.log("Missing translation:");
for (const example of topExamples(noTranslation, () => true)) {
  console.log(`  - ${example}`);
}
console.log("Missing definition:");
for (const example of topExamples(noDefinition, () => true)) {
  console.log(`  - ${example}`);
}
console.log("Weak definitions:");
for (const example of topExamples(weakestDefinitions, () => true)) {
  console.log(`  - ${example}`);
}
console.log("Missing scene clue:");
for (const example of topExamples(noSceneClue, () => true)) {
  console.log(`  - ${example}`);
}

console.log("");
console.log("Category detail");
console.log("---------------");
for (const summary of [...categorySummaries].sort(
  (a, b) => b.total - a.total,
)) {
  console.log(
    `${summary.category.padEnd(24)} total=${String(summary.total).padStart(4)} | trans=${asPercent(summary.withTranslation, summary.total)} | def=${asPercent(summary.withDefinition, summary.total)} | strongDef=${asPercent(summary.withStrongDefinition, summary.total)} | example=${asPercent(summary.withExample, summary.total)} | exam=${asPercent(summary.withExamSentence, summary.total)} | context=${asPercent(summary.withContext, summary.total)} | clue=${asPercent(summary.withSceneClue, summary.total)} | ready=${asPercent(summary.vaultReady, summary.total)}`,
  );
}
