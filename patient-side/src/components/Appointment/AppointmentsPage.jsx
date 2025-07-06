import React, { useState } from "react";
import "./AppointmentsPage.css";
import { toast } from 'react-toastify';
import AppointmentsToolbar from "./AppointmentsToolbar";
import AppointmentModal from "./AppointmentModal";
import AppointmentList from "./AppointmentList";
import initialAppointments from "../../data/appointments";

export default function AppointmentsPage() {
  const [tab, setTab] = useState("upcoming");
  const [fading, setFading] = useState(false);

  const [appointments, setAppointments] = useState(initialAppointments);

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

  return (
    <div className="AppointmentsPage-root">
      <AppointmentsToolbar
        tab={tab}
        onTabSwitch={handleTabSwitch}
        onNew={() => setShowModal(true)}
      />

      <AppointmentModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleCreateAppointment}
        newAppointment={newAppointment}
        setNewAppointment={setNewAppointment}
        availableDoctors={availableDoctors}
      />

      <AppointmentList
        appointments={sortedAppointments}
        isToday={isToday}
        formatTime={formatTime}
        fading={fading}
        tab={tab}
      />
    </div>
  );
}