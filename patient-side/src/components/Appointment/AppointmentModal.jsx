import React from "react";

export default function AppointmentModal({
  show,
  onClose,
  onSubmit,
  newAppointment,
  setNewAppointment,
  availableDoctors
}) {
  React.useEffect(() => {
    if (!show) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onClick={e => e.stopPropagation()}
      >
        <h3 id="modal-title">Create New Appointment</h3>
        <form className="create-appointment-form" onSubmit={onSubmit}>
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
            <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}
