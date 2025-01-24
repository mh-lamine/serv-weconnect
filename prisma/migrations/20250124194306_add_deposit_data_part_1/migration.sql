/*
  Warnings:

  - You are about to drop the column `stripePriceId` on the `ProviderService` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "PaymentOption" AS ENUM ('ON_SITE', 'DEPOSIT', 'FULL');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'PARTLY_PAID', 'FULLY_PAID', 'REFUNDED');

-- AlterTable
ALTER TABLE "Pro" ADD COLUMN     "defaultDeposit" DOUBLE PRECISION NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "ProviderService" DROP COLUMN "stripePriceId",
ADD COLUMN     "paymentOption" "PaymentOption" NOT NULL DEFAULT 'ON_SITE';

-- AlterTable
ALTER TABLE "Salon" ADD COLUMN     "defaultDeposit" DOUBLE PRECISION NOT NULL DEFAULT 0;
