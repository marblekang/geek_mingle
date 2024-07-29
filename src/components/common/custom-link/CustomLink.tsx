import Link from "next/link";
import React, { ReactNode } from "react";
import styles from "./custom-link.module.css";
import { Url } from "next/dist/shared/lib/router/router";
interface CustomLinkProps {
  children: ReactNode;
  href: string | Url;
}
const CustomLink = ({ href, children }: CustomLinkProps) => {
  return (
    <Link href={href} className={styles["custom-link"]}>
      {children}
    </Link>
  );
};

export default CustomLink;
