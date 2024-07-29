"use client";

import { useRouter } from "next/navigation";
import { ReactElement } from "react";
import { useAuthToken } from "../customHooks/useAuthToken";

interface Props {
  children: ReactElement;
}
const PageWithAuth = ({ children }: Props) => {
  const { token } = useAuthToken();
  const router = useRouter();
  if (token) {
    return <>{children}</>;
  } else {
    router.push("/login");
  }
};

export default PageWithAuth;
