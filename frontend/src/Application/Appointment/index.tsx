import { Routes, Route, Navigate } from "react-router";
import CreateAppointment from "./CreateAppointment";
import ManageAppointments from "./ManageAppointment";
import { useSelector } from "react-redux";

export default function Appointment() {
  return (
    <div id="wd-account-screen">
      <div className="d-flex">
        <div className="d-none d-md-block">
        </div>
        <div className="">
          <Routes>
            <Route path="/"
                    element={<Navigate to={"/Application/Appointment/Appointments" }/>} />
            <Route path="/CreateAppointment" element={<CreateAppointment />} />
            <Route path="/Appointments" element={<ManageAppointments />} />
          </Routes>
        </div>
      </div>
    </div>
);}
