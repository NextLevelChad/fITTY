/*
  Warnings:

  - Added the required column `exerciseType` to the `ExerciseRecord` table without a default value. This is not possible if the table is not empty.
  - Added the required column `exerciseType` to the `PersonalRecord` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ExerciseRecord" ADD COLUMN     "exerciseType" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "PersonalRecord" ADD COLUMN     "exerciseType" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "ExerciseRecord_exerciseType_idx" ON "ExerciseRecord"("exerciseType");
