import * as z from "zod"

export const RegisterFormFieldsType = z.object({
  name: z.string()
    .min(2, {
      message: "Votre nom d'utilisateur doit avoir au moin 2 caracteres.",
    })
    .max(50),
  extensionid: z.string()
    .min(2, {
      message: "Veuillez selectionner une extension valide",
    })
    .max(50),
  password: z.string()
    .min(6, {
      message: "Le mot de passe est trop court. Il doit contenir au moins 6 caractères.",
    })
    .max(50, {
      message: "Le mot de passe est trop long. Il ne doit pas dépasser 50 caractères.",
    }),
  confirmpassword: z.string()
    .min(2, {
      message: "Mot de passe trop court",
    })
    .max(50),
})

export const LoginFormFieldsType = z.object({
  name: z.string()
    .min(2, {
      message: "Votre nom d'utilisateur doit avoir au moin 2 caracteres.",
    })
    .max(50),
  extensionid: z.string()
    .min(2, {
      message: "Veuillez selectionner une extension valide",
    })
    .max(50),
  password: z.string()
    .min(6, {
      message: "Le mot de passe est trop court. Il doit contenir au moins 6 caractères.",
    })
    .max(50, {
      message: "Le mot de passe est trop long. Il ne doit pas dépasser 50 caractères.",
    }),
})

export const OrdersFormFieldsType = z.object({
  cardid: z.string(),
  amount: z.number(),
  amountpaid: z.number(),
  voucher: z.number(),
  voucherpaid: z.number(),
  dateordered: z.date(),
  password: z.string(),
  customerid: z.string(),
  name: z.string(),
  type: z.string(),
  amountDelivered: z.number(),
})