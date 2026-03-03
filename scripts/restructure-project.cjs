const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const srcDir = path.join(root, "src");

const map = [
  // Directories
  { old: "utils", new: "src/lib" },
  { old: "hooks", new: "src/hooks" },
  { old: "data", new: "src/features/data" },
  { old: "components/tech-games", new: "src/pages/tech-games" },

  // Base files
  { old: "App.tsx", new: "src/App.tsx" },
  { old: "App.test.tsx", new: "src/App.test.tsx" },
  { old: "index.tsx", new: "src/index.tsx" },
  { old: "types.ts", new: "src/types.ts" },
  { old: "setupTests.ts", new: "src/setupTests.ts" },
  { old: "vite-env.d.ts", new: "src/vite-env.d.ts" },
  { old: "index.css", new: "src/styles/index.css" },
];

const componentsDir = path.join(root, "components");
if (fs.existsSync(componentsDir)) {
  const items = fs.readdirSync(componentsDir, { withFileTypes: true });
  for (const item of items) {
    if (item.name === "tech-games") continue;
    const oldPath = `components/${item.name}`;
    if (item.isFile() && item.name.endsWith("View.tsx")) {
      map.push({ old: oldPath, new: `src/pages/${item.name}` });
    } else if (item.isFile() && item.name.endsWith("View.test.tsx")) {
      map.push({ old: oldPath, new: `src/pages/${item.name}` });
    } else {
      map.push({ old: oldPath, new: `src/components/${item.name}` });
    }
  }
}

const newDirs = new Set();
for (const m of map) {
  let dir = path.dirname(path.join(root, m.new));
  newDirs.add(dir);
}
for (const dir of newDirs) {
  fs.mkdirSync(dir, { recursive: true });
}

function getAllFiles(dirPath, arrayOfFiles) {
  const files = fs.readdirSync(dirPath, { withFileTypes: true });
  arrayOfFiles = arrayOfFiles || [];
  for (const file of files) {
    if (file.isDirectory()) {
      arrayOfFiles = getAllFiles(path.join(dirPath, file.name), arrayOfFiles);
    } else {
      arrayOfFiles.push(path.join(dirPath, file.name));
    }
  }
  return arrayOfFiles;
}

const oldToNewFileMap = new Map();
const oldNoExtToNewNoExtFileMap = new Map();

for (const m of map) {
  const oldAbs = path.join(root, m.old);
  const newAbs = path.join(root, m.new);
  if (fs.existsSync(oldAbs)) {
    if (fs.statSync(oldAbs).isDirectory()) {
      const allFiles = getAllFiles(oldAbs, []);
      for (const file of allFiles) {
        const relPath = path.relative(oldAbs, file);
        const fileNewAbs = path.join(newAbs, relPath);
        oldToNewFileMap.set(file, fileNewAbs);

        const fileNoExt = file.replace(/\.(tsx|ts|js|jsx|css)$/, "");
        const newNoExt = fileNewAbs.replace(/\.(tsx|ts|js|jsx|css)$/, "");
        oldNoExtToNewNoExtFileMap.set(fileNoExt, newNoExt);
      }
    } else {
      oldToNewFileMap.set(oldAbs, newAbs);

      const oldNoExt = oldAbs.replace(/\.(tsx|ts|js|jsx|css)$/, "");
      const newNoExt = newAbs.replace(/\.(tsx|ts|js|jsx|css)$/, "");
      oldNoExtToNewNoExtFileMap.set(oldNoExt, newNoExt);
    }
  }
}

const importRegex =
  /(?:import|export)\s+(?:type\s+)?(?:[^"']*?from\s+)?["']([^"']+)["']/g;
const dynamicImportRegex = /import\s*\(\s*["']([^"']+)["']\s*\)/g;

function replaceScriptImports(content, oldFileAbsPath) {
  const processMatch = (match, importPath) => {
    if (!importPath.startsWith(".")) {
      return match;
    }

    const oldImportedDirAbs = path.dirname(oldFileAbsPath);
    let oldImportedAbs = path.resolve(oldImportedDirAbs, importPath);

    // Directory exact match (e.g. import from "./utils" resolving to "./utils/index.ts")
    // Let's assume the string itself is what matters for rewriting
    let newImportedAbs = null;

    // Check if the oldImportedAbs perfectly matches a known file without extension
    if (oldNoExtToNewNoExtFileMap.has(oldImportedAbs)) {
      newImportedAbs = oldNoExtToNewNoExtFileMap.get(oldImportedAbs);
    }
    // Or if it matches a known file directly (like ./index.css)
    else if (oldToNewFileMap.has(oldImportedAbs)) {
      newImportedAbs = oldToNewFileMap.get(oldImportedAbs);
    } else {
      // Check directory prefix
      const oldRelToRoot = path
        .relative(root, oldImportedAbs)
        .replace(/\\/g, "/");
      const sortedMap = [...map].sort((a, b) => b.old.length - a.old.length);
      for (const m of sortedMap) {
        if (oldRelToRoot === m.old || oldRelToRoot.startsWith(m.old + "/")) {
          const tail = oldRelToRoot.slice(m.old.length);
          const newRelToRoot = m.new + tail;
          newImportedAbs = path.join(root, newRelToRoot);
          break;
        }
      }
    }

    if (newImportedAbs) {
      // It has been moved to a src/ location
      const newImportRelToSrc = path
        .relative(srcDir, newImportedAbs)
        .replace(/\\/g, "/");
      const newImportAlias = `@/${newImportRelToSrc}`;
      return match.replace(importPath, newImportAlias);
    }

    return match;
  };

  let newContent = content.replace(importRegex, processMatch);
  newContent = newContent.replace(dynamicImportRegex, processMatch);
  return newContent;
}

for (const [oldPath, newPath] of oldToNewFileMap.entries()) {
  const content = fs.readFileSync(oldPath, "utf8");
  if (oldPath.match(/\.(ts|tsx|js|jsx|css)$/)) {
    const newContent = replaceScriptImports(content, oldPath);
    fs.mkdirSync(path.dirname(newPath), { recursive: true });
    fs.writeFileSync(newPath, newContent, "utf8");
  } else {
    fs.mkdirSync(path.dirname(newPath), { recursive: true });
    fs.copyFileSync(oldPath, newPath);
  }
}

const indexHtmlPath = path.join(root, "index.html");
if (fs.existsSync(indexHtmlPath)) {
  let html = fs.readFileSync(indexHtmlPath, "utf8");
  html = html.replace('src="/index.tsx"', 'src="/src/index.tsx"');
  fs.writeFileSync(indexHtmlPath, html, "utf8");
}

console.log("Copying and rewrites complete. Cleaning up old locations...");

function deletePath(p) {
  if (fs.existsSync(p)) {
    if (fs.statSync(p).isDirectory()) {
      fs.rmSync(p, { recursive: true, force: true });
    } else {
      fs.unlinkSync(p);
    }
  }
}

for (const m of map) {
  const oldAbs = path.join(root, m.old);
  deletePath(oldAbs);
}

console.log("Migration complete!");
