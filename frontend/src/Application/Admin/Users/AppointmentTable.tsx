import { Link, useNavigate } from "react-router-dom";
import "../../CssFolder/Table.css"
import AppointmentDetails from "./AppointmentDetails";
import { on } from "stream";
import { FaCalendar, FaInfoCircle, FaPencilAlt, FaTrashAlt } from "react-icons/fa";

export default function AppointmentTable({ 
  appointments = [],
  onDelete,
  onSave,
}: { 
  appointments?: any[],
  onDelete: (id: string) => void,
  onSave: (id: string, data: any) => void,
}) {
  const navigate = useNavigate();

  const handleEdit = (id: string) => {
    navigate(`/Application/Admin/Appointments/${id}`);
  }
  return (
    <div id="wd-people-table" className="people-table-container">
      <AppointmentDetails onDelete={onDelete} onSave={onSave}/>
      <table className="table table-striped people-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className="table-body">
          {appointments.map((appointment: any) => (
            <tr key={`${appointment._id}-${appointment.name}`}>
              <td>
                <FaCalendar className="me-2 fs-1 user-icon" />
                <span className="wd-first-name">{appointment.name}</span>
              </td>
              <td>{appointment.email || "N/A"}</td>
              <td>{new Date(appointment.appointmentDate).toLocaleDateString()}</td>   
              <td>{(() => {
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
                        })()}</td>
              <td className="wd-actions">
                <FaPencilAlt
                  className="action-icon edit-icon"
                  onClick={() => handleEdit(appointment._id)}
                  title="Edit"/>
                <FaTrashAlt
                  className="action-icon delete-icon"
                  onClick={() => onDelete(appointment._id)}
                  title="Delete"/>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
