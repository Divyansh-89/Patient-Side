import React from "react";
import { reportTypes } from "./reportTypes"; // Export this from a shared file if needed

export default function ReportCard({ report, onQuickView }) {
  return (
    <a
      href="#"
      onClick={e => { e.preventDefault(); onQuickView(report); }}
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
