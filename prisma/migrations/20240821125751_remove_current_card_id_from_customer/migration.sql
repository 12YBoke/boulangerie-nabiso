/*
  Warnings:

  - You are about to drop the column `currentCardId` on the `Customer` table. All the data in the column will be lost.
  - Made the column `phoneNumber` on table `Customer` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Customer" DROP CONSTRAINT "Customer_currentCardId_fkey";

-- DropIndex
DROP INDEX "Customer_currentCardId_key";

-- AlterTable
ALTER TABLE "Customer" DROP COLUMN "currentCardId",
ALTER COLUMN "phoneNumber" SET NOT NULL;
