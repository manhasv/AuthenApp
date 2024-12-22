import amqplib from 'amqplib';
import { Appointment } from '../models/appointment.model.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const url = process.env.AMQP_URL;
const queue = 'appointment'; // Queue name
const mongo_uri = process.env.MONGO_URI;
// Function to initialize MongoDB connection
const connectDB = async () => {
    try {
        console.log("Connecting to MongoDB...");
        await mongoose.connect(mongo_uri);
        console.log("MongoDB connected successfully.");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
        process.exit(1);
    }
};

// Function to initialize the consumer connection to RabbitMQ
export const initConsumer = async () => {
    try {
        console.log("Connecting to RabbitMQ...");
        const connection = await amqplib.connect(url);
        const channel = await connection.createChannel();

        // Ensure the queue exists
        await channel.assertQueue(queue, { durable: true });
        console.log(`Waiting for messages in queue: ${queue}`);

        // Set up the message consumer
        channel.consume(queue, async (msg) => {
            if (msg !== null) {
                try {
                    const messageContent = JSON.parse(msg.content.toString());
                    console.log("Received message:", messageContent);

                    // Attempt to save the message to MongoDB
                    const appointment = new Appointment(messageContent);
                    await appointment.save();
                    console.log("Message saved to database");

                    // Acknowledge the message only after successful processing
                    channel.ack(msg);
                } catch (error) {
                    console.error("Error processing message:", error.message);
                    // Optionally add `channel.nack(msg);` to requeue unprocessed messages
                }
            }
        });

        // Gracefully handle RabbitMQ connection close
        connection.on("close", () => {
            console.log("RabbitMQ connection closed. Reconnecting...");
            setTimeout(initConsumer, 1000); // Retry connecting after 1 second
        });

    } catch (error) {
        console.error("Error in consumer setup:", error.message);
        process.exit(1); // Exit process if unable to set up the consumer
    }
};

// Initialize MongoDB connection and then start the consumer
connectDB().then(initConsumer).catch((error) => {
    console.error("Failed to start consumer:", error.message);
    process.exit(1);
});