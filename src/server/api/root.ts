import { postRouter } from "~/server/api/routers/post";
import { patientRouter } from "~/server/api/routers/patient";
import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
import { consultationRouter } from "~/server/api/routers/consultation";
import { medicalRecordRouter } from "~/server/api/routers/medicalRecord";
import { prescriptionRouter } from "~/server/api/routers/prescription";
import { growthChartRouter } from "~/server/api/routers/growthChart";
import { clinicIncomeRouter } from "~/server/api/routers/clinicIncome";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
  patient: patientRouter,
  consultation: consultationRouter,
  medicalRecord: medicalRecordRouter,
  prescription: prescriptionRouter,
  growthChart: growthChartRouter,
  clinicIncome: clinicIncomeRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
