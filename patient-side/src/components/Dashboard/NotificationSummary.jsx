import React, { useState, useEffect } from "react";
import initialAppointments from "../../data/appointments"; // Ensure this path is correct

function getToday() {
  return new Date().toISOString().slice(0, 10);
}

function getCurrentMinutes() {
  const now = new Date();
  return now.getHours() * 60 + now.getMinutes();
}

const reminderIntervals = [8 * 60, 12 * 60, 16 * 60, 20 * 60];

function getStreakStatus() {
  return {
    medicine: Number(localStorage.getItem("streak_medicine")) > 0,
    water: Number(localStorage.getItem("streak_water")) > 0
  };
}

function getPersistedDismissed() {
  return JSON.parse(localStorage.getItem("dismissed_notifications") || "[]");
}

function setPersistedDismissed(arr) {
  localStorage.setItem("dismissed_notifications", JSON.stringify(arr));
}

export default function NotificationSummary() {
  const today = getToday();
  const currentMinutes = getCurrentMinutes();

  const todaysAppointments = initialAppointments.filter(
    a => a.date === today && a.status === "upcoming"
  );
  const appointmentNotifications = todaysAppointments.map(a => ({
    id: `appointment-${a.id}`,
    text: `Today's appointment: ${a.purpose} with ${a.doctor} at ${a.time}.`
  }));

  const streakStatus = getStreakStatus();
  const streakNotifications = Object.entries(streakStatus)
    .filter(([_, completed]) => !completed)
    .flatMap(([habit]) => {
      const shouldRemind = reminderIntervals.some(interval => currentMinutes >= interval);
      return shouldRemind
        ? [{
            id: `streak-${habit}`,
            text: `Reminder: Please complete your ${habit} streak today!`
          }]
        : [];
    });

  const allNotifications = [...appointmentNotifications, ...streakNotifications];

  const [dismissed, setDismissed] = useState(getPersistedDismissed());

  useEffect(() => {
    setPersistedDismissed(dismissed);
  }, [dismissed]);

  const notifications = allNotifications.filter(n => !dismissed.includes(n.id));

  const handleRead = (id) => {
    setDismissed(prev => [...prev, id]);
  };

  return (
    <div>
      <h3>Notifications</h3>
      <ul>
        {notifications.length === 0 ? (
          <li>No new notifications.</li>
        ) : (
          notifications.map((notif) => (
            <li key={notif.id}>
              {notif.text}
              <button onClick={() => handleRead(notif.id)}>Read</button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}