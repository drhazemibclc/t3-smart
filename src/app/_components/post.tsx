"use client";

import { useState } from "react";
import { api } from "~/trpc/react";
import { z } from "zod";

const patientFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  age: z.number().positive("Age must be a positive number"),
  gender: z.string().min(1, "Gender is required"),
  address: z.string().optional(),
});

export function PatientForm() {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    address: "",
  });

  const utils = api.useUtils();
  const createPatient = api.patient.create.useMutation({
    onSuccess: async () => {
      await utils.patient.invalidate();
      setFormData({ name: "", age: "", gender: "", address: "" });
    },
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    try {
      patientFormSchema.parse(formData);
      createPatient.mutate(formData);
    } catch (e) {
      console.error("Validation failed", e);
    }
  };

  return (
    <div className="w-full max-w-xs">
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full rounded-full px-4 py-2 text-black"
        />
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={formData.age}
          onChange={handleChange}
          className="w-full rounded-full px-4 py-2 text-black"
        />
        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          className="w-full rounded-full px-4 py-2 text-black"
        >
          <option value="" disabled>
            Select Gender
          </option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <input
          type="text"
          name="address"
          placeholder="Address (optional)"
          value={formData.address}
          onChange={handleChange}
          className="w-full rounded-full px-4 py-2 text-black"
        />
        <button
          type="submit"
          className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
          disabled={createPatient.isPending}
        >
          {createPatient.isPending ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
