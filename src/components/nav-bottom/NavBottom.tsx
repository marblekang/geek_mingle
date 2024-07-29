import React from "react";
import styles from "./nav-bottom.module.css";
import { faComment, faHome, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CustomLink from "../common/custom-link/CustomLink";
const NavBottom = () => {
  return (
    <div className={styles.nav}>
      <CustomLink href={"/chat"}>
        <FontAwesomeIcon icon={faComment} style={{ color: "#fff" }} size="2x" />
      </CustomLink>
      <CustomLink href={"/main"}>
        <FontAwesomeIcon icon={faHome} style={{ color: "#fff" }} size="2x" />
      </CustomLink>
      <CustomLink href={"/mypage"}>
        <FontAwesomeIcon icon={faUser} style={{ color: "#fff" }} size="2x" />
      </CustomLink>
    </div>
  );
};

export default NavBottom;
