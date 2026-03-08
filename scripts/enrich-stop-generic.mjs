/**
 * Generic enrichment script for STOP game data files.
 * Generates definition + examSentence from word, translation, and tag.
 *
 * Usage: node scripts/enrich-stop-generic.mjs <file> [--dry-run]
 * Example: node scripts/enrich-stop-generic.mjs vocabulary_challenge.ts
 */
import fs from "node:fs";
import path from "node:path";
import ts from "typescript";

const ROOT = process.cwd();
const DATA_DIR = path.join(ROOT, "src", "features", "data", "stop_categories");
const fileName = process.argv[2];
const dryRun = process.argv.includes("--dry-run");

if (!fileName) {
  console.error("Usage: node scripts/enrich-stop-generic.mjs <filename>");
  process.exit(1);
}

// Resolve file: support both "file.ts" and "definitions/file.ts"
const FILE = path.join(DATA_DIR, fileName);
if (!fs.existsSync(FILE)) {
  console.error(`File not found: ${FILE}`);
  process.exit(1);
}

// ── Helpers ──
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

// ── Definition & examSentence generators based on tag ──
const tagTemplates = {
  // Animals & Nature
  Animal: {
    def: (w) => `A type of animal known as ${w.toLowerCase()}.`,
    exam: (w) => `We saw a ${w.toLowerCase()} at the zoo during our visit.`,
  },
  Bird: {
    def: (w) => `A species of bird called ${w.toLowerCase()}.`,
    exam: (w) =>
      `The ${w.toLowerCase()} perched on the branch and began to sing.`,
  },
  Fish: {
    def: (w) => `A type of fish known as ${w.toLowerCase()}.`,
    exam: (w) => `The fisherman caught a ${w.toLowerCase()} in the lake.`,
  },
  Insect: {
    def: (w) => `A small creature classified as an insect.`,
    exam: (w) => `A ${w.toLowerCase()} landed on the flower in the garden.`,
  },
  Plant: {
    def: (w) => `A type of plant or vegetation.`,
    exam: (w) => `The ${w.toLowerCase()} grows well in warm, humid climates.`,
  },
  Botany: {
    def: (w) => `A term related to plants and botany.`,
    exam: (w) =>
      `Students study the ${w.toLowerCase()} in their biology class.`,
  },
  Nature: {
    def: (w, t) =>
      `A natural element or phenomenon${t ? ": " + t.split("/")[0].trim().toLowerCase() : ""}.`,
    exam: (w) => `The beauty of nature is reflected in the ${w.toLowerCase()}.`,
  },
  Marine: {
    def: (w) => `Something related to the sea or marine life.`,
    exam: (w) => `Scientists study the ${w.toLowerCase()} in the ocean.`,
  },
  Reptile: {
    def: (w) => `A cold-blooded animal classified as a reptile.`,
    exam: (w) => `The ${w.toLowerCase()} sunbathed on the warm rock.`,
  },
  Mammal: {
    def: (w) => `A warm-blooded animal that feeds its young with milk.`,
    exam: (w) => `The ${w.toLowerCase()} roams freely in the national park.`,
  },

  // Food & Drink
  Food: {
    def: (w, t) =>
      `A type of food${t ? ": " + t.split("/")[0].trim().toLowerCase() : ""}.`,
    exam: (w) => `We ordered ${w.toLowerCase()} for dinner at the restaurant.`,
  },
  Drink: {
    def: (w, t) =>
      `A type of beverage${t ? ": " + t.split("/")[0].trim().toLowerCase() : ""}.`,
    exam: (w) => `She ordered a glass of ${w.toLowerCase()} with her meal.`,
  },
  Fruit: {
    def: (w) => `A type of edible fruit.`,
    exam: (w) => `Fresh ${w.toLowerCase()} is delicious in a summer salad.`,
  },
  Spice: {
    def: (w) => `A flavouring ingredient used in cooking.`,
    exam: (w) => `Add a pinch of ${w.toLowerCase()} to enhance the flavour.`,
  },

  // Objects & Tools
  Tool: {
    def: (w, t) =>
      `A tool or instrument${t ? " used as " + t.split("(")[0].trim().toLowerCase() : ""}.`,
    exam: (w) =>
      `The carpenter reached for the ${w.toLowerCase()} on the workbench.`,
  },
  Object: {
    def: (w, t) =>
      `An object or item${t ? ": " + t.split("/")[0].trim().toLowerCase() : ""}.`,
    exam: (w) => `She picked up the ${w.toLowerCase()} from the shelf.`,
  },
  Weapon: {
    def: (w) => `A weapon or instrument of combat.`,
    exam: (w) =>
      `The museum displays an ancient ${w.toLowerCase()} behind glass.`,
  },

  // People & Roles
  Person: {
    def: (w, t) =>
      `A person or individual${t ? " described as " + t.split("/")[0].trim().toLowerCase() : ""}.`,
    exam: (w) =>
      `The ${w.toLowerCase()} was respected by everyone in the community.`,
  },
  Title: {
    def: (w, t) =>
      `A title or form of address${t ? ": " + t.split("/")[0].trim().toLowerCase() : ""}.`,
    exam: (w) =>
      `People addressed him by his ${w.toLowerCase()} at formal events.`,
  },

  // Places & Geography
  Place: {
    def: (w, t) =>
      `A place or location${t ? ": " + t.split("/")[0].trim().toLowerCase() : ""}.`,
    exam: (w) =>
      `The ${w.toLowerCase()} is a popular destination for tourists.`,
  },
  Geography: {
    def: (w, t) =>
      `A geographical feature or term${t ? ": " + t.split("/")[0].trim().toLowerCase() : ""}.`,
    exam: (w) => `We studied the ${w.toLowerCase()} in our geography lesson.`,
  },

  // Body & Health
  Body: {
    def: (w, t) =>
      `A part of the body${t ? ": " + t.split("/")[0].trim().toLowerCase() : ""}.`,
    exam: (w) =>
      `The doctor examined the patient's ${w.toLowerCase()} carefully.`,
  },
  Health: {
    def: (w, t) =>
      `A health-related term${t ? ": " + t.split("/")[0].trim().toLowerCase() : ""}.`,
    exam: (w) => `Regular checkups help monitor your ${w.toLowerCase()}.`,
  },
  Medical: {
    def: (w, t) =>
      `A medical term or concept${t ? ": " + t.split("/")[0].trim().toLowerCase() : ""}.`,
    exam: (w) =>
      `The nurse explained the ${w.toLowerCase()} procedure to the patient.`,
  },

  // Concepts & Abstract
  Concept: {
    def: (w, t) =>
      `An abstract concept or idea${t ? ": " + t.split("/")[0].trim().toLowerCase() : ""}.`,
    exam: (w) =>
      `The professor discussed the concept of ${w.toLowerCase()} in class.`,
  },
  Emotion: {
    def: (w, t) =>
      `A feeling or emotional state${t ? ": " + t.split("/")[0].trim().toLowerCase() : ""}.`,
    exam: (w) =>
      `She felt a deep sense of ${w.toLowerCase()} after the ceremony.`,
  },
  Quality: {
    def: (w, t) =>
      `A characteristic or quality${t ? ": " + t.split("/")[0].trim().toLowerCase() : ""}.`,
    exam: (w) => `Honesty is a ${w.toLowerCase()} that everyone admires.`,
  },

  // Actions & Language
  Action: {
    def: (w, t) =>
      `An action or activity${t ? ": " + t.split("/")[0].trim().toLowerCase() : ""}.`,
    exam: (w) =>
      `It is important to ${w.toLowerCase()} correctly in this situation.`,
  },
  Language: {
    def: (w, t) =>
      `A word or expression used in language${t ? ": " + t.split("/")[0].trim().toLowerCase() : ""}.`,
    exam: (w) =>
      `The word '${w.toLowerCase()}' is commonly used in everyday speech.`,
  },
  Sound: {
    def: (w, t) =>
      `A sound or noise${t ? ": " + t.split("/")[0].trim().toLowerCase() : ""}.`,
    exam: (w) => `The sudden ${w.toLowerCase()} startled everyone in the room.`,
  },

  // Materials & Science
  Material: {
    def: (w, t) =>
      `A type of material or substance${t ? ": " + t.split("/")[0].trim().toLowerCase() : ""}.`,
    exam: (w) =>
      `The craftsman selected ${w.toLowerCase()} for its durability.`,
  },
  Fabric: {
    def: (w, t) =>
      `A type of fabric or textile${t ? ": " + t.split("/")[0].trim().toLowerCase() : ""}.`,
    exam: (w) => `The dress was made from fine ${w.toLowerCase()}.`,
  },
  Mineral: {
    def: (w, t) => `A mineral or geological substance.`,
    exam: (w) =>
      `The geologist identified the ${w.toLowerCase()} in the rock sample.`,
  },
  Science: {
    def: (w, t) =>
      `A scientific term or unit${t ? ": " + t.split("/")[0].trim().toLowerCase() : ""}.`,
    exam: (w) =>
      `Students learn about ${w.toLowerCase()} in their science class.`,
  },
  Chemistry: {
    def: (w, t) => `A chemical substance or element.`,
    exam: (w) => `The experiment required a sample of ${w.toLowerCase()}.`,
  },

  // Clothing & Fashion
  Clothing: {
    def: (w, t) =>
      `A garment or piece of clothing${t ? ": " + t.split("/")[0].trim().toLowerCase() : ""}.`,
    exam: (w) => `She put on her ${w.toLowerCase()} before going out.`,
  },

  // Music & Art
  Music: {
    def: (w, t) =>
      `A musical term or instrument${t ? ": " + t.split("/")[0].trim().toLowerCase() : ""}.`,
    exam: (w) =>
      `The musician played the ${w.toLowerCase()} beautifully at the concert.`,
  },
  Art: {
    def: (w, t) => `A term related to art or creative expression.`,
    exam: (w) =>
      `The gallery featured works of ${w.toLowerCase()} from local artists.`,
  },
  Dance: {
    def: (w, t) => `A type of dance or rhythmic movement.`,
    exam: (w) =>
      `The couple performed a traditional ${w.toLowerCase()} at the festival.`,
  },

  // Time, Amounts, Units
  Time: {
    def: (w, t) =>
      `A term related to time or period${t ? ": " + t.split("/")[0].trim().toLowerCase() : ""}.`,
    exam: (w) => `The ${w.toLowerCase()} passed quickly during the holiday.`,
  },
  Amount: {
    def: (w, t) =>
      `A quantity or amount${t ? ": " + t.split("/")[0].trim().toLowerCase() : ""}.`,
    exam: (w) =>
      `She measured the exact ${w.toLowerCase()} needed for the recipe.`,
  },
  Unit: {
    def: (w, t) => `A unit of measurement.`,
    exam: (w) => `The distance is measured in units of ${w.toLowerCase()}.`,
  },

  // Transport & Travel
  Transport: {
    def: (w, t) =>
      `A means of transport or travel${t ? ": " + t.split("/")[0].trim().toLowerCase() : ""}.`,
    exam: (w) =>
      `The ${w.toLowerCase()} is a common way to travel in this region.`,
  },
  Vehicle: {
    def: (w, t) => `A type of vehicle.`,
    exam: (w) => `The ${w.toLowerCase()} was parked outside the building.`,
  },

  // Nautical & Military
  Nautical: {
    def: (w, t) =>
      `A nautical or maritime term${t ? ": " + t.split("/")[0].trim().toLowerCase() : ""}.`,
    exam: (w) => `The sailors used the term ${w.toLowerCase()} while at sea.`,
  },
  Military: {
    def: (w, t) => `A military term or rank.`,
    exam: (w) =>
      `The ${w.toLowerCase()} was an important position in the army.`,
  },

  // Architecture & Building
  Architecture: {
    def: (w, t) =>
      `An architectural feature or structure${t ? ": " + t.split("/")[0].trim().toLowerCase() : ""}.`,
    exam: (w) => `The cathedral features a beautiful ${w.toLowerCase()}.`,
  },
  Building: {
    def: (w, t) => `A type of building or structure.`,
    exam: (w) => `The old ${w.toLowerCase()} stands at the centre of the town.`,
  },

  // Sports & Games
  Sport: {
    def: (w, t) =>
      `A term related to sports or athletics${t ? ": " + t.split("/")[0].trim().toLowerCase() : ""}.`,
    exam: (w) =>
      `The ${w.toLowerCase()} is played in many countries around the world.`,
  },
  Game: {
    def: (w, t) => `A game or competitive activity.`,
    exam: (w) => `Children enjoy playing ${w.toLowerCase()} during break time.`,
  },

  // Adjective
  Adjective: {
    def: (w, t) =>
      `An adjective meaning ${t ? t.split("/")[0].trim().toLowerCase() : w.toLowerCase()}.`,
    exam: (w) =>
      `The situation was quite ${w.toLowerCase()} for everyone involved.`,
  },

  // Religion & Myth
  Religion: {
    def: (w, t) =>
      `A religious term or concept${t ? ": " + t.split("/")[0].trim().toLowerCase() : ""}.`,
    exam: (w) =>
      `The ${w.toLowerCase()} is an important part of the tradition.`,
  },
  Mythology: {
    def: (w, t) => `A term from mythology or folklore.`,
    exam: (w) =>
      `The story of the ${w.toLowerCase()} has been told for centuries.`,
  },

  // Law & Politics
  Law: {
    def: (w, t) =>
      `A legal term or concept${t ? ": " + t.split("/")[0].trim().toLowerCase() : ""}.`,
    exam: (w) =>
      `The lawyer explained the meaning of ${w.toLowerCase()} to the jury.`,
  },
  Politics: {
    def: (w, t) => `A political term or concept.`,
    exam: (w) => `The debate focused on the issue of ${w.toLowerCase()}.`,
  },

  // Shape & Measurement
  Shape: {
    def: (w, t) =>
      `A shape or geometric form${t ? ": " + t.split("/")[0].trim().toLowerCase() : ""}.`,
    exam: (w) => `Draw a ${w.toLowerCase()} on the whiteboard using a ruler.`,
  },

  // Weather & Climate
  Weather: {
    def: (w, t) =>
      `A weather phenomenon or condition${t ? ": " + t.split("/")[0].trim().toLowerCase() : ""}.`,
    exam: (w) =>
      `The ${w.toLowerCase()} made driving very difficult this morning.`,
  },

  // Container
  Container: {
    def: (w, t) =>
      `A vessel or container${t ? ": " + t.split("/")[0].trim().toLowerCase() : ""}.`,
    exam: (w) => `She filled the ${w.toLowerCase()} with fresh water.`,
  },

  // Antonyms & Synonyms (word pairs like "Accept / Reject")
  Antonym: {
    def: (w, t) => {
      const parts = w.split(" / ");
      return parts.length === 2
        ? `A pair of opposites: '${parts[0]}' means the reverse of '${parts[1]}'.`
        : `A word and its opposite.`;
    },
    exam: (w) => {
      const parts = w.split(" / ");
      return parts.length === 2
        ? `${parts[0]} and ${parts[1]} are antonyms with opposite meanings.`
        : `The word '${w}' has a clear opposite.`;
    },
  },
  Synonym: {
    def: (w, t) => {
      const parts = w.split(" / ");
      return parts.length === 2
        ? `A pair of synonyms: '${parts[0]}' has a similar meaning to '${parts[1]}'.`
        : `Words with similar meanings.`;
    },
    exam: (w) => {
      const parts = w.split(" / ");
      return parts.length === 2
        ? `${parts[0]} and ${parts[1]} are synonyms that can often replace each other.`
        : `The word '${w}' has several synonyms.`;
    },
  },

  // Occupations (from daily_occupations.ts)
  Occupation: {
    def: (w, t) =>
      `A professional role or job${t ? ": " + t.split("/")[0].trim().toLowerCase() : ""}.`,
    exam: (w) => `She works as a ${w.toLowerCase()} at the local hospital.`,
  },

  // Flora subcategories (from flora_and_geology.ts)
  Flower: {
    def: (w) => `A flowering plant known as ${w.toLowerCase()}.`,
    exam: (w) =>
      `The ${w.toLowerCase()} blooms beautifully in the spring garden.`,
  },
  "Flowers (Fancy)": {
    def: (w) => `An ornamental or exotic flowering plant.`,
    exam: (w) => `The ${w.toLowerCase()} is prized for its stunning blossoms.`,
  },
  Tree: {
    def: (w) => `A type of tree that grows in various climates.`,
    exam: (w) => `The old ${w.toLowerCase()} provides shade in the park.`,
  },
  Mushroom: {
    def: (w) => `A type of fungus or mushroom.`,
    exam: (w) => `The chef used fresh ${w.toLowerCase()} in the risotto.`,
  },
  "Spices & Herbs": {
    def: (w) => `A herb or spice used in cooking.`,
    exam: (w) => `The recipe calls for a handful of ${w.toLowerCase()}.`,
  },
  "Minerals & Gems": {
    def: (w) => `A mineral, gemstone, or precious stone.`,
    exam: (w) => `The jeweller set the ${w.toLowerCase()} in a gold ring.`,
  },

  // Default fallback
  _default: {
    def: (w, t) =>
      `${t ? t.split("/")[0].split("(")[0].trim() : "A word meaning " + w.toLowerCase()}.`,
    exam: (w) =>
      `The word '${w.toLowerCase()}' appeared in the reading passage.`,
  },
};

