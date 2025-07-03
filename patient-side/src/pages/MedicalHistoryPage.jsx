import React, { useState } from 'react';
import './MedicalHistoryPage.css';

const medicalHistory = [
  {
    id: 1,
    date: "2025-06-28",
    reason: "Fever",
    doctor: "Dr. Sharma",
    prescription: "Paracetamol",
    report: "report1.pdf"
  },
  {
    id: 2,
    date: "2025-05-15",
    reason: "Back Pain",
    doctor: "Dr. Rao",
    notes: "Advised MRI"
  },
  {
    id: 3,
    date: "2025-01-01",
    reason: "Diabetes Checkup",
    report: "glucometer_data.pdf"
  }
];

function formatDate(dateStr) {
  const options = { day: '2-digit', month: 'short', year: 'numeric' };
  return new Date(dateStr).toLocaleDateString('en-GB', options);
}

export default function MedicalReport() {
  const [openId, setOpenId] = useState(null);

  return (
    <div className="simple-timeline-outer">
      <ul className="simple-timeline-list">
        {medicalHistory.map(item => (
          <li key={item.id} className="simple-timeline-item">
            <button
              className={`simple-timeline-date${openId === item.id ? ' active' : ''}`}
              onClick={() => setOpenId(openId === item.id ? null : item.id)}
              aria-expanded={openId === item.id}
            >
              <span role="img" aria-label="calendar">📅</span> {formatDate(item.date)}
              <span className="simple-arrow">{openId === item.id ? '▲' : '▼'}</span>
            </button>
            <div
              className={`simple-timeline-details${openId === item.id ? ' open' : ''}`}
              style={{
                maxHeight: openId === item.id ? '300px' : '0',
                opacity: openId === item.id ? 1 : 0,
                transition: 'all 0.3s cubic-bezier(.4,0,.2,1)'
              }}
            >
              <div><b>Reason:</b> {item.reason}</div>
              {item.doctor && <div><b>Doctor:</b> {item.doctor}</div>}
              {item.prescription && <div><b>Prescription:</b> {item.prescription}</div>}
              {item.notes && <div><b>Notes:</b> {item.notes}</div>}
              {item.report && (
                <div>
                  <b>Report:</b> <a href={item.report} target="_blank" rel="noopener noreferrer">View PDF</a>
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
