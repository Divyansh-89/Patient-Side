import React, { useState } from "react";
import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import ProfilePage from "./components/Profile/Profile";
import AppointmentsPage from "./components/Appointment/AppointmentsPage";
import DashboardPage from "./components/Dashboard/DashboardPage";
import MedicalHistoryPage from "./components/MedicalHistory/MedicalHistoryPage";
import ReportsPage from "./components/Reports_Pres/ReportsPage";
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { buildReminders } from "./utils/reminder";
import initialAppointments from "./data/appointments";
import initialPrescriptions from "./data/prescriptions";
import initialBloodReports from "./data/Reports";
import initialMedicalHistory from "./data/medicalHistory";
import Footer from './components/footer/footer';

function App() {
  const [user, setUser] = useState({
    name: "Jane Doe",
    email: "janedoe@gmail.com",
    avatarUrl: "",
    phone: ""
  });


  const [appointments, setAppointments] = useState(initialAppointments);
  const [prescriptions, setPrescriptions] = useState(initialPrescriptions);
  const [bloodReports, setBloodReports] = useState(initialBloodReports);
  const [medicalHistory, setMedicalHistory] = useState(initialMedicalHistory);

  const reminders = buildReminders(prescriptions);

  function handleUpdateProfile(updated) {
    setUser({ ...user, ...updated });
  }

  return (
    <Router>
      <div className="App-root">
        <Navbar />
        <div className="main-content">
          <Routes>
            <Route
              path="/dashboard"
              element={
                <DashboardPage
                  user={user}
                  appointments={appointments}
                  prescriptions={prescriptions}
                  bloodReports={bloodReports}
                  medicalHistory={medicalHistory}
                  reminders={reminders}
                />
              }
            />
            <Route
              path="/appointments"
              element={
                <AppointmentsPage
                  appointments={appointments}
                  setAppointments={setAppointments}
                />
              }
            />
            <Route
              path="/medicalHistory"
              element={
                <MedicalHistoryPage
                  medicalHistory={medicalHistory}
                  setMedicalHistory={setMedicalHistory}
                />
              }
            />
            <Route
              path="/reports"
              element={
                <ReportsPage
                  bloodReports={bloodReports}
                  prescriptions={prescriptions}
                  setBloodReports={setBloodReports}
                  setPrescriptions={setPrescriptions}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <ProfilePage user={user} onUpdateProfile={handleUpdateProfile} />
              }
            />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
          <ToastContainer position="top-right" autoClose={2500} />
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
