import React, { useState, useEffect } from "react";
import { IoIosNotificationsOutline } from "react-icons/io";

function getTodayDateString() {
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

export default function NotificationBell({ alerts = [], appointments = [], prescriptions = [] }) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [dismissed, setDismissed] = useState(getPersistedDismissed());

  useEffect(() => {
    setPersistedDismissed(dismissed);
  }, [dismissed]);

  const todayStr = getTodayDateString();
  const currentMinutes = getCurrentMinutes();

  const todaysAppointments = appointments.filter(
    a => new Date(a.date).toISOString().slice(0, 10) === todayStr && a.status === "upcoming"
  );
  const appointmentNotifications = todaysAppointments.map(a => ({
    id: `appointment-${a.id}`,
    text: `Today's appointment: ${a.purpose} with ${a.doctor} at ${a.time || 'N/A'}.`
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

  const refillNotifications = prescriptions.filter(p =>
    p.status === "active" &&
    p.medicines?.some(m => (m.duration - (m.taken || 0)) <= 2)
  ).map(p => ({
    id: `refill-${p.id}`,
    text: `Refill alert for prescription ID: ${p.id}. Few doses remaining!`
  }));

  const allNotifications = [
    ...appointmentNotifications,
    ...streakNotifications,
    ...refillNotifications,
    ...alerts
  ];

  const notifications = allNotifications.filter(n => !dismissed.includes(n.id));

  const handleRead = (id) => {
    setDismissed(prev => [...prev, id]);
  };

  return (
    <div className="notification-bell-container">
      <div className="notification-bell" onClick={() => setShowNotifications(!showNotifications)}>
        <IoIosNotificationsOutline size={24} />
        {notifications.length > 0 && (
          <span className="notification-count">{notifications.length}</span>
        )}
      </div>
      {showNotifications && (
        <div className="notification-dropdown">
          <h4>Notifications</h4>
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
      )}
    </div>
  );
}
