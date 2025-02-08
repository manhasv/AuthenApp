import React from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import "./CssFolder/Landing.css";
import TopBar from "./Components/TopBar";
import AboutSection from "./Components/AboutSection";
import Footer from "./Components/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faLock, faUniversalAccess } from "@fortawesome/free-solid-svg-icons";

export default function Landing() {
  const uid = useParams();
  const currentUser = useSelector((state: any) => state.auth.user);
  const baseURL = process.env.BASE_URL;

  return (
    <div className="landing-page">
      <TopBar />
      {currentUser && currentUser.role == "admin" && (
        <div className="admin-landing">
          {/* Left: Navigation Menu */}
          <aside className="dashboard-sidebar">
            <h2>Admin Panel</h2>
            <nav>
              <Link to="/Application/Admin/Users">Manage Users</Link>
              <Link to="/Application/Admin/Appointments">Manage Appointments</Link>
            </nav>
          </aside>

          {/* Right: Data/Graphs */}
          <section className="dashboard-analytics">
            <h2>Analytics</h2>
            <div className="analytics-graph">Graph Placeholder</div>
            <div className="analytics-data">Data Placeholder</div>
          </section>
        </div>
      )}
      {currentUser && currentUser.role == "doctor" && (
        <div className="doctor-landing">
          <h1>Doctor Dashboard</h1>
          <Link to="/Doctor/Appointments">View Appointments</Link>
        </div>
      )}
      {(!currentUser || currentUser.role == "user") && (
        <div>
          <section className="hero-section">
            <div className="hero-content">
              <h1 className="main-title">
                {currentUser
                  ? `Welcome Back, ${currentUser.name || currentUser.email}!`
                  : "Welcome to Our Service"}
              </h1>
              {!currentUser && (
                <p className="subtitle">Your hub for effortless appointment management</p>
              )}
              <div className="button-block">
                {!currentUser && (
                  <button className="cta-button" type="button">
                    <Link to="/Application/Account/Login" className="link-no-underline">Login</Link>
                  </button>
                )}
                <button className="cta-button" type="button">
                  <Link to="/Application/Appointment/CreateAppointment" className="link-no-underline">Book an Appointment</Link>
                </button>
              </div>
            </div>
          </section>

          <section className="features-section">
            <h2>Why Choose Us?</h2>
            <div className="features-grid">
              <div className="feature-card">
                <i className="fas fa-calendar-check"></i>
                <FontAwesomeIcon icon={faCalendar} />
                <h3>Easy Scheduling</h3>
                <p>Book appointments effortlessly with our streamlined process.</p>
              </div>
              <div className="feature-card">
                <i className="fas fa-lock"></i>
                <FontAwesomeIcon icon={faLock} />
                <h3>Secure Data</h3>
                <p>Your privacy is our priority. All data is encrypted and safe.</p>
              </div>
              <div className="feature-card">
                <i className="fas fa-clock"></i>
                <FontAwesomeIcon icon={faUniversalAccess} />
                <h3>24/7 Access</h3>
                <p>Manage your appointments anytime, anywhere.</p>
              </div>
            </div>
          </section>

          <section className="interactive-panels">
            <div className="panel about-panel">
              <AboutSection />
              <img src="/images/doctors_1.svg" alt="Secure data" />
            </div>
          </section>
        </div>)}

      <Footer />
    </div>
  );
}
