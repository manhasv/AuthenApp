import amqplib from 'amqplib';

// .env
const url = 'amqps://vbdlizzv:Ln2FZCYVt7aTR0JFsKNk5ra2s1CTmr1b@shark.rmq.cloudamqp.com/vbdlizzv';

export const consumeFromQueue = async () => {
    try {
        const connection = await amqplib.connect(url);
        const channel = await connection.createChannel();
        const queue = 'appointment';
        channel.assertQueue(queue, {durable: true});
        channel.consume(queue, (message) => {
            console.log(`Message received from queue: ${message.content.toString()}`);
            channel.ack(message);
        });
    } catch (error) {
        console.error(`Error consuming message from queue: ${error.message}`);
    }
}