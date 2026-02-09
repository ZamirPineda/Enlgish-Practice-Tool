const fs = require('fs');
const path = require('path');

const DOCS_DIR = path.join(__dirname, '../public/study-docs');

function scanDirectory(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(scanDirectory(file));
        } else {
            if (file.endsWith('.html')) {
                results.push(file);
            }
        }
    });
    return results;
}

function patchFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    // 1. Check/Add Viewport Meta
    if (!content.includes('<meta name="viewport"')) {
        const headEndIndex = content.indexOf('</head>');
        if (headEndIndex !== -1) {
            content = content.slice(0, headEndIndex) +
                '  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n' +
                content.slice(headEndIndex);
            modified = true;
        }
    }

    // 2. Adjust Body Padding
    // We look for existing padding and replace/tweak it, or inject a style block if needed.
    // The current docs seem to have a <style> block with `body { ... padding: 2rem; ... }`
    // We want to change that to `padding: 1rem;` for mobile or use clamp.

    // A simple regex replacement for the specific style block we saw in the sample
    const paddingRegex = /padding:\s*2rem;/g;
    if (paddingRegex.test(content)) {
        // Replace with responsive padding manually or just smaller padding
        // Let's use clamp(1rem, 5vw, 2rem) for better responsiveness
        content = content.replace(paddingRegex, 'padding: clamp(1rem, 3vw, 2rem);');
        modified = true;
    }

    // 3. Fix Pre/Code overflow
    // Ensure `pre` tags have overflow-x auto
    const preRegex = /\.prose-invert pre\s*\{\s*([^}]*)\}/;
    const match = content.match(preRegex);
    if (match) {
        if (!match[1].includes('overflow-x: auto')) {
            // It seems the sample already had it, but let's double check or force it if missing in others
            // content = content.replace(match[0], `.prose-invert pre { ${match[1]} overflow-x: auto; }`);
            // modified = true;
        }
    } else {
        // If we can't find the specific CSS class, we might want to inject a global fix
        // But let's stick to the padding for now as that's the main "too small" issue (wasted space)
    }

    if (modified) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Patched: ${filePath}`);
    }
}

const allFiles = scanDirectory(DOCS_DIR);
console.log(`Found ${allFiles.length} HTML files.`);

allFiles.forEach(patchFile);
console.log('Done.');
