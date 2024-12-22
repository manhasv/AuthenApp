import React from 'react';
import '../CssFolder/Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} MyService. All rights reserved.</p>
        <nav>
          <a href="/privacy">Privacy Policy</a>
          <a href="/terms">Terms of Service</a>
          <a href="/contact">Contact Us</a>
        </nav>
      </div>
    </footer>
  );
}
