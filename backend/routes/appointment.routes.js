import express from "express";
import {createAppointments} from "../controller/appointment.controller.js"; 
const router = express.Router();

router.post("/create", createAppointments);

export default router;