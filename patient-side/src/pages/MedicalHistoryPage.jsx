import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './MedicalHistoryPage.css';
const medicalHistory =
  [
    {
      "id": 1,
      "date": "2025-06-28",
      "reason": "Fever",
      "doctor": "Dr. Sharma",
      "prescription": "Paracetamol",
      "report": {
        "fileName": "report1.pdf",
        "url": "https://morth.nic.in/sites/default/files/dd12-13_0.pdf",
        "uploadedAt": "2025-06-28T09:00:00Z"
      }
    },
    {
      "id": 2,
      "date": "2025-05-15",
      "reason": "Back Pain",
      "doctor": "Dr. Rao",
      "notes": "Advised MRI",
      "report": null
    },
    {
      "id": 3,
      "date": "2025-01-01",
      "reason": "Diabetes Checkup",
      "report": {
        "fileName": "glucometer_data.pdf",
        "url": "https://your-server.com/uploads/reports/glucometer_data.pdf",
        "uploadedAt": "2025-01-01T10:30:00Z"
      }
    }
  ];

function formatDate(dateStr) {
  const options = { day: '2-digit', month: 'short', year: 'numeric' };
  return new Date(dateStr).toLocaleDateString('en-GB', options);
}

export default function MedicalReport() {
  const [openId, setOpenId] = useState(null);
  const handleViewPdf = (item) => {
    if (!item.report || !item.report.url) {
      toast.error('PDF file is not available');
      return;
    }
    window.open(item.report.url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="simple-timeline-outer">
      <ToastContainer />
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
            >
              <div><b>Reason:</b> {item.reason}</div>
              {item.doctor && <div><b>Doctor:</b> {item.doctor}</div>}
              {item.prescription && <div><b>Prescription:</b> {item.prescription}</div>}
              {item.notes && <div><b>Notes:</b> {item.notes}</div>}
              {item.report && (
                <div>
                  <b>Report:</b>
                  <button
                    className="pdf-view-btn"
                    onClick={() => handleViewPdf(item)}
                  >
                    View PDF
                  </button>
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
