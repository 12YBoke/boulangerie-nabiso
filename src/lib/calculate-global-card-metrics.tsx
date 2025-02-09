interface Card {
  id: string;
  cardNumber: number;
  customerId: string;
  extensionId: string;
  dateCreated: Date;
  cardStatus: "ACTIVE" | "CLOSED";
  paymentStatus: "PENDING" | "PAID";
  orders: {
    id: string;
    amount: number | null;
    amountPaid: number | null;
    voucher: number | null;
    voucherPaid: number | null;
    dateOrdered: Date;
  }[];
}

interface MonthlyCardData {
  month: string;
  totalCommand: number; // Total des commandes
  commission: number; // Commission (27% du total des commandes)
  bp: number; // Somme des vouchers
  bpp: number; // Somme des vouchers payés
  bpt: number; // Différence entre BP et BPP
  netToPay: number; // Commission - BPT
  accountsUsed: number; // Nombre de comptes utilisés
  activeCards: number; // Nombre de cartes actives
  paidCards: number; // Nombre de cartes payées
}

export function calculateGlobalCardMetrics(
  cards: Card[]
): Record<number, MonthlyCardData[]> {
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

  const aggregatedData: Record<number, MonthlyCardData[]> = {};

  for (const card of cards) {
    const cardCreationDate = new Date(card.dateCreated);
    const cardYear = cardCreationDate.getFullYear();
    const cardMonth = cardCreationDate.getMonth();
    const monthName = months[cardMonth].name;

    // Initialize the year if not present
    aggregatedData[cardYear] =
      aggregatedData[cardYear] ||
      Array.from({ length: 12 }, (_, i) => ({
        month: months[i].name,
        totalCommand: 0,
        commission: 0,
        bp: 0,
        bpp: 0,
        bpt: 0,
        netToPay: 0,
        accountsUsed: 0,
        activeCards: 0,
        paidCards: 0,
      }));

    const monthEntry = aggregatedData[cardYear][cardMonth];

    // Increment metrics for card creation
    monthEntry.accountsUsed += 1;
    if (card.cardStatus === "ACTIVE") monthEntry.activeCards += 1;
    if (card.paymentStatus === "PAID") monthEntry.paidCards += 1;

    // Process orders linked to the card
    for (const order of card.orders) {
      const amount = order.amount || 0;
      const voucher = order.voucher || 0;
      const voucherPaid = order.voucherPaid || 0;

      monthEntry.totalCommand += amount;
      monthEntry.bp += voucher;
      monthEntry.bpp += voucherPaid;
    }
  }

  // Calculate derived values
  for (const year in aggregatedData) {
    aggregatedData[year].forEach((monthEntry) => {
      monthEntry.commission = +(monthEntry.totalCommand * 0.27).toFixed(2);
      monthEntry.bpt = +(monthEntry.bp - monthEntry.bpp).toFixed(2);
      monthEntry.netToPay =
        +(monthEntry.commission - monthEntry.bpt).toFixed(2) - 200;
    });
  }

  return aggregatedData;
}
