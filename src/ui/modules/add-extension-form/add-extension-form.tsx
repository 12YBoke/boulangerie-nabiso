/* eslint-disable react/no-unescaped-entities */
"use client";

import { Container } from "@/ui/components/container/container";
import { Form } from "@/shadcnui/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { AddExtensionFormFieldsType } from "@/types/forms";
import { InputField } from "@/ui/components/input-field/input-field";
import { Typography } from "@/ui/components/typography/typography";
import { Button } from "@/ui/components/button/button";
import { useToast } from "@/shadcnui/components/ui/use-toast";
import { useRouter } from "next/navigation";
import UseLoading from "@/hooks/use-loading";
import { HousePlus } from "lucide-react";
import { saltPassword } from "@/lib/password-to-salt";

export const AddExtensionForm = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, startLoading, stopLoading] = UseLoading();
  const form = useForm<z.infer<typeof AddExtensionFormFieldsType>>({
    resolver: zodResolver(AddExtensionFormFieldsType),
    defaultValues: {
      name: "",
      rate: 0,
    },
  });

  async function onSubmit(values: z.infer<typeof AddExtensionFormFieldsType>) {
    startLoading();
    const { name, rate } = values;

    const addExtension = await fetch(`/api/extension`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        rate,
      }),
    });

    if (addExtension.status === 200) {
      const extension = await addExtension.json();
      console.log(extension.result);
      const saltedPassword = saltPassword("Default password");
      const hash = saltedPassword.hash;
      const salt = saltedPassword.salt;
      const registration = await fetch(`/api/user`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: "Default admin",
          extensionid: extension.result.id,
          hash,
          salt,
        }),
      });

      if (registration.status === 200) {
        toast({
          title: "Succès",
          description: (
            <Typography variant="body-sm">
              L'extension a été enregistrée avec succès.
            </Typography>
          ),
        });
        stopLoading();
        router.refresh();
      } else {
      }
    } else {
      toast({
        variant: "destructive",
        title: "Erreur !",
        description: (
          <Typography variant="body-sm">
            Une erreur est survenue durant l'enregistrement de l'extension'.
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
          <Container className="w-full">
            <Button Icon={HousePlus} type="submit" isLoading={isLoading}>
              Ajouter
            </Button>
          </Container>
        </Container>
      </form>
    </Form>
  );
};
