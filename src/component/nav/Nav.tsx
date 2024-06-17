"use client";
import Link from "next/link";
import styles from "./nav.module.css";

import { useAuthToken } from "../customHooks/useAuthToken";

const Nav = () => {
  const { token } = useAuthToken();

  return (
    <div className={styles.nav}>
      <Link href={"/"}>Home</Link>
      <Link href={"/auth"}>{token ? "My Page" : "Login"}</Link>
      <Link href="/form/job">Form</Link>
    </div>
  );
};

export default Nav;
