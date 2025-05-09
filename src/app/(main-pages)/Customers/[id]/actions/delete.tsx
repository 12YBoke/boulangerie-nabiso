/* eslint-disable react/no-unescaped-entities */

import { Typography } from "@/ui/components/typography/typography";
import { DeleteOrderForm } from "@/ui/modules/delete-order-form/delete-order-form";

interface Props {
  id: string;
}

export const Delete = ({ id }: Props) => {
  return <DeleteOrderForm id={id} />;
};
