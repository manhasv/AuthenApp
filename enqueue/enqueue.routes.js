import express from "express";
import {sendToQueue} from "./producer.js";
const router = express.Router();

router.post("/enqueue", sendToQueue);


export default router;