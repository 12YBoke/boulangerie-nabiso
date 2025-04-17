import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const {
    userId,
    name,
    startingStock,
    dayProduction,
    userfilteredextensionid,
    endingStock,
    date,
  } = await req.json();

  const response = await prisma.stock.create({
    data: {
      name: name,
      startingStock: startingStock,
      dayProduction: dayProduction,
      userId: userId,
      extensionId: userfilteredextensionid,
      date: date,
      endingStock: endingStock,
    },
    select: {
      id: true,
    },
  });

  const flowId = response.id;

  return NextResponse.json({ flowId, status: 200 });
}
