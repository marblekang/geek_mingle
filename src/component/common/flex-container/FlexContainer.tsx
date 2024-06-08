import React, { ReactNode } from "react";
import styles from "./flex-container.module.css";

interface Props {
  flexDirection: "row" | "column";
  children: ReactNode;
}

const FlexContainer = ({ flexDirection, children }: Props) => {
  return (
    <div
      className={
        flexDirection === "row"
          ? styles["flex-container-row"]
          : styles["flex-container-column"]
      }
    >
      {children}
    </div>
  );
};

export default FlexContainer;
