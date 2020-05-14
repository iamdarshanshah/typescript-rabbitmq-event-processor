import amqpMessageBroker from "./messageBrokerAMQP";
import * as lodash from "lodash";
import * as amqp from "amqplib/callback_api";
import logger from "../../../logger";

class RegisterAMQPTopicWorker {
    registerWorkerToTopicQueue(exchange: string, queueNamePrefix: string, topicPattern: string, channel: amqp.Channel, done: any) {
        channel.assertExchange(exchange, "topic", { durable: false });
        channel.assertQueue(`TQ-${queueNamePrefix}-${(lodash.camelCase(topicPattern)) ? lodash.camelCase(topicPattern) : "ALL"}`, { durable: true },
            (ampQErr: Error, result: any) => {
                if (ampQErr) {
                    logger.error("Error in wiring with queue ERROR::", ampQErr);
                    done(ampQErr);
                } else {
                    channel.bindQueue(result.queue, exchange, topicPattern);
                    channel.consume(result.queue, (msg: any) => {
                        logger.info("Got new message with topic", msg.fields.routingKey, "with data as", msg.content.toString());
                    });
                }
            });
    }

    registerAMQPTopicWorker(AMQP_URL: string, exchange: string, queueNamePrefix: string, topicPattern: string, done: any) {
        // Establishing AMQP connection and channel first in order to subscribe to message
        amqpMessageBroker.getAMQPChannel(AMQP_URL, (err: Error, channel: amqp.Channel) => {
            if (err) {
                logger.error("Error while creating the channel", err);
            } else {
                // The channel fetched from getAMQPChannel method is passed on to subcribe message 
                this.registerWorkerToTopicQueue(exchange, queueNamePrefix, topicPattern, channel, done);
            }
        })
    }
}

export default new RegisterAMQPTopicWorker();