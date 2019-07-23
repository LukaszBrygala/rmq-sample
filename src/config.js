const joi = require("joi");

const schema = {
  LOG_LEVEL: joi
    .string()
    .valid(["fatal", "error", "warn", "info", "debug", "trace"])
    .default("info"),
  PUBLISH_INTERVAL: joi
    .number()
    .integer()
    .min(1)
    .default(5000),
  AMQP_HOST: joi.string().required(),
  AMQP_PORT: joi
    .number()
    .integer()
    .default(5672),
  AMQP_QUEUE: joi.string().default("events")
};

const env = Object.keys(schema).reduce(
  (cfg, key) => ({ ...cfg, [key]: process.env[key] }),
  {}
);

const validationResult = joi.validate(env, schema, { abortEarly: false });

if (validationResult.error) {
  validationResult.error.details.forEach(({ message }) => {
    console.error(`Configuration error: ${message}.`);
  });
  process.exit(1);
}

module.exports = validationResult.value;
