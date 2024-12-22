import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './CssFolder/Landing.css';
import TopBar from './Components/TopBar';
import AboutSection from './Components/AboutSection';
import Footer from './Components/Footer';

export default function Landing() {
  const currentUser = useSelector((state: any) => state.auth.user);

  return (
    <div>
      {/* Top Bar */}
      <TopBar />

      {/* Hero Section */}
      <div className="hero-section">
        {currentUser ? (
          <>
            <h1>Welcome Back, {currentUser.user.name || currentUser.user.email}!</h1>
            <p>We’re glad to have you here. What would you like to do today?</p>
            <div className="cta-buttons">
              <Link to="/Application/Appointment" className="cta-button">Manage Appointments</Link>
              <Link to="/Application/Profile" className="cta-button">View Profile</Link>
            </div>
          </>
        ) : (
          <>
            <h1>Welcome to Our Service</h1>
            <p>Your hub for effortless appointment management</p>
            <div className="cta-buttons">
              <Link to="/Application/Account/Login" className="cta-button">Login</Link>
              <Link to="/Application/Account/Signup" className="cta-button">Sign Up</Link>
            </div>
          </>
        )}
      </div>

      {/* Split Screen Section */}
      <div className="split-screen">
        {/* Left: About Section */}
        <div className="about-section-wrapper">
          <AboutSection />
        </div>

        {/* Right: Personalized Section */}
        <div className="placeholder-section">
          {currentUser ? (
            <>
              <button className="placeholder-button">Quick Access</button>
              <button className="placeholder-button">
              <Link to="/Application/Settings" className="placeholder-button">
                Account Settings
              </Link>
              </button>
            </>
          ) : (
            <>
              <button className="placeholder-button">Learn More</button>
              <button className="placeholder-button">Contact Us</button>
            </>
          )}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
