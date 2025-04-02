-- AlterTable
ALTER TABLE "FinancialFlow" ADD COLUMN     "agentSalaryId" TEXT;

-- CreateTable
CREATE TABLE "AgentSalary" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "dailySalary" DOUBLE PRECISION,
    "missingTotal" DOUBLE PRECISION,
    "missingRemoved" DOUBLE PRECISION,
    "missingRemaining" DOUBLE PRECISION,

    CONSTRAINT "AgentSalary_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "FinancialFlow" ADD CONSTRAINT "FinancialFlow_agentSalaryId_fkey" FOREIGN KEY ("agentSalaryId") REFERENCES "AgentSalary"("id") ON DELETE CASCADE ON UPDATE CASCADE;
