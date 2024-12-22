import express from "express";
import {createAppointments, getAppointments} from "../controller/appointment.controller.js"; 
const router = express.Router();

router.post("/create", createAppointments);
router.get("/", getAppointments);

export default router;