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
import 'react-toastify/dist/ReactToastify.css'
import {
  FiFilter, FiSearch, FiDownload,
  FiHome, FiMenu
} from "react-icons/fi";
import { BsCapsule } from "react-icons/bs";
import {
  MdBloodtype, MdHealing, MdOutlineTimeline, MdOpacity, MdWbSunny
} from "react-icons/md";

// --- INITIAL DATA (use your real initial data here) ---
const initialAppointments = [
  { id: 1, date: "2025-07-05", time: "10:00 AM", doctor: "Dr. Smith", purpose: "General Checkup", notes: "Bring previous reports.", status: "upcoming" },
  { id: 2, date: "2025-07-02", time: "11:00 PM", doctor: "Dr. Johnson", purpose: "General Checkup", notes: "Annual physical.", status: "upcoming" },
  { id: 3, date: "2025-06-30", time: "9:30 AM", doctor: "Dr. Williams", purpose: "Dental Cleaning", notes: "Avoid food before visit.", status: "completed" },
  { id: 4, date: "2025-07-01", time: "1:00 PM", doctor: "Dr. Brown", purpose: "Eye Exam", notes: "Bring eyeglasses.", status: "completed" },
  { id: 5, date: "2025-07-06", time: "3:00 PM", doctor: "Dr. Davis", purpose: "Skin Rash", notes: "Affected area is spreading.", status: "upcoming" },
  { id: 6, date: "2025-07-07", time: "11:00 AM", doctor: "Dr. Wilson", purpose: "Back Pain", notes: "Chronic pain for 2 weeks.", status: "upcoming" },
  { id: 7, date: "2025-06-28", time: "2:00 PM", doctor: "Dr. Moore", purpose: "ENT Checkup", notes: "Mild hearing loss.", status: "completed" },
  { id: 8, date: "2025-07-09", time: "4:30 PM", doctor: "Dr. Taylor", purpose: "Follow-up", notes: "After surgery follow-up.", status: "upcoming" },
  { id: 9, date: "2025-07-10", time: "12:00 PM", doctor: "Dr. Anderson", purpose: "Diabetes Management", notes: "Check glucose logs.", status: "upcoming" },
  { id: 10, date: "2025-07-03", time: "10:45 AM", doctor: "Dr. Thomas", purpose: "Vaccination", notes: "COVID-19 booster dose.", status: "completed" },
  { id: 11, date: "2025-07-11", time: "9:00 AM", doctor: "Dr. Jackson", purpose: "Chest Pain", notes: "Urgent consultation.", status: "upcoming" },
  { id: 12, date: "2025-07-04", time: "5:00 PM", doctor: "Dr. White", purpose: "Thyroid Test", notes: "Fasting required.", status: "upcoming" },
  { id: 13, date: "2025-07-08", time: "2:15 PM", doctor: "Dr. Harris", purpose: "Migraine", notes: "Frequent headaches.", status: "upcoming" },
  { id: 14, date: "2025-06-29", time: "6:00 PM", doctor: "Dr. Martin", purpose: "Stomach Ache", notes: "Onset 3 days ago.", status: "completed" },
  { id: 15, date: "2025-07-12", time: "7:30 PM", doctor: "Dr. Thompson", purpose: "Mental Health", notes: "First therapy session.", status: "upcoming" },
  { id: 16, date: "2025-07-13", time: "11:30 AM", doctor: "Dr. Garcia", purpose: "Blood Test", notes: "Routine screening.", status: "upcoming" },
  { id: 17, date: "2025-07-14", time: "1:45 PM", doctor: "Dr. Martinez", purpose: "Nutrition Counseling", notes: "Bring food diary.", status: "upcoming" },
  { id: 18, date: "2025-07-15", time: "8:00 AM", doctor: "Dr. Robinson", purpose: "Cardiology", notes: "ECG results review.", status: "upcoming" },
  { id: 19, date: "2025-07-16", time: "3:30 PM", doctor: "Dr. Clark", purpose: "Injury Review", notes: "Leg swelling persists.", status: "upcoming" },
  { id: 20, date: "2025-07-17", time: "6:15 PM", doctor: "Dr. Rodriguez", purpose: "Allergy Test", notes: "No antihistamines 48h before.", status: "upcoming" }
];
const initialPrescriptions = [
  {
    id: 201,
    date: "2025-07-01",
    doctor: "Dr. Priya Sharma",
    doctorPhoto: "https://randomuser.me/api/portraits/women/44.jpg",
    status: "active",
    medicines: [
      { name: "Paracetamol", dosage: "500mg", icon: <BsCapsule />, duration: 5, taken: 3 },
      { name: "Cetrizine", dosage: "10mg", icon: <BsCapsule />, duration: 3, taken: 2 },
    ],
    notes: "Strictly follow the medicine schedule.",
    refillAvailable: true,
  },
  {
    id: 202,
    date: "2025-06-15",
    doctor: "Dr. Ravi Mehta",
    doctorPhoto: "https://randomuser.me/api/portraits/men/32.jpg",
    status: "completed",
    medicines: [
      { name: "Metformin", dosage: "850mg", icon: <BsCapsule />, duration: 10, taken: 10 },
      { name: "Losartan", dosage: "50mg", icon: <BsCapsule />, duration: 10, taken: 10 },
    ],
    notes: "Patient showed good response to treatment.",
    refillAvailable: false,
  },
  {
    id: 203,
    date: "2025-07-03",
    doctor: "Dr. Anjali Verma",
    doctorPhoto: "https://randomuser.me/api/portraits/women/68.jpg",
    status: "active",
    medicines: [
      { name: "Levothyroxine", dosage: "75mcg", icon: <BsCapsule />, duration: 30, taken: 2 },
      { name: "Vitamin D3", dosage: "1000 IU", icon: <BsCapsule />, duration: 30, taken: 2 },
    ],
    notes: "Take tablets early in the morning before food.",
    refillAvailable: true,
  }
  // ... your prescriptions here ...
];
const initialBloodReports = [
  {
    id: 1,
    name: "Complete Blood Count",
    type: "blood",
    date: "2025-06-20",
    doctor: "Dr. Priya Sharma",
    critical: false,
    status: "Normal",
    notes: "Patient should monitor hydration levels.",
    value: 13.2,
    normalRange: [12, 16],
    icon: <MdBloodtype />,
  },
  {
    id: 2,
    name: "Liver Function Test",
    type: "liver",
    date: "2025-05-10",
    doctor: "Dr. Priya Sharma",
    critical: true,
    status: "Critical",
    notes: "Continue medication for liver support.",
    value: 55,
    normalRange: [20, 40],
    icon: <MdHealing />,
  },
  {
    id: 3,
    name: "Kidney Function Test",
    type: "kidney",
    date: "2025-06-15",
    doctor: "Dr. Ravi Mehta",
    critical: false,
    status: "Slightly High",
    notes: "Recommend reducing salt intake.",
    value: 1.4,
    normalRange: [0.6, 1.3],
    icon: <MdOpacity />,
  },
  {
    id: 4,
    name: "Thyroid Profile",
    type: "thyroid",
    date: "2025-04-28",
    doctor: "Dr. Anjali Verma",
    critical: false,
    status: "Normal",
    notes: "No abnormality detected.",
    value: 2.1,
    normalRange: [0.5, 4.0],
    icon: <MdHealing />,
  },
  {
    id: 5,
    name: "Vitamin D Test",
    type: "vitamin",
    date: "2025-06-01",
    doctor: "Dr. Priya Sharma",
    critical: true,
    status: "Deficient",
    notes: "Start vitamin D supplements immediately.",
    value: 18,
    normalRange: [30, 100],
    icon: <MdWbSunny />,
  }
  // ... your blood reports here ...
];
const initialMedicalHistory = [
  {
    "id": 1,
    "date": "2025-06-28",
    "reason": "Fever",
    "doctor": "Dr. Sharma",
    "prescription": "Paracetamol",
    "report": {
      "fileName": "report1.pdf",
      "url": "https://morth.nic.in/sites/default/files/dd12-13_0.pdf",
      "uploadedAt": "2025-06-28T09:00:00Z"
    }
  },
  {
    "id": 2,
    "date": "2025-05-15",
    "reason": "Back Pain",
    "doctor": "Dr. Rao",
    "notes": "Advised MRI",
    "report": null
  },
  {
    "id": 3,
    "date": "2025-01-01",
    "reason": "Diabetes Checkup",
    "report": {
      "fileName": "glucometer_data.pdf",
      "url": "https://your-server.com/uploads/reports/glucometer_data.pdf",
      "uploadedAt": "2025-01-01T10:30:00Z"
    }
  }
  // ... your medical history here ...
];

function App() {
  const [user, setUser] = useState({
    name: "Jane Doe",
    email: "janedoe@gmail.com",
    avatarUrl: "",
    phone: ""
  });

  // --- CENTRALIZED DATA STATE ---
  const [appointments, setAppointments] = useState(initialAppointments);
  const [prescriptions, setPrescriptions] = useState(initialPrescriptions);
  const [bloodReports, setBloodReports] = useState(initialBloodReports);
  const [medicalHistory, setMedicalHistory] = useState(initialMedicalHistory);

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
      </div>
    </Router>
  );
}

export default App;
