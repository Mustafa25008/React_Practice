// src/components/Layout.jsx
import React from "react";
import Header from "./header";
import { Outlet } from "react-router-dom";
import Footer from "./footer";

function Layout() {
  return (
    <div>
      <Header/>
      <div style={{ padding: "20px" }}>
        <Outlet /> {/* page content render hoga */}
      </div>
      <Footer/>
    </div>
  );
}

export default Layout;
