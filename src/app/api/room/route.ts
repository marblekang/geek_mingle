import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import db from "@/fire-config";
import { setDoc, collection, serverTimestamp, doc } from "@firebase/firestore";

const prisma = new PrismaClient();

interface ReqState {
  success: boolean;
  message: string;
}

export async function POST(req: NextRequest) {
  try {
    const { senderEmail, receiverEmail } = await req.json();

    if (!senderEmail || !receiverEmail) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check if there's an existing room where the receiver is the current user
    const existingRoom = await prisma.room.findFirst({
      where: {
        receiverEmail: senderEmail,
        senderEmail: receiverEmail,
      },
    });

    if (existingRoom) {
      const { id, receiverEmail: receiver, senderEmail: sender } = existingRoom;
      // Update the existing room
      const updatedRoom = await prisma.room.update({
        where: {
          id: id,
        },
        data: {
          accepted: true,
        },
      });

      await setDoc(doc(db, "conversations", String(existingRoom.id)), {
        senderEmail: sender,
        receiverEmail: receiver,
        accepted: true,
        createdAt: serverTimestamp(),
        lastMessage: "",
      });

      // Firestore의 방 문서에 메시지 컬렉션 추가
      await setDoc(
        doc(collection(db, `conversations/${existingRoom.id}/messages`)),
        {
          sender: senderEmail,
          text: "",
          createdAt: serverTimestamp(),
        }
      );

      return NextResponse.json(
        { success: true, message: "Room updated successfully", updatedRoom },
        { status: 200 }
      );
    } else {
      // Create a new room
      const newRoom = await prisma.room.create({
        data: {
          senderEmail,
          receiverEmail,
        },
      });

      return NextResponse.json(
        { success: true, message: "Room created successfully", newRoom },
        { status: 201 }
      );
    }
  } catch (error: any) {
    console.error("Error creating/updating room:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
