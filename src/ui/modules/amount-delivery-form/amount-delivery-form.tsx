/* eslint-disable react/no-unescaped-entities */
"use client";

import { useToast } from "@/shadcnui/components/ui/use-toast";
import { AmountDeliveredFormFieldsType } from "@/types/forms";
import { Container } from "@/ui/components/container/container";
import { useRouter } from "next/navigation";
import * as z from "zod";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import UseLoading from "@/hooks/use-loading";
import { useState } from "react";
import { Typography } from "@/ui/components/typography/typography";
import { InputField } from "@/ui/components/input-field/input-field";
import { Form } from "@/shadcnui/components/ui/form";
import { Button } from "@/ui/components/button/button";

interface Props {
  orderId: string;
  first?: boolean;
  limit: number;
  orderDate: Date;
}

export const AmountDeliveredForm = ({
  orderId,
  first,
  limit,
  orderDate,
}: Props) => {
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, startLoading, stopLoading] = UseLoading();
  const form = useForm<z.infer<typeof AmountDeliveredFormFieldsType>>({
    resolver: zodResolver(AmountDeliveredFormFieldsType),
    defaultValues: {
      amountdelivered: 0,
    },
  });

  const amountdelivered = useWatch({
    control: form.control,
    name: "amountdelivered",
    defaultValue: 0,
  });

  async function onSubmit(
    values: z.infer<typeof AmountDeliveredFormFieldsType>
  ) {
    startLoading();
    const { amountdelivered } = values;
    const dateDelivered = (() => {
      const now = new Date();
      const currentHour = now.getHours();

      if (first) {
        // Si `first` est activé, retourner la date actuelle
        if (currentHour < 12) {
          return orderDate; // Objet Date actuel
        } else {
          // Ajouter un jour pour obtenir la date de demain
          const tomorrow = new Date(now);
          tomorrow.setDate(now.getDate() + 1);
          return tomorrow; // Objet Date pour demain
        }
      } else {
        // Vérifier si l'heure actuelle est avant 12h
        if (currentHour < 12) {
          return orderDate; // Objet Date actuel
        } else {
          // Ajouter un jour pour obtenir la date de demain
          const tomorrow = new Date(now);
          tomorrow.setDate(now.getDate() + 1);
          return tomorrow; // Objet Date pour demain
        }
      }
    })();

    const addDelivery = await fetch(`/api/delivery/`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        orderId,
        amountdelivered,
        dateDelivered,
      }),
    });

    if (addDelivery.status === 200) {
      toast({
        title: "Commande ajoutée",
        description: (
          <Typography variant="body-sm">
            La livraison a été ajoutée avec succès
          </Typography>
        ),
      });
      router.refresh();
      stopLoading();
      form.reset();
    } else {
      toast({
        variant: "destructive",
        title: "Erreur !",
        description: (
          <Typography variant="body-sm">
            Une erreur s'est produite lors de l'ajout de la livraison. Veuillez
            réessayer.
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
        className="relative flex flex-col w-full"
      >
        <Container className="w-full flex flex-row gap-4">
          <Container>
            <InputField
              placeholder="Montant à livrer"
              control={form.control}
              name="amountdelivered"
              type={"number"}
            />
          </Container>
          <Container>
            <Button
              disabled={
                amountdelivered === -1
                  ? true
                  : amountdelivered > limit
                  ? true
                  : false
              }
              type="submit"
              isLoading={isLoading}
            >
              Ajouter
            </Button>
          </Container>
        </Container>
      </form>
    </Form>
  );
};
