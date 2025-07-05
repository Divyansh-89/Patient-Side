import React from "react";
import AppointmentCard from "./AppointmentCard";

export default function AppointmentList({ appointments, isToday, formatTime, fading, tab }) {
  if (appointments.length === 0) {
    return <div className="empty-state">No {tab} appointments.</div>;
  }
  return (
    <div className={`appointment-list${fading ? " fade" : ""}`}>
      {appointments.map(appt => (
        <AppointmentCard
          key={appt.id}
          appt={appt}
          isToday={isToday}
          formatTime={formatTime}
        />
      ))}
    </div>
  );
}
