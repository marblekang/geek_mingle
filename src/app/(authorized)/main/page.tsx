"use client";
import UserCard from "@/components/users/user-card/UserCard";
import React, { useCallback, useEffect, useState } from "react";
import Logo from "@/assets/kakao_logo.png";
import { getUserList } from "@/util/users/crud";
import { useInView } from "react-intersection-observer";
import { useQuery } from "@tanstack/react-query";
import styles from "./main.module.css";
import LoadingSpinner from "@/components/common/loading/spinner/LoadingSpinner";
import { useUserInfoStore } from "@/ilb/store/useUserInfoStore";
import { ClientUserInfo } from "@/ilb/types/users";
/* 이미지 s3에 저장. */

const Main = () => {
  const LIMIT = 20;
  const [users, setUsers] = useState<ClientUserInfo[]>([]);
  const [page, setPage] = useState<number>(1);
  const { inView, ref } = useInView();
  const { userInfo } = useUserInfoStore();

  const fetchUserList = async ({ page }: { page: number }) => {
    const users: Array<ClientUserInfo> = await getUserList({
      page,
      limit: LIMIT,
      loggedInEmail: userInfo.email ?? "",
    });
    return users;
  };
  const { data, error, isFetching } = useQuery({
    queryKey: ["users", { page, userInfo }],
    queryFn: () => {
      if (page && userInfo) {
        return fetchUserList({ page });
      }
    },
  });

  const excludeUser = ({ email }: { email: string }) => {
    setUsers((prev) => {
      const filteredUserList = prev.filter((val) => val.email !== email);
      return [...filteredUserList];
    });
  };

  const setUserData = useCallback(() => {
    if (!isFetching && data) {
      setUsers((prev) => [...prev, ...data]);
    }
  }, [data, isFetching]);

  useEffect(() => {
    setUserData();
  }, [data, setUserData]);

  useEffect(() => {
    if (inView && data && data?.length >= LIMIT) {
      setPage((prev) => prev + 1);
    }
  }, [inView, data]);

  if (error) {
    return "Error";
  }

  return (
    <div className={styles["main-container"]}>
      <button onClick={() => setUserData()}>read button</button>
      {users.length ? (
        users.map((val, idx) => {
          return (
            <UserCard
              key={`${val.email}_${idx}`}
              userInfo={{
                name: val.name,
                age: val.age,
                avatar: Logo,
                intro: val.email,
                techStack: val.techStack,
                jobs: val.job,
                email: val.email,
              }}
            >
              <UserCard.InfoArea>
                <span>{val.email}</span>
                <UserCard.AvatarArea>
                  <UserCard.Avatar />
                </UserCard.AvatarArea>
                <UserCard.EssentialInfoArea>
                  <UserCard.Name />
                  <UserCard.Info type="age" />
                  <UserCard.Info type="techStack" />
                  <UserCard.Info type="jobs" />
                  <UserCard.Preference excludeUser={excludeUser} />
                </UserCard.EssentialInfoArea>
              </UserCard.InfoArea>
            </UserCard>
          );
        })
      ) : isFetching ? (
        <LoadingSpinner />
      ) : null}

      {users.length !== 0 && (
        <div className={styles["infinite-scroll-target"]} ref={ref}>
          {isFetching && <LoadingSpinner />}
        </div>
      )}
    </div>
  );
};

export default Main;
