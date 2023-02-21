import { z } from "zod";
import { procedure, router } from "../trpc";

import { logExerciseRouter } from "./logExerciseRouter";
import { dashboardRouter } from "./dashboardRouter";

export const appRouter = router({
  hello: procedure.query(() => {
    return {
      response: "TRPC is Online and Responding",
    };
  }),
  logExercise: logExerciseRouter,
  dashboard: dashboardRouter,
});

export type AppRouter = typeof appRouter;
