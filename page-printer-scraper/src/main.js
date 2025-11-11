onst path = require('path');
const process = require('process');
const Ajv = require('ajv');

const logger = require('./utils/logger');
const { readJsonFile, writeJsonFile } = require('./utils/file_helper');
const { runBatchCaptures } = require('./crawler/playwright_runner');

const inputSchema = require('./schemas/input_schema.json');
const outputSchema = require('./schemas/output_schema.json');

async function main() {
try {
const rootDir = path.resolve(__dirname, '..');

const [, , inputArg, outputArg] = process.argv;

const inputPath =
inputArg && inputArg.trim().length > 0
? path.resolve(process.cwd(), inputArg)
: path.join(rootDir, 'data', 'inputs.sample.json');

const outputPath =
outputArg && outputArg.trim().length > 0
? path.resolve(process.cwd(), outputArg)
: path.join(rootDir, 'data', 'output.json');

logger.info(`Using input file: ${inputPath}`);
logger.info(`Output will be written to: ${outputPath}`);

const inputConfig = await readJsonFile(inputPath);

const ajv = new Ajv({ allErrors: true, allowUnionTypes: true });
const validateInput = ajv.compile(inputSchema);

const validInput = validateInput(inputConfig);
if (!validInput) {
logger.error('Input configuration failed validation.', {
errors: validateInput.errors,
});
process.exitCode = 1;
return;
}

const jobs = inputConfig.jobs || [];
if (!jobs.length) {
logger.warn('No jobs found in the input configuration.');
return;
}

logger.info(`Starting capture for ${jobs.length} job(s)...`);

const results = await runBatchCaptures(jobs, { rootDir });

const validateOutput = ajv.compile(outputSchema);
const validOutput = validateOutput(results);
if (!validOutput) {
logger.error('Generated output does not match output schema.', {
errors: validateOutput.errors,
});
process.exitCode = 1;
return;
}

await writeJsonFile(outputPath, results);
logger.info(`Capture completed. Results written to ${outputPath}`);
} catch (err) {
logger.error('Fatal error occurred in main execution.', { error: err.message });
process.exitCode = 1;
}
}

if (require.main === module) {
main();
}

module.exports = { main };