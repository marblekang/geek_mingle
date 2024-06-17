import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const { email, password, name, age } = await req.json();

  // 유효성 검사
  if (!email || !password || !name || !age) {
    return NextResponse.json(
      { message: "Missing required fields" },
      { status: 400 }
    );
  }

  try {
    // 이메일 중복 체크
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "Email already exists" },
        { status: 409 }
      );
    }

    // 비밀번호 해싱
    const hashedPassword = await bcrypt.hash(password, 10);

    // 새로운 사용자 생성
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        age,
      },
    });

    return NextResponse.json({ user }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ message: `${error}` }, { status: 500 });
  }
}
