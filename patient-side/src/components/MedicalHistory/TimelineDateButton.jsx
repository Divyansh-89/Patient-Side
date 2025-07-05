import React from "react";

function formatDate(dateStr) {
  const options = { day: '2-digit', month: 'short', year: 'numeric' };
  return new Date(dateStr).toLocaleDateString('en-GB', options);
}

export default function TimelineDateButton({ date, open, onClick }) {
  return (
    <button
      className={`simple-timeline-date${open ? ' active' : ''}`}
      onClick={onClick}
      aria-expanded={open}
    >
      <span role="img" aria-label="calendar">📅</span> {formatDate(date)}
      <span className="simple-arrow">{open ? '▲' : '▼'}</span>
    </button>
  );
}
