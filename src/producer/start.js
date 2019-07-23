const createMessage = require("./createMessage.js");
const publish = require("./publish.js");

async function start(dependencies) {
  setInterval(async () => {
    const message = createMessage();
    await publish(message, dependencies);
  }, dependencies.config.PUBLISH_INTERVAL);
}

module.exports = start;
