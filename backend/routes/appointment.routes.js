import express from "express";
import {createAppointments, getAppointments, fetchAllAppointments, fetchAppointmentWithID, deleteAppointment} from "../controller/appointment.controller.js"; 
const router = express.Router();

router.post("/create", createAppointments);
router.get("/", getAppointments);

router.get("/fetch", fetchAllAppointments);
router.get("/fetch/:id", fetchAppointmentWithID);

router.delete("/delete/:id", deleteAppointment);

export default router;