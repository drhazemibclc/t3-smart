import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const growthChartRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        patientId: z.string(),
        age: z.number(),
        height: z.number(),
        weight: z.number(),
        date: z.date(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.growthChart.create({
        data: {
          patientId: input.patientId,
          age: input.age,
          height: input.height,
          weight: input.weight,
          date: input.date,
        },
      });
    }),

  getByPatientId: protectedProcedure.input(z.object({ patientId: z.string() })).query(async ({ ctx, input }) => {
    return ctx.db.growthChart.findMany({
      where: { patientId: input.patientId },
      orderBy: { date: "desc" },
    });
  }),
});
