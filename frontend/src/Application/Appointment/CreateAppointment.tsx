import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createAppointment } from "./client"; // Import the API function
import "../CssFolder/CreateAppointment.css";
import { useSelector } from "react-redux";

export default function CreateAppointment() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [nationalID, setNationalID] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [dob, setDob] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [morningOrAfternoon, setMorningOrAfternoon] = useState("morning");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null); // Feedback message
  const navigate = useNavigate();

  const currentUser = useSelector((state: any) => state.auth.user);
  
  useEffect(() => {
    if (currentUser) {
      setEmail(currentUser.email || ""); // Default to empty string if property is undefined
      setName(currentUser.name || "");
      setNationalID(currentUser.nationalID || "");
      setPhoneNumber(currentUser.phoneNumber || "");
      setDob(currentUser.dob || "");
    }
  }, [currentUser]);

  const handleCreateAppointment = async () => {
    if (
      !email ||
      !name ||
      !nationalID ||
      !phoneNumber ||
      !dob ||
      !symptoms ||
      !appointmentDate ||
      !morningOrAfternoon
    ) {
      alert("All fields are required!");
      return;
    }

    setLoading(true); // Start loading state
    setMessage(null); // Clear any previous messages

    try {
      const appointmentData = {
        email,
        name,
        nationalID,
        phoneNumber,
        dob,
        symptoms,
        appointmentDate,
        morningOrAfternoon,
      };

      const response = await createAppointment(appointmentData);
      setMessage(response.message || "Appointment created successfully!"); 
      setTimeout(() => navigate("/Application/Appointment"), 1500);
    } catch (error: any) {
      console.error("Error creating appointment:", error);
      setMessage(error.response?.data?.message || "Failed to create appointment. Please try again.");
    } finally {
      setLoading(false); // Stop loading state
    }
  };

  return (
    <div className="create-appointment-container">
      <div className="create-appointment-form">
        <h2>Create Appointment</h2>
        <p>Fill in the details to schedule an appointment.</p>
        {message && <p className={message.includes("successfully") ? "success-message" : "error-message"}>{message}</p>}
        <div className="form-group">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={loading}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="National ID"
            value={nationalID}
            onChange={(e) => setNationalID(e.target.value)}
            disabled={loading}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            disabled={loading}
          />
        </div>
        <div className="form-group">
          <label htmlFor="dob">Date of Birth</label>
          <input
            id="dob"
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            disabled={loading}
          />
        </div>
        <div className="form-group">
          <textarea
            placeholder="Symptoms"
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            disabled={loading}
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="appointmentDate">Appointment Date</label>
          <input
            id="appointmentDate"
            type="date"
            value={appointmentDate}
            onChange={(e) => setAppointmentDate(e.target.value)}
            disabled={loading}
          />
        </div>
        <div className="form-group">
          <select
            value={morningOrAfternoon}
            onChange={(e) => setMorningOrAfternoon(e.target.value)}
            disabled={loading}
          >
            <option value="morning">Morning</option>
            <option value="afternoon">Afternoon</option>
          </select>
        </div>

        <button
          className="create-appointment-button"
          onClick={handleCreateAppointment}
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Appointment"}
        </button>
        <p className="landing-redirect">
          <Link to="/Application/Landing">Main Page</Link>
        </p>
      </div>
    </div>
  );
}
