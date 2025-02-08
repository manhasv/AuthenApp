import express from "express";
import {
    updateAppointment,
    createAppointments, 
    getAppointments, 
    fetchAllAppointments, 
    fetchAppointmentWithID, 
    deleteAppointment
} from "../controller/appointment.controller.js"; 
const router = express.Router();

router.post("/create", createAppointments);
router.get("/", getAppointments);

router.get("/fetch", fetchAllAppointments);
router.get("/:id", fetchAppointmentWithID);

router.delete("/:id", deleteAppointment);
router.put("/:id", updateAppointment);

export default router;