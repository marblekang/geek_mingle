"use client";
import React from "react";
import { signIn } from "next-auth/react";
import KakaoLogo from "../../assets/kakao_logo.png";
import LoginButton from "../common/login-button/LoginButton";
import styles from "./login.module.css";
const LoginSection = () => {
  return (
    <div className={styles["button-container"]}>
      <LoginButton
        content="KAKAO LOGIN"
        logoSrc={KakaoLogo}
        onClick={() => signIn("kakao", { callbackUrl: "/main" })}
      />
    </div>
  );
};

export default LoginSection;
