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
import { Plus } from "lucide-react";
import { InputFieldDate } from "@/ui/components/input-field-date/input-field-date";

interface Props {
  userData:
    | {
        id: string;
        extensionId: string;
        role: "ADMIN" | "USER";
      }
    | undefined;
}

export const AddStockForm = ({ userData }: Props) => {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, startLoading, stopLoading] = UseLoading();
  const form = useForm<z.infer<typeof AddStockFormFieldsType>>({
    resolver: zodResolver(AddStockFormFieldsType),
    defaultValues: {
      name: "",
      startingStock: "",
      endingStock: "",
      dayProduction: "",
      date: undefined,
      income: "",
    },
  });

  async function onSubmit(values: z.infer<typeof AddStockFormFieldsType>) {
    startLoading();
    const { name, startingStock, endingStock, dayProduction, date, income } =
      values;

    const addStock = await fetch(`/api/stock`, {
      method: "POST",
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
        userId: userData?.id,
        income,
        userfilteredextensionid: userData?.extensionId,
      }),
    });

    if (addStock.status === 200) {
      toast({
        title: "Succès",
        description: (
          <Typography variant="body-sm">
            Le rapport a été enregistrée avec succès.
          </Typography>
        ),
      });
      stopLoading();
      form.reset({
        name: "",
        startingStock: "",
        endingStock: "",
        dayProduction: "",
        income: "",
        date: undefined,
      });
      router.refresh();
    } else {
      toast({
        variant: "destructive",
        title: "Erreur !",
        description: (
          <Typography variant="body-sm">
            Une erreur est survenue durant l'enregistrement du rapport. Veuillez
            recommencer l'opération.
          </Typography>
        ),
      });
      router.refresh();
      stopLoading();
    }
    router.refresh();
    stopLoading();
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
                  role={
                    userData
                      ? userData.role
                        ? userData.role
                        : undefined
                      : undefined
                  }
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
          <Container className="w-full flex flex-row gap-4">
            <Container className="basis-1/2">
              <InputField
                placeholder="Stock de départ"
                control={form.control}
                name="startingStock"
              />
            </Container>
            <Container className="basis-1/2">
              <InputField
                placeholder="Entrée"
                control={form.control}
                name="income"
              />
            </Container>
          </Container>
          <Container className="w-full flex flex-row gap-4">
            <Container className="basis-1/2">
              <InputField
                placeholder="Production du jour"
                control={form.control}
                name="dayProduction"
              />
            </Container>
            <Container className="basis-1/2">
              <InputField
                placeholder="Stock final"
                control={form.control}
                name="endingStock"
              />
            </Container>
          </Container>
          <Container className="w-full">
            <Button Icon={Plus} type="submit" isLoading={isLoading}>
              Ajouter
            </Button>
          </Container>
        </Container>
      </form>
    </Form>
  );
};
