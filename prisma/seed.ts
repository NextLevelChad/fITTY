import { PrismaClient, Type } from "@prisma/client";
import { exercises } from "../lib/exercises";
const prisma = new PrismaClient();

async function main() {
  exercises.map(async (exercise) => {
    await prisma.exercise
      .create({
        data: {
          name: exercise.Exercise,
          level: exercise.Level,
          type: Type[exercise.type],
        },
      })
      .catch((err) => {
        console.log(
          "There was an error when inserting, ",
          exercise,
          "The error was, ",
          err
        );
      });
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
