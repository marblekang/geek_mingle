import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export async function POST(req: NextRequest) {
  const { email, username, techStack, jobs } = await req.json();

  try {
    const result = await prisma.user.create({
      data: {
        email,
        username,
        techStack,
        jobs,
      },
    });

    console.log("create contact", result);
    return new NextResponse("성공!", {
      status: 201,
    });
  } catch (error) {
    console.error("데이터 입력 도중 오류 발생!", error);
    return new NextResponse("Internal Server Error!", {
      status: 500,
    });
  } finally {
    await prisma.$disconnect();
  }
}

export async function GET(req: NextRequest) {
  try {
    const users = await prisma.user.findMany();
    console.log(users);
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.error("Error fetching users:", error);
    return new NextResponse("Internal Server Error!", { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { id, email, username } = await req.json();

    if (!id) {
      return new NextResponse("User ID is required!", { status: 400 });
    }

    const updatedUser = await prisma.user.update({
      where: { id: parseInt(id) },
      data: {
        email,
        username,
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
