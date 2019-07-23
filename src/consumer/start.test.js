/* global jest, test, expect */

jest.mock("./handlePayload.js");

const start = require("./start.js");
const handlePayload = require("./handlePayload.js");

const config = { AMQP_QUEUE: "test-queue" };

test("starts messages consumption", async () => {
  const channel = { consume: jest.fn() };
  const dependencies = { config, channel };

  await start(dependencies);

  expect(channel.consume).toHaveBeenCalledTimes(1);
});

test("acks messages after processing", async () => {
  let onMessage = () => {};
  const simulateMessage = () => {
    return onMessage("test-payload");
  };

  const channel = {
    consume(queue, handler) {
      onMessage = handler;
    },
    ack: jest.fn()
  };
  const log = {};
  const dependencies = { config, log, channel };

  await start(dependencies);
  await simulateMessage();

  expect(handlePayload).toHaveBeenCalledTimes(1);
  expect(handlePayload).toHaveBeenCalledWith("test-payload", dependencies.log);
  expect(channel.ack).toHaveBeenCalledTimes(1);
  expect(channel.ack).toHaveBeenCalledWith("test-payload");
});
