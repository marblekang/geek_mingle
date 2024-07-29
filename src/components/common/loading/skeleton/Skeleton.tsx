import React from "react";
import styles from "./skeleton.module.css";

const SkeletonItem = () => {
  return <div className={styles["skeleton-item"]}></div>;
};

const SkeletonUI = () => {
  return (
    <div className={styles["skeleton-container"]}>
      <SkeletonItem />
    </div>
  );
};

export default SkeletonUI;
