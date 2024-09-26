/*
  Warnings:

  - You are about to drop the column `hasActiveSubscription` on the `User` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "Plan" AS ENUM ('NONE', 'ESSENTIAL', 'PRO', 'ENTERPRISE', 'FRANCHISE');

-- AlterTable
ALTER TABLE "Appointment" ADD COLUMN     "memberId" TEXT,
ADD COLUMN     "salonId" TEXT,
ALTER COLUMN "providerId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Availability" ADD COLUMN     "memberId" TEXT,
ADD COLUMN     "salonId" TEXT,
ADD COLUMN     "serviceId" TEXT,
ALTER COLUMN "providerId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "ProviderCategory" ADD COLUMN     "salonId" TEXT,
ALTER COLUMN "providerId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "ProviderService" ADD COLUMN     "deposit" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "salonId" TEXT,
ALTER COLUMN "providerId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "SpecialAvailability" ADD COLUMN     "memberId" TEXT,
ADD COLUMN     "salonId" TEXT,
ALTER COLUMN "providerId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "hasActiveSubscription",
ADD COLUMN     "daysLeftInTrial" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "isFreeTrial" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "plan" "Plan" NOT NULL DEFAULT 'NONE';

-- CreateTable
CREATE TABLE "Salon" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "isFreeTrial" BOOLEAN NOT NULL DEFAULT false,
    "daysLeftInTrial" INTEGER NOT NULL DEFAULT 0,
    "plan" "Plan" NOT NULL DEFAULT 'NONE',
    "profilePicture" TEXT,
    "coverImage" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Salon_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Member" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "accessCode" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "salonId" TEXT NOT NULL,

    CONSTRAINT "Member_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Unavailability" (
    "id" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "startTime" TEXT NOT NULL,
    "endTime" TEXT NOT NULL,
    "providerId" TEXT,
    "salonId" TEXT,
    "memberId" TEXT,

    CONSTRAINT "Unavailability_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_SalonToTags" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_MemberToProviderService" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Salon_email_key" ON "Salon"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Salon_phoneNumber_key" ON "Salon"("phoneNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Member_accessCode_key" ON "Member"("accessCode");

-- CreateIndex
CREATE UNIQUE INDEX "_SalonToTags_AB_unique" ON "_SalonToTags"("A", "B");

-- CreateIndex
CREATE INDEX "_SalonToTags_B_index" ON "_SalonToTags"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_MemberToProviderService_AB_unique" ON "_MemberToProviderService"("A", "B");

-- CreateIndex
CREATE INDEX "_MemberToProviderService_B_index" ON "_MemberToProviderService"("B");

-- AddForeignKey
ALTER TABLE "Member" ADD CONSTRAINT "Member_salonId_fkey" FOREIGN KEY ("salonId") REFERENCES "Salon"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Availability" ADD CONSTRAINT "Availability_salonId_fkey" FOREIGN KEY ("salonId") REFERENCES "Salon"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Availability" ADD CONSTRAINT "Availability_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Availability" ADD CONSTRAINT "Availability_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "ProviderService"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SpecialAvailability" ADD CONSTRAINT "SpecialAvailability_salonId_fkey" FOREIGN KEY ("salonId") REFERENCES "Salon"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SpecialAvailability" ADD CONSTRAINT "SpecialAvailability_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Unavailability" ADD CONSTRAINT "Unavailability_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Unavailability" ADD CONSTRAINT "Unavailability_salonId_fkey" FOREIGN KEY ("salonId") REFERENCES "Salon"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Unavailability" ADD CONSTRAINT "Unavailability_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_salonId_fkey" FOREIGN KEY ("salonId") REFERENCES "Salon"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProviderCategory" ADD CONSTRAINT "ProviderCategory_salonId_fkey" FOREIGN KEY ("salonId") REFERENCES "Salon"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProviderService" ADD CONSTRAINT "ProviderService_salonId_fkey" FOREIGN KEY ("salonId") REFERENCES "Salon"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SalonToTags" ADD CONSTRAINT "_SalonToTags_A_fkey" FOREIGN KEY ("A") REFERENCES "Salon"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SalonToTags" ADD CONSTRAINT "_SalonToTags_B_fkey" FOREIGN KEY ("B") REFERENCES "Tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MemberToProviderService" ADD CONSTRAINT "_MemberToProviderService_A_fkey" FOREIGN KEY ("A") REFERENCES "Member"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MemberToProviderService" ADD CONSTRAINT "_MemberToProviderService_B_fkey" FOREIGN KEY ("B") REFERENCES "ProviderService"("id") ON DELETE CASCADE ON UPDATE CASCADE;
