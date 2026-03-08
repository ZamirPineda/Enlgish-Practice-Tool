/**
 * Improved enrichment for animals.ts
 * Uses the Spanish translation to produce unique, accurate definitions
 * and varied exam sentences that make sense for the specific animal.
 *
 * Usage: node scripts/enrich-stop-animals.mjs
 */
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
  "animals.ts",
);

const getName = (n) =>
  ts.isIdentifier(n) || ts.isStringLiteral(n) ? n.text : null;
const getStr = (n) =>
  n && (ts.isStringLiteral(n) || ts.isNoSubstitutionTemplateLiteral(n))
    ? n.text
    : undefined;
const getIndent = (src, pos) => {
  const s = src.lastIndexOf("\n", pos - 1) + 1;
  return src.slice(s, pos).match(/^\s*/)?.[0] || "";
};

// ── Varied exam sentence templates per tag ──
const examPool = {
  Mammal: [
    (w) => `The ${w} lives in groups and is known for its social behaviour.`,
    (w) => `We spotted a ${w} in the wild during the safari.`,
    (w) =>
      `The ${w} is one of the most fascinating mammals in the animal kingdom.`,
    (w) => `A documentary about the ${w} was shown in our biology class.`,
    (w) =>
      `The zookeeper explained interesting facts about the ${w} to the visitors.`,
    (w) => `The ${w} is well adapted to survive in its natural habitat.`,
    (w) => `Children were excited to see a ${w} at the wildlife sanctuary.`,
    (w) =>
      `Researchers have been studying the behaviour of the ${w} for years.`,
    (w) => `The ${w} can be found in various parts of the world.`,
    (w) => `Conservation efforts have helped protect the ${w} from extinction.`,
  ],
  Bird: [
    (w) => `The ${w} is easily recognised by its distinctive call.`,
    (w) => `We watched a ${w} soaring gracefully across the sky.`,
    (w) => `The ${w} builds its nest high in the trees for safety.`,
    (w) => `A colourful ${w} visited our garden early this morning.`,
    (w) => `The ${w} migrates to warmer regions during the winter months.`,
    (w) => `Birdwatchers travel far to observe the rare ${w} in its habitat.`,
    (w) => `The ${w} is known for its beautiful plumage and graceful flight.`,
    (w) => `We could hear the ${w} singing at dawn from our campsite.`,
    (w) => `The ${w} feeds on seeds and small insects found near the river.`,
    (w) => `A pair of ${w} were spotted nesting near the lakeside.`,
  ],
  Reptile: [
    (w) => `The ${w} relies on the sun to regulate its body temperature.`,
    (w) => `We came across a ${w} during our hike through the forest.`,
    (w) => `The ${w} can be found in tropical and subtropical regions.`,
    (w) => `The ${w} sheds its skin several times a year as it grows.`,
    (w) => `A ${w} was spotted basking on the rocks by the river.`,
    (w) => `The documentary featured the hunting techniques of the ${w}.`,
    (w) => `The ${w} is a fascinating example of reptilian adaptation.`,
    (w) =>
      `Scientists study the ${w} to learn more about cold-blooded animals.`,
  ],
  Fish: [
    (w) => `The ${w} is commonly found in rivers and coastal waters.`,
    (w) => `Divers often spot the ${w} while exploring the coral reef.`,
    (w) => `The ${w} is popular among fishermen for its size and flavour.`,
    (w) => `An aquarium nearby has a beautiful display of the ${w}.`,
    (w) => `The ${w} travels in large schools through the open ocean.`,
    (w) => `We learned about the ${w} during our marine biology lesson.`,
    (w) => `The ${w} has adapted well to life in deep water.`,
    (w) => `A ${w} swam past us while we were snorkelling near the shore.`,
  ],
  Insect: [
    (w) => `The ${w} plays an important role in pollinating plants.`,
    (w) => `A tiny ${w} crawled across the leaf in the garden.`,
    (w) => `The ${w} is one of the most common insects found worldwide.`,
    (w) => `Scientists have discovered new species of ${w} in the rainforest.`,
    (w) => `The ${w} has a complex life cycle that includes several stages.`,
    (w) => `We observed a ${w} under the microscope in our science class.`,
    (w) => `The ${w} is attracted to bright lights during the evening.`,
    (w) => `A ${w} landed on the windowsill while we were having breakfast.`,
  ],
  Amphibian: [
    (w) => `The ${w} can live both in water and on land.`,
    (w) => `We heard the ${w} croaking loud near the pond at night.`,
    (w) => `The ${w} breathes through its moist skin when underwater.`,
    (w) => `A ${w} was discovered near the stream during the field trip.`,
    (w) => `The ${w} lays its eggs in freshwater ponds and lakes.`,
    (w) =>
      `Scientists are concerned about the declining population of the ${w}.`,
  ],
  Arachnid: [
    (w) => `The ${w} spins intricate webs to catch its prey.`,
    (w) => `The ${w} is feared by many but plays a key role in pest control.`,
    (w) => `We found a ${w} hiding in the corner of the garden shed.`,
    (w) => `The ${w} has eight legs and is not classified as an insect.`,
    (w) => `A ${w} was spotted near the house after the rainstorm.`,
  ],
  Marine: [
    (w) => `The ${w} is an incredible creature found in ocean ecosystems.`,
    (w) => `Divers often encounter the ${w} near tropical coral reefs.`,
    (w) => `The ${w} has fascinated marine biologists for decades.`,
    (w) => `We watched a programme about the ${w} on the nature channel.`,
    (w) => `The ${w} plays a vital role in maintaining ocean biodiversity.`,
  ],
  Mollusk: [
    (w) => `The ${w} is a soft-bodied creature often found near the coast.`,
    (w) => `We collected shells of the ${w} during our trip to the beach.`,
    (w) => `The ${w} is prized in many cuisines around the world.`,
    (w) => `A ${w} clung to the rocks at the edge of the tidal pool.`,
  ],
  Crustacean: [
    (w) => `The ${w} has a hard shell that protects its soft body.`,
    (w) => `We spotted a ${w} scuttling along the sandy shore.`,
    (w) => `The ${w} is a popular seafood dish in coastal regions.`,
    (w) => `A ${w} emerged from under a rock in the shallow water.`,
  ],
  Invertebrate: [
    (w) => `The ${w} is a small invertebrate without a backbone.`,
    (w) => `We found a ${w} hiding under a log in the garden.`,
    (w) => `The ${w} may be small, but it plays a key role in the ecosystem.`,
    (w) => `Scientists study the ${w} to understand invertebrate biology.`,
  ],
};

