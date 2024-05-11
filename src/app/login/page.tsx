"use client";
import { signIn, useSession, signOut } from "next-auth/react";
const LoginPage = () => {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        {session.user?.name}님 반갑습니다. <br />
        <button onClick={() => signOut({ callbackUrl: "/" })}>로그아웃</button>
      </>
    );
  }
  return (
    <div>
      로그인 되지 않았습니다. <br />
      <button onClick={() => signIn("kakao", { callbackUrl: "/submit" })}>
        카카오 로그인
      </button>
    </div>
  );
};

export default LoginPage;
