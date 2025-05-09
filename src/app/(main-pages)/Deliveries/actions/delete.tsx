/* eslint-disable react/no-unescaped-entities */
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shadcnui/components/ui/dialog";
import { Typography } from "@/ui/components/typography/typography";
import { DeleteOrderForm } from "@/ui/modules/delete-order-form/delete-order-form";

import { Trash } from "lucide-react";

interface Props {
  id: string;
}

export const Delete = ({ id }: Props) => {
  return <DeleteOrderForm id={id} />;
};
