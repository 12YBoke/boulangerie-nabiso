/* eslint-disable react/no-unescaped-entities */
"use client";

import { Container } from "@/ui/components/container/container";
import { Form } from "@/shadcnui/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { RegisterCustomersFormFieldsType } from "@/types/forms";
import { InputField } from "@/ui/components/input-field/input-field";
import { Typography } from "@/ui/components/typography/typography";
import { Button } from "@/ui/components/button/button";
import { useToast } from "@/shadcnui/components/ui/use-toast";
import { useRouter } from "next/navigation";
import UseLoading from "@/hooks/use-loading";
import { ListOrdered, Smartphone, User, UserPlus } from "lucide-react";
import useExtensionIdStore from "@/store/extension-id-store";
import useStore from "@/hooks/useStore";

interface Props {
  userData: {
    id: string;
    extensionId: string;
    role: "ADMIN" | "USER";
  };
}

export const AddCustomerForm = ({ userData }: Props) => {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, startLoading, stopLoading] = UseLoading();
  const form = useForm<z.infer<typeof RegisterCustomersFormFieldsType>>({
    resolver: zodResolver(RegisterCustomersFormFieldsType),
    defaultValues: {
      name: "",
      phonenumber: "",
      customernumber: 0,
    },
  });

  async function onSubmit(
    values: z.infer<typeof RegisterCustomersFormFieldsType>
  ) {
    startLoading();
    const { name, phonenumber, customernumber } = values;

    const addEmployee = await fetch(`/api/customer`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        phonenumber,
        customernumber,
        userfilteredid: userData.id,
        userfilteredextensionid: userData.extensionId,
      }),
    });

    if (addEmployee.status === 200) {
      const data = await addEmployee.json();

      const addCard = await fetch(`/api/card`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cardnumber: 0,
          customerid: data.customerId,
          extensionid: userData.extensionId,
        }),
      });

      if (addCard.status === 200) {
        toast({
          title: "Succès",
          description: (
            <Typography variant="body-sm">
              Un nouveau client a été ajoutée avec succès
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
              Une erreur est survenue durant l'enregistrement du client.
              Veuillez recommencer l'opération.
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
            Une erreur est survenue durant l'enregistrement du client. Veuillez
            recommencer l'opération.
          </Typography>
        ),
      });
      router.refresh();
      stopLoading();
    }
    router.refresh();
  }

  const UserIcon = () => {
    return (
      <User className="w-5 h-5 absolute left-4 cursor-pointer text-neutral-300" />
    );
  };

  const NumberIcon = () => {
    return (
      <ListOrdered className="w-5 h-5 absolute left-4 cursor-pointer text-neutral-300" />
    );
  };

  const PhoneIcon = () => {
    return (
      <Smartphone className="w-5 h-5 absolute left-4 cursor-pointer text-neutral-300" />
    );
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Container className="flex flex-col gap-4">
          <Container className="w-full">
            <Container className="w-full">
              <InputField
                placeholder="Numéro du client"
                control={form.control}
                name="customernumber"
                type="number"
              >
                {NumberIcon()}
              </InputField>
            </Container>
            <Container className="w-full">
              <InputField
                placeholder="Nom du client"
                control={form.control}
                name="name"
              >
                {UserIcon()}
              </InputField>
            </Container>
            <Container className="w-full">
              <InputField
                placeholder="Contact du client"
                control={form.control}
                name="phonenumber"
              >
                {PhoneIcon()}
              </InputField>
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
