import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { connectDB } from "./db/connectDB.js";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import appointmentRoutes from "./routes/appointment.routes.js";
import status from "http-status";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json()); // parse incoming request with JSON payloads in req.body
app.use(cookieParser()); //parse incoming cookie and extract token


const corsOptions = {
  origin: "http://localhost:3000", // Allow requests from the frontend
  credentials: true, // Allow cookies and authentication headers
};

app.use(cors(corsOptions));

if (!PORT || !process.env.MONGO_URI) {
    console.error("Missing environment configurations. Ensure all required variables are defined.");
    process.exit(1);
}

app.use("/api/auth", authRoutes)
app.use("/api/user", userRoutes)
app.use("/api/appointment", appointmentRoutes)

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || status.INTERNAL_SERVER_ERROR)
        .json({ error: err.message || "Internal Server Error" });
});

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch(err => {   
    console.error("Failed to connect to the database:", err);
    process.exit(1); // Exit if unable to connect to the database
});