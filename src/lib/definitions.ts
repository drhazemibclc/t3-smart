// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.
// However, these types are generated automatically if you're using an ORM such as Prisma.
export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};
// This file contains type definitions for your pediatric clinic app data.
// It describes the shape of the data, and what data type each property should accept.

export type Patient = {
  id: string;
  name: string;
  age: number;
  gender: "Male" | "Female";
  contact: string;
};

export type Consultation = {
  id: string;
  patientId: string;
  notes: string;
  date: string; // Date represented as a string
};

export type MedicalRecord = {
  id: string;
  patientId: string;
  description: string;
  createdAt: string; // Date when the record was created
};

export type Prescription = {
  id: string;
  recordId: string;
  medication: string;
  dosage: string;
  date: string; // Date of the prescription
};

export type GrowthChart = {
  patientId: string;
  age: number; // Age of the patient in years
  height: number; // Height in cm
  weight: number; // Weight in kg
  date: string; // Date of the growth record
};

export type ClinicIncome = {
  id: string;
  amount: number; // Income amount in currency units
  source: string; // Description of the income source
  date: string; // Date when the income was recorded
};

// Example composite type combining Patient data with their consultations
export type PatientConsultation = {
  patient: Patient;
  consultations: Consultation[];
};

// Example composite type combining Medical Records and Prescriptions for a patient
export type PatientMedicalRecord = {
  record: MedicalRecord;
  prescriptions: Prescription[];
};

// Example type for summarized clinic income by month
export type MonthlyIncome = {
  month: string; // Month in short format, e.g., "Jan"
  totalIncome: number; // Total income for the month
};
