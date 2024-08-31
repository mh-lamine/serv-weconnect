-- CreateTable
CREATE TABLE "SpecialAvailability" (
    "id" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "startTime" TEXT NOT NULL,
    "endTime" TEXT NOT NULL,
    "providerId" TEXT NOT NULL,

    CONSTRAINT "SpecialAvailability_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SpecialAvailability" ADD CONSTRAINT "SpecialAvailability_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
