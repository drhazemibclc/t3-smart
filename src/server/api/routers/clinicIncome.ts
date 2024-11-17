import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const clinicIncomeRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        amount: z.number(),
        source: z.string(),
        date: z.date(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.clinicIncome.create({
        data: {
          amount: input.amount,
          source: input.source,
          date: input.date,
        },
      });
    }),

  getAll: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.clinicIncome.findMany({
      orderBy: { date: "desc" },
    });
  }),
});
