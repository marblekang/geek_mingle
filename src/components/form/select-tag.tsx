import React, { MouseEvent } from "react";
import styles from "./select-tag.module.css";
interface Props {
  onClickTag: (e: MouseEvent<HTMLDivElement>) => void;
  isIncluded: (param: string) => boolean;
  itemName: string;
}
const SelectTag = ({ onClickTag, isIncluded, itemName }: Props) => {
  return (
    <div
      onClick={onClickTag}
      className={`${styles["single-button"]} ${
        isIncluded(itemName) ? styles.active : ""
      }`}
      data-name={itemName}
    >
      {itemName}
    </div>
  );
};

export default React.memo(SelectTag);
