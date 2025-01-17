import { useEffect, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { useParams, useNavigate } from "react-router";
import { FaUserCircle } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import "../../CssFolder/PeopleDetails.css";
import * as client from "../../Account/client";

export default function AppointmentDetails({ onDelete }: { onDelete: (id: string) => void, }) {
    const { aid } = useParams();
    const [appointment, setAppointment] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const fetchAppointment = async () => {
        setLoading(true);
        try {
            // Fetch appointment data
            const fetchedAppointment = aid
                ? await client.fetchAppointmentWithID(aid)
                : { data: { name: "Test Appointment" } };
            console.log("Fetched appointment:", fetchedAppointment);
            setAppointment(fetchedAppointment.appointment);
        } catch (error) {
            console.error("Error fetching appointment:", error);
        } finally {
            setLoading(false); // Ensure loading ends
        }
    };


    const handleDelete = async () => {
        if (aid) {
            // Call the parent's onDelete if provided
            onDelete?.(aid);
            navigate("/Application/Admin/Appointments");
        }
    };

    useEffect(() => {
        fetchAppointment();
    }, [aid]);


    if (!aid) return <div></div>;

    if (loading) return <div>Loading...</div>;

    if (!appointment) return <div>Failed to load appointment details.</div>;

    return (
        <div className="details-panel">
            <button className="close-button" onClick={() => navigate("/Application/Admin/Appointments")}>
                <IoCloseSharp />
            </button>
            <div className="header">
                <FaUserCircle className="user-icon" />

                <div className="name">
                    {appointment.name}
                    <FaPencil className="edit-icon" />
                </div>
            </div>
            <table className="details-table">
                <tbody>
                    <tr>
                        <td>Email</td>
                        <td>{appointment.email}</td>
                    </tr>

                </tbody>
            </table>
            <div className="actions">
                <button className="btn btn-danger" onClick={handleDelete}>
                    Delete
                </button>
                <button className="btn btn-secondary" onClick={() => navigate("/Application/Admin/Appointments")}>
                    Cancel
                </button>
            </div>
        </div>
    );
}
