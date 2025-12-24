(function () {
  // placeholder to ensure module system picks up the file on some setups
})();
import React from "react";
import "./footer.css";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div className="footer-left">
          <div className="brand">
            <span className="logo-icon">🌿</span>
            <span className="logo-text">GreenStudio</span>
          </div>
          <p className="small">
            © {new Date().getFullYear()} GreenStudio. All rights reserved.
          </p>
        </div>

        <div className="footer-right">
          <div className="links">
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/">Home</Link>
          </div>

          <div className="social" aria-hidden>
            <Link to="#" aria-label="Twitter" className="social-link">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M22 5.92c-.63.28-1.3.47-2.01.56.72-.43 1.27-1.1 1.53-1.9-.68.4-1.43.68-2.23.84A3.48 3.48 0 0015.5 4c-1.93 0-3.5 1.57-3.5 3.5 0 .27.03.54.09.8C8.03 8.2 4.4 6.17 2 3.16c-.3.54-.47 1.16-.47 1.82 0 1.26.64 2.37 1.62 3.02-.6-.02-1.16-.18-1.66-.45v.04c0 1.74 1.24 3.19 2.88 3.52-.3.08-.62.12-.95.12-.23 0-.46-.02-.68-.07.46 1.44 1.8 2.49 3.38 2.52A6.98 6.98 0 012 19.54 9.84 9.84 0 007.29 21c6.13 0 9.49-5.08 9.49-9.48v-.43c.65-.47 1.21-1.06 1.66-1.73-.6.27-1.25.45-1.92.53z" />
              </svg>
            </Link>
            <Link to="#" aria-label="GitHub" className="social-link">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 .5A12 12 0 000 12.5c0 5.3 3.44 9.8 8.21 11.38.6.11.82-.26.82-.58v-2.02c-3.34.73-4.04-1.42-4.04-1.42-.55-1.4-1.34-1.77-1.34-1.77-1.1-.76.08-.75.08-.75 1.22.09 1.87 1.25 1.87 1.25 1.08 1.86 2.84 1.32 3.54 1.01.11-.78.42-1.32.76-1.62-2.67-.31-5.47-1.35-5.47-6 0-1.33.47-2.41 1.24-3.26-.12-.31-.54-1.57.12-3.27 0 0 1.01-.32 3.3 1.24a11.3 11.3 0 016 0c2.28-1.56 3.29-1.24 3.29-1.24.66 1.7.24 2.96.12 3.27.77.85 1.24 1.93 1.24 3.26 0 4.66-2.81 5.69-5.48 6 .43.36.81 1.07.81 2.16v3.2c0 .32.21.7.83.58A12 12 0 0024 12.5 12 12 0 0012 .5z" />
              </svg>
            </Link>
            <Link to="#" aria-label="LinkedIn" className="social-link">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M4.98 3.5a2.5 2.5 0 11.02 0zM3 8.98h3.98V21H3zM9.5 8.98H13v1.6h.06c.48-.9 1.67-1.85 3.44-1.85 3.68 0 4.36 2.42 4.36 5.56V21h-3.98v-5.02c0-1.2-.02-2.74-1.67-2.74-1.67 0-1.92 1.3-1.92 2.64V21H9.5z" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
