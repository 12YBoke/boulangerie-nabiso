import { _DeliveryTypes } from "@/types/_delivery-types";

interface MonthlyData {
  month: string;
  totalAmount: number;
  totalAmountWithCard: number;
  totalAmountWithoutCard: number;
  orderNumberRegistered: number;
  orderNumberRegisteredWithCard: number;
  orderNumberRegisteredWithoutCard: number;
}

export function groupAndAggregateByYear(
  data: _DeliveryTypes[]
): Record<number, MonthlyData[]> {
  const months = [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
  ];

  const initializeMonthlyData = (): MonthlyData[] =>
    months.map((month) => ({
      month,
      totalAmount: 0,
      totalAmountWithCard: 0,
      totalAmountWithoutCard: 0,
      orderNumberRegistered: 0,
      orderNumberRegisteredWithCard: 0,
      orderNumberRegisteredWithoutCard: 0,
    }));

  return data.reduce((acc, item) => {
    if (!item.dateOrdered) return acc;

    const date = new Date(item.dateOrdered);
    const year = date.getFullYear();
    const monthIndex = date.getMonth();

    if (!acc[year]) {
      acc[year] = initializeMonthlyData();
    }

    const monthData = acc[year][monthIndex];

    const amountPaid = item.type === "ORDER" ? item.amountPaid || 0 : 0;
    const amountNonOrder = item.type !== "ORDER" ? item.amount || 0 : 0;

    monthData.totalAmount +=
      amountPaid + (item.voucherPaid || 0) + amountNonOrder;
    monthData.totalAmountWithCard += amountPaid + (item.voucherPaid || 0);
    monthData.totalAmountWithoutCard += amountNonOrder;

    monthData.orderNumberRegistered++;
    if (item.type === "ORDER") {
      monthData.orderNumberRegisteredWithCard++;
    } else {
      monthData.orderNumberRegisteredWithoutCard++;
    }

    return acc;
  }, {} as Record<number, MonthlyData[]>);
}
