import React from "react";
import { BsCapsule } from "react-icons/bs";

export default function DailyReminders({ prescriptions }) {
  const reminders = [
    { icon: "💧", text: "Drink a glass of water" }
  ];

  const activePrescriptions = prescriptions.filter(p => p.status === "active");
  activePrescriptions.forEach(prescription => {
    prescription.medicines.forEach(med => {
      if (med.name && med.taken !== undefined && med.duration !== undefined && med.taken < med.duration) {
        reminders.push({
          icon: <BsCapsule style={{ verticalAlign: "middle" }} />,
          text: `Take ${med.name} (${med.dosage || 'N/A'})`
        });
      }
    });
  });

  return (
    <div className="daily-reminders-card">
      <h3 style={{ fontSize: "1.8em" }} >Today's Reminders</h3>
      <ul>
        {reminders.length === 0 ? (
          <li>No reminders today.</li>
        ) : (
          reminders.map((rem, idx) => (
            <li key={idx}>
              {rem.icon} {rem.text}
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
