/* eslint-disable react/no-unescaped-entities */
import { Eye } from "lucide-react";
import Link from "next/link";

interface Props {
  customer: {
    name: string;
    phoneNumber: string;
    id: string;
    customerNumber: number;
  };
}

export const See = ({ customer }: Props) => {
  return (
    <Link
      href={`Customers/${customer.id}`}
      className="p-2 flex flex-row items-center text-primary-500 cursor-pointer bg-primary-50 hover:bg-primary-100 rounded-full animate"
    >
      <Eye className="h-5 w-5" />
    </Link>
  );
};
