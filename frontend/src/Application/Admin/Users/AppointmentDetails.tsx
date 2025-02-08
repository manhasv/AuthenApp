import { useEffect, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { useParams, useNavigate } from "react-router";
import { FaCalendar, FaUserCircle } from "react-icons/fa";
import { FaCableCar, FaPencil } from "react-icons/fa6";
import "../../CssFolder/PeopleDetails.css";
import * as client from "../../Account/client";

export default function AppointmentDetails({ 
    onDelete,
    onSave,
}: { 
    onDelete: (id: string) => void, 
    onSave: (id: string, data: any) => void,
}) {
    const { aid } = useParams();
    const [appointment, setAppointment] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [updatedApp, setUpdatedApp] = useState<any>({});
    const [editing, setEditing] = useState(false);
    const navigate = useNavigate();

    const fetchAppointment = async () => {
        setLoading(true);
        try {
            const fetchedAppointment = aid
                ? await client.fetchAppointmentWithID(aid)
                : { data: { name: "Test Appointment" } };
            console.log("Fetched appointment:", fetchedAppointment);
            setAppointment(fetchedAppointment.appointment);
            setUpdatedApp(fetchedAppointment.appointment);
        } catch (error) {
            console.error("Error fetching appointment:", error);
        } finally {
            setLoading(false); // Ensure loading ends
        }
    };

    const handleSave = async () => {
        try {
            onSave(aid ?? '', updatedApp);
            setAppointment(updatedApp);
            setEditing(false);
        } catch (error) {
            console.error("Error saving appointment:", error);
        }
    };


    const handleDelete = async () => {
        if (aid) {
            onDelete?.(aid);
            navigate("/Application/Admin/Appointments");
        }
    };

    const handleChange = (field: string, value: string) => {
        setUpdatedApp((prev: any) => ({
            ...prev,
            [field]: value,
        }));
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
                <FaCalendar className="user-icon" />
                <div className="name">
                    {editing ? (
                        <input
                            type="text"
                            className="name-input"
                            value={updatedApp.name || ""}
                            onChange={(e) => handleChange("name", e.target.value)}
                        />
                    ) : (
                        <span>{appointment.name}</span>
                    )}
                    <FaPencil className="edit-icon" onClick={() => setEditing(!editing)} />
                </div>
            </div>
            <table className="details-table">
                <tbody>
                    <tr>
                        <td>Email</td>
                        <td>
                            {editing ? (
                                <input
                                    type="text"
                                    value={updatedApp.email || ""}
                                    onChange={(e) => handleChange("email", e.target.value)}
                                />
                            ) : (
                                <span>{appointment.email}</span>
                            )}
                        </td>
                    </tr>
                    <tr>
                        <td>Name</td>
                        <td>
                            {editing ? (
                                <input
                                    type="text"
                                    value={updatedApp.name || ""}
                                    onChange={(e) => handleChange("name", e.target.value)}
                                />
                            ) : (
                                <span>{appointment.name}</span>
                            )}
                        </td>
                    </tr>
                    <tr>
                        <td>National ID</td>
                        <td>
                            {editing ? (
                                <input
                                    type="text"
                                    value={updatedApp.nationalID || ""}
                                    onChange={(e) => handleChange("nationalID", e.target.value)}
                                />
                            ) : (
                                <span>{appointment.nationalID}</span>
                            )}
                        </td>
                    </tr>
                    <tr>
                        <td>Phone Number</td>
                        <td>
                            {editing ? (
                                <input
                                    type="number"
                                    value={updatedApp.phoneNumber || ""}
                                    onChange={(e) => handleChange("phoneNumber", e.target.value)}
                                />
                            ) : (
                                <span>{appointment.phoneNumber}</span>
                            )}
                        </td>
                    </tr>
                    <tr>
                        <td>Date of Birth</td>
                        <td>
                            {editing ? (
                                <input
                                    type="date"
                                    value={updatedApp.dob || ""}
                                    onChange={(e) => handleChange("dob", e.target.value)}
                                />
                            ) : (
                                <span>{new Date(appointment.dob).toLocaleDateString()}</span>
                            )}
                        </td>
                    </tr>
                    <tr>
                        <td>Symptoms</td>
                        <td>
                            {editing ? (
                                <input
                                    type="text"
                                    value={updatedApp.symptoms || ""}
                                    onChange={(e) => handleChange("symptoms", e.target.value)}
                                />
                            ) : (
                                <span>{appointment.symptoms}</span>
                            )}
                        </td>
                    </tr>
                    <tr>
                        <td>Appointment Date</td>
                        <td>
                            {editing ? (
                                <input
                                    type="date"
                                    value={updatedApp.appointmentDate || ""}
                                    onChange={(e) => handleChange("appointmentDate", e.target.value)}
                                />
                            ) : (
                                <span>{new Date(appointment.appointmentDate).toLocaleDateString()}</span>
                            )}
                        </td>
                    </tr>
                    <tr>
                        <td>Morning or Afternoon</td>
                        <td>
                            {editing ? (
                                <select
                                    value={updatedApp.morningOrAfternoon || ""}
                                    onChange={(e) => handleChange("morningOrAfternoon", e.target.value)}
                                >
                                    <option value="Morning">Morning</option>
                                    <option value="Afternoon">Afternoon</option>
                                </select>
                            ) : (
                                <span>{appointment.morningOrAfternoon}</span>
                            )}
                        </td>
                    </tr>
                    <tr>
                        <td>Status</td>
                        <td>
                            {editing ? (
                                <select
                                    value={updatedApp.status || ""}
                                    onChange={(e) => handleChange("status", e.target.value)}
                                >
                                    <option value="0">Scheduled</option>
                                    <option value="1">Confirmed</option>
                                    <option value="2">Finished</option>
                                    <option value="-1">Cancelled</option>
                                </select>
                            ) : (
                                <span>
                                    {(() => {
                                        switch (appointment.status) {
                                            case 1:
                                                return "Confirmed";
                                            case 2:
                                                return "Finished";
                                            case 0:
                                                return "Scheduled";
                                            case -1:
                                                return "Cancelled";
                                            default:
                                                return "Not yet confirmed";
                                        }
                                    })()}
                                </span>
                            )}
                        </td>
                    </tr>

                </tbody>
            </table>
            <div className="actions">
                <button className="btn btn-secondary" onClick={editing ? () => setEditing(false) : () => navigate("/Application/Admin/Appointments")}>
                    Cancel
                </button>
                {editing && (
                    <button className="btn btn-success" onClick={handleSave}>
                        Save
                    </button>
                )}
            </div>
        </div>
    );
}
