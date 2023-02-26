import { z } from "zod";
import { procedure, router } from "../trpc";
import prisma from "../../lib/prisma";

export const dashboardRouter = router({
  getAllPersonalRecords: procedure
    .input(
      z.object({
        userEmail: z.string(),
      })
    )
    .query(async ({ input }) => {
      const usersId = await prisma.user.findUnique({
        where: {
          email: input.userEmail,
        },
        select: {
          id: true,
        },
      });

      const personalRecords = await prisma.personalRecord.findMany({
        where: {
          User: usersId,
        },
        select: {
          id: true,
          weight: true,
          datePerformed: true,
          exerciseName: true,
          userId: true,
        },
      });

      return personalRecords;
    }),
});

export type dashboardRouter = typeof router;
