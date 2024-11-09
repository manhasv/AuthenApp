import express from "express";
import dotenv from "dotenv";
import queueRoutes from "./enqueue.routes.js";
import { initQueue } from "./producer.js"; // Import initQueue

dotenv.config();

const app = express();
const PORT = process.env.QUEUE_PORT || 3001;

app.use(express.json()); // Parse incoming JSON

// Initialize the RabbitMQ queue connection
initQueue().then(() => {
    console.log("Queue initialized and ready to send messages.");
}).catch(error => {
    console.error("Failed to initialize queue:", error);
    process.exit(1); // Exit if queue connection fails
});

// Route for enqueuing messages
app.use("/queue", queueRoutes);

app.listen(PORT, () => {
    console.log(`Queue service is running on port ${PORT}`);
});
