-- CreateEnum
CREATE TYPE "Type" AS ENUM ('STRENGTH', 'ENDURANCE', 'FLEXIBILITY', 'BALANCE');

-- CreateTable
CREATE TABLE "Exercise" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "level" TEXT NOT NULL,
    "type" "Type" NOT NULL,

    CONSTRAINT "Exercise_pkey" PRIMARY KEY ("id")
);
