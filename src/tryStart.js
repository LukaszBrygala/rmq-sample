const config = require("./config.js");
const getLogger = require("./getLogger.js");
const getAmqpChannel = require("./getAmqpChannel.js");

async function tryStart(name, start) {
  const log = getLogger(name, config);
  try {
    log.info(config, "Starting...");
    const channel = await getAmqpChannel(config);
    const dependencies = { config, log, channel };
    await start(dependencies);
    log.info("Started correctly.");
  } catch (e) {
    log.fatal(e);
    process.exit(1);
  }
}

module.exports = tryStart;
