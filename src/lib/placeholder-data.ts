// This file contains placeholder data that you'll be replacing with real data in the Data Fetching chapter:
// https://nextjs.org/learn/dashboard-app/fetching-data
const users = [
  {
    id: "410544b2-4001-4271-9855-fec4b6a6442a",
    name: "User",
    email: "user@nextmail.com",
    password: "123456",
  },
];
const patients = [
  {
    id: "1a2b3c4d-5678-9101-1121-314151617181",
    name: "John Doe",
    age: 10,
    gender: "Male",
    contact: "john.doe@example.com",
  },
  {
    id: "2b3c4d5e-6789-1011-1213-415161718192",
    name: "Jane Smith",
    age: 12,
    gender: "Female",
    contact: "jane.smith@example.com",
  },
  {
    id: "3c4d5e6f-7891-0112-1314-516171819202",
    name: "Ali Ahmed",
    age: 8,
    gender: "Male",
    contact: "ali.ahmed@example.com",
  },
  {
    id: "4d5e6f7g-8910-1121-3141-516171819213",
    name: "Sara Khan",
    age: 14,
    gender: "Female",
    contact: "sara.khan@example.com",
  },
];

const consultations = [
  {
    id: "c1",
    patientId: patients[0].id,
    notes: "Routine checkup. Advised flu vaccine.",
    date: "2024-01-12",
  },
  {
    id: "c2",
    patientId: patients[1].id,
    notes: "Fever and sore throat. Prescribed antibiotics.",
    date: "2024-01-14",
  },
  {
    id: "c3",
    patientId: patients[2].id,
    notes: "Asthma follow-up. Adjusted inhaler dosage.",
    date: "2024-01-16",
  },
  {
    id: "c4",
    patientId: patients[3].id,
    notes: "Annual physical exam. Advised balanced diet.",
    date: "2024-01-18",
  },
];

const medicalRecords = [
  {
    id: "m1",
    patientId: patients[0].id,
    description: "History of mild allergies.",
    createdAt: "2023-12-01",
  },
  {
    id: "m2",
    patientId: patients[1].id,
    description: "Recovered from chickenpox in 2023.",
    createdAt: "2024-01-10",
  },
  {
    id: "m3",
    patientId: patients[2].id,
    description: "Asthma diagnosed in 2022.",
    createdAt: "2024-01-05",
  },
];

const prescriptions = [
  {
    id: "p1",
    recordId: medicalRecords[0].id,
    medication: "Cetirizine",
    dosage: "5 mg once daily",
    date: "2024-01-12",
  },
  {
    id: "p2",
    recordId: medicalRecords[1].id,
    medication: "Paracetamol",
    dosage: "500 mg every 6 hours as needed",
    date: "2024-01-14",
  },
  {
    id: "p3",
    recordId: medicalRecords[2].id,
    medication: "Salbutamol Inhaler",
    dosage: "2 puffs as needed",
    date: "2024-01-16",
  },
];

const growthCharts = [
  {
    patientId: patients[0].id,
    age: 10,
    height: 140,
    weight: 35,
    date: "2024-01-12",
  },
  {
    patientId: patients[1].id,
    age: 12,
    height: 150,
    weight: 45,
    date: "2024-01-14",
  },
  {
    patientId: patients[2].id,
    age: 8,
    height: 120,
    weight: 25,
    date: "2024-01-16",
  },
  {
    patientId: patients[3].id,
    age: 14,
    height: 160,
    weight: 50,
    date: "2024-01-18",
  },
];

const clinicIncome = [
  {
    id: "i1",
    amount: 200,
    source: "Consultation Fee",
    date: "2024-01-12",
  },
  {
    id: "i2",
    amount: 300,
    source: "Vaccination Fee",
    date: "2024-01-14",
  },
  {
    id: "i3",
    amount: 150,
    source: "Follow-up Consultation",
    date: "2024-01-16",
  },
  {
    id: "i4",
    amount: 250,
    source: "Medical Report Fee",
    date: "2024-01-18",
  },
];

export { users, patients, consultations, medicalRecords, prescriptions, growthCharts, clinicIncome };
