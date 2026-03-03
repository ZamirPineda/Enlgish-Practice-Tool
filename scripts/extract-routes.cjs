const fs = require("fs");
const path = require("path");

const appTsxPath = path.join(__dirname, "../src/App.tsx");
let appCode = fs.readFileSync(appTsxPath, "utf8");

const routesTsxPath = path.join(__dirname, "../src/routes/index.tsx");

// find the Views block
const startViewsIdx = appCode.indexOf("// Views");
const endViewsIdx = appCode.indexOf("const ONBOARDING_STEPS");

const viewsBlock = appCode.substring(startViewsIdx, endViewsIdx);

// find the AnimatedRoutes component
const startRouteIdx = appCode.indexOf("const AnimatedRoutes");
const endRouteIdx = appCode.indexOf("const App: React.FC = () => {");

const routeBlock = appCode.substring(startRouteIdx, endRouteIdx);

const indexTsxImports = `import React, { Suspense, lazy } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { playNativeTTS } from "@/lib/audioUtils";
import { AppSettings } from "@/lib/settingsStore";
`;

const indexTsxCode =
  indexTsxImports +
  "\n" +
  viewsBlock +
  "\n" +
  routeBlock.replace("const AnimatedRoutes", "export const AnimatedRoutes");

fs.mkdirSync(path.dirname(routesTsxPath), { recursive: true });
fs.writeFileSync(routesTsxPath, indexTsxCode, "utf8");

// remove from App.tsx
appCode =
  appCode.substring(0, startViewsIdx) +
  appCode.substring(endViewsIdx, startRouteIdx) +
  appCode.substring(endRouteIdx);
// add import to top
const importStatement = `import { AnimatedRoutes } from "@/routes";\n`;
appCode = appCode.replace(
  "import React, { Suspense, lazy }",
  "import React, { Suspense }",
);
// insert after other imports
appCode = appCode.replace(
  'import { getRankForLevel } from "@/lib/levelRanks";',
  'import { getRankForLevel } from "@/lib/levelRanks";\n' + importStatement,
);

fs.writeFileSync(appTsxPath, appCode, "utf8");
console.log("Routes extracted successfully!");
