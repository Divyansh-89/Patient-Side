import React from "react";
import {
  MdBloodtype, MdHealing, MdOutlineTimeline, MdOpacity, MdWbSunny
} from "react-icons/md";

const iconMap = {
  MdBloodtype,
  MdHealing,
  MdOutlineTimeline,
  MdOpacity,
  MdWbSunny,
};

const reportTypes = [
  { key: "blood", label: "Blood Test" },
  { key: "liver", label: "Liver Function" },
  { key: "imaging", label: "Imaging" },
];

export default function ReportCard({ report, onQuickView, iconMap: propIconMap, reportTypes: propReportTypes }) {

  const icons = propIconMap || iconMap;
  const types = propReportTypes || reportTypes;
  const Icon = icons[report.icon];

  return (
    <a
      href="#"
      onClick={e => { e.preventDefault(); onQuickView(report); }}
      className={`report-card-link ${report.critical ? "critical" : ""}`}
    >
      <div className="report-card">
        <span className="report-icon">
          {Icon && <Icon size={36} color="#2563eb" />}
        </span>
        <div className="report-main">
          <div className="report-name">{report.name}</div>
          <div className="report-type-badge">
            {types.find(t => t.key === report.type)?.label || report.type}
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
