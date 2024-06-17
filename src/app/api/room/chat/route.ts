import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextRequest): Promise</* number[] */ any> {
  const userEmail = await req.json();
  console.log(
    11231231231241284617896491267846178647891254978125679451267945126795491625467912546791526795679
  );
  console.log(userEmail, "userEmail");
  const user = await prisma.user.findUnique({
    where: { email: userEmail },
    // include: {
    //   SendRoom: { select: { id: true } },
    //   ReceiveRoom: { select: { id: true } },
    // },
  });

  if (!user) {
    return [];
  }

  // const sendRoomIds = user.SendRoom.map((room: any) => room.id);
  // const receiveRoomIds = user.ReceiveRoom.map((room: any) => room.id);

  return /* [...sendRoomIds, ...receiveRoomIds] */ user;
}
