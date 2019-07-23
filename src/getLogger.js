const bunyan = require("bunyan");

function getLogger(name, config) {
  return bunyan.createLogger({ name, level: config.LOG_LEVEL });
}

module.exports = getLogger;
