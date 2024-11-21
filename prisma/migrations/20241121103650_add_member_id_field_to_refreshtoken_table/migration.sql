/*
  Warnings:

  - A unique constraint covering the columns `[memberId]` on the table `RefreshToken` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "RefreshToken" ADD COLUMN     "memberId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "RefreshToken_memberId_key" ON "RefreshToken"("memberId");

-- AddForeignKey
ALTER TABLE "RefreshToken" ADD CONSTRAINT "RefreshToken_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE CASCADE ON UPDATE CASCADE;
