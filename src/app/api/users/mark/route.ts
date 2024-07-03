import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
const prisma = new PrismaClient();
export const PUT = async (req: NextRequest) => {
  try {
    // 요청 본문을 안전하게 파싱
    const json = await req.text();
    const {
      senderEmail,
      receiverEmail,
      type,
    }: { senderEmail: string; receiverEmail: string; type: "like" | "skip" } =
      JSON.parse(json || "{}");

    if (!senderEmail || !receiverEmail) {
      return NextResponse.json({ message: "Invalid email" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email: senderEmail },
      select: { likeUserList: true, hateUserList: true },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 400 });
    }

    // likeUserList와 hateUserList가 빈 문자열일 경우 처리
    const likeUserListArray = user.likeUserList
      ? JSON.parse(user.likeUserList)
      : [];
    const hateUserListArray = user.hateUserList
      ? JSON.parse(user.hateUserList)
      : [];

    const updatedUserList =
      type === "like"
        ? JSON.stringify([...likeUserListArray, receiverEmail])
        : JSON.stringify([...hateUserListArray, receiverEmail]);

    const updatedUser = await prisma.user.update({
      where: { email: senderEmail },
      data:
        type === "like"
          ? { likeUserList: updatedUserList }
          : { hateUserList: updatedUserList },
    });

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { message: "Internal Server Error!" },
      { status: 500 }
    );
  }
};
