import React, { useState } from "react";
import ReactDOM from "react-dom";
import {
  FiFilter, FiSearch, FiDownload,
  FiHome, FiMenu
} from "react-icons/fi";
import { BsCapsule } from "react-icons/bs";
import {
  MdBloodtype, MdHealing, MdOutlineTimeline, MdOpacity, MdWbSunny
} from "react-icons/md";

const reportTypes = [
  { key: "blood", label: "Blood Test", icon: <MdBloodtype /> },
  { key: "liver", label: "Liver Function", icon: <MdHealing /> },
  { key: "imaging", label: "Imaging", icon: <MdOutlineTimeline /> },
];

const prescriptionStatuses = [
  { key: "active", label: "Active" },
  { key: "expired", label: "Expired" },
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

function Sidebar({ collapsed, setCollapsed, active, setActive }) {
  return (
    <aside className={`sidebar${collapsed ? " collapsed" : " expanded"}`}>
      <button className="sidebar-btn sidebar-toggle-main" onClick={() => setCollapsed(!collapsed)}>
        <FiMenu className="nav-icon" />
        {!collapsed && <span className="nav-label">Menu</span>}
      </button>
      <hr />
      <div className="sidebar-section">
        <button className={`sidebar-btn${active === "home" ? " active" : ""}`} onClick={() => setActive("home")}>
          <FiHome className="nav-icon" />
          {!collapsed && <span className="nav-label">Home</span>}
        </button>
        <button className={`sidebar-btn${active === "reports" ? " active" : ""}`} onClick={() => setActive("reports")}>
          <MdOutlineTimeline className="nav-icon" />
          {!collapsed && <span className="nav-label">Reports</span>}
        </button>
        <button className={`sidebar-btn${active === "prescriptions" ? " active" : ""}`} onClick={() => setActive("prescriptions")}>
          <BsCapsule className="nav-icon" />
          {!collapsed && <span className="nav-label">Prescriptions</span>}
        </button>
      </div>
    </aside>
  );
}

function SearchFilterBar({ search, setSearch }) {
  return (
    <div className="search-filter-bar">
      <FiSearch className="search-icon" />
      <input
        type="text"
        placeholder="Search by test, doctor, or date..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <button className="filter-btn">
        <FiFilter />
      </button>
    </div>
  );
}

function ReportCard({ report, onQuickView }) {
  return (
    <a
      href="#"
      onClick={(e) => {
        e.preventDefault();
        onQuickView(report);
      }}
      className={`report-card-link ${report.critical ? "critical" : ""}`}
    >
      <div className="report-card">
        <span className="report-icon">{report.icon}</span>
        <div className="report-main">
          <div className="report-name">{report.name}</div>
          <div className="report-type-badge">
            {reportTypes.find(t => t.key === report.type)?.label || report.type}
          </div>
          <div className={`report-status-badge ${report.status.toLowerCase()}`}>
            {report.status}
          </div>
        </div>
        <div className="report-date">{report.date}</div>
      </div>
    </a>
  );
}

function handleDownload(report) {
  if (!report) return;
  const content = `Report Name: ${report.name}
Date: ${report.date}
Doctor: ${report.doctor}
Status: ${report.status}
Notes: ${report.notes}
Value: ${report.value} (Normal Range: ${report.normalRange[0]}-${report.normalRange[1]})`;
  const blob = new Blob([content], { type: "text/plain" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `${report.name.replace(/ /g, "_")}_Report.txt`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function Modal({ open, onClose, children }) {
  if (!open) return null;
  return ReactDOM.createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        {children}
      </div>
    </div>,
    document.getElementById("modal-root")
  );
}

function ReportQuickViewModal({ report, onClose }) {
  if (!report) return null;
  return (
    <Modal open={!!report} onClose={onClose}>
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <span className="report-icon" style={{ fontSize: "2.5rem" }}>{report.icon}</span>
        <div>
          <div className="report-name" style={{ fontSize: "1.35rem" }}>{report.name}</div>
          <div className="report-type-badge">
            {reportTypes.find(t => t.key === report.type)?.label || report.type}
          </div>
        </div>
      </div>
      <div style={{ margin: "1.2rem 0" }}>
        <b>Date:</b> {report.date} <br />
        <b>Doctor:</b> {report.doctor}
      </div>
      <div style={{ marginBottom: "1.2rem" }}>
        <div className="modal-info-row modal-status-row">
          <b>Status:</b>{" "}
          <span className={`report-status-badge ${report.status.toLowerCase()}`}>{report.status}</span>
        </div>
      </div>
      <div style={{ marginBottom: "1.2rem" }}>
        <b>Notes:</b> {report.notes}
      </div>
      <div className="mini-chart-bar">
        <div className="mini-chart-label">
          Value: <b>{report.value}</b> (Normal: {report.normalRange[0]}–{report.normalRange[1]})
        </div>
        <div className="mini-chart-track">
          <div
            className="mini-chart-bar-inner"
            style={{
              width: `${Math.min(100, ((report.value - report.normalRange[0]) / (report.normalRange[1] - report.normalRange[0]) * 100))}%`,
              background: report.critical ? "#ef4444" : "#22c55e"
            }}
          />
        </div>
      </div>
      <div className="modal-actions">
        <button className="modal-action-btn" onClick={() => handleDownload(report)}>
          <FiDownload /> Download
        </button>
      </div>
    </Modal>
  );
}

function PrescriptionCard({ prescription }) {
  const [refillPercent, setRefillPercent] = useState(0);
  const progress = Math.round(
    (prescription.medicines.reduce((acc, m) => acc + (m.taken || 0), 0) /
      prescription.medicines.reduce((acc, m) => acc + m.duration, 0)) * 100
  );
  const handleRefill = () => {
    setRefillPercent(prev => Math.min(prev + 20, 100));
  };
  return (
    <div className="prescription-card">
      <div className="prescription-title-row">
        <img src={prescription.doctorPhoto} alt={prescription.doctor} className="doctor-photo" />
        <div>
          <div className="prescription-title">{prescription.doctor}</div>
          <div className="prescription-date">{prescription.date}</div>
        </div>
        <div className={`prescription-status ${prescription.status}`}>{prescription.status.toUpperCase()}</div>
      </div>
      <div className="prescription-info-row">
        <div className="prescription-medicines">
          <b>Medicines:</b>
          <ul>
            {prescription.medicines.map((m, i) => (
              <li key={i}>
                <span className="med-icon">{m.icon}</span>
                {m.name} {m.dosage}
                <span className="medicine-duration-badge">{m.duration} days</span>
                <span className="medicine-progress">{m.taken || 0}/{m.duration} taken</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="prescription-details">
          <div className="prescription-notes"><b>Notes:</b> {prescription.notes}</div>
          {prescription.refillAvailable && (
            <>
              <button className="refill-btn" onClick={handleRefill}>Refill Request</button>
              <div style={{ marginTop: "0.5rem", color: "#2563eb" }}>
                Refill Progress: <b>{refillPercent}%</b>
              </div>
            </>
          )}
        </div>
      </div>
      <div className="prescription-progress-bar">
        <div className="progress-bar-track">
          <div className="progress-bar-inner" style={{ width: `${progress}%` }} />
        </div>
        <span className="progress-label">{progress}% course completed</span>
      </div>
    </div>
  );
}

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
