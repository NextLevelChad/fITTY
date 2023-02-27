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
      })
    )
    .mutation(async ({ input }) => {
      console.log("This is what we received", input);
      const usersId = await prisma.user.findUnique({
        where: {
          email: input.userEmail,
        },
        select: {
          id: true,
        },
      });
      console.log(usersId);
      if (input.logType === "Personal Record") {
        const pr = await prisma.personalRecord
          .create({
            data: {
              userId: usersId.id,
              exerciseName: input.exerciseName,
              weight: input.personalRecord.weight,
              exerciseType: "Strength",
            },
          })
          .catch((err) => {
            console.log(err);
            throw err;
          });
      } else {
        console.log("We got into the else statement yay!");
        const newExerciseRecord = await prisma.exerciseRecord.create({
          data: {
            userId: usersId.id,
            exerciseName: input.exerciseName,
          },
        });
        console.log("This is the new exercise record", newExerciseRecord);

        const setRecord = await prisma.set.createMany({
          data: input.sets.map((set) => {
            return {
              exerciseRecordId: newExerciseRecord.id,
              weight: set.weight,
              repetitions: set.repetitions,
            };
          }),
        });
        console.log("This is the set record", setRecord);
      }

      return {
        message: "Log was successful",
      };
    }),
});

export type logExerciseRouter = typeof router;
