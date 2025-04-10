/*
  Warnings:

  - A unique constraint covering the columns `[resetLink]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "resetLink" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_resetLink_key" ON "User"("resetLink");
