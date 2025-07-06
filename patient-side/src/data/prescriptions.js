import { BsCapsule } from "react-icons/bs";

const initialPrescriptions = [
    {
        id: 201,
        date: "2025-07-01",
        doctor: "Dr. Priya Sharma",
        doctorPhoto: "https://randomuser.me/api/portraits/women/44.jpg",
        status: "active",
        medicines: [
            { name: "Paracetamol", dosage: "500mg", icon: "BsCapsule", duration: 5, taken: 3 },
            { name: "Cetrizine", dosage: "10mg", icon: "BsCapsule", duration: 3, taken: 2 },
        ],
        notes: "Strictly follow the medicine schedule.",
        refillAvailable: true,
    },
    {
        id: 202,
        date: "2025-06-15",
        doctor: "Dr. Ravi Mehta",
        doctorPhoto: "https://randomuser.me/api/portraits/men/32.jpg",
        status: "completed",
        medicines: [
            { name: "Metformin", dosage: "850mg", icon: "BsCapsule", duration: 10, taken: 10 },
            { name: "Losartan", dosage: "50mg", icon: "BsCapsule", duration: 10, taken: 10 },
        ],
        notes: "Patient showed good response to treatment.",
        refillAvailable: false,
    },
    {
        id: 203,
        date: "2025-07-03",
        doctor: "Dr. Anjali Verma",
        doctorPhoto: "https://randomuser.me/api/portraits/women/68.jpg",
        status: "active",
        medicines: [
            { name: "Levothyroxine", dosage: "75mcg", icon: "BsCapsule", duration: 30, taken: 2 },
            { name: "Vitamin D3", dosage: "1000 IU", icon: "BsCapsule", duration: 30, taken: 2 },
        ],
        notes: "Take tablets early in the morning before food.",
        refillAvailable: true,
    }
];
export default initialPrescriptions;