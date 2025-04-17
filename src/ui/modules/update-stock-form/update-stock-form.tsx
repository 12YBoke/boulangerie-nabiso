/* eslint-disable react/no-unescaped-entities */
"use client";

import { Container } from "@/ui/components/container/container";
import { Form } from "@/shadcnui/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { AddStockFormFieldsType } from "@/types/forms";
import { InputField } from "@/ui/components/input-field/input-field";
import { Typography } from "@/ui/components/typography/typography";
import { Button } from "@/ui/components/button/button";
import { useToast } from "@/shadcnui/components/ui/use-toast";
import { useRouter } from "next/navigation";
import UseLoading from "@/hooks/use-loading";
import { InputFieldDate } from "@/ui/components/input-field-date/input-field-date";
import { Pencil } from "lucide-react";

interface Props {
  stock: {
    id: string;
    name: string;
    startingStock: string;
    endingStock: string;
    date: Date;
    dayProduction: string;
    agent: string;
  };
}

export const UpdateStockForm = ({ stock }: Props) => {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, startLoading, stopLoading] = UseLoading();
  const form = useForm<z.infer<typeof AddStockFormFieldsType>>({
    resolver: zodResolver(AddStockFormFieldsType),
    defaultValues: {
      name: stock.name,
      startingStock: stock.startingStock,
      endingStock: stock.endingStock,
      dayProduction: stock.dayProduction,
      date: stock.date ? new Date(stock.date) : new Date(),
    },
  });

  async function onSubmit(values: z.infer<typeof AddStockFormFieldsType>) {
    startLoading();
    const { name, startingStock, endingStock, dayProduction, date } = values;

    const updateStock = await fetch(`/api/stock/${stock.id}`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        startingStock,
        endingStock,
        dayProduction,
        date,
      }),
    });

    if (updateStock.status === 200) {
      toast({
        title: "Succès",
        description: (
          <Typography variant="body-sm">
            Le rapport a été mis à jour avec succès.
          </Typography>
        ),
      });
      stopLoading();
      router.refresh();
    } else {
      toast({
        variant: "destructive",
        title: "Erreur !",
        description: (
          <Typography variant="body-sm">
            Une erreur est survenue durant la mise à jour du rapport. Veuillez
            recommencer l'opération.
          </Typography>
        ),
      });
      stopLoading();
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Container className="flex flex-col gap-4">
          <Container className="w-full">
            <Container className="w-full flex flex-row gap-4">
              <Container className="basis-1/2">
                <InputFieldDate
                  control={form.control}
                  name={"date"}
                  label={"Date de la transaction"}
                />
              </Container>
              <Container className="basis-1/2">
                <InputField
                  label="Nom du produit"
                  placeholder="Nom du produit"
                  control={form.control}
                  name="name"
                />
              </Container>
            </Container>
          </Container>
          <Container>
            <InputField
              placeholder="Stock de départ"
              control={form.control}
              name="startingStock"
            />
          </Container>
          <Container>
            <InputField
              placeholder="Production du jour"
              control={form.control}
              name="dayProduction"
            />
          </Container>
          <Container>
            <InputField
              placeholder="Stock final"
              control={form.control}
              name="endingStock"
            />
          </Container>
          <Container className="w-full">
            <Button Icon={Pencil} type="submit" isLoading={isLoading}>
              Mettre à jour
            </Button>
          </Container>
        </Container>
      </form>
    </Form>
  );
};
