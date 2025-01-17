import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "../CssFolder/TopBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { startLoading, clearUser, setError } from "../Account/authReducer";
import { logout } from "../Account/client";
import { showSuccessToast } from "./Toast";
export default function TopBar() {
  const currentUser = useSelector((state: any) => state.auth.user);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = async () => {
    dispatch(startLoading()); 
    try {
      const userData = await logout();
      dispatch(clearUser()); 
      showSuccessToast("Logout successful!");
    } catch (e: any) {
      dispatch(setError(e.message || "Logout failed. Check your credentials.")); 
    }
  };

  return (
    <header className="top-bar">
      {/* Logo */}
      <div className="logo">
        <Link to="/">MyService</Link>
      </div>

      <div className="right-section">
        <button className="button menu-button" onClick={toggleMenu}>
          <FontAwesomeIcon icon={faHouse} className="menu-icon" />
          Menu
        </button>
      </div>

      {/* Expandable Menu */}
      {isMenuOpen && (
        <nav className="dropdown-menu">
          <Link to="/Application">About</Link>
          <Link to="/Application">Services</Link>
          <Link to="/Application">Contact</Link>
          <Link to="/Application/Appointment/CreateAppointment">Create Appointment</Link>
          {currentUser ? (
            <Link to="/Application" onClick={handleLogout}>
              Logout
            </Link>
          ) : (
            <Link to="/Application/Account/Login">Login</Link>
          )}
          <Link to="/Application/Account/Signup"> Register </Link>
        </nav>
      )}
    </header>
  );
}
