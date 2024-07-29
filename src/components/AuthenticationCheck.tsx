"use client";
import {} from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useAuthToken } from "./customHooks/useAuthToken";
import { useUserInfoStore } from "@/ilb/store/useUserInfoStore";

const AuthenticationCheck = () => {
  const { token } = useAuthToken();
  const { userInfo } = useUserInfoStore();

  const router = useRouter();
  useEffect(() => {
    if (token) {
      router.replace("/main");
      return;
    }
    if (!token) {
      router.replace("/");
      return;
    }
  }, [token, router]);

  return null;
};

export default AuthenticationCheck;
