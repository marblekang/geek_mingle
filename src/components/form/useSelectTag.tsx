"use client";

import { useUserInfoStore } from "@/ilb/store/useUserInfoStore";
import { FormTypeLabel } from "@/ilb/types/enums";
import { FormType } from "@/ilb/types/form";
import { INITIAL_USERINFO } from "@/util/initialState";
import { updateUser } from "@/util/users/crud";
import { MouseEvent, useCallback, useEffect, useState, useMemo } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";

export type UserInfo = {
  email: string;
  job: string[];
  techStack: string[];
};

export type UpdateUserParams = {
  email: string;
  job: string[];
  techStack: string[];
};

// updateUser 함수가 Promise<AxiosResponse<UserInfo>>를 반환한다고 명시
const useSelectTag = ({ type }: { type: FormType }) => {
  const { onChangeUserInfo, userInfo } = useUserInfoStore();
  const [selectedList, setSelectedList] = useState<string[]>([]);

  const queryClient = useQueryClient();

  const { mutate: mutateUpdateUser } = useMutation<
    UserInfo, //return type
    Error, // Error type
    UpdateUserParams // mutate 함수에 전달되는 파라미터 타입
  >({
    mutationFn: updateUser,
    onSuccess: (res: UserInfo) => {
      // console.log(res, "res");
      onResetKeywords();
      queryClient.invalidateQueries({ queryKey: ["userInfo"] });
    },
    onError: (error: Error) => {
      console.log(error, "error");
    },
  });

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

  const typeConverter = useMemo(
    () => ({
      job: FormTypeLabel.job,
      techStack: FormTypeLabel.techStack,
    }),
    []
  );

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

  const getSessionStorage = useCallback(
    ({ name }: CommonSessionStorageParams) => {
      const item = sessionStorage.getItem(name);
      return item ? JSON.parse(item) : null;
    },
    []
  );

  const onResetKeywords = () => {
    const typeList = [FormTypeLabel.job, FormTypeLabel.techStack];
    typeList.forEach((type) => {
      setSessionStorage({ name: type, data: [] });
    });
  };

  const onClickSubmit = (type: FormType, isLast?: true) => {
    if (isLast) {
      const techStack =
        getSessionStorage({ name: FormTypeLabel.techStack }) || [];
      const jobs =
        getSessionStorage({ name: FormTypeLabel.job })?.length === 0
          ? selectedList
          : getSessionStorage({ name: FormTypeLabel.job }) || [];
      const { email } = userInfo;

      mutateUpdateUser({ email, job: jobs, techStack });

      onChangeUserInfo(() => ({ ...INITIAL_USERINFO }));
    }
    setSessionStorage({ name: typeConverter[type], data: selectedList });
  };

  useEffect(() => {
    const data = getSessionStorage({ name: typeConverter[type] });
    setSelectedList(data ?? []);
  }, [type, typeConverter, getSessionStorage]);

  return {
    onClickTag,
    isIncluded,
    onClickSubmit,
    selectedList,
  };
};

export default useSelectTag;
