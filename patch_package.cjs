const fs = require("fs");

const data = JSON.parse(fs.readFileSync("package.json", "utf8"));

// Apply overrides for all vulnerabilities identified by pnpm audit
data.pnpm.overrides["baseline-browser-mapping"] = ">=2.11.0";
data.pnpm.overrides["json-server"] = ">=1.0.0-beta.3";
data.pnpm.overrides["vitest"] = ">=4.1.11";
data.pnpm.overrides["@vitest/mocker"] = ">=4.1.11";
data.pnpm.overrides["vite"] = ">=6.4.2";
data.pnpm.overrides["undici"] = ">=7.28.0";

// Also upgrade these directly since they are in dependencies/devDependencies
data.devDependencies["vitest"] = "^4.1.11";
data.devDependencies["@vitest/coverage-v8"] = "^4.1.11";
data.devDependencies["vite"] = "^6.4.2";

fs.writeFileSync("package.json", JSON.stringify(data, null, 2) + "\n");
