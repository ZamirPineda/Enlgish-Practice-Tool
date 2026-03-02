const fs = require("fs");
const path = require("path");

function patch(filename, gameName, startRegex, endRegex) {
  const p = path.join("components", filename);
  let content = fs.readFileSync(p, "utf-8");
  if (content.includes(`trackAnalyticsEvent("session_start",`)) {
    console.log(`${filename} already patched`);
    return;
  }

  if (!content.includes("useRef") && content.includes("useState, ")) {
    content = content.replace(
      "React, { useState,",
      "React, { useState, useRef,",
    );
  } else if (
    !content.includes("useRef") &&
    content.includes("{ useState, useEffect }")
  ) {
    content = content.replace(
      "{ useState, useEffect }",
      "{ useState, useEffect, useRef }",
    );
  } else if (!content.includes("useRef")) {
    content = content.replace("useState,", "useState, useRef,");
  }

  // Inject session tracking ref where states are defined
  const stateRegex = /(const \[gameState, setGameState\] = useState)/;
  content = content.replace(
    stateRegex,
    `const sessionStartTime = useRef<number>(Date.now());\n  $1`,
  );

  content = content.replace(
    startRegex,
    `$1\n    sessionStartTime.current = Date.now();\n    trackAnalyticsEvent("session_start", { game: "${gameName}" });`,
  );

  content = content.replace(
    endRegex,
    `$1\n    trackAnalyticsEvent("session_end", { game: "${gameName}", duration: Math.round((Date.now() - sessionStartTime.current) / 1000) });`,
  );

  fs.writeFileSync(p, content);
  console.log(`Patched ${filename}`);
}

patch(
  "MathGameView.tsx",
  "math_game",
  /(const startGame = \(\) => {)/,
  /(setGameState\("finished"\);)/,
);

patch(
  "StudyDocsQuizView.tsx",
  "study_docs_quiz",
  /(const handleStartGame = \(\) => {)/,
  /(setGameState\("finished"\);)/,
);

patch(
  "StudyDocsGameView.tsx",
  "study_docs_game",
  /(const handleStart = \(\) => {)/,
  /(setGameState\("finished"\);)/,
);
