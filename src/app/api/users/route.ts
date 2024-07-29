import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { transformUser } from "@/util/users/transformUser";
import { ServerUserInfo } from "@/ilb/types/users";
const prisma = new PrismaClient();
const calculateSimilarityScore = (
  preferencesA: number[],
  preferencesB: number[]
): number => {
  return preferencesA.reduce((score, value, index) => {
    return score + (value === preferencesB[index] ? 1 : 0);
  }, 0);
};
export async function GET(req: NextRequest) {
  try {
    const email = req.nextUrl.searchParams.get("email");
    const page = parseInt(req.nextUrl.searchParams.get("page") || "1");
    const limit = parseInt(req.nextUrl.searchParams.get("limit") || "10");

    // 헤더에서 로그인한 유저의 이메일 추출
    const loggedInEmail = req.headers.get("x-logged-in-email") ?? "";

    if (email) {
      // 특정 유저 조회
      const user: ServerUserInfo | null = await prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        return new NextResponse("User not found", { status: 404 });
      }

      return NextResponse.json(transformUser(user), { status: 200 });
    } else {
      console.log(loggedInEmail, "email");
      // 로그인한 유저의 likeUserList와 hateUserList 가져오기
      if (!loggedInEmail) {
        return new NextResponse("logged-in email is not found", {
          status: 404,
        });
      }
      const loggedInUser = await prisma.user.findUnique({
        where: { email: loggedInEmail },
        select: {
          likeUserList: true,
          hateUserList: true,
          preferences: true,
        },
      });

      if (!loggedInUser) {
        return new NextResponse("Logged-in user not found", { status: 404 });
      }
      const { hateUserList, likeUserList, preferences } = loggedInUser;

      const likeUserListArray = likeUserList ? JSON.parse(likeUserList) : [];
      const hateUserListArray = hateUserList ? JSON.parse(hateUserList) : [];
      const loggedInUserPreferences = preferences
        ? JSON.parse(preferences)
        : [];

      const excludeEmails = [
        ...likeUserListArray,
        ...hateUserListArray,
        loggedInEmail,
      ];

      // 유저 목록 조회 (페이지네이션) + 특정 이메일 제외
      const users = await prisma.user.findMany({
        where: {
          email: {
            notIn: excludeEmails,
          },
        },
        select: {
          age: true,
          email: true,
          name: true,
          job: true,
          techStack: true,
          preferences: true,
        },
        skip: (page - 1) * limit,
        take: limit,
      });
      const scoredUsers = users.map((user) => {
        const preferencesArray = user.preferences
          ? JSON.parse(user.preferences)
          : [];
        const similarityScore = calculateSimilarityScore(
          loggedInUserPreferences,
          preferencesArray
        );
        return {
          ...user,
          similarityScore,
        };
      });

      // 유사도 점수를 기준으로 내림차순 정렬
      scoredUsers.sort((a, b) => b.similarityScore - a.similarityScore);

      // 페이지네이션 적용
      const paginatedUsers = scoredUsers.slice(
        (page - 1) * limit,
        page * limit
      );
      console.log(paginatedUsers, "paginatedUsers");
      return NextResponse.json(transformUser(paginatedUsers), { status: 200 });
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
    const { email, job, techStack, preferences } = await req.json();

    if (!email) {
      return new NextResponse("User ID is required!", { status: 400 });
    }

    const updatedUser = await prisma.user.update({
      where: { email },
      data: {
        job: JSON.stringify(job),
        techStack: JSON.stringify(techStack),
        preferences: JSON.stringify(preferences),
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
