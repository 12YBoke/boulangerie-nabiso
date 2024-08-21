import prisma from '@/lib/prisma';
import { NextResponse } from "next/server";

export async function POST (
  req: Request
) {
  const { name, phonenumber, customernumber, userfilteredid, userfilteredextensionid } = await req.json();

  await prisma.customer.create({
    data: { 
      name : name,
      phoneNumber : phonenumber,
      customerNumber : customernumber,
      userId : userfilteredid,
      extensionId : userfilteredextensionid,
    },
  });

  return NextResponse.json({ status: 200 });

}
