import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => (
  <nav className="navbar">
    <div className="navbar-logo">
      <NavLink to="/dashboard" style={{ textDecoration: "none", color: "inherit" }}>
        Patient Portal
      </NavLink>
    </div>
    <ul className="navbar-links">
      <li>
        <NavLink to="/dashboard" className={({ isActive }) => isActive ? "active" : ""}>
          Dashboard
        </NavLink>
      </li>
      <li>
        <NavLink to="/appointments" className={({ isActive }) => isActive ? "active" : ""}>
          Appointments
        </NavLink>
      </li>
      <li>
        <NavLink to="/medicalHistory" className={({ isActive }) => isActive ? "active" : ""}>
          Medical History
        </NavLink>
      </li>
      <li>
        <NavLink to="/reports" className={({ isActive }) => isActive ? "active" : ""}>
          Reports & Prescriptions
        </NavLink>
      </li>
      <li>
        <NavLink to="/profile" className={({ isActive }) => isActive ? "active" : ""}>
          Profile
        </NavLink>
      </li>
    </ul>
  </nav>
);

export default Navbar;
