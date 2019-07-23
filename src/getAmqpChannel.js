const amqplib = require("amqplib");

async function getAmqpChannel(config) {
  const connection = await amqplib.connect({
    protocol: "amqp",
    hostname: config.AMQP_HOST,
    port: config.AMQP_PORT
  });
  const channel = await connection.createChannel();
  await channel.assertQueue(config.AMQP_QUEUE);
  return channel;
}

module.exports = getAmqpChannel;
