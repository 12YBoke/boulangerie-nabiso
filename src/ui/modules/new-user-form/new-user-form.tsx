/* eslint-disable react/no-unescaped-entities */
"use client";

import { useToast } from "@/shadcnui/components/ui/use-toast";
import { RegisterFormFieldsType } from "@/types/forms";
import { Container } from "@/ui/components/container/container";
import { useRouter } from "next/navigation";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import UseLoading from "@/hooks/use-loading";
import { useState } from "react";
import { saltPassword } from "@/lib/password-to-salt";
import { Typography } from "@/ui/components/typography/typography";
import { Eye, EyeOff, Lock, Mail, Store, User } from "lucide-react";
import { InputField } from "@/ui/components/input-field/input-field";
import { Form } from "@/shadcnui/components/ui/form";
import { Button } from "@/ui/components/button/button";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { Options } from "@/types/options";
import { InputFieldSelect } from "@/ui/components/input-field-select/input-field-select";
import useExtensionIdStore from "@/store/extension-id-store";

interface Props {
  extensions: Options[];
}

export const NewUserForm = ({ extensions }: Props) => {
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, startLoading, stopLoading] = UseLoading();
  const form = useForm<z.infer<typeof RegisterFormFieldsType>>({
    resolver: zodResolver(RegisterFormFieldsType),
    defaultValues: {
      extensionid: "",
      password: "",
      confirmpassword: "",
      name: "",
    },
  });
  const setExtensionId = useExtensionIdStore((state) => state.setExtensionId);

  const [showPassword, setShowPassword] = useState(false);

  async function onSubmit(values: z.infer<typeof RegisterFormFieldsType>) {
    startLoading();
    const { name, extensionid, password, confirmpassword } = values;
    if (password !== confirmpassword) {
      toast({
        variant: "destructive",
        title: "Mot de passe ne correspondent pas",
        description: (
          <Typography variant="body-sm">
            Veuillez vous assurer de bien avoir confirmé votre mot de passe
          </Typography>
        ),
      });
      stopLoading();
    } else {
      const saltedPassword = saltPassword(password);
      const hash = saltedPassword.hash;
      const salt = saltedPassword.salt;
      const registration = await fetch(`/api/user`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          extensionid,
          hash,
          salt,
        }),
      });

      if (registration.status === 200) {
        toast({
          title: "Bienvenue !",
          description: (
            <Typography variant="body-sm">
              Vos informations ont correctement été enregistré
            </Typography>
          ),
        });

        const loginRespose = await signIn("credentials", {
          name: name,
          extensionId: extensionid,
          password: password,
          redirect: false,
        });

        if (loginRespose?.status === 200) {
          toast({
            title: "Connexion réussie",
            description: "Content de vous revoir !",
          });
          stopLoading();
          router.refresh();
          stopLoading();
          setExtensionId(extensionid);
          router.push("/");
        } else {
          toast({
            variant: "destructive",
            title: "Une erreur est survenue",
            description: (
              <Typography variant="body-sm">
                Votre nom d'utilisateur ou votre mot de passe a été saisi
                incorrectement. Veuillez réessayer.
              </Typography>
            ),
          });
          stopLoading();
        }
      } else {
        toast({
          variant: "destructive",
          title: "Utilisateur déjà existant",
          description: (
            <Typography variant="body-sm">
              Veuillez utiliser une autre adresse email
            </Typography>
          ),
        });
        stopLoading();
      }
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
        className="relative flex flex-col gap-8 w-[80%] lg:w-[60%]"
      >
        <Container className="flex flex-col gap-4">
          <Typography variant="title-lg" className="hidden md:block">
            Ajouter un administrateur
          </Typography>
          <Typography variant="title-base" className="md:hidden">
            Ajouter un administrateur
          </Typography>
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
              options={extensions}
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
          <Container>
            <InputField
              placeholder="Confirmer le mot de passe"
              control={form.control}
              name="confirmpassword"
              type={showPassword ? "text" : "password"}
            >
              {PasswordIcon()}
            </InputField>
          </Container>
        </Container>
        <Container className="flex flex-row justify-between items-center">
          <Button type="submit" className="w-full" isLoading={isLoading}>
            S'inscrire
          </Button>
        </Container>
        <Container>
          <Typography variant="body-sm" className="text-neutral-500">
            Vous avez un compte ?{" "}
            <Link href={"/sign-in"} className="text-primary-500 text-title-xs">
              Connectez vous
            </Link>
          </Typography>
        </Container>
      </form>
    </Form>
  );
};
