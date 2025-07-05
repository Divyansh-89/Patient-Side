import React, { useState } from "react";
import "./ReportsPage.css";
import Sidebar from "./Sidebar";
import SearchFilterBar from "./SearchFilterBar";
import PrescriptionCard from "./PrescriptionCard";
import ReportQuickViewModal from "./ReportQuickViewModal";
import Modal from "./Modal";
import ReportCard from "./ReportCard";

import {
  FiFilter, FiSearch, FiDownload,
  FiHome, FiMenu
} from "react-icons/fi";
import { BsCapsule } from "react-icons/bs";
import {
  MdBloodtype, MdHealing, MdOutlineTimeline, MdOpacity, MdWbSunny
} from "react-icons/md";

const prescriptionStatuses = [
  { key: "active", label: "Active" },
  { key: "expired", label: "Expired" },
];
const reportTypes = [
  { key: "blood", label: "Blood Test", icon: <MdBloodtype /> },
  { key: "liver", label: "Liver Function", icon: <MdHealing /> },
  { key: "imaging", label: "Imaging", icon: <MdOutlineTimeline /> },
];
const bloodReports = [
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
  },
];

const prescriptions = [
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
  },
];
export default function ReportsPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
  const [activeSection, setActiveSection] = useState("home");
  const [filters, setFilters] = useState({ type: null, prescriptionStatus: null });
  const [search, setSearch] = useState("");
  const [quickViewReport, setQuickViewReport] = useState(null);

  const filteredReports = bloodReports.filter(r =>
    (!filters.type || r.type === r.type) &&
    (r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.doctor.toLowerCase().includes(search.toLowerCase()) ||
      r.date.includes(search))
  );

  const filteredPrescriptions = prescriptions.filter(p =>
    (!filters.prescriptionStatus || p.status === p.status) &&
    (p.doctor.toLowerCase().includes(search.toLowerCase()) ||
      p.date.includes(search) ||
      p.medicines.some(med => med.name.toLowerCase().includes(search.toLowerCase())))
  );

  return (
    <div className="reports-dashboard-root">
      <Sidebar
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
        active={activeSection}
        setActive={setActiveSection}
      />
      <main className="dashboard-main">
        {(activeSection === "home" || activeSection === "reports") && (
          <section className="section-card">
            <h2 className="gradient-heading">
              <span className="heading-dark">Reports</span>
              <span className="heading-blue">&nbsp;& Prescriptions</span>
            </h2>
            <SearchFilterBar search={search} setSearch={setSearch} />
            <div className="reports-list">
              {filteredReports.map(report => (
                <ReportCard key={report.id} report={report} onQuickView={setQuickViewReport} />
              ))}
            </div>
          </section>
        )}
        {(activeSection === "home" || activeSection === "prescriptions") && (
          <section className="section-card">
            <h2 className="gradient-heading">
              <span className="heading-dark">Prescriptions</span>
            </h2>
            <div className="prescriptions-list">
              {filteredPrescriptions.map(p => (
                <PrescriptionCard key={p.id} prescription={p} />
              ))}
            </div>
          </section>
        )}
      </main>
      <ReportQuickViewModal report={quickViewReport} onClose={() => setQuickViewReport(null)} />
    </div>
  );
}