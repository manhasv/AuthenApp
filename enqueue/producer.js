import amqplib from 'amqplib';

// .env
const url = 'amqps://vbdlizzv:Ln2FZCYVt7aTR0JFsKNk5ra2s1CTmr1b@shark.rmq.cloudamqp.com/vbdlizzv';

export const sendToQueue = async ({msg}) => {
    try {
        const connection = await amqplib.connect(url);
        const channel = await connection.createChannel();
        const queue = 'appointment';
        const message = JSON.stringify(msg);
        console.log("message", message);
        channel.assertQueue(queue, {durable: true});
        channel.sendToQueue(queue, Buffer.from(message));
        console.log(`Message sent to queue: ${message}`);
    } catch (error) {
        console.error(`Error sending message to queue: ${error.message}`);
    }
}