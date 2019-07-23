function handlePayload(payload, log) {
  try {
    const event = JSON.parse(payload.content.toString());
    log.info({ event }, "Received event.");
  } catch (e) {
    log.error(e);
  }
}

module.exports = handlePayload;
