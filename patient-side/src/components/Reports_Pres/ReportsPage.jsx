import React, { useState } from "react";
import "./ReportsPage.css";
import Sidebar from "./Sidebar";
import SearchFilterBar from "./SearchFilterBar";
import PrescriptionCard from "./PrescriptionCard";
import ReportQuickViewModal from "./ReportQuickViewModal";
import Modal from "./Modal";
import ReportCard from "./ReportCard";
import bloodReports from "../../data/Reports";
import prescriptions from "../../data/prescriptions";
import { BsCapsule } from "react-icons/bs";
import {
  MdBloodtype, MdHealing, MdOutlineTimeline, MdOpacity, MdWbSunny
} from "react-icons/md";

const iconMap = {
  MdBloodtype,
  MdHealing,
  MdOutlineTimeline,
  MdOpacity,
  MdWbSunny,
  BsCapsule,
};

const prescriptionStatuses = [
  { key: "active", label: "Active" },
  { key: "expired", label: "Expired" },
];

const reportTypes = [
  { key: "blood", label: "Blood Test", icon: "MdBloodtype" },
  { key: "liver", label: "Liver Function", icon: "MdHealing" },
  { key: "imaging", label: "Imaging", icon: "MdOutlineTimeline" },
];

export default function ReportsPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
  const [activeSection, setActiveSection] = useState("home");
  const [filters, setFilters] = useState({ type: null, prescriptionStatus: null });
  const [search, setSearch] = useState("");
  const [quickViewReport, setQuickViewReport] = useState(null);

  const filteredReports = bloodReports.filter(r =>
    (!filters.type || r.type === filters.type) &&
    (r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.doctor.toLowerCase().includes(search.toLowerCase()) ||
      r.date.includes(search))
  );

  const filteredPrescriptions = prescriptions.filter(p =>
    (!filters.prescriptionStatus || p.status === filters.prescriptionStatus) &&
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
                <ReportCard
                  key={report.id}
                  report={report}
                  onQuickView={setQuickViewReport}
                  iconMap={iconMap}
                  reportTypes={reportTypes}
                />
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
                <PrescriptionCard
                  key={p.id}
                  prescription={p}
                  iconMap={iconMap}
                />
              ))}
            </div>
          </section>
        )}
      </main>
      <ReportQuickViewModal
        report={quickViewReport}
        onClose={() => setQuickViewReport(null)}
        iconMap={iconMap}
        reportTypes={reportTypes}
      />
    </div>
  );
}
