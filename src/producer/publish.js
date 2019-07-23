async function publish(message, dependencies) {
  const { config, log, channel } = dependencies;
  try {
    const content = Buffer.from(JSON.stringify(message));
    await channel.sendToQueue(config.AMQP_QUEUE, content);
  } catch (e) {
    log.error(e);
  }
}

module.exports = publish;
