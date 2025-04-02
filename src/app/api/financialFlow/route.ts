import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const {
    amount,
    reason,
    flowType,
    agentId,
    userfilteredextensionid,
    agentSalaryId,
  } = await req.json();

  const response = await prisma.financialFlow.create({
    data: {
      amount: amount,
      reason: reason,
      flowType: flowType,
      agentId: agentId,
      extensionId: userfilteredextensionid,
      agentSalaryId,
    },
    select: {
      id: true,
    },
  });

  const flowId = response.id;

  return NextResponse.json({ flowId, status: 200 });
}
