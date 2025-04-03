export interface _FinancialFlowTypes {
  id: string;
  amount: number;
  reason: string;
  date: Date;
  flowType: "INCOME" | "EXPENSE";
  agent: string;
  agentSalary: {
    id: string;
    dailySalary: number | null;
    missingTotal: number | null;
    missingRemoved: number | null;
    missingRemaining: number | null;
  } | null;
  cardPayment: {
    id: string;
    customerNumber: number;
  } | null;
}
