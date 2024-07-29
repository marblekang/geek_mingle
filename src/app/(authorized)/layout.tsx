import { ReactNode } from "react";
import NavBottom from "@/components/nav-bottom/NavBottom";
import styles from "./page.module.css";
interface AuthorizedLayoutProps {
  children: ReactNode;
}

const AuthorizedLayout = ({ children }: AuthorizedLayoutProps) => {
  return (
    <div className={styles["authorized-container"]}>
      {children}
      <NavBottom />
    </div>
  );
};

export default AuthorizedLayout;
