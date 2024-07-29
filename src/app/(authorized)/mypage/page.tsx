"use client";
import { useAuthToken } from "@/components/customHooks/useAuthToken";
import { useUserInfoStore } from "@/ilb/store/useUserInfoStore";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
const LoginPage = () => {
  const { token, removeToken } = useAuthToken();
  const { userInfo } = useUserInfoStore();
  const router = useRouter();
  useEffect(() => {
    if (!token) {
      router.push("/");
    }
  }, [token, router]);

  return (
    <>
      {userInfo?.name} {userInfo?.email}님 반갑습니다. <br />
      <button
        onClick={() => {
          removeToken();
          router.push("/");
        }}
      >
        로그아웃
      </button>
    </>
  );
};

export default LoginPage;
