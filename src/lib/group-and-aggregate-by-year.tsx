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
    { id: "1", name: "Janvier" },
    { id: "2", name: "Février" },
    { id: "3", name: "Mars" },
    { id: "4", name: "Avril" },
    { id: "5", name: "Mai" },
    { id: "6", name: "Juin" },
    { id: "7", name: "Juillet" },
    { id: "8", name: "Août" },
    { id: "9", name: "Septembre" },
    { id: "10", name: "Octobre" },
    { id: "11", name: "Novembre" },
    { id: "12", name: "Décembre" },
  ];

  const aggregatedData: Record<number, MonthlyData[]> = data.reduce(
    (acc, item) => {
      if (!item.dateOrdered) return acc;

      const date = new Date(item.dateOrdered);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const monthName =
        months.find((m) => m.id === month.toString())?.name || "";

      acc[year] =
        acc[year] ||
        Array.from({ length: 12 }, (_, i) => ({
          month: months[i].name,
          totalAmount: 0,
          totalAmountWithCard: 0,
          totalAmountWithoutCard: 0,
          orderNumberRegistered: 0,
          orderNumberRegisteredWithCard: 0,
          orderNumberRegisteredWithoutCard: 0,
        }));

      const monthEntryIndex = acc[year].findIndex(
        (entry) => entry.month === monthName
      );

      acc[year][monthEntryIndex].totalAmount +=
        (item.type === "ORDER" && item.amountPaid) || 0;
      acc[year][monthEntryIndex].totalAmount += item.voucherPaid || 0;
      acc[year][monthEntryIndex].totalAmount +=
        (item.type !== "ORDER" && item.amount) || 0;

      acc[year][monthEntryIndex].totalAmountWithCard +=
        (item.type === "ORDER" && item.amountPaid) || 0;
      acc[year][monthEntryIndex].totalAmountWithCard += item.voucherPaid || 0;

      acc[year][monthEntryIndex].totalAmountWithoutCard +=
        (item.type !== "ORDER" && item.amount) || 0;

      if (item) acc[year][monthEntryIndex].orderNumberRegistered++;
      if (item.type === "ORDER")
        acc[year][monthEntryIndex].orderNumberRegisteredWithCard++;
      if (item.type != "ORDER")
        acc[year][monthEntryIndex].orderNumberRegisteredWithoutCard++;

      return acc;
    },
    {} as Record<number, MonthlyData[]>
  );

  return aggregatedData;
}
