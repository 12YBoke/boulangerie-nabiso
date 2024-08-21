/* eslint-disable react/no-unescaped-entities */
'use client'

import useExtensionIdStore from "@/store/extension-id-store"
import { Button } from "../button/button"
import { LogIn, LogOut, UserCircle2, Warehouse } from "lucide-react"
import { signOut } from "next-auth/react"
import React from "react"
import { Container } from "../container/container"
import { Typography } from "../typography/typography"
import useStore from "@/hooks/useStore"

interface Props {
  className?: string,
  name?: string,
  extensions?: {
    id: string,
    name: string,
  }[]
}

export const UserCard = ({ name, extensions }: Props) => {
  const extensionId = useStore(useExtensionIdStore, (state) => state.extensionId)
  const currentExtension = extensionId ? extensions?.find((extension) => extension.id === extensionId) : null
  
  return(
    <Container className="bg-emerald-300 w-full p-4 text-white rounded-lg flex flex-col gap-1">
      <Container className="flex flex-row justify-center items-center">
        <Container className="w-full">
          <Typography variant="title-sm">{name}</Typography>
        </Container>
      </Container>
      <Container className="flex flex-row justify-center items-center">
        <Container className="w-full text-emerald-50">
          <Typography variant="body-sm">{currentExtension?.name}</Typography>
        </Container>
      </Container>
    </Container>
  )
}

export const SignInButton = () => {
  return(
    <Button 
      variant="primary"
      buttonType="link"
      baseUrl="/sign-in"
      className="w-full md:w-auto"
    >
      <span className="flex-row items-center flex">
        <LogIn  className="mr-4 h-5 w-5 lg:flex hidden"/>Se connecter
      </span>
    </Button>
  )
}

export const SignOutButton = ({className}: Props) => {
  const setExtensionId = useExtensionIdStore(state => state.setExtensionId);

  return(
    <Button 
      variant="primary"
      buttonType="action"
      action = {() => { 
        setExtensionId(''),
        signOut({ callbackUrl: '/' }) 
      }}
      className={className}
    >
      <span className="flex-row items-center flex">
        <LogOut  className="mr-4 h-5 w-5 lg:flex hidden"/>Déconnexion
      </span>
    </Button>
  )
}
