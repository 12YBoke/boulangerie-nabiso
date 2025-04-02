/* eslint-disable react/no-unescaped-entities */
"use client";

import { Container } from "@/ui/components/container/container";
import { Form } from "@/shadcnui/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { AddSalaryPaymentFormFieldsType } from "@/types/forms";
import { InputField } from "@/ui/components/input-field/input-field";
import { Typography } from "@/ui/components/typography/typography";
import { Button } from "@/ui/components/button/button";
import { useToast } from "@/shadcnui/components/ui/use-toast";
import { useRouter } from "next/navigation";
import UseLoading from "@/hooks/use-loading";
import { UserPen } from "lucide-react";
import { InputFieldDate } from "@/ui/components/input-field-date/input-field-date";

interface Props {
  salaryPayment: {
    id: string;
    amount: number;
    reason: string;
    date: Date;
    dailySalary: number;
    missingTotal: number;
    missingRemoved: number;
    missingRemaining: number;
  };
}

export const UpdateSalaryPaymentForm = ({ salaryPayment }: Props) => {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, startLoading, stopLoading] = UseLoading();
  const form = useForm<z.infer<typeof AddSalaryPaymentFormFieldsType>>({
    resolver: zodResolver(AddSalaryPaymentFormFieldsType),
    defaultValues: {
      date: salaryPayment.date,
      reason: salaryPayment.reason,
      dailySalary: salaryPayment.dailySalary,
      missingTotal: salaryPayment.missingTotal,
      missingRemoved: salaryPayment.missingRemoved,
      missingRemaining: salaryPayment.missingRemaining,
      amount: salaryPayment.amount,
    },
  });

  async function onSubmit(
    values: z.infer<typeof AddSalaryPaymentFormFieldsType>
  ) {
    startLoading();
    const {
      amount,
      reason,
      date,
      dailySalary,
      missingTotal,
      missingRemoved,
      missingRemaining,
    } = values;

    const updatefinancialflow = await fetch(
      `/api/financialFlow/${salaryPayment.id}`,
      {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount,
          reason,
          date,
        }),
      }
    );

    if (updatefinancialflow.status === 200) {
      const financialFlow = await updatefinancialflow.json();
      console.log(dailySalary, missingTotal, missingRemoved, missingRemaining);
      const updateSalaryPayment = await fetch(
        `/api/salaryPayment/${financialFlow.agentId}`,
        {
          method: "PATCH",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            dailySalary,
            missingTotal,
            missingRemoved,
            missingRemaining,
          }),
        }
      );

      if (updateSalaryPayment.status === 200) {
        toast({
          title: "Succès",
          description: (
            <Typography variant="body-sm">
              Le paiement du salaire a été mis à jour avec succès.
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
              Une erreur est survenue durant la mise à jour du salaire.
            </Typography>
          ),
        });
        stopLoading();
      }
    } else {
      toast({
        variant: "destructive",
        title: "Erreur !",
        description: (
          <Typography variant="body-sm">
            Une erreur est survenue durant la mise à jour du salaire.
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
                  placeholder="Nom de l'agent"
                  control={form.control}
                  name="reason"
                  label="Nom de l'agent"
                />
              </Container>
            </Container>
            <Container className="w-full flex flex-row gap-4">
              <Container className="basis-1/2">
                <InputField
                  placeholder="Montant"
                  control={form.control}
                  name="dailySalary"
                  type="number"
                  label="Salaire du jour"
                />
              </Container>
              <Container className="basis-1/2">
                <InputField
                  placeholder="Montant"
                  control={form.control}
                  name="missingTotal"
                  type="number"
                  label="Total manquant"
                />
              </Container>
            </Container>
            <Container className="w-full flex flex-row gap-4">
              <Container className="basis-1/2">
                <InputField
                  placeholder="Montant"
                  control={form.control}
                  name="missingRemoved"
                  type="number"
                  label="Manquant retranché"
                />
              </Container>
              <Container className="basis-1/2">
                <InputField
                  placeholder="Montant"
                  control={form.control}
                  name="missingRemaining"
                  type="number"
                  label="Manquant restant"
                />
              </Container>
            </Container>
            <Container className="w-full flex flex-row gap-4">
              <Container className="w-full">
                <InputField
                  placeholder="Montant"
                  control={form.control}
                  name="amount"
                  type="number"
                  label="Net à payer"
                />
              </Container>
            </Container>
          </Container>
          <Container className="w-full">
            <Button Icon={UserPen} type="submit" isLoading={isLoading}>
              Mettre à jour
            </Button>
          </Container>
        </Container>
      </form>
    </Form>
  );
};
