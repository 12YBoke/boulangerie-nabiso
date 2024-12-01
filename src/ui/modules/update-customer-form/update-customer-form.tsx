/* eslint-disable react/no-unescaped-entities */
"use  client";

import React, { useEffect, useState } from "react";
import { Container } from "@/ui/components/container/container";
import {
  UserPen,
  BriefcaseBusiness,
  House,
  Smartphone,
  User,
  ListOrdered,
} from "lucide-react";
import { Typography } from "@/ui/components/typography/typography";
import UseLoading from "@/hooks/use-loading";
import { Button } from "@/ui/components/button/button";
import { useToast } from "@/shadcnui/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { Form } from "@/shadcnui/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { RegisterCustomersFormFieldsType } from "@/types/forms";
import { InputField } from "@/ui/components/input-field/input-field";

interface Props {
  customer: {
    name: string;
    phoneNumber: string;
    id: string;
    customerNumber: number;
  };
}
export const UpdateCustomerForm = ({ customer }: Props) => {
  const [isLoading, startLoading, stopLoading] = UseLoading();

  const { toast } = useToast();

  const router = useRouter();

  const [update, setUpdate] = useState(true);

  const form = useForm<z.infer<typeof RegisterCustomersFormFieldsType>>({
    resolver: zodResolver(RegisterCustomersFormFieldsType),
    defaultValues: {
      name: customer.name,
      phonenumber: customer.phoneNumber,
      customernumber: customer.customerNumber,
    },
  });

  const watchedValues = form.watch();

  useEffect(() => {
    const updated =
      watchedValues.name.trim() === customer.name &&
      watchedValues.phonenumber.trim() === customer.phoneNumber &&
      watchedValues.customernumber === customer.customerNumber;

    setUpdate(updated);
  }, [watchedValues, customer]);

  async function onSubmit(
    values: z.infer<typeof RegisterCustomersFormFieldsType>
  ) {
    startLoading();
    const { name, phonenumber, customernumber } = values;

    const updatecustomer = await fetch(`/api/customer/${customer.id}`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        phonenumber,
        customernumber,
      }),
    });

    if (updatecustomer.status === 200) {
      toast({
        title: "Succès",
        description: (
          <Typography variant="body-sm">
            Les informations du client ont été modifiées avec succès.
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
            Une erreur est survenue durant la modification des informations du
            client. Veuillez recommencer l'opération.
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

  const PhoneIcon = () => {
    return (
      <Smartphone className="w-5 h-5 absolute left-4 cursor-pointer text-neutral-300" />
    );
  };

  const NumberIcon = () => {
    return (
      <ListOrdered className="w-5 h-5 absolute left-4 cursor-pointer text-neutral-300" />
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
                placeholder="Nom de l'empoyé"
                control={form.control}
                name="name"
              >
                {UserIcon()}
              </InputField>
            </Container>
            <Container className="w-full">
              <InputField
                placeholder="Contact de l'employé"
                control={form.control}
                name="phonenumber"
              >
                {PhoneIcon()}
              </InputField>
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
