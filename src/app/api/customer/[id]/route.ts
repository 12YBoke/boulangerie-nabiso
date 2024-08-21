
import prisma from '@/lib/prisma'
import { NextResponse } from "next/server"

export async function DELETE(
  req: Request,
  { params: { id } } : { params: { id: string } }
) {

  await prisma.customer.delete({
    where: {
      id: id
    }
  })

  return NextResponse.json({ status: 200 });

}

export async function PATCH (
  req: Request,
  { params: { id } } : { params: { id: string } }
) {
  const { name, phonenumber, customernumber } = await req.json();

  await prisma.customer.update({
    where : {
      id : id
    },
    data: {
      name : name,
      phoneNumber : phonenumber,
      customerNumber : customernumber,
    }
  })

  return NextResponse.json({ status: 200 });

}