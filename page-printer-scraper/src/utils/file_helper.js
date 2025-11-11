onst fs = require('fs');
const path = require('path');
const logger = require('./logger');

/**
* Ensure directory exists, creating it recursively if needed.
* @param {string} dirPath
*/
async function ensureDir(dirPath) {
try {
await fs.promises.mkdir(dirPath, { recursive: true });
} catch (err) {
logger.error('Failed to create directory.', {
dirPath,
error: err.message,
});
throw err;
}
}

/**
* Build a file path from the directory, base name and extension.
* @param {string} dirPath
* @param {string} baseName
* @param {string} ext Without dot, e.g. "pdf" or "png".
*/
function buildFilePath(dirPath, baseName, ext) {
const normalizedExt = ext.startsWith('.') ? ext.slice(1) : ext;
return path.join(dirPath, `${baseName}.${normalizedExt}`);
}

/**
* Read JSON config from file.
* @param {string} filePath
* @returns {Promise<any>}
*/
async function readJsonFileAsync(filePath) {
try {
const data = await fs.promises.readFile(filePath, 'utf8');
return JSON.parse(data);
} catch (err) {
logger.error('Failed to read JSON file.', {
filePath,
error: err.message,
});
throw err;
}
}

/**
* Read JSON config from file (synchronous variant).
* @param {string} filePath
* @returns {any}
*/
function readJsonFile(filePath) {
try {
const data = fs.readFileSync(filePath, 'utf8');
return JSON.parse(data);
} catch (err) {
logger.error('Failed to read JSON file (sync).', {
filePath,
error: err.message,
});
throw err;
}
}

/**
* Write JSON data to file with pretty formatting.
* @param {string} filePath
* @param {any} data
* @returns {Promise<void>}
*/
async function writeJsonFile(filePath, data) {
try {
const dirPath = path.dirname(filePath);
await ensureDir(dirPath);
await fs.promises.writeFile(
filePath,
JSON.stringify(data, null, 2),
'utf8'
);
} catch (err) {
logger.error('Failed to write JSON file.', {
filePath,
error: err.message,
});
throw err;
}
}

module.exports = {
ensureDir,
buildFilePath,
readJsonFileAsync,
readJsonFile,
writeJsonFile,
};