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
import { UserPlus } from "lucide-react";
import { InputFieldSelect } from "@/ui/components/input-field-select/input-field-select";
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

export const AddSalaryPaymentForm = ({ userData }: Props) => {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, startLoading, stopLoading] = UseLoading();
  const form = useForm<z.infer<typeof AddSalaryPaymentFormFieldsType>>({
    resolver: zodResolver(AddSalaryPaymentFormFieldsType),
    defaultValues: {
      amount: 0,
      reason: "",
      date: undefined,
      dailySalary: 0,
      missingTotal: 0,
      missingRemoved: 0,
      missingRemaining: 0,
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
      missingRemaining,
      dailySalary,
      missingTotal,
      missingRemoved,
    } = values;

    const addSalaryPayment = await fetch(`/api/salaryPayment`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        dailySalary,
        missingTotal,
        missingRemoved,
        missingRemaining,
      }),
    });

    if (addSalaryPayment.status === 200) {
      const agentSalary = await addSalaryPayment.json();
      const addCashFlow = await fetch(`/api/financialFlow`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount,
          reason,
          flowType: "EXPENSE",
          date,
          agentId: userData?.id,
          userfilteredextensionid: userData?.extensionId,
          agentSalaryId: agentSalary.id,
        }),
      });

      if (addCashFlow.status === 200) {
        toast({
          title: "Succès",
          description: (
            <Typography variant="body-sm">
              Le paiement de l'agent a été enregistrée avec succès.
            </Typography>
          ),
        });
        stopLoading();
        form.reset();
        router.refresh();
      } else {
        toast({
          variant: "destructive",
          title: "Erreur !",
          description: (
            <Typography variant="body-sm">
              Une erreur est survenue durant l'enregistrement du salaire de
              l'agent. Veuillez recommencer l'opération.
            </Typography>
          ),
        });
        router.refresh();
        stopLoading();
      }
    } else {
      toast({
        variant: "destructive",
        title: "Erreur !",
        description: (
          <Typography variant="body-sm">
            Une erreur est survenue durant l'enregistrement du salaire de
            l'agent. Veuillez recommencer l'opération.
          </Typography>
        ),
      });
      router.refresh();
      stopLoading();
    }
    stopLoading();
    router.refresh();
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
            <Button Icon={UserPlus} type="submit" isLoading={isLoading}>
              Ajouter
            </Button>
          </Container>
        </Container>
      </form>
    </Form>
  );
};
