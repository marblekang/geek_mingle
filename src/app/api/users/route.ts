import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    const email = req.nextUrl.searchParams.get("email");
    const page = parseInt(req.nextUrl.searchParams.get("page") || "1");
    const limit = parseInt(req.nextUrl.searchParams.get("limit") || "10");

    // 헤더에서 로그인한 유저의 이메일 추출
    const loggedInEmail = req.headers.get("x-logged-in-email") ?? "";
    console.log(req.headers, "headers");
    if (email) {
      // 특정 유저 조회
      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        return new NextResponse("User not found", { status: 404 });
      }

      return NextResponse.json(user, { status: 200 });
    } else {
      // 유저 목록 조회 (페이지네이션) + 특정 이메일 제외
      const users = await prisma.user.findMany({
        where: {
          email: {
            not: loggedInEmail,
          },
        },
        skip: (page - 1) * limit,
        take: limit,
      });

      return NextResponse.json(users, { status: 200 });
    }
  } catch (error) {
    console.error("Error fetching users:", error);
    return new NextResponse("Internal Server Error!", { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
export async function PUT(req: NextRequest) {
  try {
    const { email, job, techStack } = await req.json();

    if (!email) {
      return new NextResponse("User ID is required!", { status: 400 });
    }

    const updatedUser = await prisma.user.update({
      where: { email },
      data: {
        job: JSON.stringify(job),
        techStack: JSON.stringify(techStack),
      },
    });

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    console.error("Error updating user:", error);
    return new NextResponse("Internal Server Error!", { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();

    if (!id) {
      return new NextResponse("User ID is required!", { status: 400 });
    }

    await prisma.user.delete({
      where: { id: parseInt(id) },
    });

    return new NextResponse("User deleted successfully", { status: 200 });
  } catch (error) {
    console.error("Error deleting user:", error);
    return new NextResponse("Internal Server Error!", { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
