"use client";
import Link from "next/link";
import { NextPage } from "next";
import { useSession } from "next-auth/react";

const NotFound: NextPage = () => {
  const { data: session } = useSession();
  return (
    <div>
      <div>이 페이지는 존재하지 않습니다. 다른 페이지를 검색해 보세요.</div>
      <Link href={session ? "/main" : "/"}>home</Link>
    </div>
  );
};

export default NotFound;
