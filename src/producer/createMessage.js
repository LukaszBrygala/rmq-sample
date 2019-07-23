
const eventTypes = ["A", "B", "C"];

function randomInt(max) {
  return Math.floor(Math.random() * (max + 1));
}

function getEventTypeRandomly() {
  return eventTypes[randomInt(eventTypes.length - 1)];
}

function getRandomData() {
  const length = randomInt(99);
  return [...Array(length + 1)].map(() => randomInt(255));
}

function createMessage() {
  return { type: getEventTypeRandomly(), data: getRandomData() };
}

module.exports = createMessage;
