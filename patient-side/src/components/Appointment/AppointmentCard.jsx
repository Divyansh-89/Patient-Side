import React from "react";

export default function AppointmentCard({ appt, isToday, formatTime }) {
  return (
    <div className={`appointment-card${isToday(appt.date) ? " today" : ""}`}>
      <div>
        <strong>{appt.date}</strong> at {formatTime(appt.time)}
      </div>
      <div>
        <span className="doctor">{appt.doctor}</span>
        <span className="purpose">— {appt.purpose || "No purpose provided"}</span>
      </div>
      <div className="notes">{appt.notes}</div>
    </div>
  );
}
