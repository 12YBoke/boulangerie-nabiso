import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params: { id } }: { params: { id: string } }
) {
  await prisma.orders.delete({
    where: {
      id: id,
    },
  });

  return NextResponse.json({ status: 200 });
}

export async function PATCH(
  req: Request,
  { params: { id } }: { params: { id: string } }
) {
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

  await prisma.orders.update({
    where: {
      id: id,
    },
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
