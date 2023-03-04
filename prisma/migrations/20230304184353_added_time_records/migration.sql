-- CreateTable
CREATE TABLE "TimeRecord" (
    "id" TEXT NOT NULL,
    "datePerformed" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "exerciseName" TEXT NOT NULL,
    "time" INTEGER NOT NULL,
    "exerciseType" TEXT NOT NULL,

    CONSTRAINT "TimeRecord_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "TimeRecord_time_idx" ON "TimeRecord"("time");

-- CreateIndex
CREATE INDEX "TimeRecord_datePerformed_idx" ON "TimeRecord"("datePerformed");

-- AddForeignKey
ALTER TABLE "TimeRecord" ADD CONSTRAINT "TimeRecord_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
