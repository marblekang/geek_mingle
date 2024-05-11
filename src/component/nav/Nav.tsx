"use client";
import Link from "next/link";
import styles from "./nav.module.css";
import { useSession } from "next-auth/react";

const Nav = () => {
  const { data: session } = useSession();
  return (
    <div className={styles.nav}>
      <Link href={"/"}>Home</Link>
      <Link href={session ? "/mypage" : "/login"}>
        {session ? "My Page" : "Login"}
      </Link>
      <Link href="/form">Form</Link>
    </div>
  );
};

export default Nav;
