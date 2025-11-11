onst logger = require('../utils/logger');

/**
* Run a pre-function script on the page before capture.
*
* preConfig example:
* {
*   "action": "waitForSelectorVisibility",
*   "selector": "#report",
*   "timeout": 15000
* }
*
* Supported actions:
*   - waitForSelectorVisibility
*   - click
*   - wait
*   - customScript
*
* @param {import('playwright').Page} page
* @param {object} preConfig
* @returns {Promise<object>} notes collected from checks
*/
async function runPreFunction(page, preConfig) {
const notes = {};

if (!preConfig || typeof preConfig !== 'object') {
return notes;
}

const action = preConfig.action;
if (!action) {
logger.debug('No pre-function action specified; skipping.');
return notes;
}

try {
switch (action) {
case 'waitForSelectorVisibility': {
const selector = preConfig.selector;
if (!selector) {
logger.warn(
'waitForSelectorVisibility requested but no selector provided.'
);
break;
}
const timeout =
typeof preConfig.timeout === 'number' ? preConfig.timeout : 15000;
logger.info(
`Waiting for selector to become visible: "${selector}" (timeout: ${timeout}ms)`
);
const handle = await page.waitForSelector(selector, {
state: 'visible',
timeout,
});
notes.isElementVisible = !!handle;
break;
}

case 'click': {
const selector = preConfig.selector;
if (!selector) {
logger.warn('click requested but no selector provided.');
break;
}
logger.info(`Clicking selector: "${selector}"`);
await page.click(selector, { timeout: preConfig.timeout || 10000 });
if (preConfig.waitAfterClickMs) {
const waitMs = preConfig.waitAfterClickMs;
logger.debug(`Waiting ${waitMs}ms after click.`);
await page.waitForTimeout(waitMs);
}
break;
}

case 'wait': {
const waitMs =
typeof preConfig.waitMs === 'number' ? preConfig.waitMs : 5000;
logger.info(`Waiting for ${waitMs}ms before capture.`);
await page.waitForTimeout(waitMs);
break;
}

case 'customScript': {
const script = preConfig.script;
if (typeof script !== 'string' || !script.trim()) {
logger.warn('customScript action requested but no script provided.');
break;
}
logger.info('Executing custom script in page context.');
// eslint-disable-next-line no-new-func
const fn = new Function(
'page',
'notes',
`
return (async () => {
${script}
})();
`
);
await fn(page, notes);
break;
}

default:
logger.warn(`Unknown pre-function action: "${action}". Skipping.`);
break;
}
} catch (err) {
logger.error('Error while running pre-function.', { error: err.message });
notes.preFunctionError = err.message;
}

return notes;
}

module.exports = { runPreFunction };