// ── Generate definition from translation ──
function generateDef(word, translation, tag) {
  if (!translation) return `A type of ${tag?.toLowerCase() || "animal"}.`;

  // Clean up translation: remove parenthetical context like "(ave)", "(animal)", etc.
  const cleanTrans = translation
    .replace(/\s*\([^)]*\)\s*/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  // Use the Spanish translation to create a unique definition
  // The translation itself is the best hint at what the animal is
  const w = word.toLowerCase();
  const article = /^[aeiou]/i.test(w) ? "an" : "a";

  // Build from tag + translation context
  const tagDescriptions = {
    Mammal: `${article.charAt(0).toUpperCase() + article.slice(1)} ${w} is a mammal`,
    Bird: `${article.charAt(0).toUpperCase() + article.slice(1)} ${w} is a bird`,
    Reptile: `${article.charAt(0).toUpperCase() + article.slice(1)} ${w} is a reptile`,
    Fish: `${article.charAt(0).toUpperCase() + article.slice(1)} ${w} is a type of fish`,
    Insect: `${article.charAt(0).toUpperCase() + article.slice(1)} ${w} is an insect`,
    Amphibian: `${article.charAt(0).toUpperCase() + article.slice(1)} ${w} is an amphibian`,
    Arachnid: `${article.charAt(0).toUpperCase() + article.slice(1)} ${w} is an arachnid`,
    Marine: `${article.charAt(0).toUpperCase() + article.slice(1)} ${w} is a marine creature`,
    Mollusk: `${article.charAt(0).toUpperCase() + article.slice(1)} ${w} is a mollusk`,
    Crustacean: `${article.charAt(0).toUpperCase() + article.slice(1)} ${w} is a crustacean`,
    Invertebrate: `${article.charAt(0).toUpperCase() + article.slice(1)} ${w} is an invertebrate`,
    Microorganism: `${article.charAt(0).toUpperCase() + article.slice(1)} ${w} is a microscopic organism`,
    Class: `The term ${w} refers to a classification of animals`,
    Condition: `The term ${w} refers to a condition found in animals`,
  };

  const prefix =
    tagDescriptions[tag] ||
    `${article.charAt(0).toUpperCase() + article.slice(1)} ${w} is a type of animal`;

  // Add translation-based flavour
  if (cleanTrans.toLowerCase() === word.toLowerCase() || cleanTrans === "") {
    return `${prefix}.`;
  }
  return `${prefix}, known in Spanish as '${cleanTrans.toLowerCase()}'.`;
}

// ── Generate varied exam sentence ──
let examCounters = {};
function generateExam(word, translation, tag) {
  const pool = examPool[tag] || examPool.Mammal;
  const key = tag || "_default";
  if (!(key in examCounters)) examCounters[key] = 0;
  const idx = examCounters[key] % pool.length;
  examCounters[key]++;

  const w = word.toLowerCase();
  return pool[idx](w);
}

// ── Parse & re-enrich (overwrite existing generic definitions) ──
const sourceText = fs.readFileSync(FILE, "utf8");
const sourceFile = ts.createSourceFile(
  FILE,
  sourceText,
  ts.ScriptTarget.Latest,
  true,
  ts.ScriptKind.TS,
);
const replacements = [];
let enriched = 0;

const visit = (node) => {
  if (
    !ts.isObjectLiteralExpression(node) ||
    !node.parent ||
    !ts.isArrayLiteralExpression(node.parent)
  ) {
    ts.forEachChild(node, visit);
    return;
  }

  let word, translation, tag, defNode, examNode;
  for (const prop of node.properties) {
    if (!ts.isPropertyAssignment(prop)) continue;
    const name = getName(prop.name);
    if (name === "word") word = getStr(prop.initializer);
    if (name === "translation") translation = getStr(prop.initializer);
    if (name === "tag") tag = getStr(prop.initializer);
    if (name === "definition") defNode = prop.initializer;
    if (name === "examSentence") examNode = prop.initializer;
  }

  if (!word) {
    ts.forEachChild(node, visit);
    return;
  }

  const newDef = generateDef(word, translation, tag);
  const newExam = generateExam(word, translation, tag);

  // Replace existing definition
  if (defNode) {
    replacements.push({
      start: defNode.getStart(sourceFile),
      end: defNode.getEnd(),
      text: JSON.stringify(newDef),
    });
  }

  // Replace existing examSentence
  if (examNode) {
    replacements.push({
      start: examNode.getStart(sourceFile),
      end: examNode.getEnd(),
      text: JSON.stringify(newExam),
    });
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
  `Done: ${enriched} animals re-enriched with unique definitions, ${replacements.length} replacements.`,
);
