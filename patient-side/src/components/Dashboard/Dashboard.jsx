import React, { useState } from "react";
import { FaSyncAlt } from "react-icons/fa";
import { MdBloodtype, MdOutlineEvent, MdReport, MdAlarm, MdHealing, MdOpacity, MdWbSunny } from "react-icons/md";
import './DashboardPage.css';
import defaultAvatar from '../../assets/istockphoto-610003972-612x612.jpg';

const healthQuotes = [
  "The groundwork for all happiness is good health.",
  "It is health that is real wealth and not pieces of gold and silver.",
  // ...more quotes...
];

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good Morning";
  if (hour < 18) return "Good Afternoon";
  return "Good Evening";
}

function getDailyQuoteIndex() {
  const today = new Date();
  return today.getDate() % healthQuotes.length;
}

// Utility: Get latest report for each type
function getLatestReportsByType(reports) {
  const latest = {};
  reports.forEach(r => {
    if (!latest[r.type] || new Date(r.date) > new Date(latest[r.type].date)) {
      latest[r.type] = r;
    }
  });
  return Object.values(latest);
}

// Optional: Map type to icon (add more as needed)
const typeIcons = {
  blood: <MdBloodtype style={{ color: "#2563eb", verticalAlign: "middle" }} />,
  liver: <MdHealing style={{ color: "#a16207", verticalAlign: "middle" }} />,
  kidney: <MdOpacity style={{ color: "#06b6d4", verticalAlign: "middle" }} />,
  thyroid: <MdHealing style={{ color: "#f43f5e", verticalAlign: "middle" }} />,
  vitamin: <MdWbSunny style={{ color: "#f59e42", verticalAlign: "middle" }} />,
};

const typeLabels = {
  blood: "Blood",
  liver: "Liver",
  thyroid: "Thyroid",
  vitamin: "Vitamin",
  kidney: "Kidney",
  // Add more as needed
};

export default function DashboardPage({ user, appointments = [], prescriptions = [], bloodReports = [] }) {
  const [quoteIndex, setQuoteIndex] = useState(getDailyQuoteIndex());
  const today = new Date();

  // --- Health Summary ---
  const latestReports = getLatestReportsByType(bloodReports);

  // --- Stats logic ---
  const activePrescriptions = prescriptions.filter(p => p.status === "active").length;
  const upcomingAppointments = appointments
    .filter(a => a.status === "upcoming" && new Date(a.date) >= today)
    .sort((a, b) => new Date(a.date) - new Date(b.date));
  const nextAppointment = upcomingAppointments[0];
  const nextAppointmentStr = nextAppointment
    ? `${nextAppointment.doctor} • ${nextAppointment.date}`
    : "None";
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
      bg: "stat-blue"
    },
    {
      icon: <MdOutlineEvent size={32} color="#10b981" />,
      label: "Upcoming Appointment",
      value: nextAppointmentStr,
      bg: "stat-green"
    },
    {
      icon: <MdReport size={32} color="#1e40af" />,
      label: "New Reports",
      value: newReports,
      bg: "stat-indigo"
    },
    {
      icon: <MdAlarm size={32} color="#dc2626" />,
      label: "Refill Alerts",
      value: refillAlerts,
      bg: "stat-red"
    }
  ];

  const handleRefreshQuote = () => {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * healthQuotes.length);
    } while (newIndex === quoteIndex && healthQuotes.length > 1);
    setQuoteIndex(newIndex);
  };

  return (
    <div>
      {/* --- Greetings & Quote Section --- */}
      <div className="welcome-section section-card">
        <img
          className="welcome-avatar"
          src={user.avatarUrl || defaultAvatar}
          alt={user.name}
        />
        <div className="welcome-content">
          <h1 className="gradient-heading">{getGreeting()}, {user.name}!</h1>
          <div className="welcome-tagline">
            Stay on track with your health today!
          </div>
          <div className="welcome-quote-widget">
            <span className="welcome-quote">
              “{healthQuotes[quoteIndex]}”
            </span>
            <button
              className="welcome-quote-refresh"
              aria-label="Refresh quote"
              onClick={handleRefreshQuote}
              title="Show another quote"
            >
              <FaSyncAlt />
            </button>
          </div>
        </div>
      </div>

      {/* --- Health Summary Card --- */}
      <div className="dashboard-stat-card stat-purple">
        <div className="dashboard-stat-label" style={{ fontWeight: 600 }}>
          Health Summary
        </div>
        <div className="dashboard-stat-value" style={{ display: "flex", flexWrap: "wrap", gap: "1.5em" }}>
          {latestReports.length === 0 ? (
            <span>No reports available.</span>
          ) : (
            latestReports.map(report => (
              <span key={report.type}>
                {typeIcons[report.type] && <span style={{ marginRight: 4 }}>{typeIcons[report.type]}</span>}
                {typeLabels[report.type] || report.type.charAt(0).toUpperCase() + report.type.slice(1)}:{" "}
                <b>{report.value}</b>
                {report.status ? ` (${report.status})` : ""}
              </span>
            ))
          )}
        </div>
      </div>

      {/* --- Stats Cards Section --- */}
      <div className="dashboard-stats-grid">
        {stats.map((stat, idx) => (
          <div className={`dashboard-stat-card ${stat.bg}`} key={idx}>
            <span className="dashboard-stat-icon">{stat.icon}</span>
            <div className="dashboard-stat-value">{stat.value}</div>
            <div className="dashboard-stat-label">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
