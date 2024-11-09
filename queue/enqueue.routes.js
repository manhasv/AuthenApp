import express from "express";
import { sendToQueue } from "./producer.js";
import status from "http-status";

const router = express.Router();

router.post("/enqueue", (req, res) => {
    const { msg } = req.body;
    if (!msg) {
        return res.status(status.BAD_REQUEST).json({ success: false, message: "Message content missing" });
    }
    sendToQueue(msg)
        .then(() => res.status(status.OK).json({ success: true, message: "Message enqueued successfully" }))
        .catch((error) => res.status(status.INTERNAL_SERVER_ERROR).json({ success: false, message: error.message }));
});

export default router;