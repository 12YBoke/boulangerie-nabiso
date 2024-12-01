import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const {
    cardid,
    amount,
    amountpaid,
    voucher,
    voucherpaid,
    dateordered,
    customerid,
    name,
    type,
    amountdelivered,
    userid,
  } = await req.json();

  await prisma.orders.create({
    data: {
      cardId: cardid,
      amount: amount,
      amountPaid: amountpaid,
      voucher: voucher,
      voucherPaid: voucherpaid,
      dateOrdered: dateordered,
      CustomerId: type === "ORDER" ? customerid : null,
      name: name,
      type: type,
      amountToBeDelivered: amountdelivered,
      userId: userid,
    },
  });

  return NextResponse.json({ status: 200 });
}
