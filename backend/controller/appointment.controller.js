import status from "http-status";
import { Appointment } from "../models/appointment.model.js";

export const createAppointments = async (req, res) => {
	const { 
		email,
		appointmentDate,
	} = req.body;

	try {
		if (!email) {
			throw new Error("All fields are required");
		}

		const appointments = await Appointment.findOne({ email, appointmentDate });
		console.log("appointments", appointments);
		
		if (appointments) {
			return res.status(status.BAD_REQUEST).json({ success: false, message: "User already has an appointment on this date" });
		}
		//
		
		// todo
		await axios.post('http://localhost:3001/queue/enqueue', {
			email,
			appointmentDate
		});
		

		res.status(status.OK).json({
			success: true,
			message: "Appointments created successfully",
			appointments,
		});

	} catch (error) {
		res.status(status.BAD_REQUEST).json({ success: false, message: error.message });
	}
}