/*
  Warnings:

  - You are about to drop the column `userId` on the `Orders` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "OrderType" AS ENUM ('ORDER', 'CASH_SALE', 'CHARGE', 'DONATION', 'DAMAGE');

-- DropForeignKey
ALTER TABLE "Orders" DROP CONSTRAINT "Orders_userId_fkey";

-- AlterTable
ALTER TABLE "Orders" DROP COLUMN "userId",
ADD COLUMN     "CustomerId" TEXT,
ADD COLUMN     "amountToBeDelivered" DOUBLE PRECISION,
ADD COLUMN     "name" TEXT,
ADD COLUMN     "type" "OrderType" NOT NULL DEFAULT 'ORDER',
ALTER COLUMN "cardId" DROP NOT NULL,
ALTER COLUMN "amount" DROP NOT NULL,
ALTER COLUMN "amountPaid" DROP NOT NULL,
ALTER COLUMN "voucher" DROP NOT NULL,
ALTER COLUMN "voucherPaid" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Orders" ADD CONSTRAINT "Orders_CustomerId_fkey" FOREIGN KEY ("CustomerId") REFERENCES "Customer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Orders" ADD CONSTRAINT "Orders_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "Card"("id") ON DELETE CASCADE ON UPDATE CASCADE;
