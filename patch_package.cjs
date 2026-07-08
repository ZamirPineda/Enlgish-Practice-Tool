const fs = require("fs");
const path = "./package.json";
const pkg = JSON.parse(fs.readFileSync(path, "utf8"));

pkg.dependencies["react-router-dom"] = "^7.15.0";
pkg.devDependencies["vitest"] = "^4.1.0";
pkg.devDependencies["@vitest/coverage-v8"] = "^4.1.0";
pkg.devDependencies["vite"] = "^6.4.3";

pkg.pnpm.overrides["vite"] = "^6.4.3";
pkg.pnpm.overrides["undici"] = "^7.28.0";
pkg.pnpm.overrides["fast-uri"] = "^3.1.2";
pkg.pnpm.overrides["ws"] = "^8.21.0";
pkg.pnpm.overrides["@babel/plugin-transform-modules-systemjs"] = "^7.29.4";
pkg.pnpm.overrides["react-router"] = "^7.15.0";

fs.writeFileSync(path, JSON.stringify(pkg, null, 2) + "\n");
