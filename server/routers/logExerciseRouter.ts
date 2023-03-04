import { z } from "zod";
import { procedure, router } from "../trpc";
import prisma from "../../lib/prisma";

const setsSchema = z.object({
  setId: z.number(),
  weight: z.number(),
  repetitions: z.number(),
});

export const logExerciseRouter = router({
  submitLog: procedure
    .input(
      z.object({
        userEmail: z.string(),
        exerciseName: z.string(),
        logType: z.string(),
        sets: z.optional(z.array(setsSchema)),
        personalRecord: z.optional(
          z.object({
            weight: z.number(),
          })
        ),
        time: z.number(),
        exerciseType: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      console.log("We got here, here's the input, ", input);
      const usersId = await prisma.user.findUnique({
        where: {
          email: input.userEmail,
        },
        select: {
          id: true,
        },
      });
      if (input.logType === "Personal Record") {
        const pr = await prisma.personalRecord
          .create({
            data: {
              userId: usersId.id,
              exerciseName: input.exerciseName,
              weight: input.personalRecord.weight,
              exerciseType: input.exerciseType,
            },
          })
          .catch((err) => {
            console.log("There was an error adding the Personal Record, ", err);
            throw err;
          });
      } else if (input.logType === "Sets") {
        const newExerciseRecord = await prisma.exerciseRecord
          .create({
            data: {
              userId: usersId.id,
              exerciseName: input.exerciseName,
              exerciseType: input.exerciseType,
            },
          })
          .catch((err) => {
            console.log("There was an error adding the Exercise Record, ", err);
            throw err;
          });

        const setRecord = await prisma.set
          .createMany({
            data: input.sets.map((set) => {
              return {
                exerciseRecordId: newExerciseRecord.id,
                weight: set.weight,
                repetitions: set.repetitions,
              };
            }),
          })
          .catch((err) => {
            console.log("There was an error creating the sets, ", err);
            throw err;
          });
      } else if (input.logType === "Time") {
        const newTimeRecord = await prisma.timeRecord
          .create({
            data: {
              userId: usersId.id,
              exerciseName: input.exerciseName,
              time: input.time,
              exerciseType: input.exerciseType,
            },
          })
          .catch((err) => {
            console.log("There was an error creating the Time Record, ", err);
            throw err;
          });
      }

      return {
        message: null,
        errorMessage: "The log type didn't match an acceptable entry",
      };
    }),
});

export type logExerciseRouter = typeof router;
