import { useEffect, useState } from "react";
import { fetchAllAppointments } from "../Account/client";
import TopBar from "../Components/TopBar";
import * as client from "../Account/client";
import AppointmentTable from "./Users/AppointmentTable";

export default function ManageAppointments() {
    const [appointments, setAppointments] = useState<any[]>([]);
    const fetchAppointments = async () => {
        const data = await client.fetchAllAppointments();
        setAppointments(data.appointments);
    };
    const handleDelete = async (id: string) => {
        try {
          await client.deleteAppointment(id);
          setAppointments((prev) => prev.filter((appointment) => appointment.id !== id)); // Update state
        } catch (error) {
          console.error("Error deleting appointment:", error);
        }
    };
    useEffect(() => {
        fetchAppointments(); 
    }, []);
    return (
        <div>
            <TopBar />
            <h1>Manage Appointments</h1>
            <AppointmentTable appointments={appointments} onDelete={handleDelete}/>
        </div>
    );
}