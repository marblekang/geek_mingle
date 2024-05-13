"use client";
import { MouseEvent, useCallback, useState } from "react";

const useSelectTag = () => {
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

  const interestSampleData = [];
  const onClickSubmit = () => {
    /* DB에 저장. 
    Post 요청
    */
  };
  return {
    onClickTag,
    isIncluded,
    onClickSubmit,
  };
};

export default useSelectTag;
