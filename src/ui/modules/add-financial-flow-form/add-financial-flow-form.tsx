/* eslint-disable react/no-unescaped-entities */
"use client";

import { Container } from "@/ui/components/container/container";
import { Form } from "@/shadcnui/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { AddCashFlowFormFieldsType } from "@/types/forms";
import { InputField } from "@/ui/components/input-field/input-field";
import { Typography } from "@/ui/components/typography/typography";
import { Button } from "@/ui/components/button/button";
import { useToast } from "@/shadcnui/components/ui/use-toast";
import { useRouter } from "next/navigation";
import UseLoading from "@/hooks/use-loading";
import { ListOrdered, Smartphone, User, UserPlus } from "lucide-react";
import useExtensionIdStore from "@/store/extension-id-store";
import useStore from "@/hooks/useStore";
import { InputFieldSelect } from "@/ui/components/input-field-select/input-field-select";

interface Props {
  userData: {
    id: string;
    extensionId: string;
  }[];
}

export const AddCashFlowForm = ({ userData }: Props) => {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, startLoading, stopLoading] = UseLoading();
  const form = useForm<z.infer<typeof AddCashFlowFormFieldsType>>({
    resolver: zodResolver(AddCashFlowFormFieldsType),
    defaultValues: {
      amount: 0,
      reason: "",
      flowType: undefined,
    },
  });

  const extensionid = useStore(
    useExtensionIdStore,
    (state) => state.extensionId
  );

  const filterUser = userData.filter(
    (user) => user.extensionId === extensionid
  );

  async function onSubmit(values: z.infer<typeof AddCashFlowFormFieldsType>) {
    startLoading();
    const { amount, reason, flowType } = values;

    const addCashFlow = await fetch(`/api/financialFlow`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount,
        reason,
        flowType,
        agentId: filterUser[0].id,
        userfilteredextensionid: filterUser[0].extensionId,
      }),
    });

    if (addCashFlow.status === 200) {
      toast({
        title: "Succès",
        description: (
          <Typography variant="body-sm">
            La transaction a été enregistrée avec succès.
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
            Une erreur est survenue durant l'enregistrement de la transaction.
            Veuillez recommencer l'opération.
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
            <Button Icon={UserPlus} type="submit" isLoading={isLoading}>
              Ajouter
            </Button>
          </Container>
        </Container>
      </form>
    </Form>
  );
};
