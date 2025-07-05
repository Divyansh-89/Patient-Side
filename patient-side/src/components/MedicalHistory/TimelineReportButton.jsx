import React from "react";

export default function TimelineReportButton({ report, onClick }) {
  return (
    <button className="pdf-view-btn" onClick={onClick}>
      View PDF
    </button>
  );
}
