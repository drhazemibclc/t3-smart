import { Pool } from "pg";
import type { Patient, Consultation, MedicalRecord, Prescription, GrowthChart, ClinicIncome } from "./definitions";

// Initialize a connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Function to close the database connection pool
export async function closePool() {
  await pool.end();
}

// Example function to fetch patients
export async function fetchPatients(): Promise<Patient[]> {
  try {
    const { rows } = await pool.query<Patient>("SELECT * FROM patients ORDER BY name ASC");
    return rows;
  } catch (error) {
    console.error("Failed to fetch patients:", error);
    throw new Error("Database Error: Failed to fetch patients.");
  }
}

export async function fetchConsultations(patientId: string): Promise<Consultation[]> {
  try {
    const { rows } = await pool.query<Consultation>(
      "SELECT * FROM consultations WHERE patient_id = $1 ORDER BY date DESC",
      [patientId],
    );
    return rows;
  } catch (error) {
    console.error(`Failed to fetch consultations for patient ID ${patientId}:`, error);
    throw new Error("Database Error: Failed to fetch consultations.");
  }
}

export async function fetchMedicalRecords(patientId: string): Promise<MedicalRecord[]> {
  try {
    const { rows } = await pool.query<MedicalRecord>(
      "SELECT * FROM medical_records WHERE patient_id = $1 ORDER BY created_at DESC",
      [patientId],
    );
    return rows;
  } catch (error) {
    console.error(`Failed to fetch medical records for patient ID ${patientId}:`, error);
    throw new Error("Database Error: Failed to fetch medical records.");
  }
}

export async function fetchPrescriptions(recordId: string): Promise<Prescription[]> {
  try {
    const { rows } = await pool.query<Prescription>(
      "SELECT * FROM prescriptions WHERE record_id = $1 ORDER BY date DESC",
      [recordId],
    );
    return rows;
  } catch (error) {
    console.error(`Failed to fetch prescriptions for record ID ${recordId}:`, error);
    throw new Error("Database Error: Failed to fetch prescriptions.");
  }
}

export async function fetchGrowthChart(patientId: string): Promise<GrowthChart[]> {
  try {
    const { rows } = await pool.query<GrowthChart>(
      "SELECT * FROM growth_chart WHERE patient_id = $1 ORDER BY date ASC",
      [patientId],
    );
    return rows;
  } catch (error) {
    console.error(`Failed to fetch growth chart for patient ID ${patientId}:`, error);
    throw new Error("Database Error: Failed to fetch growth chart.");
  }
}

export async function fetchClinicIncome(): Promise<ClinicIncome[]> {
  try {
    const { rows } = await pool.query<ClinicIncome>("SELECT * FROM clinic_income ORDER BY date DESC");
    return rows;
  } catch (error) {
    console.error("Failed to fetch clinic income:", error);
    throw new Error("Database Error: Failed to fetch clinic income.");
  }
}
