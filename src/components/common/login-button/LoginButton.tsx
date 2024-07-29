"use client";
import React from "react";
import styles from "./login-button.module.css";
import Image, { StaticImageData } from "next/image";
interface Props {
  logoSrc: StaticImageData;
  content: string;
  onClick?: () => void;
}
const LoginButton = ({ logoSrc, content, onClick }: Props) => {
  return (
    <div className={styles.button} onClick={onClick}>
      <div className={styles["button-content"]}>
        <Image width={40} height={40} src={logoSrc} alt="image" />
        <div className={styles["button-text-container"]}>
          <span className={styles["button-text"]}>{content}</span>
        </div>
      </div>
    </div>
  );
};

export default LoginButton;
