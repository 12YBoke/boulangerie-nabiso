-- CreateEnum
CREATE TYPE "FlowType" AS ENUM ('INCOME', 'EXPENSE');

-- CreateTable
CREATE TABLE "FinancialFlow" (
    "id" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "reason" TEXT NOT NULL,
    "agentId" TEXT NOT NULL,
    "extensionId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "flowType" "FlowType" NOT NULL,

    CONSTRAINT "FinancialFlow_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "FinancialFlow" ADD CONSTRAINT "FinancialFlow_agentId_fkey" FOREIGN KEY ("agentId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FinancialFlow" ADD CONSTRAINT "FinancialFlow_extensionId_fkey" FOREIGN KEY ("extensionId") REFERENCES "Extension"("id") ON DELETE CASCADE ON UPDATE CASCADE;
