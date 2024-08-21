/* eslint-disable react/no-unescaped-entities */
'use client'

import { useToast } from "@/shadcnui/components/ui/use-toast";
import { OrdersFormFieldsType } from "@/types/forms";
import { Container } from "@/ui/components/container/container"
import { useRouter } from "next/navigation"
import * as z from "zod"
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import UseLoading from "@/hooks/use-loading";
import { useEffect, useState } from "react";
import { Typography } from "@/ui/components/typography/typography";
import { InputField } from "@/ui/components/input-field/input-field";
import { Form } from "@/shadcnui/components/ui/form";
import { Button } from "@/ui/components/button/button"
import { Options } from "@/types/options";
import { InputFieldCombobox } from "@/ui/components/input-field-combobox/input-field-combobox";
import { InputFieldRadio } from "@/ui/components/input-field-radio/input-field-radio";
import { OrderTypes } from "@/lib/order-types/order-types";
import { InputFieldDate } from "@/ui/components/input-field-date/input-field-date";

interface Props {
  customers: Options[]

}

export const OrderForm = ({ customers }: Props) => {
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, startLoading, stopLoading] = UseLoading();
  const [isReady, setIsReady] = useState(false);
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
      amountdelivered : 0,
    },
  });

  const type = useWatch({
    control: form.control,
    name: "type",
    defaultValue: "ORDER",
  });

  const customerid = useWatch({
    control: form.control,
    name: "customerid",
    defaultValue: "",
  });

  const name = useWatch({
    control: form.control,
    name: "name",
    defaultValue: "",
  });

  const amountdelivered = useWatch({
    control: form.control,
    name: "amountdelivered",
    defaultValue: 0,
  });

  const amount = useWatch({
    control: form.control,
    name: "amount",
    defaultValue: 0,
  });

  const voucherpaid = useWatch({
    control: form.control,
    name: "voucherpaid",
    defaultValue: 0,
  });


  useEffect(() => {
    if (type === "ORDER") {
      if ( customerid != "" ) {
        if( amount > 0 || voucherpaid > 0) {
          setIsReady(true)
        } else {
          setIsReady(false)
        }
      } else {
        setIsReady(false)
      }
    } else {
      if ( name !== "" && amountdelivered > amount) {
        setIsReady(true)
      } else {
        setIsReady(false)
      }
    }
  }, [type, customerid, form, name, amountdelivered, amount, voucherpaid])

  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === "amount" || name === "amountpaid") {
        form.setValue("voucher", value.amount! - value.amountpaid!);
      }
    });
    return () => subscription.unsubscribe();
  }, [form]);

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
      amountdelivered
    } = values

  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="relative flex flex-col gap-8">
        <Container className="flex flex-row gap-8 w-full">
          <Container  className="flex flex-row gap-4 basis-3/5">
            <Container className="flex flex-col gap-8 basis-1/2 border p-8 rounded-lg">
              <Typography variant="title-sm">Type de la commande</Typography>
              {isReady ? "Pret" : "Pas du tout"}
              <Container>
                <InputFieldRadio
                  control={form.control} 
                  name={"type"} 
                  items={OrderTypes}
                />
              </Container>
              <Container>
                <InputFieldDate
                  control={form.control} 
                  name={"dateordered"} 
                  label={"Date de la commande"}
                />
              </Container>
            </Container>
            <Container className="flex flex-col gap-8 basis-1/2 border p-8 rounded-lg">
              <Typography variant="title-sm">Détails de la commande</Typography>
              {
              type === "ORDER" ?
                <Container className="flex flex-col gap-2">
                  <Container>
                    <InputFieldCombobox 
                      control={form.control} 
                      name={"customerid"} 
                      placeholder={"Selectionnez le client"} 
                      items={[{label: "Extension 1", value: "1"}, {label: "Extension 2", value: "2"}, {label: "Extension 3", value: "3"}]}
                    />
                  </Container>
                  <Container>
                    <InputField
                      placeholder="Montant de la commande"
                      control={form.control}
                      name="amount"
                      type={"number"}
                      label="Montant de la commande"
                    />
                  </Container>
                  <Container>
                    <InputField
                      placeholder="Montant payé"
                      control={form.control}
                      name="amountpaid"
                      type={"number"}
                      label="Montant payé"
                    />
                  </Container>
                  <Container>
                    <InputField
                      placeholder="B.P."
                      control={form.control}
                      name="voucher"
                      type={"number"}
                      label="B.P."
                      disabled
                    />
                  </Container>
                  <Container>
                    <InputField
                      placeholder="B.P.P."
                      control={form.control}
                      name="voucherpaid"
                      type={"number"}
                      label="B.P.P."
                    />
                  </Container>
                </Container>
              :
                <Container className="flex flex-col gap-2">
                  <Container>
                    <InputField 
                      control={form.control} 
                      name={"name"}
                      placeholder={"Nom du client"}
                    />
                  </Container>
                  <Container>
                    <InputField
                      placeholder="Montant de la commande"
                      control={form.control}
                      name="amount"
                      type={"number"}
                      label="Montant de la commande"
                    />
                  </Container>
                  <Container>
                    <InputField
                      placeholder="Montant à livrer"
                      control={form.control}
                      name="amountdelivered"
                      type={"number"}
                      label="Montant à livrer"
                    />
                  </Container>
                </Container>
              }
            </Container>
          </Container>
          <Container className="flex flex-col justify-between basis-2/5 p-8 bg-primary-400 rounded-lg h-[78vh]">
            <Container>
              <Typography variant="title-sm">Informations sur le client</Typography>
            </Container>
            <Container>
              <Button disabled={!isReady} variant="ghost" type="submit" className="w-full hover:bg-primary-50" isLoading={isLoading}>Valider la commande</Button>
            </Container>
          </Container>
        </Container>
      </form>
    </Form>
  )
}
