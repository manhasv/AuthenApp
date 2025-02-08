import React, { useEffect, useState } from "react";
import { fetchAppointments } from "./client"; // Adjust path to match your structure
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "../CssFolder/ManageAppointments.css";
import TopBar from "../Components/TopBar"; // Reuse existing TopBar
import Modal from "../Components/Modal"; // Add or create a Modal component

interface Appointment {
  _id: string;
  name: string;
  appointmentDate: string;
  morningOrAfternoon: string;
  symptoms: string;
}
// Them sort, them search, them status collumn
// Them Huy Lich Kham
export default function ManageAppointments() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null); // For modal
  const currentUser = useSelector((state: any) => state.auth.user);

  useEffect(() => {
    const loadAppointments = async () => {
      if (!currentUser || !currentUser.email) {
        setError("Please log in to view your appointments.");
        setLoading(false);
        return;
      }

      try {
        const data = await fetchAppointments(currentUser.email);
        setAppointments(data);
      } catch (err) {
        console.error("Failed to fetch appointments", err);
        setError("Failed to load appointments. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    loadAppointments();
  }, [currentUser]);

  const openModal = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
  };

  const closeModal = () => {
    setSelectedAppointment(null);
  };

  if (loading) {
    return <p>Loading your appointments...</p>;
  }

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  return (
    <div className="manage-appointments-container">
      <TopBar />
      <div className="header">
        <h1>Manage Appointments for {currentUser?.name || "User"}</h1>
      </div>
      <div className="appointments-table-container">
        <table className="appointments-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Time</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => (
              <tr key={appointment._id}>
                <td>{new Date(appointment.appointmentDate).toLocaleDateString()}</td>
                <td>{appointment.morningOrAfternoon}</td>
                <td>
                  <button onClick={() => openModal(appointment)}>View Details</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for Appointment Details */}
      {selectedAppointment && (
        <Modal onClose={closeModal}>
          <h2>Appointment Details</h2>
          <div className="appointment-details">
          <p style={{ color: "black" }}>  <strong>Name:</strong> {selectedAppointment.name}</p>
          <p style={{ color: "black" }}><strong>Date:</strong> {new Date(selectedAppointment.appointmentDate).toLocaleDateString()}</p>
          <p style={{ color: "black" }}><strong>Time:</strong> {selectedAppointment.morningOrAfternoon}</p>
          <p style={{ color: "black" }}><strong>Symptoms:</strong> {selectedAppointment.symptoms}</p>
          </div>
          <button onClick={closeModal}>Close</button>
        </Modal>
      )}
    </div>
  );
}
