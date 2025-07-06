import React from "react";
import { MdBloodtype, MdOutlineEvent, MdReport, MdAlarm } from "react-icons/md";

export default function StatsCards({ appointments, prescriptions, bloodReports }) {
  const today = new Date();
  const activePrescriptions = prescriptions.filter(p => p.status === "active").length;

  const upcomingAppointments = appointments
    .filter(a => new Date(a.date) >= today && a.status === "upcoming")
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  const nextAppointment = upcomingAppointments[0];

  let nextAppointmentDisplayValue;
  if (nextAppointment) {
    const doctorName = nextAppointment.doctor;
    const appointmentDate = new Date(nextAppointment.date).toLocaleDateString();
    const appointmentTime = nextAppointment.time || 'N/A';
    nextAppointmentDisplayValue = (
      <span className="appointment-info-text">
        {`${doctorName} - ${appointmentDate} at ${appointmentTime}`}
      </span>
    );
  } else {
    nextAppointmentDisplayValue = "None";
  }

  const sevenDaysAgo = new Date(today);
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  const newReports = bloodReports.filter(r => new Date(r.date) >= sevenDaysAgo).length;

  const refillAlerts = prescriptions.filter(p =>
    p.status === "active" &&
    p.medicines?.some(m => (m.duration - (m.taken || 0)) <= 2)
  ).length;

  const stats = [
    {
      icon: <MdBloodtype size={32} color="#2563eb" />,
      label: "Active Prescriptions",
      value: activePrescriptions,
    },
    {
      icon: <MdOutlineEvent size={32} color="#10b981" />,
      label: "Upcoming Appointment",
      value: nextAppointmentDisplayValue,
    },
    {
      icon: <MdReport size={32} color="#1e40af" />,
      label: "New Reports",
      value: newReports,
    },
    {
      icon: <MdAlarm size={32} color="#dc2626" />,
      label: "Refill Alerts",
      value: refillAlerts,
    }
  ];

  return (
    <div className="dashboard-stats-grid-container">
      <div className="dashboard-stats-grid">
        {stats.map((stat, idx) => (
          <div className="dashboard-stat-card" key={idx}>
            <div className="dashboard-stat-header">
              <span className="dashboard-stat-icon">{stat.icon}</span>
              <div className="dashboard-stat-label">{stat.label}</div>
            </div>
            <div className="dashboard-stat-value">{stat.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
