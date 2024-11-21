/*
  Warnings:

  - You are about to drop the `_MemberToProviderService` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_MemberToProviderService" DROP CONSTRAINT "_MemberToProviderService_A_fkey";

-- DropForeignKey
ALTER TABLE "_MemberToProviderService" DROP CONSTRAINT "_MemberToProviderService_B_fkey";

-- DropTable
DROP TABLE "_MemberToProviderService";

-- CreateTable
CREATE TABLE "_memberServices" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_memberServices_AB_unique" ON "_memberServices"("A", "B");

-- CreateIndex
CREATE INDEX "_memberServices_B_index" ON "_memberServices"("B");

-- AddForeignKey
ALTER TABLE "_memberServices" ADD CONSTRAINT "_memberServices_A_fkey" FOREIGN KEY ("A") REFERENCES "Member"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_memberServices" ADD CONSTRAINT "_memberServices_B_fkey" FOREIGN KEY ("B") REFERENCES "ProviderService"("id") ON DELETE CASCADE ON UPDATE CASCADE;
