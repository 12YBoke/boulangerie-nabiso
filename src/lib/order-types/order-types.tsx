import { _OrderTypes } from "@/types/_order-types";

export const OrderTypes: _OrderTypes[] = [
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
    label: "Charge",
  },
  {
    value: "DONATION",
    label: "Don",
  },
  {
    value: "DAMAGE",
    label: "Foutu",
  },
  {
    value: "BURN",
    label: "Brulé",
  },
];
