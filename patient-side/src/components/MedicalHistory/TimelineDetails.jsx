import React from "react";
import TimelineReportButton from "./TimelineReportButton";

export default function TimelineDetails({ item, open, onViewPdf }) {
  return (
    <div className={`simple-timeline-details${open ? ' open' : ''}`}>
      <div><b>Reason:</b> {item.reason}</div>
      {item.doctor && <div><b>Doctor:</b> {item.doctor}</div>}
      {item.prescription && <div><b>Prescription:</b> {item.prescription}</div>}
      {item.notes && <div><b>Notes:</b> {item.notes}</div>}
      {item.report && (
        <div>
          <b>Report:</b>
          <TimelineReportButton report={item.report} onClick={() => onViewPdf(item)} />
        </div>
      )}
    </div>
  );
}
