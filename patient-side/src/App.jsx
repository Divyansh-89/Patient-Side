import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProfilePage from "./components/Profile";
import AppointmentsPage from "./pages/AppointmentsPage";
import DashboardPage from "./pages/DashboardPage";
import MedicalHistoryPage from "./pages/MedicalHistoryPage";
import ReportsPage from "./pages/ReportsPage";
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [user, setUser] = useState({
    name: "Jane Doe",
    email: "janedoe@gmail.com",
    avatarUrl: "",
    phone: ""
  });

  function handleUpdateProfile(updated) {
    setUser({ ...user, ...updated });
  }

  return (
    <Router>
      <div className="App-root">
        <Navbar />
        <div className="main-content">
          <Routes>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/appointments" element={<AppointmentsPage />} />
            <Route path="/medicalHistory" element={<MedicalHistoryPage />} />
            <Route path="/reports" element={<ReportsPage />} />
            <Route path="/profile" element={
              <ProfilePage user={user} onUpdateProfile={handleUpdateProfile} />
            } />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
          <ToastContainer position="top-right" autoClose={2500} />
        </div>
      </div>
    </Router>
  );
}

export default App;
