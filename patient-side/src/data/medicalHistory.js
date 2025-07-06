const initialMedicalHistory = [
    {
        id: 1,
        date: "2025-06-28",
        reason: "Fever",
        doctor: "Dr. Sharma",
        prescription: "Paracetamol",
        report: {
            fileName: "report1.pdf",
            url: "https://morth.nic.in/sites/default/files/dd12-13_0.pdf",
            uploadedAt: "2025-06-28T09:00:00Z"
        }
    },
    {
        id: 2,
        date: "2025-05-15",
        reason: "Back Pain",
        doctor: "Dr. Rao",
        notes: "Advised MRI",
        report: null
    },
    {
        id: 3,
        date: "2025-01-01",
        reason: "Diabetes Checkup",
        report: {
            fileName: "glucometer_data.pdf",
            url: "https://your-server.com/uploads/reports/glucometer_data.pdf",
            uploadedAt: "2025-01-01T10:30:00Z"
        }
    }
];
export default initialMedicalHistory;