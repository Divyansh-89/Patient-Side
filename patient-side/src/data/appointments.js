const initialAppointments = [
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
];
export default initialAppointments;