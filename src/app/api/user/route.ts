import prisma from '@/lib/prisma';
import { NextResponse } from "next/server";

export async function POST (
  req: Request
) {
  const { name, extensionid, hash, salt } = await req.json();

  await prisma.user.create({
    data: { 
      name : name, 
      extensionId : extensionid, 
      password : hash,
      salt : salt,
    },
  });

  return NextResponse.json({ status: 200 });

}