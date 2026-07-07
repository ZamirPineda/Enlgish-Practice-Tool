const fs = require("fs");
let code = fs.readFileSync("src/pages/RoadmapFlow.test.tsx", "utf8");

code = code.replace(
  /await recordMastery\("Story frame builder", 80\);/g,
  'await recordMastery("Story frame builder", 80);',
);

// We need to ensure we meet all the targets.
// Lesson 1: Interview opener (80)
// Lesson 2: Follow-up Round (75) -> Rephrase (80), Transform (82)
// Lesson 3: Story Builder (78) -> Frame (80), Cleanup (80)
// Lesson 4: Story Adaptation (80) -> Rephrase variants (80), Transform follow-up (82)
// Lesson 5: Panel Alignment (82) -> Builder (90), Cleanup (90)
// Lesson 6: Panel Pressure (85) -> Rephrase (90), Transform (90)

fs.writeFileSync("src/pages/RoadmapFlow.test.tsx", code);
