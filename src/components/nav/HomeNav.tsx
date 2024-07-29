"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuthToken } from "../customHooks/useAuthToken";

const HomeNav = () => {
  const { token } = useAuthToken();
  const router = useRouter();

  useEffect(() => {
    if (token) {
      router.replace("/main");
    }
  }, [token, router]);

  // if (status === "loading") {
  //   return <>loading...</>; // Or a loading indicator
  // }

  return null;
};

export default HomeNav;
