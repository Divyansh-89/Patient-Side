import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import MenuIcon from "./MenuIcon";
import NavbarLinks from "./NavbarLinks";
import NavbarSidebar from "./NavbarSidebar";
import "./Navbar.css";
import PatientPortalLogo from "../../assets/WhatsApp_Image_2025-07-08_at_11.17.20_67410e9b-removebg-preview.png";

const navLinks = [
  { to: "/dashboard", label: "Dashboard" },
  { to: "/appointments", label: "Appointments" },
  { to: "/medicalHistory", label: "Medical History" },
  { to: "/reports", label: "Reports & Prescriptions" },
  { to: "/profile", label: "Profile" }
];

export default function Navbar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-logo">
          <img
            src={PatientPortalLogo}
            alt="Patient Portal Logo"
            className="navbar-logo-image"
          />
          <NavLink to="/dashboard" onClick={closeSidebar}>
            Patient Portal
          </NavLink>
        </div>
        <NavbarLinks links={navLinks} onClick={closeSidebar} />
        <button
          className="menu-toggle"
          onClick={() => setSidebarOpen(true)}
          aria-label="Open menu"
        >
          <MenuIcon />
        </button>
      </nav>
      <NavbarSidebar open={sidebarOpen} links={navLinks} onClose={closeSidebar} />
    </>
  );
}
