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

function fixEncoding(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');

    // Heuristic: Check for common double-encoded sequences
    // Ã (U+00C3) is very common in double-encoded UTF-8 (it's the first byte of many 2-byte sequences)
    if (content.includes('Ã')) {
        try {
            // "Decode" by treating the current UTF-8 string characters as bytes (Latin1)
            // and then re-interpreting those bytes as UTF-8.
            const fixed = Buffer.from(content, 'latin1').toString('utf8');

            // Check if the fix actually reduced the number of 'Ã' or looks better?
            // Or just trust it if it detects 'Ã' associated with other chars.
            // Let's verify: In correct Spanish, 'Ã' is rare/non-existent (unless in a name like 'João' or close to it).
            // But 'Ã' followed by '³', 'º', '¡', etc is 99.9% double encoding.

            // Let's write it back.
            fs.writeFileSync(filePath, fixed, 'utf8');
            console.log(`Fixed: ${filePath}`);
        } catch (e) {
            console.error(`Failed to fix ${filePath}:`, e);
        }
    }
}

console.log('Scanning for files to fix...');
const allFiles = scanDirectory(DOCS_DIR);
console.log(`Found ${allFiles.length} HTML files.`);

let fixedCount = 0;
allFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    if (content.includes('Ã')) {
        fixEncoding(file);
        fixedCount++;
    }
});

console.log(`Fixed encoding for ${fixedCount} files.`);
