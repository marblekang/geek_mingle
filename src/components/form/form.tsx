"use client";
import styles from "./form.module.css";
import SelectTag from "@/components/form/select-tag";
import useSelectTag from "@/components/form/useSelectTag";
import { FormType } from "@/ilb/types/form";
import Link from "next/link";
import { MouseEvent } from "react";

interface Props {
  title: string;
  type: FormType;
  keywords: Array<string>;
  nextPath?: string;
  prevPath?: string;
  isLast?: true;
}
const Form = ({ title, keywords, nextPath, prevPath, isLast, type }: Props) => {
  const { isIncluded, onClickTag, onClickSubmit, selectedList } = useSelectTag({
    type,
  });
  const handleClick = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
    type: FormType,
    isLast?: true
  ) => {
    if (selectedList.length === 0) {
      e.preventDefault();
      alert("최소 1개 이상의 항목을 선택해주세요.");
    } else {
      isLast ? onClickSubmit(type, true) : onClickSubmit(type);
    }
  };

  return (
    <>
      <div className={styles["common-container"]}>
        <span className={styles.title}>{title}</span>
        <div className={styles["form-container"]}>
          {keywords.map((keyword) => (
            <SelectTag
              key={keyword}
              isIncluded={isIncluded}
              onClickTag={onClickTag}
              itemName={keyword}
            />
          ))}
        </div>
        <div className={styles["push-button-container"]}>
          {prevPath && (
            <Link href={prevPath}>
              <button
                className={styles["common-button"]}
                onClick={() => onClickSubmit(type)}
              >
                이전
              </button>
            </Link>
          )}
          {nextPath && (
            <Link href={nextPath ? nextPath : ""}>
              <button
                className={styles["common-button"]}
                onClick={(e) => handleClick(e, type)}
              >
                다음
              </button>
            </Link>
          )}
          {isLast && (
            <Link href={"/"}>
              <button
                className={styles["common-button"]}
                onClick={(e) => handleClick(e, type, true)}
              >
                제출
              </button>
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default Form;
