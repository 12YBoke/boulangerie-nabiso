"use client";

import { ScrollArea } from "@/shadcnui/components/ui/scroll-area";
import { Container } from "@/ui/components/container/container";
import { Typography } from "@/ui/components/typography/typography";
import clsx from "clsx";
import {
  Check,
  CircleCheck,
  CirclePlay,
  CircleX,
  CreditCard,
  Play,
} from "lucide-react";
import { useState } from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { FormatNumberWithCurrency } from "@/lib/format-number-with-currency";
import { CloseCard } from "@/ui/modules/close-card/close-card";
import { ValidatePayment } from "@/ui/modules/validate-payment/validate-payment";

interface Props {
  rate: number;
  card: {
    id: string;
    cardNumber: number;
    cardStatus: "ACTIVE" | "CLOSED";
    paymentStatus: "PAID" | "PENDING";
    customerId: string;
    extensionId: string;
    orders: {
      id: string;
      cardId: string | null;
      amount: number | null;
      amountPaid: number | null;
      voucher: number | null;
      voucherPaid: number | null;
      dateOrdered: Date;
      CustomerId: string | null;
      userId: string;
      amountToBeDelivered: number | null;
      type: "ORDER" | "CASH_SALE" | "CHARGE" | "DONATION" | "DAMAGE" | "BURN";
      name: string | null;
    }[];
  }[];
  userData: {
    id: string;
    extensionId: string;
    role: "ADMIN" | "USER";
  };
}

