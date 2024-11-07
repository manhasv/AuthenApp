import express from "express";
import dotenv from "dotenv";
import queueRoutes from "./enqueue.routes.js";
dotenv.config();

const app = express();
const PORT = process.env.QUEUE_PORT || 3001;

app.use(express.json()); // parse incoming request with JSON payloads in req.body

app.use("/queue", queueRoutes);

app.listen(PORT, () => {
    connectDB();
    console.log("Server is running on port " + PORT);
});