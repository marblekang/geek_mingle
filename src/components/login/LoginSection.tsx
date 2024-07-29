"use client";
import React from "react";
import { signIn } from "next-auth/react";
import KakaoLogo from "../../assets/kakao_logo.png";
import GeekIcon from "../../assets/geek.png";
import LoginButton from "../common/login-button/LoginButton";
import styles from "./login.module.css";
import Link from "next/link";
import CustomLink from "../common/custom-link/CustomLink";

const LoginSection = () => {
  return (
    <div className={styles["button-container"]}>
      <CustomLink href={"/sign-up"}>
        <LoginButton content="회원가입" logoSrc={GeekIcon} onClick={() => {}} />
      </CustomLink>
      <CustomLink href={"/sign-in"}>
        <LoginButton content="로그인" logoSrc={GeekIcon} onClick={() => {}} />
      </CustomLink>
      <LoginButton
        content="KAKAO LOGIN"
        logoSrc={KakaoLogo}
        onClick={() => signIn("kakao", { callbackUrl: "/main" })}
      />
    </div>
  );
};

export default LoginSection;
