import publish from "./appModules/messageBroker/amqp/publishMessageToExchange";
import subscribe from "./appModules/messageBroker/amqp/registerAMQPTopicWorker";
import config from "./appConfigs/env/local";
import logger from "./logger";

publish.publishAMQPTopicExchange("Hello", config.AMQP.AMQP_URL, config.AMQP.EXCHANGE_NAME, config.AMQP.TOPIC_PATTERN, (err: Error, msg: string) => {
    if (err) {
        logger.error("Error while publishing the message", err);
    } else {
        logger.info("Message published successfully", msg);
    }
});

subscribe.registerAMQPTopicWorker(config.AMQP.AMQP_URL, config.AMQP.EXCHANGE_NAME, config.AMQP.QUEUENAME_PREFIX, config.AMQP.TOPIC_PATTERN, (err: Error, msg: string) => {
    if (err) {
        logger.error("Error while subscribing to message", err);
    } else {
        logger.info("Message received successfully", msg);
    }
});

