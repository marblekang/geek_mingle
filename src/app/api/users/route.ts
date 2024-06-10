import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    const page = parseInt(req.nextUrl.searchParams.get("page") || "1");
    const limit = parseInt(req.nextUrl.searchParams.get("limit") || "10");
    const users = await prisma.user.findMany({
      skip: (page - 1) * limit,
      take: limit,
    });

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
