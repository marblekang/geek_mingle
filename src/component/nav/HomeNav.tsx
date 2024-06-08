"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const HomeNav = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/main");
    }
  }, [status, router]);

  // if (status === "loading") {
  //   return <>loading...</>; // Or a loading indicator
  // }

  return null;
};

export default HomeNav;
