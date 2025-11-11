onst util = require('util');

const LEVELS = ['debug', 'info', 'warn', 'error'];

function getLogLevel() {
  const level = (process.env.LOG_LEVEL || 'info').toLowerCase();
  if (LEVELS.includes(level)) return level;
  return 'info';
}

const currentLevelIndex = LEVELS.indexOf(getLogLevel());

function formatPayload(payload) {
  if (!payload) return '';
  if (typeof payload === 'string') return payload;
  return util.inspect(payload, { depth: 5, breakLength: 80 });
}

function log(level, message, payload) {
  const levelIndex = LEVELS.indexOf(level);
  if (levelIndex < currentLevelIndex) {
    return;
  }

  const timestamp = new Date().toISOString();
  const base = `[${timestamp}] [${level.toUpperCase()}] ${message}`;
  if (payload !== undefined) {
    // eslint-disable-next-line no-console
    console.log(`${base} | ${formatPayload(payload)}`);
  } else {
    // eslint-disable-next-line no-console
    console.log(base);
  }
}

module.exports = {
  debug(message, payload) {
    log('debug', message, payload);
  },
  info(message, payload) {
    log('info', message, payload);
  },
  warn(message, payload) {
    log('warn', message, payload);
  },
  error(message, payload) {
    log('error', message, payload);
  },
};