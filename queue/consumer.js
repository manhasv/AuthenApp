import amqplib from 'amqplib';

const url = process.env.AMQP_URL || 'amqps://vbdlizzv:Ln2FZCYVt7aTR0JFsKNk5ra2s1CTmr1b@shark.rmq.cloudamqp.com/vbdlizzv';

const initConsumer = async () => {
    try {
        // Connect to RabbitMQ
        const connection = await amqplib.connect(url);
        const channel = await connection.createChannel();
        const queue = 'appointment';

        // Assert the queue exists (or create it if it doesn’t)
        await channel.assertQueue(queue, { durable: true });
        console.log(`Waiting for messages in queue: ${queue}`);

        // Consume messages from the queue
        channel.consume(queue, (msg) => {
            if (msg !== null) {
                const messageContent = msg.content.toString();
                console.log(`Received message: ${messageContent}`);

                // Acknowledge the message so it's removed from the queue
                channel.ack(msg);
            }
        });
    } catch (error) {
        console.error(`Error in consumer: ${error.message}`);
    }
};

// Initialize the consumer
initConsumer();
