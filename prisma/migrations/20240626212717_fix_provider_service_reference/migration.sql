/*
  Warnings:

  - Added the required column `providerId` to the `ProviderService` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ProviderService" ADD COLUMN     "providerId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "ProviderService" ADD CONSTRAINT "ProviderService_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
