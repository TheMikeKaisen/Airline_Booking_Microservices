
const amqplib = require("amqplib")
const serverConfig = require("../config/server-config")


const createChannel = async () => {
    // create a connection
    const connection = await amqplib.connect(serverConfig.MESSAGE_BROKER_PORT);

    // create a channel
    const channel = await connection.createChannel();

    // creating a queue inside channel if it doesn't exist
    // const queue = "task_queue";
    await channel.assertExchange(serverConfig.EXCHANGE_NAME, 'direct', { durable: true });

    return channel;
}

const subscribeMessage = async (channel, service, binding_key) => {
    try {
        
            // we will always be making the queue in subscribe logic
            const applicationQueue = await channel.assertQueue('QUEUE_NAME');
            channel.bindQueue(applicationQueue.queue, serverConfig.EXCHANGE_NAME, binding_key);
        
            channel.consume(applicationQueue.queue, msg => {
                console.log("received data");
                console.log(msg.content.toString());
                channel.ack(msg);
            })
    } catch (error) {
        throw error;
    }
}

const publishMessage = async(channel, binding_key, message) => {
    try {
        await channel.assertQueue(serverConfig.QUEUE_NAME);
        await channel.publish(serverConfig.EXCHANGE_NAME, binding_key, Buffer.from(message));
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createChannel, 
    subscribeMessage,
    publishMessage
}