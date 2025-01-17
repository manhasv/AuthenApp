import { Link } from "react-router-dom";
import "../../CssFolder/Table.css"
import AppointmentDetails from "./AppointmentDetails";
import { on } from "stream";

export default function AppointmentTable({ 
  appointments = [],
  onDelete,
}: { 
  appointments?: any[],
  onDelete: (id: string) => void,
}) {
  return (
    <div id="wd-people-table" className="people-table-container">
      <AppointmentDetails onDelete={onDelete}/>
      <table className="table table-striped people-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Date</th>
            <th>Time</th>
            <th>Phone Number</th>

          </tr>
        </thead>
        <tbody className="table-body">
          {appointments.map((appointment: any) => (
            <tr key={`${appointment._id}-${appointment.name}`}>
              <td>
                <Link
                  to={`/Application/Admin/Appointments/${appointment._id}`}
                  className="text-decoration-none user-link">
                  <span>{appointment._id}</span>
                </Link>
                </td>
              <td>
                <span className="wd-first-name">{appointment.name}</span>
              </td>
              <td>{appointment.email || "N/A"}</td>
              <td>{new Date(appointment.appointmentDate).toLocaleDateString()}</td>
              <td>{appointment.morningOrAfternoon}</td>
              <td>{appointment.phoneNumber}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
