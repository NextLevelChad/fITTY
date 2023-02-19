import { z } from 'zod';
import { procedure, router } from '../trpc';
import prisma from '../../lib/prisma';
import Email from 'next-auth/providers/email';

const setsSchema = z.object({
  setID: z.string(),
  weight: z.number(),
  repetitions: z.number(),
})


export const logExerciseRouter = router({
  log: procedure
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
  submitLog: procedure
  .input(
    z.object({
      userEmail: z.string(),
      exerciseName: z.string(),
      logType: z.string(),
      sets: z.optional(z.array(setsSchema)),
      personalRecord: z.optional(z.object({
          weight: z.number(),
      }))
  })) .mutation(async ({ input }) =>  {

    const usersId = await prisma.user.findUnique({
      where: {
        email: input.userEmail
      },
      select: {
        id: true,
      }
    })

    if(input.logType === "Personal Record") {
      console.log("Got here")
      const pr = await prisma.personalRecord.create({
        data: {
          userId: usersId.id,
          exerciseName: input.exerciseName,
          weight: input.personalRecord.weight,

        },
      })
      console.log("This is the pr that was returned", pr)

    } else {
      const newExerciseRecord = await prisma.exerciseRecord.create({
        data:{
          userId: usersId.id,
          exerciseName: input.exerciseName,
        }
      })
      await prisma.set.createMany({
        data: input.sets.map((set) => {
            return {
              exerciseRecordId: newExerciseRecord.id,
              weight: set.weight,
              repetitions: set.repetitions
            }
          })        
      })
      
    }



    return {
      message: "Log was successful"
    };
  }),
});

export type logExerciseRouter = typeof router;