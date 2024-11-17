import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const consultationRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        patientId: z.string(),
        notes: z.string().min(1),
        date: z.date(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.consultation.create({
        data: {
          patientId: input.patientId,
          notes: input.notes,
          date: input.date,
        },
      });
    }),

  getByPatientId: protectedProcedure.input(z.object({ patientId: z.string() })).query(async ({ ctx, input }) => {
    return ctx.db.consultation.findMany({
      where: { patientId: input.patientId },
      orderBy: { date: "desc" },
    });
  }),
});
