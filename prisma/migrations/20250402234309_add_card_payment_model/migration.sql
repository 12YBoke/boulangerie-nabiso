-- AlterTable
ALTER TABLE "FinancialFlow" ADD COLUMN     "cardPaymentId" TEXT;

-- CreateTable
CREATE TABLE "CardPayment" (
    "id" TEXT NOT NULL,
    "customerNumber" INTEGER NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "CardPayment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "FinancialFlow" ADD CONSTRAINT "FinancialFlow_cardPaymentId_fkey" FOREIGN KEY ("cardPaymentId") REFERENCES "CardPayment"("id") ON DELETE CASCADE ON UPDATE CASCADE;
