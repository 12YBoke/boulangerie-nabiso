export interface _DeliveryTypes {
  id: string;
  amount: number | null;
  amountPaid: number | null;
  amountToBeDelivered: number | null;
  voucherPaid: number | null;
  type: "ORDER" | "CASH_SALE" | "CHARGE" | "DONATION" | "DAMAGE";
  typeLabel: string;
  name: string;
  dateOrdered: Date;
  deliveries: {
    id: string;
    amountDelivered: number | null;
    dateDelivered: Date | null;
  }[];
  cardId: string | null;
  cardNumber: number | null;
  customerId: string | null;
  totaldelivered: number;
}
