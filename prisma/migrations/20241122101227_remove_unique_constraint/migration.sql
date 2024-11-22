-- DropIndex
DROP INDEX "User_providerId_key";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "providerId" SET DATA TYPE TEXT;
