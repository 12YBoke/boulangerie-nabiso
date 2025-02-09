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
import { DeleteExtensionForm } from "@/ui/modules/delete-extension-form/delete-extension-form";

import { Trash } from "lucide-react";

interface Props {
  id: string;
  name: string;
}

export const Delete = ({ id, name }: Props) => {
  return (
    <Dialog>
      <DialogTrigger
        asChild
        className="cursor-pointer hover:bg-red-100 animate flex flex-row items-center text-red-500 rounded-full bg-red-50"
      >
        <span className="p-2">
          <Trash className="h-5 w-5" />
        </span>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="flex flex-col gap-4">
          <DialogTitle>
            <Typography variant="title-lg">Suppression</Typography>
          </DialogTitle>
          <DialogDescription className="h-full w-full">
            Vous étes sur le point de supprimer une extension.
          </DialogDescription>
          <DeleteExtensionForm id={id} name={name} />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
