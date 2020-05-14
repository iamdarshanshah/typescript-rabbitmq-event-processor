import * as amqp from "amqplib/callback_api";
import amqpMessageBroker from "./messageBrokerAMQP";
import logger from "../../../logger";

class PublishMessageToExchange {
    publishMessageToTopicQueue(eventMessage: string, exchangeName: string, topicPattern: string, channel: amqp.Channel, done: any) {
        const bufferMessage = Buffer.from(JSON.stringify(eventMessage));
        channel.assertExchange(exchangeName, "topic", { durable: false });
        // publishing the message to the provided exchange 
        channel.publish(exchangeName, topicPattern, bufferMessage);
        done(null, eventMessage);
    }

    publishAMQPTopicExchange(eventsMessage: string, AMQP_URL: string, exchange: string, topicPattern: string, done: any) {
        // Establishing AMQP connection and channel first in order to publish message
        amqpMessageBroker.getAMQPChannel(AMQP_URL, (err: Error, channel: amqp.Channel) => {
            if (err) {
                logger.error("Error while creating channel", err);
            } else {
                // The channel fetched from getAMQPChannel method is passed on to publish message
                this.publishMessageToTopicQueue(eventsMessage, exchange, topicPattern, channel, done);
            }
        })
    }
}

export default new PublishMessageToExchange();