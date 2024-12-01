import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { orderId, amountdelivered, dateDelivered } = await req.json();

  await prisma.deliveries.create({
    data: {
      orderId: orderId,
      amountDelivered: amountdelivered,
      dateDelivered: dateDelivered,
    },
  });

  return NextResponse.json({ status: 200 });
}
