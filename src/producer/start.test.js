/* global jest, test, expect */

jest.mock("./createMessage.js");
jest.mock("./publish.js");

const start = require("./start.js");
const publish = require("./publish.js");

jest.useFakeTimers();

test("sets interval with provided config value", async () => {
  const config = { PUBLISH_INTERVAL: 5000 };
  const dependencies = { config };

  await start(dependencies);
  jest.advanceTimersByTime(5000 * 5);

  expect(publish).toHaveBeenCalledTimes(5);
});
