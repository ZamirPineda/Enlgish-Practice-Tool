const fs = require("fs");
const code = fs.readFileSync("src/hooks/usePWAUpdate.ts", "utf8");
const newCode = code.replace(
  "if (true) {",
  'if ("serviceWorker" in navigator) {',
);
fs.writeFileSync("src/hooks/usePWAUpdate.ts", newCode);
