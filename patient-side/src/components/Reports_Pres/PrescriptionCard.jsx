import React, { useState } from "react";

export default function PrescriptionCard({ prescription }) {
  const [refillPercent, setRefillPercent] = useState(0);
  const progress = Math.round(
    (prescription.medicines.reduce((acc, m) => acc + (m.taken || 0), 0) /
      prescription.medicines.reduce((acc, m) => acc + m.duration, 0)) * 100
  );
  const handleRefill = () => {
    setRefillPercent(prev => Math.min(prev + 20, 100));
  };
  return (
    <div className="prescription-card">
      <div className="prescription-title-row">
        <img src={prescription.doctorPhoto} alt={prescription.doctor} className="doctor-photo" />
        <div>
          <div className="prescription-title">{prescription.doctor}</div>
          <div className="prescription-date">{prescription.date}</div>
        </div>
        <div className={`prescription-status ${prescription.status}`}>{prescription.status.toUpperCase()}</div>
      </div>
      <div className="prescription-info-row">
        <div className="prescription-medicines">
          <b>Medicines:</b>
          <ul>
            {prescription.medicines.map((m, i) => (
              <li key={i}>
                <span className="med-icon">{m.icon}</span>
                {m.name} {m.dosage}
                <span className="medicine-duration-badge">{m.duration} days</span>
                <span className="medicine-progress">{m.taken || 0}/{m.duration} taken</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="prescription-details">
          <div className="prescription-notes"><b>Notes:</b> {prescription.notes}</div>
          {prescription.refillAvailable && (
            <>
              <button className="refill-btn" onClick={handleRefill}>Refill Request</button>
              <div style={{ marginTop: "0.5rem", color: "#2563eb" }}>
                Refill Progress: <b>{refillPercent}%</b>
              </div>
            </>
          )}
        </div>
      </div>
      <div className="prescription-progress-bar">
        <div className="progress-bar-track">
          <div className="progress-bar-inner" style={{ width: `${progress}%` }} />
        </div>
        <span className="progress-label">{progress}% course completed</span>
      </div>
    </div>
  );
}
