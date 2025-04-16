/* eslint-disable react/no-unescaped-entities */
"use client";

import { useToast } from "@/shadcnui/components/ui/use-toast";
import { LoginFormFieldsType } from "@/types/forms";
import { Container } from "@/ui/components/container/container";
import { useRouter } from "next/navigation";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import UseLoading from "@/hooks/use-loading";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { Typography } from "@/ui/components/typography/typography";
import { Eye, EyeOff, Lock, Mail, Store, User } from "lucide-react";
import { InputField } from "@/ui/components/input-field/input-field";
import { Form } from "@/shadcnui/components/ui/form";
import { Button } from "@/ui/components/button/button";
import { Options } from "@/types/options";
import useExtensionIdStore from "@/store/extension-id-store";
import { InputFieldSelect } from "@/ui/components/input-field-select/input-field-select";

interface Props {
  extensions: {
    id: string;
    name: string;
    rate: number;
  }[];
}

export const SignInForm = ({ extensions }: Props) => {
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, startLoading, stopLoading] = UseLoading();
  const form = useForm<z.infer<typeof LoginFormFieldsType>>({
    resolver: zodResolver(LoginFormFieldsType),
    defaultValues: {
      extensionid: "",
      password: "",
      name: "",
    },
  });

  const extensionsForSelect = extensions?.map((record) => ({
    label: record.name,
    value: record.id,
  }));

  const setExtensionId = useExtensionIdStore((state) => state.setExtensionId);

  const [showPassword, setShowPassword] = useState(false);

  async function onSubmit(values: z.infer<typeof LoginFormFieldsType>) {
    startLoading();
    const { name, extensionid, password } = values;
    const loginRespose = await signIn("credentials", {
      name: name,
      extensionId: extensionid,
      password: password,
      redirect: false,
    });

    if (loginRespose?.error === null) {
      toast({
        title: "Connexion réussie",
        description: `Content de vous revoir !`,
      });
      stopLoading();
      setExtensionId(extensionid);
      router.push("/");
    } else {
      toast({
        variant: "destructive",
        title: "Une erreur est survenue",
        description: (
          <Typography variant="body-sm">
            {" "}
            Votre nom d'utilisateur ou votre mot de passe a été saisi
            incorrectement. Veuillez réessayer.
          </Typography>
        ),
      });
      stopLoading();
    }

    stopLoading();
  }

  const ShowPasswordButton = (visibility: boolean) => {
    if (visibility) {
      return (
        <EyeOff
          strokeWidth={1.5}
          className="w-5 h-5 absolute right-4 cursor-pointer text-[#000] animate"
          onClick={() => {
            setShowPassword(!showPassword);
          }}
        />
      );
    } else {
      return (
        <Eye
          strokeWidth={1.5}
          className="w-5 h-5 absolute right-4 cursor-pointer text-[#000] animate"
          onClick={() => {
            setShowPassword(!showPassword);
          }}
        />
      );
    }
  };

  const PasswordIcon = () => {
    return (
      <Lock
        strokeWidth={1.5}
        className="w-5 h-5 absolute left-4 cursor-pointer text-[#000]"
      />
    );
  };

  const UserIcon = () => {
    return (
      <User
        strokeWidth={1.5}
        className="w-5 h-5 absolute left-4 cursor-pointer text-[#000]"
      />
    );
  };

  const StoreIcon = () => {
    return (
      <Store
        strokeWidth={1.5}
        className="w-5 h-5 absolute left-0 cursor-pointer text-[#000]"
      />
    );
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="relative flex flex-col gap-8 w-full md:w-[80%] lg:w-[60%]"
      >
        <Container className="flex flex-col gap-4">
          <Typography variant="title-lg">Content de vous revoir</Typography>
        </Container>
        <Container className="flex flex-col gap-2">
          <Container>
            <InputField
              placeholder="Nom d'utilisateur"
              control={form.control}
              name="name"
            >
              {UserIcon()}
            </InputField>
          </Container>
          <Container>
            <InputFieldSelect
              control={form.control}
              name={"extensionid"}
              placeholder={"Selectionnez votre extension"}
              options={extensionsForSelect}
            >
              {StoreIcon()}
            </InputFieldSelect>
          </Container>
          <Container className="w-full relative">
            <InputField
              placeholder="Mot de passe"
              control={form.control}
              name="password"
              type={showPassword ? "text" : "password"}
            >
              {PasswordIcon()}
              {ShowPasswordButton(showPassword)}
            </InputField>
          </Container>
        </Container>
        <Container className="flex flex-row justify-between items-center">
          <Button type="submit" className="w-full" isLoading={isLoading}>
            Se connecter
          </Button>
        </Container>
      </form>
    </Form>
  );
};
