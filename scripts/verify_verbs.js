const fs = require("fs");
const path = require("path");

const grammarVerbsPath = path.join(
  __dirname,
  "../data/stop_categories/grammar_verbs.ts",
);

try {
  const grammarVerbsContent = fs.readFileSync(grammarVerbsPath, "utf8");

  // Extract verbs from grammar_verbs.ts
  // Format: { word: 'Word', ... }
  const grammarMatches = [...grammarVerbsContent.matchAll(/word:\s*'(.+?)'/g)];
  const grammarWords = grammarMatches.map((m) => m[1]); // Keep case for display

  console.log(`Total Verbs in grammar_verbs.ts: ${grammarWords.length}`);

  // Check for Duplicates
  const seen = new Set();
  const duplicates = [];
  grammarWords.forEach((word) => {
    const lower = word.toLowerCase();
    if (seen.has(lower)) {
      duplicates.push(word);
    }
    seen.add(lower);
  });

  if (duplicates.length > 0) {
    console.error("\n❌ DUPLICATES FOUND:");
    console.error(duplicates.join(", "));
  } else {
    console.log("\n✅ No duplicates found.");
  }

  // Check for specific new verbs
  const expectedVerbs = [
    "Accomplish",
    "Balance",
    "Challenge",
    "Debate",
    "Estimate",
    "Facilitate",
    "Generate",
    "Handle",
    "Illustrate",
    "Lock",
    "Monitor",
    "Participate",
    "Raise",
    "Study",
    "Target",
    "Undermine",
    "Validate",
    "Wander",
  ];

  console.log("\n--- Checking for New Verbs ---");
  const grammarWordsSet = new Set(grammarWords.map((w) => w.toLowerCase()));
  const missing = expectedVerbs.filter(
    (v) => !grammarWordsSet.has(v.toLowerCase()),
  );

  if (missing.length > 0) {
    console.error("❌ MISSING expected new verbs:");
    console.error(missing.join(", "));
  } else {
    console.log("✅ All sample new verbs are present.");
  }
} catch (err) {
  console.error("Error reading file:", err);
}
