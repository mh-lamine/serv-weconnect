/*
  Warnings:

  - A unique constraint covering the columns `[stripeConnectedAccountId]` on the table `Pro` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[stripeConnectedAccountId]` on the table `Salon` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Pro" ADD COLUMN     "stripeConnectedAccountId" TEXT;

-- AlterTable
ALTER TABLE "Salon" ADD COLUMN     "stripeConnectedAccountId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Pro_stripeConnectedAccountId_key" ON "Pro"("stripeConnectedAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Salon_stripeConnectedAccountId_key" ON "Salon"("stripeConnectedAccountId");
