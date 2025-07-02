import React from "react";
import "./Navbar.css"; 

const Navbar = ({ currentPage, onNavClick }) => {
    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <span>Patient Portal</span>
            </div>
            <ul className="navbar-links">
                <li
                    className={currentPage === "dashboard" ? "active" : ""}
                    onClick={() => onNavClick("dashboard")}
                >
                    Dashboard
                </li>
                <li
                    className={currentPage === "appointments" ? "active" : ""}
                    onClick={() => onNavClick("appointments")}
                >
                    Appointments
                </li>
                <li
                    className={currentPage === "medicalHistory" ? "active" : ""}
                    onClick={() => onNavClick("medicalHistory")}
                >
                    Medical History
                </li>
                <li
                    className={currentPage === "reports" ? "active" : ""}
                    onClick={() => onNavClick("reports")}
                >
                    Reports & Prescriptions
                </li>
                <li
                    className={currentPage === "profile" ? "active" : ""}
                    onClick={() => onNavClick("profile")}
                >
                    Profile
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
