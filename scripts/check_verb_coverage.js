
const fs = require('fs');
const path = require('path');

const verbsPath = path.join(__dirname, '../data/verbs.ts');
const grammarVerbsPath = path.join(__dirname, '../data/stop_categories/grammar_verbs.ts');

const verbsContent = fs.readFileSync(verbsPath, 'utf8');
const grammarVerbsContent = fs.readFileSync(grammarVerbsPath, 'utf8');

// Extract irregular verbs from data/verbs.ts
const irregularBaseMatches = [...verbsContent.matchAll(/base:\s*'(.+?)'/g)];
const irregularBases = new Set(irregularBaseMatches.map(m => m[1].toLowerCase()));

// Extract verbs from grammar_verbs.ts
// Format: { word: 'Word', ... }
const grammarMatches = [...grammarVerbsContent.matchAll(/word:\s*'(.+?)'/g)];
const grammarWords = new Set(grammarMatches.map(m => m[1].toLowerCase()));

// Check for missing irregulars
const missingIrregulars = [...irregularBases].filter(base => !grammarWords.has(base));

// Check for "Irregular" tagged in grammar but not in verbs.ts
// We need to parse grammar file better to find tags.
// Simple regex for lines with "Irregular"
const irregularLines = grammarVerbsContent.split('\n').filter(line => line.includes("tag: 'Irregular'"));
const grammarIrregulars = new Set();
irregularLines.forEach(line => {
    const match = line.match(/word:\s*'(.+?)'/);
    if (match) grammarIrregulars.add(match[1].toLowerCase());
});

const missingDefinition = [...grammarIrregulars].filter(word => !irregularBases.has(word));

// Count Regular Verbs in Grammar
const regularCount = grammarWords.size - grammarIrregulars.size;

console.log('--- AUDIT RESULTS ---');
console.log(`Total Irregular Verbs in verbs.ts: ${irregularBases.size}`);
console.log(`Total Verbs in grammar_verbs.ts: ${grammarWords.size}`);
console.log(`  - Tagged Irregular: ${grammarIrregulars.size}`);
console.log(`  - Assumed Regular: ${regularCount}`);
console.log('\n--- MISSING IRREGULAR VERBS IN STOP GAME (verbs.ts -> grammar_verbs.ts) ---');
if (missingIrregulars.length > 0) {
    console.log(missingIrregulars.join(', '));
} else {
    console.log("NONE - All irregular verbs are present.");
}

console.log('\n--- IRREGULAR VERBS WITHOUT DEFINITION ENTRY (grammar_verbs.ts -> verbs.ts) ---');
if (missingDefinition.length > 0) {
    console.log(missingDefinition.join(', '));
} else {
    console.log("NONE");
}
