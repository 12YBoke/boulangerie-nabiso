/* eslint-disable react/no-unescaped-entities */

import { DeleteFinancialFlowForm } from "@/ui/modules/delete-financial-flow-form/delete-financial-flow-form";

interface Props {
  id: string;
}

export const Delete = ({ id }: Props) => {
  return <DeleteFinancialFlowForm id={id} />;
};
