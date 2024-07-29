import React from "react";
import styles from "./loading-spinner.module.css";
const LoadingSpinner = () => {
  return (
    <div className={styles.container}>
      <div className={styles["loading-spinner"]} />
    </div>
  );
};

export default LoadingSpinner;
