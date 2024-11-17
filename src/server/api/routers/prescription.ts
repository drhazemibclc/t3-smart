import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const prescriptionRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        recordId: z.string(),
        medication: z.string().min(1),
        dosage: z.string(),
        date: z.date(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.prescription.create({
        data: {
          recordId: input.recordId,
          medication: input.medication,
          dosage: input.dosage,
          date: input.date,
        },
      });
    }),

  getByRecordId: protectedProcedure.input(z.object({ recordId: z.string() })).query(async ({ ctx, input }) => {
    return ctx.db.prescription.findMany({
      where: { recordId: input.recordId },
    });
  }),
});
