import * as z from "zod";

export const RegisterFormFieldsType = z.object({
  name: z
    .string()
    .min(2, {
      message: "Votre nom d'utilisateur doit avoir au moin 2 caracteres.",
    })
    .max(50),
  extensionid: z
    .string()
    .min(2, {
      message: "Veuillez selectionner une extension valide",
    })
    .max(50),
  password: z
    .string()
    .min(6, {
      message:
        "Le mot de passe est trop court. Il doit contenir au moins 6 caractères.",
    })
    .max(50, {
      message:
        "Le mot de passe est trop long. Il ne doit pas dépasser 50 caractères.",
    }),
  confirmpassword: z
    .string()
    .min(2, {
      message: "Mot de passe trop court",
    })
    .max(50),
});

export const UpdateUserFormFieldsType = z.object({
  name: z
    .string()
    .min(2, {
      message: "Votre nom d'utilisateur doit avoir au moin 2 caracteres.",
    })
    .max(50),
});

export const LoginFormFieldsType = z.object({
  name: z
    .string()
    .min(2, {
      message: "Votre nom d'utilisateur doit avoir au moin 2 caracteres.",
    })
    .max(50),
  extensionid: z
    .string()
    .min(2, {
      message: "Veuillez selectionner une extension valide",
    })
    .max(50),
  password: z
    .string()
    .min(6, {
      message:
        "Le mot de passe est trop court. Il doit contenir au moins 6 caractères.",
    })
    .max(50, {
      message:
        "Le mot de passe est trop long. Il ne doit pas dépasser 50 caractères.",
    }),
});

export const OrdersFormFieldsType = z
  .object({
    amount: z
      .number()
      .min(0, { message: "Le montant doit être supérieur ou égal à 0." }),
    amountpaid: z
      .number()
      .min(0, { message: "Le montant payé doit être supérieur ou égal à 0." }),
    voucher: z.number().min(0, {
      message: "Le montant du B.P. doit être supérieur ou égal à 0.",
    }),
    voucherpaid: z
      .number()
      .min(0, { message: "Le B.P.P. doit être supérieur ou égal à 0." }),
    dateordered: z.date(),
    customerid: z.string(),
    name: z.string(),
    type: z.enum(
      ["ORDER", "CASH_SALE", "CHARGE", "DONATION", "DAMAGE", "BURN"],
      {
        required_error: "Veuillez selectionner une option",
      }
    ),
    amountdelivered: z
      .number()
      .min(0, { message: "Le montant livré doit être supérieur ou égal à 0." }),
  })
  .refine((data) => data.amountpaid <= data.amount, {
    message:
      "Le montant payé doit être inférieur ou égal au montant total de la commande.",
    path: ["amountpaid"],
  })
  .refine((data) => data.voucher === data.amount - data.amountpaid, {
    message:
      "Le B.P. doit être égal à la différence entre le montant et le montant payé.",
    path: ["voucher"],
  });

export const RegisterCustomersFormFieldsType = z.object({
  customernumber: z.number().min(0, {
    message: "Le numéro de client doit être supérieur ou égal à 0.",
  }),
  name: z
    .string()
    .min(2, { message: "Le nom du client doit avoir au moins 2 caractères." }),
  phonenumber: z.string().regex(new RegExp("^0(8|9)[0-9]{8}$"), {
    message: "Veuillez entrer un numero de telephone valide",
  }),
});

export const AmountDeliveredFormFieldsType = z.object({
  amountdelivered: z
    .number()
    .min(1, { message: "Le montant livré doit être supérieur ou égal à 1." }),
});

export const AddCashFlowFormFieldsType = z.object({
  amount: z
    .number()
    .min(0, { message: "Le montant doit être supérieur ou égal à 0." }),
  reason: z.string(),
  flowType: z.enum(["INCOME", "EXPENSE"]),
  date: z.date(),
});

export const AddSalaryPaymentFormFieldsType = z.object({
  amount: z
    .number()
    .min(0, { message: "Le montant doit être supérieur ou égal à 0." }),
  reason: z.string(),
  date: z.date(),
  dailySalary: z.number(),
  missingTotal: z.number(),
  missingRemoved: z.number(),
  missingRemaining: z.number(),
});

export const AddExtensionFormFieldsType = z.object({
  name: z.string(),
  rate: z.number().min(0, {
    message: "Le taux de commission doit être supérieur ou égal à 0.",
  }),
});

export const AddStockFormFieldsType = z.object({
  name: z.string(),
  startingStock: z.string(),
  dayProduction: z.string(),
  endingStock: z.string(),
  date: z.date(),
});
