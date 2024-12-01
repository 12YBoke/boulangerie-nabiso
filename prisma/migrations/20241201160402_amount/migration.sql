/*
  Warnings:

  - You are about to drop the column `amoutDelivered` on the `Deliveries` table. All the data in the column will be lost.
  - Added the required column `amountDelivered` to the `Deliveries` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Deliveries" DROP COLUMN "amoutDelivered",
ADD COLUMN     "amountDelivered" DOUBLE PRECISION NOT NULL;
