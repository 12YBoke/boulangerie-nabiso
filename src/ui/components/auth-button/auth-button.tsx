/* eslint-disable react/no-unescaped-entities */
"use client";

import useExtensionIdStore from "@/store/extension-id-store";
import { Button } from "../button/button";
import { LogIn, LogOut, UserPlus } from "lucide-react";
import { signOut } from "next-auth/react";
import React from "react";
import { Container } from "../container/container";
import { Typography } from "../typography/typography";
interface Props {
  className?: string;
  user?: {
    id: string;
    name: string;
    extensionId: string;
    role: "ADMIN" | "USER";
    extension?: {
      id: string;
      name: string;
    };
  };
}

export const UserCard = ({ user }: Props) => {
  return (
    <Container className="bg-black w-full text-white p-4 rounded-lg flex flex-col gap-1">
      <Container className="flex flex-row justify-center items-center">
        <Container className="w-full">
          <Typography variant="title-sm">{user!.name}</Typography>
        </Container>
      </Container>
      <Container className="flex flex-row justify-center items-center">
        <Container className="w-full">
          <Typography variant="body-sm">{user!.extension?.name}</Typography>
        </Container>
      </Container>
    </Container>
  );
};

export const SignInButton = () => {
  return (
    <Button
      variant="primary"
      buttonType="link"
      baseUrl="/sign-in"
      className="w-full md:w-auto"
    >
      <span className="flex-row items-center flex">
        <LogIn className="mr-4 h-5 w-5 lg:flex hidden" />
        Se connecter
      </span>
    </Button>
  );
};

export const SignOutButton = ({ className }: Props) => {
  const setExtensionId = useExtensionIdStore((state) => state.setExtensionId);

  return (
    <Button
      variant="primary"
      buttonType="action"
      action={async () => {
        setExtensionId(""), signOut({ callbackUrl: "/" });
      }}
      className={className}
    >
      <span className="flex-row flex items-center">
        <LogOut className="mr-4 h-5 w-5" />
        Déconnexion
      </span>
    </Button>
  );
};

export const AddUserButton = ({ user, className }: Props) => {
  return (
    <>
      {user && user.role === "ADMIN" && (
        <Button
          variant="primary"
          buttonType="link"
          baseUrl="/new-user"
          className={className}
        >
          <span className="flex-row flex items-center">
            <UserPlus className="mr-4 h-5 w-5" />
            Ajouter un agent
          </span>
        </Button>
      )}
    </>
  );
};
