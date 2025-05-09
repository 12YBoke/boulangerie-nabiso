/* eslint-disable react/no-unescaped-entities */

import { DeleteCustomerForm } from "@/ui/modules/delete-customer-form/delete-customer-form";


interface Props {
  id: string;
  name: string;
}

export const Delete = ({ id, name }: Props) => {
  return <DeleteCustomerForm id={id} name={name} />;
};
