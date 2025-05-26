export interface _DeliveryTypes {
  id: string;
  amount: number | null;
  amountPaid: number | null;
  amountToBeDelivered: number | null;
  voucher: number | null;
  voucherPaid: number | null;
  type: "ORDER" | "CASH_SALE" | "CHARGE" | "DONATION" | "DAMAGE" | "BURN";
  typeLabel: string;
  name: string;
  dateOrdered: Date;
  CustomerId: string | null;
  deliveries: {
    id: string;
    amountDelivered: number | null;
    dateDelivered: Date | null;
  }[];
  arraydeliveries: {
    id: string;
    amountDelivered: number | null;
    dateDelivered: Date | null;
  }[];
  cardId: string | null;
  cardNumber: number | null;
  customerId: string | null;
  totaldelivered: number;
  isDate: boolean;
  userId: string;
  userName: string;
}
