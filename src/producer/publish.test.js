/* global jest, test, expect */

const publish = require("./publish.js");

test("logs errors", async () => {
  const message = undefined;
  const log = { error: jest.fn() };
  const dependencies = { log };

  await publish(message, dependencies);

  expect(log.error).toHaveBeenCalledTimes(1);
});

test("sends provided message to the queue", async () => {
  const message = { test: "test" };
  const config = { AMQP_QUEUE: "queue" };
  const channel = { sendToQueue: jest.fn() };
  const dependencies = { config, channel };

  await publish(message, dependencies);

  expect(channel.sendToQueue).toHaveBeenCalledTimes(1);
  expect(channel.sendToQueue).toHaveBeenCalledWith(
    "queue",
    Buffer.from(JSON.stringify(message))
  );
});
