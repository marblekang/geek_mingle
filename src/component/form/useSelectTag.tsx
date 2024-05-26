"use client";
import { useFormStore } from "@/ilb/store/useFormStore";
import { FormTypeLabel } from "@/ilb/types/enums";
import { FormType } from "@/ilb/types/form";
import { handleSubmit } from "@/util/crud";
import { MouseEvent, useCallback, useEffect, useState } from "react";
const useSelectTag = ({ type }: { type: FormType }) => {
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

  const typeConverter: { [key in FormType]: FormTypeLabel } = {
    job: FormTypeLabel.job,
    techStack: FormTypeLabel.teckStack,
  };
  interface CommonSessionStorageParams {
    name: string;
  }
  interface SetSessionStorageParams extends CommonSessionStorageParams {
    data: any;
  }
  const setSessionStorage = ({ name, data }: SetSessionStorageParams) => {
    if (typeof data === "string") {
      sessionStorage.setItem(name, data);
      return;
    }
    sessionStorage.setItem(name, JSON.stringify(data));
  };
  const getSessionStorage = ({ name }: CommonSessionStorageParams) => {
    const item = sessionStorage.getItem(name);

    return item && JSON.parse(item);
  };

  const onClickSubmit = (type: FormType, isLast?: true) => {
    if (isLast) {
      /* DB에 저장. 
    Post 요청
    */
      console.log("isLast");
      const techStack = getSessionStorage({ name: FormTypeLabel.teckStack });
      const jobs = getSessionStorage({ name: FormTypeLabel.job });
      if (techStack && jobs) {
        handleSubmit({
          email: "kang1234@gmail.com",
          username: "kang",
          techStack: JSON.stringify(techStack),
          jobs: JSON.stringify(jobs),
        });
      }
    }
    setSessionStorage({ name: typeConverter[type], data: selectedList });
  };
  useEffect(() => {
    const data = getSessionStorage({ name: typeConverter[type] });
    setSelectedList(data ?? []);
  }, []);
  // useEffect(() => {
  //   console.log(globalSelectedList, "globalSElectedLsit");
  // }, [globalSelectedList]);
  // useEffect(() => {
  //   setGlobalSelectedList(selectedList);
  // }, [selectedList, setGlobalSelectedList]);
  return {
    onClickTag,
    isIncluded,
    onClickSubmit,
  };
};

export default useSelectTag;
