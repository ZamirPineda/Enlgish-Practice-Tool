import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get source from environment variable
// This allows flexibility for testing or different environments
const SOURCE_DIR = process.env.STUDIO_PATH;
const DEST_DIR = path.resolve(__dirname, '../public/study-docs');
const INDEX_FILE = path.join(DEST_DIR, 'index.json');

// Check if source directory is provided
if (!SOURCE_DIR) {
    console.error('Error: STUDIO_PATH environment variable is not set.');
    console.error('Please set STUDIO_PATH to the directory containing the study documents.');
    process.exit(1);
}

console.log(`Source Directory: ${SOURCE_DIR}`);
console.log(`Destination Directory: ${DEST_DIR}`);

// Ensure destination directory exists
if (!fs.existsSync(DEST_DIR)) {
    console.log(`Creating destination directory: ${DEST_DIR}`);
    fs.mkdirSync(DEST_DIR, { recursive: true });
}

// Check if source exists before attempting copy
if (!fs.existsSync(SOURCE_DIR)) {
    console.error(`Source directory not found: ${SOURCE_DIR}`);
    console.error('Please ensure the drive is mounted or set STUDIO_PATH environment variable.');
    process.exit(1);
}

// 1. Copy ALL files recursively (simulating robocopy /E)
console.log('Copying files...');
try {
    // cpSync with recursive: true copies the entire directory structure
    // force: true (default) overwrites existing files
    fs.cpSync(SOURCE_DIR, DEST_DIR, { recursive: true, force: true });
    console.log('Files copied successfully.');
} catch (err) {
    console.error(`Error copying files: ${err.message}`);
    process.exit(1);
}

// 2. Generate index.json by scanning the destination
// This ensures the index reflects what is actually served
function scanDirectory(dir, relativePath = '') {
    let entries = [];
    try {
        entries = fs.readdirSync(dir, { withFileTypes: true });
    } catch (e) {
        console.error(`Error reading directory ${dir}:`, e);
        return [];
    }

    // Sort entries alphabetically for consistent index generation
    entries.sort((a, b) => a.name.localeCompare(b.name));

    const result = [];

    for (const entry of entries) {
        const entryName = entry.name;
        const entryRelativePath = path.join(relativePath, entryName);
        const fullPath = path.join(dir, entryName);

        // Skip index.json itself to avoid recursion if it's already there
        if (entryName === 'index.json') continue;

        if (entry.isDirectory()) {
            const children = scanDirectory(fullPath, entryRelativePath);
            // Only include directory if it has content (optional, but good practice)
            // But matching previous behavior: include directory even if empty?
            // Previous PS script included empty directories if they existed.
            result.push({
                name: entryName,
                type: 'directory',
                path: entryRelativePath.replace(/\\/g, '/'),
                children: children
            });
        } else if (entry.isFile() && entryName.endsWith('.html')) {
            result.push({
                name: entryName,
                type: 'file',
                path: entryRelativePath.replace(/\\/g, '/')
            });
        }
    }
    return result;
}

console.log('Generating index...');
const tree = scanDirectory(DEST_DIR);
fs.writeFileSync(INDEX_FILE, JSON.stringify(tree, null, 2));
console.log(`Index generated at: ${INDEX_FILE}`);
