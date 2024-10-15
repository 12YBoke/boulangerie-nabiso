import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST (
  req: Request
) {
  const { cardnumber, customerid, extensionid } = await req.json();

  await prisma.card.create({
    data: { 
      cardNumber : cardnumber,
      customerId : customerid,
      extensionId : extensionid,
    },
  })

  return NextResponse.json({ status: 200 });
}