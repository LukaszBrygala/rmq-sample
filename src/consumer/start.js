const handlePayload = require("./handlePayload.js");

async function start(dependencies) {
  const { config, log, channel } = dependencies;

  await channel.consume(config.AMQP_QUEUE, async payload => {
    await handlePayload(payload, log);
    channel.ack(payload);
  });
}

module.exports = start;
