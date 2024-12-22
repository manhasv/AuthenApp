import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "../CssFolder/TopBar.css";

export default function TopBar() {
  const currentUser = useSelector((state: any) => state.auth.user);

  return (
    <div className="top-bar">
      {/* Logo */}
      <div className="logo">
        <Link to="/">MyService</Link>
      </div>

      {/* Navigation Menu */}
      <nav className="menu">
        <Link to="/">About</Link>
        <Link to="/">Menu</Link>
        <Link to="/">Services</Link>
        <Link to="/">Contact</Link>
        <Link to="/Application/Appointment/CreateAppointment">Create Appointment</Link>
        {currentUser ? (
          <Link to="/Application/Account/Profile">Profile</Link>
        ) : (
          <Link to="/Application/Account/Login">Sign In</Link>
        )}
      </nav>
    </div>
  );
}
