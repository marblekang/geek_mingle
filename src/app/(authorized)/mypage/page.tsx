"use client";
import { handleSubmit } from "@/util/crud";
import { signIn, useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
const LoginPage = () => {
  const { status, data } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);
  if (status === "authenticated") {
    return (
      <>
        {data.user?.name}님 반갑습니다. <br />
        <button onClick={() => signOut({ callbackUrl: "/" })}>로그아웃</button>
      </>
    );
  }
};

export default LoginPage;
