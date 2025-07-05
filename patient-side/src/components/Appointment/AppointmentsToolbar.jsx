import React from "react";

export default function AppointmentsToolbar({ tab, onTabSwitch, onNew }) {
  return (
    <div className="appointments-toolbar">
      <div className="tabs">
        <button
          onClick={() => onTabSwitch("upcoming")}
          className={`tab-btn${tab === "upcoming" ? " active" : ""}`}
        >
          Upcoming
        </button>
        <button
          onClick={() => onTabSwitch("past")}
          className={`tab-btn${tab === "past" ? " active" : ""}`}
        >
          Past
        </button>
      </div>
      <button className="create-btn" onClick={onNew}>
        + New Appointment
      </button>
    </div>
  );
}
