import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

const MenuIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" aria-hidden="true">
    <line x1="4" x2="20" y1="6" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <line x1="4" x2="20" y1="12" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <line x1="4" x2="20" y1="18" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const CloseIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" aria-hidden="true">
    <line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const navLinks = [
  { to: "/dashboard", label: "Dashboard" },
  { to: "/appointments", label: "Appointments" },
  { to: "/medicalHistory", label: "Medical History" },
  { to: "/reports", label: "Reports & Prescriptions" },
  { to: "/profile", label: "Profile" }
];

const Navbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Close sidebar on link/backdrop/close button click
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-logo">
          <NavLink to="/dashboard" onClick={closeSidebar}>
            Patient Portal
          </NavLink>
        </div>
        <ul className="navbar-links">
          {navLinks.map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                className={({ isActive }) => isActive ? "active" : ""}
                onClick={closeSidebar}
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
        <button
          className="menu-toggle"
          onClick={() => setSidebarOpen(true)}
          aria-label="Open menu"
        >
          <MenuIcon />
        </button>
      </nav>
      {/* Sidebar Drawer */}
      <aside className={`navbar-sidebar${sidebarOpen ? " open" : ""}`}>
        <button className="sidebar-close" onClick={closeSidebar} aria-label="Close menu">
          <CloseIcon />
        </button>
        <ul>
          {navLinks.map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                className={({ isActive }) => isActive ? "active" : ""}
                onClick={closeSidebar}
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </aside>
      {/* Backdrop */}
      {sidebarOpen && <div className="sidebar-backdrop" onClick={closeSidebar} />}
    </>
  );
};

export default Navbar;
