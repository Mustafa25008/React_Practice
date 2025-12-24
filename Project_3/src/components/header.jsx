(function () {
  // placeholder to ensure module system picks up the file on some setups
})();
import React from "react";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import "./header.css";

function Header() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link className="brand" to="/">
          <span className="logo-icon">🌿</span>
          <span className="logo-text">GreenStudio</span>
        </Link>

        <Navbar />

        <Link className="cta" to="/contact">
          Get in touch
        </Link>
      </div>
    </header>
  );
}

export default Header;
