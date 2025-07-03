import React, { useState } from "react";
import "./AppointmentsPage.css";
import { toast } from 'react-toastify';

export default function AppointmentsPage() {
  const [tab, setTab] = useState("upcoming");
  const [fading, setFading] = useState(false);

  const [appointments, setAppointments] = useState([
    { id: 1, date: "2025-07-05", time: "10:00 AM", doctor: "Dr. Smith", purpose: "General Checkup", notes: "Bring previous reports.", status: "upcoming" },
    { id: 2, date: "2025-07-02", time: "11:00 PM", doctor: "Dr. Johnson", purpose: "General Checkup", notes: "Annual physical.", status: "upcoming" },
    { id: 3, date: "2025-06-30", time: "9:30 AM", doctor: "Dr. Williams", purpose: "Dental Cleaning", notes: "Avoid food before visit.", status: "completed" },
    { id: 4, date: "2025-07-01", time: "1:00 PM", doctor: "Dr. Brown", purpose: "Eye Exam", notes: "Bring eyeglasses.", status: "completed" },
    { id: 5, date: "2025-07-06", time: "3:00 PM", doctor: "Dr. Davis", purpose: "Skin Rash", notes: "Affected area is spreading.", status: "upcoming" },
    { id: 6, date: "2025-07-07", time: "11:00 AM", doctor: "Dr. Wilson", purpose: "Back Pain", notes: "Chronic pain for 2 weeks.", status: "upcoming" },
    { id: 7, date: "2025-06-28", time: "2:00 PM", doctor: "Dr. Moore", purpose: "ENT Checkup", notes: "Mild hearing loss.", status: "completed" },
    { id: 8, date: "2025-07-09", time: "4:30 PM", doctor: "Dr. Taylor", purpose: "Follow-up", notes: "After surgery follow-up.", status: "upcoming" },
    { id: 9, date: "2025-07-10", time: "12:00 PM", doctor: "Dr. Anderson", purpose: "Diabetes Management", notes: "Check glucose logs.", status: "upcoming" },
    { id: 10, date: "2025-07-03", time: "10:45 AM", doctor: "Dr. Thomas", purpose: "Vaccination", notes: "COVID-19 booster dose.", status: "completed" },
    { id: 11, date: "2025-07-11", time: "9:00 AM", doctor: "Dr. Jackson", purpose: "Chest Pain", notes: "Urgent consultation.", status: "upcoming" },
    { id: 12, date: "2025-07-04", time: "5:00 PM", doctor: "Dr. White", purpose: "Thyroid Test", notes: "Fasting required.", status: "upcoming" },
    { id: 13, date: "2025-07-08", time: "2:15 PM", doctor: "Dr. Harris", purpose: "Migraine", notes: "Frequent headaches.", status: "upcoming" },
    { id: 14, date: "2025-06-29", time: "6:00 PM", doctor: "Dr. Martin", purpose: "Stomach Ache", notes: "Onset 3 days ago.", status: "completed" },
    { id: 15, date: "2025-07-12", time: "7:30 PM", doctor: "Dr. Thompson", purpose: "Mental Health", notes: "First therapy session.", status: "upcoming" },
    { id: 16, date: "2025-07-13", time: "11:30 AM", doctor: "Dr. Garcia", purpose: "Blood Test", notes: "Routine screening.", status: "upcoming" },
    { id: 17, date: "2025-07-14", time: "1:45 PM", doctor: "Dr. Martinez", purpose: "Nutrition Counseling", notes: "Bring food diary.", status: "upcoming" },
    { id: 18, date: "2025-07-15", time: "8:00 AM", doctor: "Dr. Robinson", purpose: "Cardiology", notes: "ECG results review.", status: "upcoming" },
    { id: 19, date: "2025-07-16", time: "3:30 PM", doctor: "Dr. Clark", purpose: "Injury Review", notes: "Leg swelling persists.", status: "upcoming" },
    { id: 20, date: "2025-07-17", time: "6:15 PM", doctor: "Dr. Rodriguez", purpose: "Allergy Test", notes: "No antihistamines 48h before.", status: "upcoming" }
  ]);

  const availableDoctors = [
    { doctor: "Dr. Smith", timings: "10:00 AM - 2:00 PM" },
    { doctor: "Dr. Patel", timings: "2:00 PM - 6:00 PM" },
    { doctor: "Dr. Lee", timings: "11:30 AM - 4:00 PM" },
    { doctor: "Dr. Johnson", timings: "9:00 AM - 12:00 PM" }
  ];

  const [showModal, setShowModal] = useState(false);
  const [newAppointment, setNewAppointment] = useState({
    date: "",
    time: "",
    doctor: "",
    purpose: "",
    notes: "",
    status: "upcoming"
  });

  const isToday = (dateStr) => {
    const today = new Date().toISOString().split("T")[0];
    return dateStr === today;
  };

  const filteredAppointments = appointments.filter((appt) => {
    const today = new Date();
    const apptDate = new Date(appt.date);
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
