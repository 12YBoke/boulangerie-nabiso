import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const data = await req.json();

  const response = await prisma.agentSalary.create({
    data: data,
    select: {
      id: true,
    },
  });

  const id = response.id;

  return NextResponse.json({ id, status: 200 });
}
