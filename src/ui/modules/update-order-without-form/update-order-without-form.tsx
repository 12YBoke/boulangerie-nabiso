/* eslint-disable react/no-unescaped-entities */
"use client";

import { useToast } from "@/shadcnui/components/ui/use-toast";
import { OrdersFormFieldsType } from "@/types/forms";
import { Container } from "@/ui/components/container/container";
import { useRouter } from "next/navigation";
import * as z from "zod";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import UseLoading from "@/hooks/use-loading";
import { useEffect, useState } from "react";
import { Typography } from "@/ui/components/typography/typography";
import { InputField } from "@/ui/components/input-field/input-field";
import { Form } from "@/shadcnui/components/ui/form";
import { Button } from "@/ui/components/button/button";

interface Props {
  order: {
    id: string;
    cardId: string | null;
    amount: number | null;
    amountPaid: number | null;
    voucher: number | null;
    voucherPaid: number | null;
    dateOrdered: Date | null;
    CustomerId: string | null;
    userId: string;
    name: string | null;
    amountToBeDelivered: number | null;
    type: "ORDER" | "CASH_SALE" | "CHARGE" | "DONATION" | "DAMAGE" | "BURN";
  };
}

export const UpdateOrderWithoutForm = ({ order }: Props) => {
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, startLoading, stopLoading] = UseLoading();
  const [isReady, setIsReady] = useState(false);
  const form = useForm<z.infer<typeof OrdersFormFieldsType>>({
    resolver: zodResolver(OrdersFormFieldsType),
    defaultValues: {
      amount: order.amount!,
      amountpaid: order.amountPaid!,
      voucher: order.voucher!,
      voucherpaid: order.voucherPaid!,
      type: order.type,
      amountdelivered: order.amountToBeDelivered!,
      dateordered: order.dateOrdered!,
      customerid: order.CustomerId!,
      name: order.name!,
    },
  });

  const type = useWatch({
    control: form.control,
    name: "type",
    defaultValue: order.type,
  });

  const amountdelivered = useWatch({
    control: form.control,
    name: "amountdelivered",
    defaultValue: order.amountToBeDelivered!,
  });

  const amount = useWatch({
    control: form.control,
    name: "amount",
    defaultValue: order.amount!,
  });

  const voucherpaid = useWatch({
    control: form.control,
    name: "voucherpaid",
    defaultValue: order.voucherPaid!,
  });

  useEffect(() => {
    if (type === "ORDER") {
      if (amount > 0 || voucherpaid > 0) {
        setIsReady(true);
      } else {
        setIsReady(false);
      }
    } else {
      if (amountdelivered > amount) {
        setIsReady(true);
      } else {
        setIsReady(false);
      }
    }
  }, [type, form, amountdelivered, amount, voucherpaid]);

  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === "amount" || name === "amountpaid") {
        form.setValue("voucher", value.amount! - value.amountpaid!);
      }
    });
    return () => subscription.unsubscribe();
  }, [form]);

  async function onSubmit(values: z.infer<typeof OrdersFormFieldsType>) {
    startLoading();
    const {
      amount,
      amountpaid,
      voucher,
      voucherpaid,
      dateordered,
      customerid,
      name,
      type,
      amountdelivered,
    } = values;

    const updateOrder = await fetch(`/api/order/${order.id}`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        dateordered,
        customerid,
        name,
        type,
        amount,
        amountpaid,
        voucher,
        voucherpaid,
        amountdelivered,
        userid: order.userId,
        cardid: order.cardId,
      }),
    });

    if (updateOrder.status === 200) {
      toast({
        title: "Commande modifiée",
        description: (
          <Typography variant="body-sm">
            La commande a été modifiée avec succès
          </Typography>
        ),
      });
      router.refresh();
      stopLoading();
    } else {
      toast({
        variant: "destructive",
        title: "Erreur !",
        description: (
          <Typography variant="body-sm">
            Une erreur s'est produite lors de la modification de la commande.
            Veuillez réessayer.
          </Typography>
        ),
      });
      router.refresh();
      stopLoading();
    }
    router.refresh();
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="relative flex flex-col gap-8"
      >
        <Container className="flex flex-col gap-4 w-full">
          <Container className="gap-8">
            {type === "ORDER" ? (
              <Container className="gap-2 grid grid-cols-2">
                <Container>
                  <InputField
                    placeholder="Montant de la commande"
                    control={form.control}
                    name="amount"
                    type={"number"}
                    label="Montant de la commande"
                  />
                </Container>
                <Container>
                  <InputField
                    placeholder="Montant payé"
                    control={form.control}
                    name="amountpaid"
                    type={"number"}
                    label="Montant payé"
                  />
                </Container>
                <Container>
                  <InputField
                    placeholder="B.P."
                    control={form.control}
                    name="voucher"
                    type={"number"}
                    label="B.P."
                    disabled
                  />
                </Container>
                <Container>
                  <InputField
                    placeholder="B.P.P."
                    control={form.control}
                    name="voucherpaid"
                    type={"number"}
                    label="B.P.P."
                  />
                </Container>
              </Container>
            ) : (
              <Container className="flex flex-col gap-2">
                <Container>
                  <InputField
                    control={form.control}
                    name={"name"}
                    placeholder={"Nom du client"}
                  />
                </Container>
                <Container>
                  <InputField
                    placeholder="Montant de la commande"
                    control={form.control}
                    name="amount"
                    type={"number"}
                    label="Montant de la commande"
                  />
                </Container>
                <Container>
                  <InputField
                    placeholder="Montant à livrer"
                    control={form.control}
                    name="amountdelivered"
                    type={"number"}
                    label="Montant à livrer"
                  />
                </Container>
              </Container>
            )}
          </Container>
          <Container>
            <Button disabled={!isReady} type="submit" isLoading={isLoading}>
              Valider la commande
            </Button>
          </Container>
        </Container>
      </form>
    </Form>
  );
};
