-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'SALON', 'MEMBER');

-- AlterTable
ALTER TABLE "Member" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'MEMBER';

-- AlterTable
ALTER TABLE "Salon" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'SALON';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'USER';
