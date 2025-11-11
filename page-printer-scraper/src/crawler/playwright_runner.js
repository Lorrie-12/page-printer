onst path = require('path');
const { chromium } = require('playwright');

const logger = require('../utils/logger');
const { ensureDir, buildFilePath } = require('../utils/file_helper');
const { runPreFunction } = require('./prefunction');

function sanitizeFileName(name) {
return name.replace(/[^a-z0-9_\-]+/gi, '_').replace(/^_+|_+$/g, '') || 'capture';
}

/**
* Runs capture jobs in a single browser session.
* @param {Array<object>} jobs
* @param {object} options
* @returns {Promise<Array<object>>}
*/
async function runBatchCaptures(jobs, options = {}) {
const rootDir = options.rootDir || process.cwd();
const browserOptions = options.browserOptions || { headless: true };

let browser;
let context;
const results = [];

try {
browser = await chromium.launch(browserOptions);
context = await browser.newContext();

for (const job of jobs) {
const url = job.url;
const captureType = job.type === 'screenshot' ? 'screenshot' : 'pdf';

let page;
try {
page = await context.newPage();
logger.info(`Opening URL: ${url}`);

const timeout = typeof job.timeout === 'number' ? job.timeout : 30000;

await page.goto(url, {
waitUntil: 'networkidle',
timeout,
});

let notes = {};
if (job.pre) {
logger.debug(`Running pre-function for URL: ${url}`);
notes = (await runPreFunction(page, job.pre)) || {};
}

const outputDir = path.resolve(
rootDir,
job.outputDir || path.join('captures')
);
await ensureDir(outputDir);

const defaultBase =
job.fileName ||
sanitizeFileName(
(new URL(url).hostname || 'page') +
'_' +
(job.type || captureType)
);

let filePath;
if (captureType === 'pdf') {
filePath = buildFilePath(outputDir, defaultBase, 'pdf');
const pdfOptions = {
path: filePath,
format: job.pdfFormat || 'A4',
printBackground: true,
margin: job.pdfMargin || {
top: '10mm',
right: '10mm',
bottom: '10mm',
left: '10mm',
},
};
await page.pdf(pdfOptions);
logger.info(`Saved PDF: ${filePath}`);
} else {
filePath = buildFilePath(outputDir, defaultBase, 'png');
const screenshotOptions = {
path: filePath,
fullPage: true,
};
await page.screenshot(screenshotOptions);
logger.info(`Saved screenshot: ${filePath}`);
}

const fileKey = path.basename(filePath);

results.push({
url,
fileUrl: filePath,
fileKey,
notes: { ...job.notes, ...notes },
});
} catch (err) {
logger.error(`Failed to capture URL: ${url}`, { error: err.message });
results.push({
url,
fileUrl: null,
fileKey: null,
notes: {
error: err.message,
failedAt: new Date().toISOString(),
},
});
} finally {
if (page) {
try {
await page.close();
} catch (closeErr) {
logger.debug('Failed to close page cleanly.', { error: closeErr.message });
}
}
}
}
} catch (err) {
logger.error('Failed to initialize Playwright browser.', { error: err.message });
throw err;
} finally {
if (context) {
try {
await context.close();
} catch (ctxErr) {
logger.debug('Failed to close browser context cleanly.', { error: ctxErr.message });
}
}
if (browser) {
try {
await browser.close();
} catch (bErr) {
logger.debug('Failed to close browser cleanly.', { error: bErr.message });
}
}
}

return results;
}

module.exports = { runBatchCaptures };