// Better definition: use translation when available
function generateDef(word, translation, tag) {
  const template = tagTemplates[tag] || tagTemplates._default;
  let def = template.def(word, translation);
  // Ensure it starts with uppercase and ends with period
  def = def.charAt(0).toUpperCase() + def.slice(1);
  if (!def.endsWith(".")) def += ".";
  return def;
}

function generateExam(word, translation, tag) {
  const template = tagTemplates[tag] || tagTemplates._default;
  let exam = template.exam(word, translation);
  if (!exam.endsWith(".")) exam += ".";
  return exam;
}

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
  skipped = 0,
  alreadyHas = 0;

// Infer tag from parent property name (subcategory key)
const inferTagFromParent = (node) => {
  // Walk up: ArrayLiteralExpression -> PropertyAssignment -> key name
  const arr = node.parent;
  if (!arr || !ts.isArrayLiteralExpression(arr)) return null;
  const propAssign = arr.parent;
  if (!propAssign || !ts.isPropertyAssignment(propAssign)) return null;
  const key = getName(propAssign.name);
  // Map subcategory keys to tag names
  const keyMap = {
    Occupations: "Occupation",
    Flowers: "Flower",
    "Flowers (Fancy)": "Flowers (Fancy)",
    Plants: "Plant",
    Trees: "Tree",
    Mushrooms: "Mushroom",
    "Spices & Herbs": "Spices & Herbs",
    "Minerals & Gems": "Minerals & Gems",
    "Opposites & Synonyms": "Antonym",
  };
  return keyMap[key] || null;
};

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
    translation,
    tag,
    hasDef = false,
    hasExam = false;
  for (const prop of node.properties) {
    if (!ts.isPropertyAssignment(prop)) continue;
    const name = getName(prop.name);
    if (name === "word") word = getStr(prop.initializer);
    if (name === "translation") translation = getStr(prop.initializer);
    if (name === "tag") tag = getStr(prop.initializer);
    if (name === "definition") hasDef = true;
    if (name === "examSentence") hasExam = true;
  }
  // If no explicit tag, infer from parent subcategory name
  if (!tag) tag = inferTagFromParent(node);

  if (!word) {
    ts.forEachChild(node, visit);
    return;
  }
  if (hasDef && hasExam) {
    alreadyHas++;
    ts.forEachChild(node, visit);
    return;
  }

  const oIndent = getIndent(sourceText, node.getStart(sourceFile));
  const pIndent = `${oIndent}  `;
  const newDef = hasDef ? null : generateDef(word, translation, tag);
  const newExam = hasExam ? null : generateExam(word, translation, tag);

  let insertText = "";
  if (newDef)
    insertText += `\n${pIndent}definition: ${JSON.stringify(newDef)},`;
  if (newExam)
    insertText += `\n${pIndent}examSentence: ${JSON.stringify(newExam)},`;

  if (!insertText) {
    skipped++;
    ts.forEachChild(node, visit);
    return;
  }

  const last = node.properties[node.properties.length - 1];
  const needsComma =
    last && !sourceText.slice(last.end, node.end - 1).includes(",");

  replacements.push({
    start: node.end - 1,
    end: node.end - 1,
    text: `${needsComma ? "," : ""}${insertText}\n${oIndent}`,
  });

  enriched++;
  ts.forEachChild(node, visit);
};

visit(sourceFile);

console.log(`File: ${fileName}`);
console.log(
  `  Enriched: ${enriched} | Skipped: ${skipped} | Already had both: ${alreadyHas}`,
);
console.log(`  Total replacements: ${replacements.length}`);

if (dryRun) {
  console.log("  [DRY RUN] No changes written.");
  process.exit(0);
}

if (replacements.length === 0) {
  console.log("  No changes needed.");
  process.exit(0);
}

let next = sourceText;
for (const r of replacements.sort((a, b) => b.start - a.start)) {
  next = next.slice(0, r.start) + r.text + next.slice(r.end);
}
fs.writeFileSync(FILE, next, "utf8");
console.log(`  Done! Written ${next.length} bytes.`);
