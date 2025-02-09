/* eslint-disable react/no-unescaped-entities */
"use  client";

import React, { useEffect, useState } from "react";
import { Container } from "@/ui/components/container/container";
import { UserPen, Smartphone, User, ListOrdered } from "lucide-react";
import { Typography } from "@/ui/components/typography/typography";
import { Button } from "@/ui/components/button/button";
import UseLoading from "@/hooks/use-loading";
import { useToast } from "@/shadcnui/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { Form } from "@/shadcnui/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { UpdateUserFormFieldsType } from "@/types/forms";
import { InputField } from "@/ui/components/input-field/input-field";

interface Props {
  user: {
    id: string;
    name: string;
    role: "USER" | "ADMIN";
    createdAt: Date;
  };
}
export const UpdateUserForm = ({ user }: Props) => {
  const [isLoading, startLoading, stopLoading] = UseLoading();

  const { toast } = useToast();

  const router = useRouter();

  const [update, setUpdate] = useState(true);

  const form = useForm<z.infer<typeof UpdateUserFormFieldsType>>({
    resolver: zodResolver(UpdateUserFormFieldsType),
    defaultValues: {
      name: user.name,
    },
  });

  const watchedValues = form.watch();

  useEffect(() => {
    const updated = watchedValues.name.trim() === user.name;

    setUpdate(updated);
  }, [watchedValues, user]);

  async function onSubmit(values: z.infer<typeof UpdateUserFormFieldsType>) {
    startLoading();
    const { name } = values;

    const updateUser = await fetch(`/api/user/${user.id}`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
      }),
    });

    if (updateUser.status === 200) {
      toast({
        title: "Succès",
        description: (
          <Typography variant="body-sm">
            Les informations de l'administrateur ont été modifiées avec succès.
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
            l'administrateur. Veuillez recommencer l'opération.
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

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Container className="flex flex-col gap-4">
          <Container className="w-full">
            <Container className="w-full">
              <InputField
                placeholder="Nom de l'empoyé"
                control={form.control}
                name="name"
              >
                {UserIcon()}
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
