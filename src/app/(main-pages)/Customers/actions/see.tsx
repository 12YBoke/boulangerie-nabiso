/* eslint-disable react/no-unescaped-entities */
import { 
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger, 
} from "@/shadcnui/components/ui/sheet"
import { Typography } from "@/ui/components/typography/typography";
import { Container } from "@/ui/components/container/container"
import { Eye } from "lucide-react";
import Link from "next/link";

interface Props {
  customer: {
    name: string,
    phoneNumber: string
    id: string
    customerNumber: number
  }
}

export const See = ({ customer } : Props) => {

  return (
    <Link href={`Customers/${customer.id}`} className="p-2 flex flex-row items-center text-primary-Default cursor-pointer bg-primary-50 hover:bg-primary-100 rounded-full animate">
      <Eye className="h-5 w-5"/>
    </Link>
  )
}