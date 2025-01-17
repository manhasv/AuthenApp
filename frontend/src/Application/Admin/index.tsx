import { Routes, Route, Navigate } from "react-router";
import { useSelector } from "react-redux";
import ManageUser from "./ManageUser";
import ManageAppointments from "./ManageAppointment";

export default function Admin() {
  return (
    <div id="wd-account-screen">
      <div className="d-flex">
        <div className="d-none d-md-block">
        </div>
        <div className="">
          <Routes>
            <Route path="/"
                    element={<Navigate to={"/Users" }/>} />
            <Route path="/Users" element={<ManageUser />} />
            <Route path="/Users/:uid" element={<ManageUser />} />
            <Route path="/Appointments" element={<ManageAppointments />}/>
            <Route path="/Appointments/:aid" element={<ManageAppointments />} />
          </Routes>
        </div>
      </div>
    </div>
);}
