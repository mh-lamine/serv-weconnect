/*
  Warnings:

  - You are about to drop the column `providerId` on the `Review` table. All the data in the column will be lost.
  - Added the required column `duration` to the `Appointment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `providerServiceId` to the `Review` table without a default value. This is not possible if the table is not empty.
  - Made the column `clientId` on table `Review` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_clientId_fkey";

-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_providerId_fkey";

-- AlterTable
ALTER TABLE "Appointment" ADD COLUMN     "duration" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Review" DROP COLUMN "providerId",
ADD COLUMN     "providerServiceId" TEXT NOT NULL,
ALTER COLUMN "clientId" SET NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "email" DROP NOT NULL,
ALTER COLUMN "address" DROP NOT NULL;

-- CreateTable
CREATE TABLE "RefreshToken" (
    "token" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    CONSTRAINT "RefreshToken_pkey" PRIMARY KEY ("token")
);

-- CreateIndex
CREATE UNIQUE INDEX "RefreshToken_userId_key" ON "RefreshToken"("userId");

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_providerServiceId_fkey" FOREIGN KEY ("providerServiceId") REFERENCES "ProviderService"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RefreshToken" ADD CONSTRAINT "RefreshToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
