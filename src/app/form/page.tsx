"use client";
import { useState, MouseEvent, useEffect, useMemo, useCallback } from "react";
import styles from "./form.module.css";
import SelectTag from "@/component/form/select-tag";

const Form = () => {
  const [selectedList, setSelectedList] = useState<string[]>([]);
  const onClickTag = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if (e.target instanceof HTMLElement && e.target.dataset.name) {
        const { name } = e.target.dataset;
        if (selectedList.includes(name)) {
          const filtered = selectedList.filter((item) => item !== name);
          setSelectedList([...filtered]);
          return;
        }
        setSelectedList((prev) => [...prev, name]);
      }
    },
    [selectedList]
  );
  const isIncluded = useCallback(
    (name: string) => {
      return selectedList.includes(name) ? true : false;
    },
    [selectedList]
  );

  useEffect(() => {
    console.log(selectedList);
  }, [selectedList]);
  const sampleData = [
    "프론트엔드 개발자",
    "서버 개발자",
    "풀스택 개발자",
    "자바 개발자",
    "C,C++ 개발자",
    "파이썬 개발자",
    "Node.js 개발자",
    "안드로이드 개발자",
    "iOS 개발자",
  ];
  return (
    <>
      <div className={styles["form-container"]}>
        {sampleData.map((val) => (
          <SelectTag
            key={val}
            isIncluded={isIncluded}
            onClickTag={onClickTag}
            itemName={val}
          />
        ))}
      </div>
    </>
  );
};

export default Form;
