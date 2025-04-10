import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const data = await req.json();

  const result = await prisma.extension.create({
    data: data,
    select: {
      id: true,
    },
  });

  return NextResponse.json({ result, status: 200 });
}
