/* eslint-disable react/no-unescaped-entities */
"use  client";

import React, { useEffect, useState } from "react";
import { Container } from "@/ui/components/container/container";
import { UserPen } from "lucide-react";
import { Typography } from "@/ui/components/typography/typography";
import UseLoading from "@/hooks/use-loading";
import { Button } from "@/ui/components/button/button";
import { useToast } from "@/shadcnui/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { Form } from "@/shadcnui/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { AddCashFlowFormFieldsType } from "@/types/forms";
import { InputField } from "@/ui/components/input-field/input-field";
import { InputFieldSelect } from "@/ui/components/input-field-select/input-field-select";

interface Props {
  financialFlow: {
    id: string;
    amount: number;
    reason: string;
    date: Date;
    flowType: "INCOME" | "EXPENSE";
    agent: string;
  };
}
export const UpdateFinancialFlowForm = ({ financialFlow }: Props) => {
  const [isLoading, startLoading, stopLoading] = UseLoading();

  const { toast } = useToast();

  const router = useRouter();

  const [update, setUpdate] = useState(true);

  const form = useForm<z.infer<typeof AddCashFlowFormFieldsType>>({
    resolver: zodResolver(AddCashFlowFormFieldsType),
    defaultValues: {
      flowType: financialFlow.flowType,
      amount: financialFlow.amount,
      reason: financialFlow.reason,
    },
  });

  const watchedValues = form.watch();

  useEffect(() => {
    const updated: boolean =
      watchedValues.flowType === financialFlow.flowType &&
      watchedValues.amount === financialFlow.amount &&
      watchedValues.reason.trim() === financialFlow.reason;

    setUpdate(updated);
  }, [watchedValues, financialFlow]);

  async function onSubmit(values: z.infer<typeof AddCashFlowFormFieldsType>) {
    startLoading();
    const { amount, reason, flowType } = values;

    const updatefinancialflow = await fetch(
      `/api/financialflow/${financialFlow.id}`,
      {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount,
          reason,
          flowType,
        }),
      }
    );

    if (updatefinancialflow.status === 200) {
      toast({
        title: "Succès",
        description: (
          <Typography variant="body-sm">
            Les informations de la transaction ont été modifiées avec succès.
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
            Une erreur est survenue durant la modification des informations de
            la transaction. Veuillez recommencer l'opération.
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
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Container className="flex flex-col gap-4">
          <Container className="w-full">
            <Container className="w-full">
              <InputFieldSelect
                placeholder="Type de transaction"
                control={form.control}
                name="flowType"
                options={[
                  { value: "INCOME", label: "Revenu" },
                  { value: "EXPENSE", label: "Dépense" },
                ]}
              />
            </Container>
            <Container className="w-full">
              <InputField
                placeholder="Montant"
                control={form.control}
                name="amount"
                type="number"
              />
            </Container>
            <Container className="w-full">
              <InputField
                placeholder="Raison de la transaction"
                control={form.control}
                name="reason"
                type="textarea"
              />
            </Container>
          </Container>
          <Container className="w-full">
            <Button
              disabled={update}
              Icon={UserPen}
              type="submit"
              isLoading={isLoading}
            >
              Modifier
            </Button>
          </Container>
        </Container>
      </form>
    </Form>
  );
};
