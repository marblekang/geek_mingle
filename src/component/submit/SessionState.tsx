"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ReactElement } from "react";

interface Props {
  children: ReactElement;
}
const PageWithAuth = ({ children }: Props) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  if (status === "loading") {
    return <div>loading...</div>;
  } else if (session) {
    return <>{children}</>;
  } else {
    router.push("/login");
  }
};

export default PageWithAuth;
