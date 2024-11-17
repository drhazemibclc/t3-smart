import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "~/server/api/trpc";

// Reusable validators
const cuidValidator = z.string().cuid("Invalid ID format");
const dateValidator = z.string().refine((date) => !Number.isNaN(new Date(date).getTime()), "Invalid date format");

export const patientRouter = createTRPCRouter({
  // Public test procedure
  hello: publicProcedure.input(z.object({ text: z.string() })).query(({ input }) => ({
    greeting: `Hello ${input.text}`,
  })),

  // Create a new patient
  create: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1, "Name is required"),
        birthDate: dateValidator,
        gender: z.enum(["Male", "Female", "Other"]),
        contact: z.string().min(5, "Contact must be at least 5 characters long"),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const birthDate = new Date(input.birthDate);
        const age = new Date().getFullYear() - birthDate.getFullYear();

        const newPatient = await ctx.db.patient.create({
          data: {
            name: input.name,
            birthDate,
            age,
            gender: input.gender,
            contact: input.contact,
          },
        });

        return newPatient;
      } catch (error) {
        console.error(error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create patient",
        });
      }
    }),

  // Get all patients
  getAll: protectedProcedure.query(async ({ ctx }) => {
    try {
      return await ctx.db.patient.findMany({
        orderBy: { name: "asc" },
        select: {
          id: true,
          name: true,
          birthDate: true,
          age: true,
          gender: true,
          contact: true,
        },
      });
    } catch (error) {
      console.error(error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to fetch patients",
      });
    }
  }),

  // Get a specific patient by ID
  getById: protectedProcedure.input(z.object({ id: cuidValidator })).query(async ({ ctx, input }) => {
    const patient = await ctx.db.patient.findUnique({
      where: { id: input.id },
      include: {
        consultations: true,
        medicalRecords: true,
        growthCharts: true,
      },
    });

    if (!patient) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Patient not found",
      });
    }

    return patient;
  }),

  // Update a patient
  update: protectedProcedure
    .input(
      z.object({
        id: cuidValidator,
        name: z.string().optional(),
        birthDate: dateValidator.optional(),
        gender: z.enum(["Male", "Female", "Other"]).optional(),
        contact: z.string().min(5).optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const updatedPatient = await ctx.db.patient.update({
          where: { id: input.id },
          data: {
            name: input.name,
            birthDate: input.birthDate ? new Date(input.birthDate) : undefined,
            gender: input.gender,
            contact: input.contact,
          },
        });

        return updatedPatient;
      } catch (error) {
        console.error(error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to update patient",
        });
      }
    }),

  // Delete a patient
  delete: protectedProcedure.input(z.object({ id: cuidValidator })).mutation(async ({ ctx, input }) => {
    try {
      await ctx.db.patient.delete({
        where: { id: input.id },
      });

      return { success: true };
    } catch (error) {
      console.error(error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to delete patient",
      });
    }
  }),
});
