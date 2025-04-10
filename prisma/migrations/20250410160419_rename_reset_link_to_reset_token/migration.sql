/*
  Warnings:

  - You are about to drop the column `resetLink` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[resetToken]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "User_resetLink_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "resetLink",
ADD COLUMN     "resetToken" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_resetToken_key" ON "User"("resetToken");
