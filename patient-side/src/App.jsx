import React, { useState } from "react";
import Navbar from "./components/Navbar";
import AppointmentsPage from "./pages/AppointmentsPage";
import DashboardPage from "./pages/DashboardPage";
import MedicalHistoryPage from "./pages/MedicalHistoryPage";
import ReportsPage from "./pages/ReportsPage";
import ProfilePage from "./pages/ProfilePage";
import './App.css'

function App() {
  const [currentPage, setCurrentPage] = useState("dashboard");

  return (
    <div>
      <Navbar currentPage={currentPage} onNavClick={setCurrentPage} />
      {currentPage === "dashboard" && <DashboardPage />}
      {currentPage === "appointments" && <AppointmentsPage />}
      {currentPage === "medicalHistory" && <MedicalHistoryPage />}
      {currentPage === "reports" && <ReportsPage />}
      {currentPage === "profile" && <ProfilePage />}
    </div>
  );
}

export default App;
