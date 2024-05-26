"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const AuthenticationCheck = () => {
  const { status } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/main");
      return;
    }
    if (status === "unauthenticated") {
      router.replace("/");
      return;
    }
  }, [status, router]);

  return null;
};

export default AuthenticationCheck;
