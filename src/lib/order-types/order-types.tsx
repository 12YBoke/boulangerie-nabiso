import { _OrderTypes } from "@/types/_order-types";

export const OrderTypes : _OrderTypes[] = [
  {
    value: "ORDER",
    label: "Commande",
  },
  {
    value: "CASH_SALE",
    label: "Vente cash",
  },
  {
    value: "CHARGE",
    label: "Charges",
  },
  {
    value: "DONATION",
    label: "Dons",
  },
  {
    value: "DAMAGE",
    label: "Foutus",
  },
];