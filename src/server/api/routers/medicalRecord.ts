import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const medicalRecordRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        patientId: z.string(),
        description: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.medicalRecord.create({
        data: {
          patientId: input.patientId,
          description: input.description,
        },
      });
    }),

  getByPatientId: protectedProcedure.input(z.object({ patientId: z.string() })).query(async ({ ctx, input }) => {
    return ctx.db.medicalRecord.findMany({
      where: { patientId: input.patientId },
    });
  }),
});
