/* global jest, test, expect */

const handlePayload = require("./handlePayload.js");

test("logs errors", () => {
  const payload = undefined;
  const log = { error: jest.fn() };

  handlePayload(payload, log);

  expect(log.error).toHaveBeenCalledTimes(1);
});

test("logs received payload as event property", () => {
  const payload = { content: Buffer.from(JSON.stringify({ test: "test" })) };
  const log = { info: jest.fn() };

  handlePayload(payload, log);

  expect(log.info).toHaveBeenCalledTimes(1);
  expect(log.info).toHaveBeenCalledWith(
    { event: { test: "test" }},
    "Received event."
  );
});
