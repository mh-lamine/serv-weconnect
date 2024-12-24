/*
  Warnings:

  - You are about to drop the `Provider` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[proId]` on the table `RefreshToken` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterEnum
ALTER TYPE "Role" ADD VALUE 'PRO';

-- AlterTable
ALTER TABLE "Appointment" ADD COLUMN     "proId" TEXT;

-- AlterTable
ALTER TABLE "Availability" ADD COLUMN     "proId" TEXT;

-- AlterTable
ALTER TABLE "ProviderCategory" ADD COLUMN     "proId" TEXT;

-- AlterTable
ALTER TABLE "ProviderService" ADD COLUMN     "proId" TEXT;

-- AlterTable
ALTER TABLE "RefreshToken" ADD COLUMN     "proId" TEXT;

-- AlterTable
ALTER TABLE "SpecialAvailability" ADD COLUMN     "proId" TEXT;

-- AlterTable
ALTER TABLE "Unavailability" ADD COLUMN     "proId" TEXT;

-- DropTable
DROP TABLE "Provider";

-- CreateTable
CREATE TABLE "Pro" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phoneNumber" TEXT,
    "contactMethods" JSONB,
    "address" TEXT,
    "profilePicture" TEXT,
    "coverImage" TEXT,
    "bookingTerms" TEXT,
    "isFreeTrial" BOOLEAN NOT NULL DEFAULT false,
    "daysLeftInTrial" INTEGER NOT NULL DEFAULT 0,
    "plan" "Plan" NOT NULL DEFAULT 'NONE',
    "isInVacancyMode" BOOLEAN NOT NULL DEFAULT false,
    "autoAcceptAppointments" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'PRO',

    CONSTRAINT "Pro_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ProToTags" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Pro_email_key" ON "Pro"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Pro_phoneNumber_key" ON "Pro"("phoneNumber");

-- CreateIndex
CREATE UNIQUE INDEX "_ProToTags_AB_unique" ON "_ProToTags"("A", "B");

-- CreateIndex
CREATE INDEX "_ProToTags_B_index" ON "_ProToTags"("B");

-- CreateIndex
CREATE UNIQUE INDEX "RefreshToken_proId_key" ON "RefreshToken"("proId");

-- AddForeignKey
ALTER TABLE "Availability" ADD CONSTRAINT "Availability_proId_fkey" FOREIGN KEY ("proId") REFERENCES "Pro"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SpecialAvailability" ADD CONSTRAINT "SpecialAvailability_proId_fkey" FOREIGN KEY ("proId") REFERENCES "Pro"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Unavailability" ADD CONSTRAINT "Unavailability_proId_fkey" FOREIGN KEY ("proId") REFERENCES "Pro"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_proId_fkey" FOREIGN KEY ("proId") REFERENCES "Pro"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProviderCategory" ADD CONSTRAINT "ProviderCategory_proId_fkey" FOREIGN KEY ("proId") REFERENCES "Pro"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProviderService" ADD CONSTRAINT "ProviderService_proId_fkey" FOREIGN KEY ("proId") REFERENCES "Pro"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RefreshToken" ADD CONSTRAINT "RefreshToken_proId_fkey" FOREIGN KEY ("proId") REFERENCES "Pro"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProToTags" ADD CONSTRAINT "_ProToTags_A_fkey" FOREIGN KEY ("A") REFERENCES "Pro"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProToTags" ADD CONSTRAINT "_ProToTags_B_fkey" FOREIGN KEY ("B") REFERENCES "Tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;