export const CardView = ({ card, rate, userData }: Props) => {
  const [cardSelectedId, setCardSelectedId] = useState<string | null>(null);

  return (
    <Container className="w-full flex flex-row gap-2">
      <Container className="w-[20%] rounded-lg flex flex-col gap-4">
        <ScrollArea className="h-[80vh] pr-4 whitespace-nowrap rounded-lg">
          <Container className="flex flex-col gap-2">
            {card.map(({ id, cardNumber, cardStatus, paymentStatus }) => (
              <div
                key={id}
                className={clsx(
                  "cursor-pointer flex flex-row justify-between items-center gap-2 p-2 rounded-lg border-2 hover:border-primary-50 animate",
                  cardSelectedId === id ? "border-primary-50 bg-primary-50" : ""
                )}
                onClick={() => setCardSelectedId(id)}
              >
                <Container>
                  <Typography className="text-primary-800">
                    Carte {cardNumber}
                  </Typography>
                </Container>
                <Container className="flex flex-row gap-1">
                  <Container
                    className={clsx(
                      "p-1 rounded-full animate",
                      cardStatus === "ACTIVE" ? "" : "bg-black"
                    )}
                  >
                    {cardStatus === "ACTIVE" ? (
                      <Play
                        size={20}
                        fill="currentColor"
                        className="text-black"
                      />
                    ) : (
                      <Check size={20} className="text-white" />
                    )}
                  </Container>
                  <Container
                    className={clsx(
                      "p-1 rounded-full animate",
                      paymentStatus === "PAID" ? "bg-black" : ""
                    )}
                  >
                    <CreditCard
                      size={20}
                      className={clsx(
                        paymentStatus === "PAID" ? "text-white" : "text-black"
                      )}
                    />
                  </Container>
                </Container>
              </div>
            ))}
          </Container>
        </ScrollArea>
      </Container>
      <Container className="w-[80%] flex flex-col gap-2 justify-between ">
        <DataTable
          columns={columns}
          userData={userData}
          data={card.find(({ id }) => id === cardSelectedId)?.orders || []}
        />
        <Container className="flex flex-col gap-4">
          <Container className="rounded-lg p-4 flex flex-row gap-4 justify-between bg-primary-100">
            <Container className="flex flex-col gap-2">
              <Typography className="text-primary-800">
                Total commande
              </Typography>
              <Typography variant="title-sm" className="text-primary-800">
                {FormatNumberWithCurrency(
                  card
                    .find(({ id }) => id === cardSelectedId)
                    ?.orders.reduce(
                      (order, orders) => order + orders.amount!,
                      0
                    ) || 0
                )}
              </Typography>
            </Container>
            <Container className="flex flex-col gap-2">
              <Typography className="text-primary-800">Commission</Typography>
              <Typography variant="title-sm" className="text-primary-800">
                {FormatNumberWithCurrency(
                  (card
                    .find(({ id }) => id === cardSelectedId)
                    ?.orders.reduce(
                      (order, orders) => order + (orders.amount || 0),
                      0
                    ) || 0) *
                    (rate / 100)
                )}
              </Typography>
            </Container>
            <Container className="flex flex-col gap-2">
              <Typography className="text-primary-800">B.P.</Typography>
              <Typography variant="title-sm" className="text-primary-800">
                {FormatNumberWithCurrency(
                  card
                    .find(({ id }) => id === cardSelectedId)
                    ?.orders.reduce(
                      (order, orders) => order + (orders.voucher || 0),
                      0
                    ) || 0
                )}
              </Typography>
            </Container>
            <Container className="flex flex-col gap-2">
              <Typography className="text-primary-800">B.P.P.</Typography>
              <Typography variant="title-sm" className="text-primary-800">
                {FormatNumberWithCurrency(
                  card
                    .find(({ id }) => id === cardSelectedId)
                    ?.orders.reduce(
                      (order, orders) => order + (orders.voucherPaid || 0),
                      0
                    ) || 0
                )}
              </Typography>
            </Container>
            <Container className="flex flex-col gap-2">
              <Typography className="text-primary-800">B.P.T.</Typography>
              <Typography variant="title-sm" className="text-primary-800">
                {FormatNumberWithCurrency(
                  (card
                    .find(({ id }) => id === cardSelectedId)
                    ?.orders.reduce(
                      (order, orders) => order + (orders.voucher || 0),
                      0
                    ) || 0) -
                    (card
                      .find(({ id }) => id === cardSelectedId)
                      ?.orders.reduce(
                        (order, orders) => order + (orders.voucherPaid || 0),
                        0
                      ) || 0)
                )}
              </Typography>
            </Container>
            <Container className="flex flex-col gap-2">
              <Typography className="text-primary-800">Net à payer</Typography>
              <Typography variant="title-sm" className="text-amber-800">
                {FormatNumberWithCurrency(
                  cardSelectedId
                    ? (card
                        .find(({ id }) => id === cardSelectedId)
                        ?.orders.reduce(
                          (order, orders) => order + (orders.amount || 0),
                          0
                        ) || 0) *
                        (rate / 100) -
                        ((card
                          .find(({ id }) => id === cardSelectedId)
                          ?.orders.reduce(
                            (order, orders) => order + (orders.voucher || 0),
                            0
                          ) || 0) -
                          (card
                            .find(({ id }) => id === cardSelectedId)
                            ?.orders.reduce(
                              (order, orders) =>
                                order + (orders.voucherPaid || 0),
                              0
                            ) || 0)) -
                        200
                    : 0
                )}
              </Typography>
            </Container>
          </Container>
          <Container
            className={clsx(
              "flex flex-row p-4 rounded-lg border justify-between"
            )}
          >
            <Container className="flex flex-row gap-4 justify-center items-center">
              <Container className="flex flex-col gap-2">
                <Typography>Status de la carte</Typography>
                <Typography variant="title-sm">
                  {card.find(({ id }) => id === cardSelectedId)?.cardStatus ===
                  "ACTIVE"
                    ? "Actif"
                    : card.find(({ id }) => id === cardSelectedId)
                        ?.cardStatus === "CLOSED"
                    ? "Cloturé"
                    : "-"}
                </Typography>
                <CloseCard
                  customerid={
                    card.find(({ id }) => id === cardSelectedId)?.customerId!
                  }
                  extensionid={
                    card.find(({ id }) => id === cardSelectedId)?.extensionId!
                  }
                  id={cardSelectedId!}
                  cardNumber={
                    card.find(({ id }) => id === cardSelectedId)?.cardNumber!
                  }
                  disabled={
                    !cardSelectedId
                      ? true
                      : card.find(({ id }) => id === cardSelectedId)
                          ?.cardStatus === "CLOSED"
                      ? true
                      : false
                  }
                />
              </Container>
            </Container>
            <Container className="flex flex-row gap-4 justify-center items-center">
              <Container className="flex flex-col gap-2">
                <Typography>Status du paiement</Typography>
                <Typography variant="title-sm">
                  {card.find(({ id }) => id === cardSelectedId)
                    ?.paymentStatus === "PAID"
                    ? "Payé"
                    : card.find(({ id }) => id === cardSelectedId)
                        ?.paymentStatus === "PENDING"
                    ? "En attente"
                    : "-"}
                </Typography>
                <ValidatePayment
                  customerid={
                    card.find(({ id }) => id === cardSelectedId)?.customerId!
                  }
                  extensionid={
                    card.find(({ id }) => id === cardSelectedId)?.extensionId!
                  }
                  id={cardSelectedId!}
                  cardNumber={
                    card.find(({ id }) => id === cardSelectedId)?.cardNumber!
                  }
                  disabled={
                    !cardSelectedId
                      ? true
                      : card.find(({ id }) => id === cardSelectedId)
                          ?.cardStatus === "ACTIVE"
                      ? true
                      : card.find(({ id }) => id === cardSelectedId)
                          ?.paymentStatus === "PAID"
                      ? true
                      : userData.role === "USER"
                      ? true
                      : false
                  }
                />
              </Container>
            </Container>
          </Container>
        </Container>
      </Container>
    </Container>
  );
};
