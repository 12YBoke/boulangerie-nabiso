/* eslint-disable react/no-unescaped-entities */

import { Typography } from "@/ui/components/typography/typography";
import { DeleteUserForm } from "@/ui/modules/delete-user-form/delete-user-form";

interface Props {
  id: string;
  name: string;
}

export const Delete = ({ id, name }: Props) => {
  return <DeleteUserForm id={id} name={name} />;
};
