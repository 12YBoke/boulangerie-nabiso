import prisma from '@/lib/prisma';
import { NextResponse } from "next/server";

export async function PATCH (
  req: Request,
  { params: { id } } : { params: { id: string } }
) {

  const { updateType } = await req.json();

  updateType === "Status" ?
    await prisma?.card.update({
      where: {
        id: id
      },
      data: {
        cardStatus: "CLOSED"
      }
    })
  :
    await prisma?.card.update({
      where: {
        id: id
      },
      data: {
        paymentStatus: "PAID"
      }
    })
  
    return NextResponse.json({ status: 200 });
}