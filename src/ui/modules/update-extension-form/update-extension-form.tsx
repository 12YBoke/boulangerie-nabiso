/* eslint-disable react/no-unescaped-entities */
"use  client";

import React, { useEffect, useState } from "react";
import { Container } from "@/ui/components/container/container";
import { House } from "lucide-react";
import { Typography } from "@/ui/components/typography/typography";
import UseLoading from "@/hooks/use-loading";
import { Button } from "@/ui/components/button/button";
import { useToast } from "@/shadcnui/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { Form } from "@/shadcnui/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { AddExtensionFormFieldsType } from "@/types/forms";
import { InputField } from "@/ui/components/input-field/input-field";

interface Props {
  extension: {
    id: string;
    rate: number;
    name: string;
  };
}
export const UpdateExtensionForm = ({ extension }: Props) => {
  const [isLoading, startLoading, stopLoading] = UseLoading();

  const { toast } = useToast();

  const router = useRouter();

  const [update, setUpdate] = useState(true);

  const form = useForm<z.infer<typeof AddExtensionFormFieldsType>>({
    resolver: zodResolver(AddExtensionFormFieldsType),
    defaultValues: {
      rate: extension.rate,
      name: extension.name,
    },
  });

  const watchedValues = form.watch();

  useEffect(() => {
    const updated: boolean =
      watchedValues.rate === extension.rate &&
      watchedValues.name.trim() === extension.name;

    setUpdate(updated);
  }, [watchedValues, extension]);

  async function onSubmit(values: z.infer<typeof AddExtensionFormFieldsType>) {
    startLoading();
    const { name, rate } = values;

    const updatefinancialflow = await fetch(`/api/extension/${extension.id}`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        rate,
      }),
    });

    if (updatefinancialflow.status === 200) {
      toast({
        title: "Succès",
        description: (
          <Typography variant="body-sm">
            Les informations de l'extension ont été modifiées avec succès.
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
            l'extension. Veuillez recommencer l'opération.
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
              <Container className="w-full">
                <InputField
                  placeholder="Nom de l'extension"
                  control={form.control}
                  name="name"
                />
              </Container>
            </Container>
            <Container className="w-full">
              <InputField
                placeholder="Taux de commission"
                control={form.control}
                name="rate"
                type="number"
              />
            </Container>
          </Container>
          <Container className="w-full">
            <Button
              disabled={update}
              Icon={House}
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
