import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params: { id } }: { params: { id: string } }
) {
  await prisma.financialFlow.delete({
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
  const data = await req.json();

  const response = await prisma.financialFlow.update({
    where: {
      id: id,
    },
    data: data,
    select: {
      agentSalaryId: true,
    },
  });

  const agentSalaryId = response.agentSalaryId;

  return NextResponse.json({ agentSalaryId, status: 200 });
}
