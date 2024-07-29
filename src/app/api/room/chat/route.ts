import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextRequest): Promise</* number[] */ any> {
  const userEmail = req.nextUrl.searchParams.get("userEmail");

  console.log(userEmail, "userEmail");
  const user = await prisma.user.findUnique({
    where: { email: userEmail ?? "" },
    include: {
      SendRoom: { where: { accepted: true }, select: { id: true } },
      ReceiveRoom: { where: { accepted: true }, select: { id: true } },
    },
  });

  if (!user) {
    return NextResponse.json([]);
  }

  const sendRoomIds = user.SendRoom.map((room: any) => room.id);
  const receiveRoomIds = user.ReceiveRoom.map((room: any) => room.id);

  return NextResponse.json([...sendRoomIds, ...receiveRoomIds]);
}
