import React, { useState } from "react";
import "./AppointmentsPage.css";
import { toast } from 'react-toastify';

export default function AppointmentsPage() {
  const [tab, setTab] = useState("upcoming");
  const [fading, setFading] = useState(false);

  // Store appointments in state
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      date: "2025-07-05",
      time: "10:00 AM",
      doctor: "Dr. Smith",
      purpose: "General Checkup",
      notes: "Bring previous reports.",
      status: "upcoming"
    },
    // ... (add the rest of your appointments here)
    {
      id: 15,
      date: "2025-07-02",
      time: "11:00 PM",
      doctor: "Dr. Johnson",
      purpose: "General Checkup",
      notes: "Annual physical.",
      status: "upcoming"
    }
  ]);

  const availableDoctors = [
    { doctor: "Dr. Smith", timings: "10:00 AM - 2:00 PM" },
    { doctor: "Dr. Patel", timings: "2:00 PM - 6:00 PM" },
    { doctor: "Dr. Lee", timings: "11:30 AM - 4:00 PM" },
    { doctor: "Dr. Johnson", timings: "9:00 AM - 12:00 PM" }
  ];

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [newAppointment, setNewAppointment] = useState({
    date: "",
    time: "",
    doctor: "",
    purpose: "",
    notes: "",
    status: "upcoming"
  });

  // Utility to check if a date is today
  const isToday = (dateStr) => {
    const today = new Date().toISOString().split("T")[0];
    return dateStr === today;
  };

  const filteredAppointments = appointments.filter((appt) => {
    const today = new Date();
    const apptDate = new Date(appt.date);

    // Remove time from today for pure date comparison
    today.setHours(0, 0, 0, 0);
    apptDate.setHours(0, 0, 0, 0);

    if (tab === "upcoming") {
      return apptDate >= today;
    } else if (tab === "past") {
      return apptDate < today;
    }
    return true;
  });


  function formatTime(timeStr) {
    if (!timeStr) return "";
    if (/[AP]M$/i.test(timeStr)) return timeStr;
    const [hourStr, minute] = timeStr.split(":");
    let hour = parseInt(hourStr, 10);
    if (isNaN(hour)) return timeStr;
    const ampm = hour >= 12 ? "PM" : "AM";
    hour = hour % 12 || 12;
    return `${hour}:${minute} ${ampm}`;
  }
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

  const handleCreateAppointment = (e) => {
    e.preventDefault();
    setAppointments([
      ...appointments,
      {
        ...newAppointment,
        id: appointments.length + 1
      }
    ]);
    setShowModal(false);
    setNewAppointment({
      date: "",
      time: "",
      doctor: "",
      purpose: "",
      notes: "",
      status: "upcoming"
    });
    toast.success("Appointment created!");
  };

  // Optional: handle Esc key to close modal
  React.useEffect(() => {
    if (!showModal) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") setShowModal(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [showModal]);

  return (
    <div className="AppointmentsPage-root">
      {/* Toolbar with tabs and create button */}
      <div className="appointments-toolbar">
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
        <button className="create-btn" onClick={() => setShowModal(true)}>
          + New Appointment
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div
            className="modal-content"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            onClick={e => e.stopPropagation()}
          >
            <h3 id="modal-title">Create New Appointment</h3>
            <form className="create-appointment-form" onSubmit={handleCreateAppointment}>
              <div className="create-appointment-form-row">
                <div>
                  <label htmlFor="date">Date</label>
                  <input
                    id="date"
                    type="date"
                    value={newAppointment.date}
                    onChange={e => setNewAppointment({ ...newAppointment, date: e.target.value })}
                    required
                    autoFocus
                  />
                </div>
                <div>
                  <label htmlFor="time">Time</label>
                  <input
                    id="time"
                    type="time"
                    value={newAppointment.time}
                    onChange={e => setNewAppointment({ ...newAppointment, time: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="doctor">Doctor</label>
                  <select
                    id="doctor"
                    value={newAppointment.doctor}
                    onChange={e => setNewAppointment({ ...newAppointment, doctor: e.target.value })}
                    required
                  >
                    <option value="">Select a doctor</option>
                    {availableDoctors.map((doc, idx) => (
                      <option key={idx} value={doc.doctor}>
                        {doc.doctor} ({doc.timings})
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="create-appointment-form-row">
                <div>
                  <label htmlFor="purpose">Purpose</label>
                  <input
                    id="purpose"
                    type="text"
                    placeholder="Purpose"
                    value={newAppointment.purpose}
                    onChange={e => setNewAppointment({ ...newAppointment, purpose: e.target.value })}
                  />
                </div>
                <div className="create-appointment-notes">
                  <label htmlFor="notes">Notes</label>
                  <textarea
                    id="notes"
                    placeholder="Notes"
                    value={newAppointment.notes}
                    onChange={e => setNewAppointment({ ...newAppointment, notes: e.target.value })}
                  />
                </div>
              </div>

              <div className="modal-available-doctors">
                <div className="modal-available-title">Available Doctors & Timings:</div>
                <ul>
                  {availableDoctors.map((doc, idx) => (
                    <li key={idx}>
                      <span className="doctor-name">{doc.doctor}</span>
                      <span className="doctor-time">{doc.timings}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="modal-actions">
                <button type="submit" className="create-btn">Create</button>
                <button type="button" className="cancel-btn" onClick={() => setShowModal(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

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
                <strong>{appt.date}</strong> at {formatTime(appt.time)}
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
