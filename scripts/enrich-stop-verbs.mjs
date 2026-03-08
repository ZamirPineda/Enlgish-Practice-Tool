import fs from "node:fs";
import path from "node:path";
import ts from "typescript";

const ROOT = process.cwd();
const FILE = path.join(
  ROOT,
  "src",
  "features",
  "data",
  "stop_categories",
  "grammar_verbs.ts",
);

// ── helpers ──
const getPropertyName = (n) =>
  ts.isIdentifier(n) || ts.isStringLiteral(n) ? n.text : null;
const getStringValue = (n) =>
  n && (ts.isStringLiteral(n) || ts.isNoSubstitutionTemplateLiteral(n))
    ? n.text
    : undefined;
const getIndent = (src, pos) => {
  const s = src.lastIndexOf("\n", pos - 1) + 1;
  return src.slice(s, pos).match(/^\s*/)?.[0] || "";
};
const isIrregularDef = (d) => /^Past:\s/i.test(d);

// ── Load verb dictionary from scripts/verb-dictionary.json ──
const DICT_PATH = path.join(ROOT, "scripts", "verb-dictionary.json");
if (!fs.existsSync(DICT_PATH)) {
  console.error(
    "ERROR: verb-dictionary.json not found. Run: node scripts/build-verb-dictionary.mjs first",
  );
  process.exit(1);
}
const VERBS = JSON.parse(fs.readFileSync(DICT_PATH, "utf8"));
console.log(
  `Loaded ${Object.keys(VERBS).length} verb entries from dictionary.`,
);

// ── Parse & enrich ──
const sourceText = fs.readFileSync(FILE, "utf8");
const sourceFile = ts.createSourceFile(
  FILE,
  sourceText,
  ts.ScriptTarget.Latest,
  true,
  ts.ScriptKind.TS,
);
const replacements = [];
let enriched = 0,
  skipped = 0;

const visit = (node) => {
  if (
    !ts.isObjectLiteralExpression(node) ||
    !node.parent ||
    !ts.isArrayLiteralExpression(node.parent)
  ) {
    ts.forEachChild(node, visit);
    return;
  }
  let word,
    definition,
    definitionNode,
    hasExamSentence = false;
  for (const prop of node.properties) {
    if (!ts.isPropertyAssignment(prop)) continue;
    const name = getPropertyName(prop.name);
    if (name === "word") word = getStringValue(prop.initializer);
    if (name === "definition") {
      definition = getStringValue(prop.initializer);
      definitionNode = prop.initializer;
    }
    if (name === "examSentence") hasExamSentence = true;
  }
  if (!word) {
    ts.forEachChild(node, visit);
    return;
  }

  const entry = VERBS[word];
  if (!entry) {
    skipped++;
    ts.forEachChild(node, visit);
    return;
  }

  const [newDef, newExam] = entry;
  const oIndent = getIndent(sourceText, node.getStart(sourceFile));
  const pIndent = `${oIndent}  `;

  if (definition && isIrregularDef(definition) && definitionNode) {
    replacements.push({
      start: definitionNode.getStart(sourceFile),
      end: definitionNode.getEnd(),
      text: JSON.stringify(newDef),
    });
  } else if (!definition) {
    const last = node.properties[node.properties.length - 1];
    const comma =
      last && !sourceText.slice(last.end, node.end - 1).includes(",")
        ? ","
        : "";
    replacements.push({
      start: node.end - 1,
      end: node.end - 1,
      text: `${comma}\n${pIndent}definition: ${JSON.stringify(newDef)},\n${oIndent}`,
    });
  }

  if (!hasExamSentence && newExam) {
    const existing = replacements.find(
      (r) => r.start === node.end - 1 && r.end === node.end - 1,
    );
    if (existing) {
      existing.text = existing.text.replace(
        /\n([^\n]*)$/,
        `\n${pIndent}examSentence: ${JSON.stringify(newExam)},\n$1`,
      );
    } else {
      const last = node.properties[node.properties.length - 1];
      const comma =
        last && !sourceText.slice(last.end, node.end - 1).includes(",")
          ? ","
          : "";
      replacements.push({
        start: node.end - 1,
        end: node.end - 1,
        text: `${comma}\n${pIndent}examSentence: ${JSON.stringify(newExam)},\n${oIndent}`,
      });
    }
  }
  enriched++;
  ts.forEachChild(node, visit);
};

visit(sourceFile);
if (replacements.length === 0) {
  console.log("No changes needed.");
  process.exit(0);
}

let next = sourceText;
for (const r of replacements.sort((a, b) => b.start - a.start)) {
  next = next.slice(0, r.start) + r.text + next.slice(r.end);
}
fs.writeFileSync(FILE, next, "utf8");
console.log(
  `Done: ${enriched} enriched, ${skipped} skipped, ${replacements.length} replacements.`,
);
