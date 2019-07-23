/* global test, expect */

const createMessage = require("./createMessage.js");

test("creates random messages with type and data properties", () => {
  const message = createMessage();

  expect(message.type).toEqual(expect.stringMatching(/A|B|C/));
  expect(message.data).toBeInstanceOf(Array);
  expect(message.data.length).toBeGreaterThanOrEqual(1);
  expect(message.data.length).toBeLessThanOrEqual(100);
  message.data.forEach(value => {
    expect(value).toBeGreaterThanOrEqual(0);
    expect(value).toBeLessThanOrEqual(255);
  });
});
