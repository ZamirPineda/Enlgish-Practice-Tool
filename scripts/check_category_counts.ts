import { stopGameData } from "../src/features/data/stopGameData";
import { CATEGORY_GROUPS } from "../src/lib/stopGameHelpers";

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

const categoryCounts: Record<string, number> = {};

// Initialize counts
Object.values(CATEGORY_GROUPS)
  .flat()
  .forEach((cat) => {
    categoryCounts[cat] = 0;
  });

// Count words
ALPHABET.forEach((letter) => {
  const data = stopGameData[letter];
  if (data) {
    Object.keys(data).forEach((cat) => {
      if (categoryCounts[cat] !== undefined) {
        categoryCounts[cat] += data[cat].length;
      }
    });
  }
});

// Sort and print
const sortedCategories = Object.entries(categoryCounts).sort(
  ([, a], [, b]) => a - b,
);

console.log("Categories by word count (Least to Most):");
console.log("-----------------------------------------");
sortedCategories.forEach(([cat, count]) => {
  console.log(`${cat.padEnd(30)}: ${count} words`);
});
