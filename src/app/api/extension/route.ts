import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const data = await req.json();

  await prisma.extension.create({
    data: data,
    select: {
      id: true,
    },
  });

  return NextResponse.json({ status: 200 });
}
