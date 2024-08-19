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
import { Typography } from "@/ui/components/typography/typography";
import { Eye, EyeOff, Lock, Mail, Store, User } from "lucide-react";
import { InputField } from "@/ui/components/input-field/input-field";
import { Form } from "@/shadcnui/components/ui/form";
import { Button } from "@/ui/components/button/button"
import { Options } from "@/types/options";
import { InputFieldCombobox } from "@/ui/components/input-field-combobox/input-field-combobox";
import { InputFieldRadio } from "@/ui/components/input-field-radio/input-field-radio";
import { OrderTypes } from "@/lib/order-types/order-types";

interface Props {
  customers: Options[]

}

export const OrderForm = ({ customers }: Props) => {
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, startLoading, stopLoading] = UseLoading();
  const form = useForm<z.infer<typeof OrdersFormFieldsType>>({
    resolver: zodResolver(OrdersFormFieldsType),
    defaultValues: {
      amount : 0,
      amountpaid : 0,
      voucher : 0,
      voucherpaid : 0,
      dateordered : new Date(),
      customerid : "",
      name : "",
      type : "ORDER",
      amountDelivered : 0,
    },
  });

  const [showPassword, setShowPassword] = useState(false);

  async function onSubmit(values: z.infer<typeof OrdersFormFieldsType>) {
    startLoading();
    const {
      amount,
      amountpaid,
      voucher,
      voucherpaid,
      dateordered,
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="relative flex flex-col gap-8">
        <Container className="flex flex-row gap-32 w-full">
          <Container  className="flex flex-row gap-4 basis-3/5">
            <Container className="flex flex-col gap-8 basis-1/2">
              <Typography variant="title-sm">Type de la commande</Typography>
              <Container>
                <InputFieldRadio
                  control={form.control} 
                  name={"type"} 
                  items={OrderTypes}
                />
              </Container>
            </Container>
            <Container className="flex flex-col gap-8 basis-1/2">
              <Typography variant="title-sm">Détails de la commande</Typography>
              <Container className="flex flex-col">
                <Container>
                  <InputFieldCombobox 
                    control={form.control} 
                    name={"extensionid"} 
                    placeholder={"Selectionnez le (la) client(e)"} 
                    items={[{label: "Extension 1", value: "1"}, {label: "Extension 2", value: "2"}, {label: "Extension 3", value: "3"}]}
                  >
                    {UserIcon()}
                  </InputFieldCombobox>
                </Container>
                <Container>
                  <InputField
                    placeholder="Montant de la commande"
                    control={form.control}
                    name="amount"
                    type={"number"}
                  >
                    {PasswordIcon()}
                  </InputField>
                </Container>
              </Container>
            </Container>
          </Container>
          <Container className="flex flex-col justify-between basis-2/5 p-8 bg-primary-400 rounded-lg">
            <Container>
              <Typography variant="title-sm">Informations sur le client</Typography>
            </Container>
            <Container>
              <Button variant="ghost" type="submit" className="w-full hover:bg-primary-50" isLoading={isLoading}>Valider la commande</Button>
            </Container>
          </Container>
        </Container>
      </form>
    </Form>
  )
}
