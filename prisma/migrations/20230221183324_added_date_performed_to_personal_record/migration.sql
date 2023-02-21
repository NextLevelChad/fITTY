-- AlterTable
ALTER TABLE "PersonalRecord" ADD COLUMN     "datePerformed" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE INDEX "PersonalRecord_datePerformed_idx" ON "PersonalRecord"("datePerformed");
