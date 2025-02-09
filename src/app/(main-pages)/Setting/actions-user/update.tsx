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
import { UpdateCustomerForm } from "@/ui/modules/update-customer-form/update-customer-form";
import { UpdateUserForm } from "@/ui/modules/update-user-form/update-user-form";

import { Pen, Trash } from "lucide-react";

interface Props {
  user: {
    id: string;
    name: string;
    role: "USER" | "ADMIN";
    createdAt: Date;
  };
}

export const Update = ({ user }: Props) => {
  return (
    <Dialog>
      <DialogTrigger
        asChild
        className="cursor-pointer rounded-full bg-amber-50 hover:bg-amber-100 animate flex flex-row items-center text-amber-500"
      >
        <span className="p-2">
          <Pen className="h-5 w-5" />
        </span>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="flex flex-col gap-4">
          <DialogTitle>
            <Typography variant="title-lg">Modifier</Typography>
          </DialogTitle>
          <DialogDescription className="h-full w-full">
            Vous étes sur le point de mettre à jour les informations de cet
            utilisateur.
          </DialogDescription>
          <UpdateUserForm user={user} />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
