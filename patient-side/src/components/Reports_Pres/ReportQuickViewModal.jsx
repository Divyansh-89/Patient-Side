import React from "react";
import Modal from "./Modal";
import { FiDownload } from "react-icons/fi";
import {
  MdBloodtype,
  MdHealing,
  MdOutlineTimeline,
  MdOpacity,
  MdWbSunny
} from "react-icons/md";

const iconMap = {
  MdBloodtype,
  MdHealing,
  MdOutlineTimeline,
  MdOpacity,
  MdWbSunny,
};

const reportTypes = [
  { key: "blood", label: "Blood Test", icon: "MdBloodtype" },
  { key: "liver", label: "Liver Function", icon: "MdHealing" },
  { key: "imaging", label: "Imaging", icon: "MdOutlineTimeline" }
];

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

export default function ReportQuickViewModal({ report, onClose }) {
  if (!report) return null;

  // Find the type info and icon
  const matchedType = reportTypes.find((t) => t.key === report.type);
  // Prefer the type's icon, fall back to report.icon if present
  const iconKey = matchedType?.icon || report.icon;
  const Icon = iconMap[iconKey];
  const reportLabel = matchedType?.label || report.type;

  return (
    <Modal open={!!report} onClose={onClose}>
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <span className="report-icon" style={{ fontSize: "2.5rem" }}>
          {Icon && <Icon />}
        </span>
        <div>
          <div className="report-name" style={{ fontSize: "1.35rem" }}>
            {report.name}
          </div>
          <div className="report-type-badge">{reportLabel}</div>
        </div>
      </div>

      <div style={{ margin: "1.2rem 0" }}>
        <b>Date:</b> {report.date} <br />
        <b>Doctor:</b> {report.doctor}
      </div>

      <div style={{ marginBottom: "1.2rem" }}>
        <div className="modal-info-row modal-status-row">
          <b>Status:</b>{" "}
          <span
            className={`report-status-badge ${report.status.toLowerCase()}`}
          >
            {report.status}
          </span>
        </div>
      </div>

      <div style={{ marginBottom: "1.2rem" }}>
        <b>Notes:</b> {report.notes}
      </div>

      <div className="mini-chart-bar">
        <div className="mini-chart-label">
          Value: <b>{report.value}</b> (Normal: {report.normalRange[0]}–
          {report.normalRange[1]})
        </div>
        <div className="mini-chart-track">
          <div
            className="mini-chart-bar-inner"
            style={{
              width: `${Math.min(
                100,
                ((report.value - report.normalRange[0]) /
                  (report.normalRange[1] - report.normalRange[0])) *
                  100
              )}%`,
              background: report.critical ? "#ef4444" : "#22c55e"
            }}
          />
        </div>
      </div>

      <div className="modal-actions">
        <button
          className="modal-action-btn"
          onClick={() => handleDownload(report)}
        >
          <FiDownload /> Download
        </button>
      </div>
    </Modal>
  );
}
