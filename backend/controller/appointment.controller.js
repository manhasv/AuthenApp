import { Appointment } from "../models/appointment.model.js";
import status from "http-status";
import axios from "axios";

export const createAppointments = async (req, res, next) => {
    try {
        // Extract data from request body
        const {
            email,
            name,
            nationalID,
            phoneNumber,
            dob,
            symptoms,
            appointmentDate,
            morningOrAfternoon,
            status: appointmentStatus
        } = req.body;

		const appointments = await Appointment.findOne({ email, appointmentDate });
		console.log("appointments", appointments);
		
		if (appointments) {
			return res.status(status.BAD_REQUEST).json({ success: false, message: "User already has an appointment on this date" });
		}

        // Step 1: Create a new appointment entry in the database
        const appointment = await Appointment.create({
            email,
            name,
            nationalID,
            phoneNumber,
            dob,
            symptoms,
            appointmentDate,
            morningOrAfternoon,
            status: appointmentStatus || 0
        });

        // Step 2: Send the appointment info to the queue service
        const queueServiceUrl = process.env.QUEUE_SERVICE_URL || 'http://localhost:3001';
        
        const message = {
            id: appointment._id,
            email: appointment.email,
            name: appointment.name,
            nationalID: appointment.nationalID,
            phoneNumber: appointment.phoneNumber,
            dob: appointment.dob,
            symptoms: appointment.symptoms,
            appointmentDate: appointment.appointmentDate,
            morningOrAfternoon: appointment.morningOrAfternoon,
            status: appointment.status
        };

        await axios.post(`${queueServiceUrl}/queue/enqueue`, { msg: message });

        // Send a success response
        res.status(status.CREATED).json({ message: "Appointment created successfully", appointment });
    } catch (error) {
        next(error); // Forward error to centralized error handling middleware
    }
};
