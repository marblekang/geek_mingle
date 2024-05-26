import Link from "next/link";
import React, { ReactNode } from "react";
import styles from "./custom-link.module.css";
interface CustomLinkProps {
  children: ReactNode;
  href: string;
}
const CustomLink = ({ href, children }: CustomLinkProps) => {
  return (
    <Link href={href} className={styles["custom-link"]}>
      {children}
    </Link>
  );
};

export default CustomLink;
