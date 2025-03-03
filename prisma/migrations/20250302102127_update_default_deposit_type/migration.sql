/*
  Warnings:

  - You are about to alter the column `defaultDeposit` on the `Salon` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Salon" ALTER COLUMN "defaultDeposit" SET DEFAULT 0,
ALTER COLUMN "defaultDeposit" SET DATA TYPE INTEGER;
