const fs = require("fs");
const path = require("path");

const files = [
  { file: "SpeedBuilderView.tsx", game: "speed_builder" },
  { file: "ErrorHunterView.tsx", game: "error_hunter" },
  { file: "ParaphraseDuelView.tsx", game: "paraphrase_duel" },
  { file: "CollocationSprintView.tsx", game: "collocation_sprint" },
  { file: "TabooEnglishView.tsx", game: "taboo_english" },
  { file: "CodeSyntaxBuilderView.tsx", game: "code_syntax_builder" },
  { file: "CodeBugHunterView.tsx", game: "code_bug_hunter" },
  { file: "DiplomaticReviewerView.tsx", game: "diplomatic_reviewer" },
];

files.forEach(({ file, game }) => {
  const p = path.join("components", file);
  let content = fs.readFileSync(p, "utf-8");

  if (content.includes(`trackAnalyticsEvent("session_start",`)) {
    console.log(`${file} already patched`);
    return;
  }

  // 1. Add useRef to imports if missing
  if (!content.includes("useRef") && content.includes("useState, ")) {
    content = content.replace(
      "React, { useState,",
      "React, { useState, useRef,",
    );
  } else if (
    !content.includes("useRef") &&
    content.includes("{ useState, useMemo, useEffect }")
  ) {
    content = content.replace(
      "{ useState, useMemo, useEffect }",
      "{ useState, useMemo, useEffect, useRef }",
    );
  } else if (!content.includes("useRef")) {
    content = content.replace("useState,", "useState, useRef,");
  }

  // 2. Inject session tracking ref where states are defined
  const stateRegex = /(const \[roundIndex, setRoundIndex\] = useState\(0\);)/;
  content = content.replace(
    stateRegex,
    `$1\n  const sessionStartTime = useRef<number>(Date.now());\n` +
      `  useEffect(() => {\n` +
      `    trackAnalyticsEvent("session_start", { game: "${game}" });\n` +
      `  }, []);`,
  );

  // 3. Inject session_end in handleRestart to close the current session AND start a new one
  const restartRegex = /(const handleRestart = \(\) => {\n)/;
  content = content.replace(
    restartRegex,
    `$1    trackAnalyticsEvent("session_end", { game: "${game}", duration: Math.round((Date.now() - sessionStartTime.current) / 1000) });\n` +
      `    sessionStartTime.current = Date.now();\n` +
      `    trackAnalyticsEvent("session_start", { game: "${game}" });\n`,
  );

  // 4. Inject session_end when game ends
  // Look for the "finish" logic or effect on isComplete
  if (
    content.includes(
      "const isComplete = roundIndex === rounds.length - 1 && submitted;",
    )
  ) {
    content = content.replace(
      /(const isComplete = roundIndex === rounds.length - 1 && submitted;)/,
      `$1\n\n  useEffect(() => {\n` +
        `    if (isComplete) {\n` +
        `      trackAnalyticsEvent("session_end", { game: "${game}", duration: Math.round((Date.now() - sessionStartTime.current) / 1000) });\n` +
        `    }\n  }, [isComplete]);`,
    );
  }

  fs.writeFileSync(p, content);
  console.log(`Patched ${file}`);
});
