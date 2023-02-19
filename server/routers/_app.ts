import { z } from 'zod';
import { procedure, router } from '../trpc';

import { logExerciseRouter } from './logExerciseRouter';


export const appRouter = router({
  hello: procedure
    .query(() => {
      return {
        response: "TRPC is Online and Responding"
      };
    }),
    logExercise: logExerciseRouter,
});

export type AppRouter = typeof appRouter;