/* eslint-disable react/no-unescaped-entities */
import { FormatNumberWithCurrency } from "@/lib/format-number-with-currency";
import { ScrollArea, ScrollBar } from "@/shadcnui/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/shadcnui/components/ui/sheet";
import { Container } from "@/ui/components/container/container";
import { Typography } from "@/ui/components/typography/typography";
import { AmountDeliveredForm } from "@/ui/modules/amount-delivery-form/amount-delivery-form";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Eye } from "lucide-react";

interface Props {
  delivery: {
    id: string;
    amount: number | null;
    amountPaid: number | null;
    amountToBeDelivered: number | null;
    voucherPaid: number | null;
    type: "ORDER" | "CASH_SALE" | "CHARGE" | "DONATION" | "DAMAGE" | "BURN";
    typeLabel: string;
    name: string;
    dateOrdered: Date;
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
    totaldelivered: number;
  };
}

export const See = ({ delivery }: Props) => {
  const now = new Date();

  return (
    <Sheet>
      <SheetTrigger
        asChild
        className="cursor-pointer rounded-full bg-amber-50 hover:bg-amber-100 animate flex flex-row items-center text-amber-500"
      >
        <span className="p-2">
          <Eye className="h-5 w-5" />
        </span>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader className="flex flex-col gap-4">
          <SheetTitle>
            <Typography variant="title-lg">Gerer les livraisons</Typography>
          </SheetTitle>
          <SheetDescription className="h-full w-full bg-primary-100 p-4 rounded-lg">
            <Container className="flex flex-col gap-2">
              <Typography className="text-primary-800">
                Client : {delivery.cardNumber || delivery.name}
              </Typography>
              <Typography className="text-primary-800">
                Type : {delivery.typeLabel}
              </Typography>
              <Typography className="text-primary-800">
                Montant :{" "}
                {delivery.type === "ORDER"
                  ? FormatNumberWithCurrency(delivery.amount || 0)
                  : FormatNumberWithCurrency(delivery.amountToBeDelivered || 0)}
              </Typography>
              <Typography className="text-primary-800">
                Reste :{" "}
                {FormatNumberWithCurrency(
                  delivery.totaldelivered === 0
                    ? 0
                    : delivery.type === "ORDER"
                    ? delivery.amount! - delivery.totaldelivered
                    : delivery.amountToBeDelivered! - delivery.totaldelivered ||
                      0
                )}
              </Typography>
            </Container>
          </SheetDescription>
        </SheetHeader>
        {delivery.totaldelivered <= 0 ? (
          format(delivery.dateOrdered, "yyyy-MM-dd") >=
            format(now, "yyyy-MM-dd") && (
            <Container className="py-4 w-full flex flex-col gap-4">
              <Typography>
                Ajouter le montant de la commande livré le premier jour
              </Typography>
              <AmountDeliveredForm
                orderId={delivery.id}
                first
                orderDate={delivery.dateOrdered}
                limit={
                  delivery.totaldelivered === 0
                    ? (delivery.type === "ORDER" &&
                        delivery.amount &&
                        delivery.amount) ||
                      (delivery.type != "ORDER" &&
                        delivery.amountToBeDelivered &&
                        delivery.amountToBeDelivered) ||
                      0
                    : (delivery.type === "ORDER" &&
                        delivery.amount &&
                        delivery.amount - delivery.totaldelivered) ||
                      (delivery.type != "ORDER" &&
                        delivery.amountToBeDelivered &&
                        delivery.amountToBeDelivered -
                          delivery.totaldelivered) ||
                      0
                }
              />
            </Container>
          )
        ) : (
          <Container className="py-4 w-full flex flex-col gap-4">
            <Typography>Ajouter un montant</Typography>
            <ScrollArea className="h-64 bg-primary-50 whitespace-nowrap pr-4 rounded-lg">
              <Container className="flex flex-col gap-4 p-4">
                {delivery.arraydeliveries.map(
                  ({ id, amountDelivered, dateDelivered }) => (
                    <Container
                      key={id}
                      className="flex flex-row justify-between"
                    >
                      <Container>
                        <Typography>
                          {FormatNumberWithCurrency(amountDelivered || 0)}
                        </Typography>
                      </Container>
                      <Container>
                        <Typography>
                          {format(dateDelivered!, "dd-MM-yyyy", {
                            locale: fr,
                          })}
                        </Typography>
                      </Container>
                    </Container>
                  )
                )}
              </Container>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
            <AmountDeliveredForm
              orderId={delivery.id}
              orderDate={delivery.dateOrdered}
              limit={
                delivery.totaldelivered === 0
                  ? (delivery.type === "ORDER" &&
                      delivery.amount &&
                      delivery.amount) ||
                    (delivery.type != "ORDER" &&
                      delivery.amountToBeDelivered &&
                      delivery.amountToBeDelivered) ||
                    0
                  : (delivery.type === "ORDER" &&
                      delivery.amount &&
                      delivery.amount - delivery.totaldelivered) ||
                    (delivery.type != "ORDER" &&
                      delivery.amountToBeDelivered &&
                      delivery.amountToBeDelivered - delivery.totaldelivered) ||
                    0
              }
            />
          </Container>
        )}
      </SheetContent>
    </Sheet>
  );
};
