const fs = require('fs');
const path = require('path');

const SOURCE_DIR = 'G:\\Estudio';
const DEST_DIR = path.join(__dirname, '../public/study-docs');
const INDEX_FILE = path.join(DEST_DIR, 'index.json');

// Ensure destination directory exists
if (!fs.existsSync(DEST_DIR)) {
    fs.mkdirSync(DEST_DIR, { recursive: true });
}

function scanDirectory(dir, relativePath = '') {
    let entries = [];
    try {
        entries = fs.readdirSync(dir, { withFileTypes: true });
    } catch (e) {
        console.error(`Error reading directory ${dir}:`, e);
        return [];
    }

    const result = [];

    for (const entry of entries) {
        const entryName = entry.name;
        const sourcePath = path.join(dir, entryName);
        const entryRelativePath = path.join(relativePath, entryName);
        const destPath = path.join(DEST_DIR, entryRelativePath);

        if (entry.isDirectory()) {
            // Create directory in destination
            if (!fs.existsSync(destPath)) {
                try {
                    fs.mkdirSync(destPath, { recursive: true });
                } catch (e) {
                    console.error(`Error creating directory ${destPath}:`, e);
                    continue;
                }
            }

            const children = scanDirectory(sourcePath, entryRelativePath);
            result.push({
                name: entryName,
                type: 'directory',
                path: entryRelativePath.replace(/\\/g, '/'),
                children: children
            });
        } else if (entry.isFile() && entryName.endsWith('.html')) {
            try {
                // Copy file
                fs.copyFileSync(sourcePath, destPath);
                result.push({
                    name: entryName,
                    type: 'file',
                    path: entryRelativePath.replace(/\\/g, '/')
                });
                console.log(`Copied: ${entryRelativePath}`);
            } catch (err) {
                console.error(`Failed to copy ${sourcePath}: ${err.message}`);
            }
        }
    }
    return result;
}

console.log(`Starting import from ${SOURCE_DIR} to ${DEST_DIR}...`);
const tree = scanDirectory(SOURCE_DIR);
fs.writeFileSync(INDEX_FILE, JSON.stringify(tree, null, 2));
console.log('Import completed. Index generated at:', INDEX_FILE);
