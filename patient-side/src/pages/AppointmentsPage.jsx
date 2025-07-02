import React, { useState } from "react";
import "./AppointmentsPage.css";

export default function AppointmentsPage() {
  const [tab, setTab] = useState("upcoming");
  const [fading, setFading] = useState(false);

  const mockAppointments = [
    {
      id: 1,
      date: "2025-07-05",
      time: "10:00 AM",
      doctor: "Dr. Smith",
      purpose: "General Checkup",
      notes: "Bring previous reports.",
      status: "upcoming"
    },
    {
      id: 2,
      date: "2025-06-25",
      time: "2:00 PM",
      doctor: "Dr. Patel",
      purpose: "Dental Cleaning",
      notes: "All clear.",
      status: "past"
    },
    {
      id: 3,
      date: "2025-07-10",
      time: "11:30 AM",
      doctor: "Dr. Lee",
      purpose: "Eye Checkup",
      notes: "Check for new glasses.",
      status: "upcoming"
    },
    {
      id: 4,
      date: "2025-06-15",
      time: "9:00 AM",
      doctor: "Dr. Johnson",
      purpose: "Blood Test",
      notes: "Fasting required.",
      status: "past"
    },
    {
      id: 5,
      date: "2025-07-03", // Set this to today for demo!
      time: "9:00 AM",
      doctor: "Dr. Johnson",
      purpose: "",
      notes: "Fasting required.",
      status: "upcoming"
    },
    {
      id: 6,
      date: "2025-07-12",
      time: "1:00 PM",
      doctor: "Dr. Adams",
      purpose: "Skin Check",
      notes: "Use sunscreen.",
      status: "upcoming"
    },
    {
      id: 7,
      date: "2025-07-15",
      time: "3:30 PM",
      doctor: "Dr. Baker",
      purpose: "Physiotherapy",
      notes: "Bring previous X-rays.",
      status: "upcoming"
    },
    {
      id: 8,
      date: "2025-06-10",
      time: "11:00 AM",
      doctor: "Dr. Clark",
      purpose: "Eye Surgery Follow-up",
      notes: "Check healing.",
      status: "past"
    },
    {
      id: 9,
      date: "2025-06-20",
      time: "9:30 AM",
      doctor: "Dr. Davis",
      purpose: "Dental Filling",
      notes: "Avoid hard food.",
      status: "past"
    },
    {
      id: 10,
      date: "2025-07-18",
      time: "2:00 PM",
      doctor: "Dr. Evans",
      purpose: "Nutritionist",
      notes: "Discuss diet plan.",
      status: "upcoming"
    },
    {
      id: 11,
      date: "2025-07-20",
      time: "10:30 AM",
      doctor: "Dr. Foster",
      purpose: "Cardiology",
      notes: "Bring ECG reports.",
      status: "upcoming"
    },
    {
      id: 12,
      date: "2025-06-05",
      time: "1:30 PM",
      doctor: "Dr. Green",
      purpose: "Blood Pressure Check",
      notes: "Monitor daily.",
      status: "past"
    },
    {
      id: 13,
      date: "2025-06-30",
      time: "4:00 PM",
      doctor: "Dr. Harris",
      purpose: "Orthopedics",
      notes: "X-ray required.",
      status: "past"
    },
    {
      id: 14,
      date: "2025-07-22",
      time: "9:00 AM",
      doctor: "Dr. Irving",
      purpose: "Vaccination",
      notes: "Bring vaccination card.",
      status: "upcoming"
    },
    {
      id: 15,
      date: "2025-07-02",
      time: "11:00 PM",
      doctor: "Dr. Johnson",
      purpose: "General Checkup",
      notes: "Annual physical.",
      status: "upcoming"
    }
  ];

  // Utility to check if a date is today
  const isToday = (dateStr) => {
    const today = new Date().toISOString().split("T")[0];
    return dateStr === today;
  };

  const filteredAppointments = mockAppointments.filter(
    (appt) => appt.status === tab
  );

  const handleTabSwitch = (newTab) => {
    if (tab === newTab) return;
    setFading(true);
    setTimeout(() => {
      setTab(newTab);
      setFading(false);
    }, 180);
  };

  const sortedAppointments = [...filteredAppointments].sort((a, b) => {
    if (tab === "upcoming") return new Date(a.date) - new Date(b.date);
    return new Date(b.date) - new Date(a.date);
  });

  return (
    <div className="AppointmentsPage-root">
      <div className="tabs">
        <button
          onClick={() => handleTabSwitch("upcoming")}
          className={`tab-btn${tab === "upcoming" ? " active" : ""}`}
        >
          Upcoming
        </button>
        <button
          onClick={() => handleTabSwitch("past")}
          className={`tab-btn${tab === "past" ? " active" : ""}`}
        >
          Past
        </button>
      </div>
      <div className={`appointment-list${fading ? " fade" : ""}`}>
        {sortedAppointments.length === 0 ? (
          <div className="empty-state">No {tab} appointments.</div>
        ) : (
          sortedAppointments.map((appt) => (
            <div
              className={`appointment-card${isToday(appt.date) ? " today" : ""}`}
              key={appt.id}
            >
              <div>
                <strong>{appt.date}</strong> at {appt.time}
              </div>
              <div>
                <span className="doctor">{appt.doctor}</span>
                <span className="purpose">— {appt.purpose || "No purpose provided"}</span>
              </div>
              <div className="notes">{appt.notes}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
