import { Routes, Route, Navigate } from "react-router";
import Login from "./Login";
import Signup from "./Signup";
import Profile from "./Profile";
import { useSelector } from "react-redux";

export default function Account() {
  return (
    <div id="wd-account-screen">
      <div className="d-flex">
        <div className="d-none d-md-block">
        </div>
        <div className="">
          <Routes>
            <Route path="/"
                    element={<Navigate to={"/Kanbas/Account/Login" }/>} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Signup" element={<Signup />} />
            <Route path="/Profile" element={<Profile />} />
          </Routes>
        </div>
      </div>
    </div>
);}
