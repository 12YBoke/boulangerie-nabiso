/* eslint-disable react/no-unescaped-entities */

import { Typography } from "@/ui/components/typography/typography";
import { DeleteExtensionForm } from "@/ui/modules/delete-extension-form/delete-extension-form";

import { Trash } from "lucide-react";

interface Props {
  id: string;
  name: string;
}

export const Delete = ({ id, name }: Props) => {
  return <DeleteExtensionForm id={id} name={name} />;
};
