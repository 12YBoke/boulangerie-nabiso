/* eslint-disable react/no-unescaped-entities */
'use client'

import { useToast } from "@/shadcnui/components/ui/use-toast";
import { OrdersFormFieldsType } from "@/types/forms";
import { Container } from "@/ui/components/container/container"
import { useRouter } from "next/navigation"
import * as z from "zod"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import UseLoading from "@/hooks/use-loading";
import { useState } from "react";
import { saltPassword } from "@/lib/password-to-salt";
import { Typography } from "@/ui/components/typography/typography";
import { Eye, EyeOff, Lock, Mail, Store, User } from "lucide-react";
import { InputField } from "@/ui/components/input-field/input-field";
import { Form } from "@/shadcnui/components/ui/form";
import { Button } from "@/ui/components/button/button"
import Link from "next/link"
import { signIn } from "next-auth/react";
import { Options } from "@/types/options";
import { InputFieldCombobox } from "@/ui/components/input-field-combobox/input-field-combobox";

interface Props {
  user: Options[]
}

export const OrderForm = ({ user }: Props) => {
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, startLoading, stopLoading] = UseLoading();
  const form = useForm<z.infer<typeof OrdersFormFieldsType>>({
    resolver: zodResolver(OrdersFormFieldsType),
    defaultValues: {
      cardid : "",
      amount : 0,
      amountpaid : 0,
      voucher : 0,
      voucherpaid : 0,
      dateordered : new Date(),
      password : "",
      customerid : "",
      name : "",
      type : "",
      amountDelivered : 0,
    },
  });

  const [showPassword, setShowPassword] = useState(false);

  async function onSubmit(values: z.infer<typeof OrdersFormFieldsType>) {
    startLoading();
    const {
      cardid,
      amount,
      amountpaid,
      voucher,
      voucherpaid,
      dateordered,
      password,
      customerid,
      name,
      type,
      amountDelivered
    } = values

  }

  const ShowPasswordButton = (visibility: boolean) => {
    if(visibility) {
      return <EyeOff strokeWidth={1.5} className="w-5 h-5 absolute right-4 cursor-pointer text-[#000] animate"  onClick={() => {setShowPassword(!showPassword)}}/>
    } else {
      return  <Eye strokeWidth={1.5} className="w-5 h-5 absolute right-4 cursor-pointer text-[#000] animate"  onClick={() => {setShowPassword(!showPassword)}}/>
    }
  }

  const PasswordIcon = () => {
    return <Lock strokeWidth={1.5} className="w-5 h-5 absolute left-4 cursor-pointer text-[#000]"/>
  }

  const UserIcon = () => {
    return <User strokeWidth={1.5} className="w-5 h-5 absolute left-4 cursor-pointer text-[#000]"/>
  }

  const StoreIcon = () => {
    return <Store strokeWidth={1.5} className="w-5 h-5 absolute left-4 cursor-pointer text-[#000]"/>
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="relative flex flex-col gap-8 w-[80%] lg:w-[60%]">
        <Container className="flex flex-col gap-4">
          <Typography variant="title-base" className="text-primary-Default">Commandes</Typography>
        </Container>
        <Container className="flex flex-row gap-4">
          <Container className="flex flex-col gap-2 basis-1/3">
            test
          </Container>
          <Container className="flex flex-col gap-2 basis-2/3">
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
              <InputFieldCombobox 
                control={form.control} 
                name={"extensionid"} 
                placeholder={"Selectionnez votre extension"} 
                items={[{label: "Extension 1", value: "1"}, {label: "Extension 2", value: "2"}, {label: "Extension 3", value: "3"}]}
              >
                {StoreIcon()}
              </InputFieldCombobox>
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
        </Container>
        <Container className="flex flex-row justify-between items-center">
          <Button type="submit" className="w-full" isLoading={isLoading}>S'inscrire</Button>
        </Container>
      </form>
    </Form>
  )
}
