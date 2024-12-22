import amqplib from 'amqplib';

const url = process.env.AMQP_URL || 'amqps://vbdlizzv:Ln2FZCYVt7aTR0JFsKNk5ra2s1CTmr1b@shark.rmq.cloudamqp.com/vbdlizzv';
let channel;

// Initialize the connection and channel once to reuse
export const initQueue = async () => { // Export initQueue function
    try {
        const connection = await amqplib.connect(url);
        channel = await connection.createChannel();
        const queue = 'appointment';
        await channel.assertQueue(queue, { durable: true });
        console.log("Queue initialized and ready to send messages.");
    } catch (error) {
        console.error(`Error initializing queue: ${error.message}`);
    }
};


export const sendToQueue = async (msg) => {
    try {
        // Check if the channel is initialized
        if (!channel) {
            console.error("Queue channel not initialized. Waiting to retry...");
            await initQueue();
            if (!channel) throw new Error("Failed to initialize channel.");
        }

        const message = JSON.stringify(msg);
        channel.sendToQueue('appointment', Buffer.from(message));
        console.log(`Message sent to queue: ${message}`);
    } catch (error) {
        console.error(`Error sending message to queue: ${error.message}`);
        throw error;
    }
};
