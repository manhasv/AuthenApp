import { Routes, Route, Navigate } from "react-router-dom";
import Landing from "./Landing";
import Appointment from "./Appointment";
import Account from "./Account";
import CreateAppointment from "./Appointment/CreateAppointment";

export default function Application() {
  return (
    <div id="wd-kanbas">
      <div className="wd-main-content-offset p-3">
        <Routes>
          <Route path="/" element={<Navigate to="Landing" />} />
          <Route path="/Account/*" element={<Account />} />
          <Route path="/Landing" element={<Landing />} />
          <Route path="/Appointment/*" element={<Appointment />} />
        </Routes>
      </div>
    </div>
  );
}
