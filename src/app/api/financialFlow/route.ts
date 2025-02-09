import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { amount, reason, flowType, agentId, userfilteredextensionid } =
    await req.json();

  await prisma.financialFlow.create({
    data: {
      amount: amount,
      reason: reason,
      flowType: flowType,
      agentId: agentId,
      extensionId: userfilteredextensionid,
    },
    select: {
      id: true,
    },
  });

  return NextResponse.json({ status: 200 });
}
