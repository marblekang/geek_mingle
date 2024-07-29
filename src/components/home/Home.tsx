import React from "react";
import styles from "./home.module.css";
import Image from "next/image";
import GeekIMG from "../../assets/geek.png";
import LoginSection from "../login/LoginSection";

const HomeFrame = () => {
  return (
    <div className={styles.container}>
      <div className={styles["title-container"]}>
        <Image width={40} src={GeekIMG} alt="geek_img"></Image>
        <span style={{ fontSize: "2rem" }}>Geek Mingle</span>
      </div>
      <LoginSection />
    </div>
  );
};

export default HomeFrame;
