// src/utils/reminders.js

export function getMedicationReminders(prescriptions) {
  const reminders = [];
  prescriptions.forEach(prescription => {
    if (prescription.status !== "active") return;
    prescription.medicines.forEach(med => {
      const time = med.time || "8:00 AM";
      if ((med.taken || 0) < med.duration) {
        reminders.push({
          icon: "💊",
          text: `Take ${med.name} (${med.dosage}) – ${time}`
        });
      }
    });
  });
  return reminders;
}

export const hydrationReminder = { icon: "🥤", text: "Drink 2L of water" };
export const exerciseReminder = { icon: "🚶", text: "Go for a 30-min walk" };

export function buildReminders(prescriptions) {
  return [
    ...getMedicationReminders(prescriptions),
    hydrationReminder,
    exerciseReminder
  ];
}
