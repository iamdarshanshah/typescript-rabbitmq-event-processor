import * as amqp from "amqplib/callback_api";
import * as async from "async";
import logger from "../../../logger";

class MessageBrokerAMQP {

    amqpChannel: amqp.Channel;

    // This method is used to build AMQP connection with obtained AMQP_URL
    getAMQPConnection(AMQP_URL: string, done: any) {
        logger.info("Creating new connection with url", AMQP_URL);
        amqp.connect(AMQP_URL, (err: Error, newConnection: amqp.Connection) => {
            if (err) {
                logger.error("Error while obtaining connection", err);
                done(err);
            } else {
                logger.info("AMQP successfully connected", newConnection);
                newConnection.createChannel(done);
            }
        });
    }

    // This method is used to establish channel in order to publish or subscribe to messages
    getAMQPChannel(AMQP_URL: string, done: any) {
        // Creating AMQP connection with the AMQP_URL
        async.series({
            chnl: async.apply(this.getAMQPConnection, AMQP_URL)
        }, (err, results) => {
            if (err) {
                logger.error("Error in obtaining AMQP channel", err);
                done(err);
            } else {
                this.amqpChannel = results.chnl;
                done(null, this.amqpChannel);
            }
        });
    }
}

export default new MessageBrokerAMQP();