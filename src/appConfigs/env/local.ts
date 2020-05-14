const config = {
  AMQP: {
    AMQP_URL: (process.env.AMQP_URL || "amqp://localhost"),
    EXCHANGE_NAME: "testing_exchange",
    TOPIC_PATTERN: "success",
    QUEUENAME_PREFIX: "testing_queue"
  }
};

export default config;