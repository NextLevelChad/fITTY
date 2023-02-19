import { z } from 'zod';
import { procedure, router } from '../trpc';

import { logExerciseRouter } from './logExerciseRouter';


export const appRouter = router({
  hello: procedure
    .input(
      z.object({
        text: z.string(),
      }),
    )
    .query(({ input }) => {
      return {
        greeting: `hello ${input.text}`,
      };
    }),
    logExercise: logExerciseRouter,
});

export type AppRouter = typeof appRouter;