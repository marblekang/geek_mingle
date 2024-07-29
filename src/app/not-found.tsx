"use client";
import Link from "next/link";
import { NextPage } from "next";
import { useAuthToken } from "@/components/customHooks/useAuthToken";

const NotFound: NextPage = () => {
  const { token } = useAuthToken();
  return (
    <div>
      <div>이 페이지는 존재하지 않습니다. 다른 페이지를 검색해 보세요.</div>
      <Link href={token ? "/main" : "/"}>home</Link>
    </div>
  );
};

export default NotFound;
