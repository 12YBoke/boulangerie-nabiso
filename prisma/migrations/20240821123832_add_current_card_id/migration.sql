/*
  Warnings:

  - A unique constraint covering the columns `[currentCardId]` on the table `Customer` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Customer" ALTER COLUMN "currentCardId" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Customer_currentCardId_key" ON "Customer"("currentCardId");

-- AddForeignKey
ALTER TABLE "Customer" ADD CONSTRAINT "Customer_currentCardId_fkey" FOREIGN KEY ("currentCardId") REFERENCES "Card"("id") ON DELETE SET NULL ON UPDATE CASCADE;
