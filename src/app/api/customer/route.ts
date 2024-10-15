import prisma from '@/lib/prisma';
import { NextResponse } from "next/server";

export async function POST (
  req: Request
) {
  const { name, phonenumber, customernumber, userfilteredid, userfilteredextensionid } = await req.json();

  const customer = await prisma.customer.create({
    data: { 
      name : name,
      phoneNumber : phonenumber,
      customerNumber : customernumber,
      userId : userfilteredid,
      extensionId : userfilteredextensionid,
    },
    select: {
      id: true,
    },
  });

  const customerId = customer.id;

  return NextResponse.json({customerId, status: 200 });

}
