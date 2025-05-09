/* eslint-disable react/no-unescaped-entities */

import { DeleteStock } from "@/ui/modules/delete-stock/delete-stock";

interface Props {
  id: string;
}

export const Delete = ({ id }: Props) => {
  return <DeleteStock id={id} />;
};
