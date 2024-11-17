"use client";

import { useState } from "react";
import { api } from "~/trpc/react";
import { Gender } from "@prisma/client"; // Ensure this import is correct for your Gender enum

export function PatientForm() {
  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [age, setAge] = useState<number | string>("");
  const [gender, setGender] = useState<Gender | "">(""); // Gender initialized as empty string
  const [contact, setContact] = useState("");

  const utils = api.useUtils();

  const createPatient = api.patient.create.useMutation({
    onSuccess: async () => {
      await utils.patient.invalidate();
      setName("");
      setBirthDate("");
      setAge("");
      setGender(""); // Reset gender to empty string after successful creation
      setContact("");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Ensure gender is not empty before submission
    if (!gender) {
      alert("Please select a gender");
      return;
    }

    // Convert birthDate string to Date object before passing to Prisma
    createPatient.mutate({
      name,
      birthDate: new Date(birthDate), // Ensure birthDate is a Date object
      age: Number(age),
      gender,
      contact,
    });
  };

  return (
    <div className="w-full max-w-lg">
      <h2 className="text-xl font-semibold mb-4">Create New Patient</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Name Field */}
        <input
          type="text"
          placeholder="Patient Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-lg px-4 py-2 border"
        />

        {/* Birthdate Field */}
        <input
          type="date"
          placeholder="Birthdate"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
          className="w-full rounded-lg px-4 py-2 border"
        />

        {/* Age Field */}
        <input
          type="number"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className="w-full rounded-lg px-4 py-2 border"
        />

        {/* Gender Selection */}
        <select
          value={gender}
          onChange={(e) => setGender(e.target.value as Gender)}
          className="w-full rounded-lg px-4 py-2 border"
        >
          <option value="">Select Gender</option>
          <option value={Gender.Male}>Male</option>
          <option value={Gender.Female}>Female</option>
          <option value={Gender.Other}>Other</option>
        </select>

        {/* Contact Field */}
        <input
          type="text"
          placeholder="Contact Information"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          className="w-full rounded-lg px-4 py-2 border"
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full rounded-lg bg-blue-500 text-white py-2 mt-4 font-semibold transition hover:bg-blue-600"
          disabled={createPatient.isPending}
        >
          {createPatient.isPending ? "Creating Patient..." : "Create Patient"}
        </button>
      </form>
    </div>
  );
}
