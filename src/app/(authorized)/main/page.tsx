"use client";
import UserCard from "@/component/users/user-card/UserCard";
import React, { useCallback, useEffect, useState } from "react";
import Logo from "@/assets/kakao_logo.png";
import { getUser } from "@/util/users/crud";
import { useInView } from "react-intersection-observer";
import { useQuery } from "@tanstack/react-query";
import styles from "./main.module.css";
import LoadingSpinner from "@/component/common/loading/spinner/LoadingSpinner";
/* 이미지 s3에 저장. */

const Main = () => {
  const LIMIT = 20;
  const [users, setUsers] = useState<any[]>([]);
  const [page, setPage] = useState<number>(1);
  const { inView, ref } = useInView();
  const fetchUserData = async ({ page }: { page: number }) => {
    const users = await getUser({ page, limit: LIMIT });
    return users;
  };

  const { data, error, isFetching } = useQuery({
    queryKey: ["users", { page }],
    queryFn: () => {
      if (page) {
        return fetchUserData({ page });
      }
    },
  });

  const setUserData = useCallback(() => {
    if (!isFetching && data) {
      setUsers((prev) => [...prev, ...data]);
    }
  }, [data, isFetching]);

  useEffect(() => {
    setUserData();
  }, [data, setUserData]);

  useEffect(() => {
    if (inView && data?.length >= LIMIT) {
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
              key={`${val.id}_${idx}`}
              userInfo={{
                name: val.name,
                age: 10,
                avatar: Logo,
                intro: val.email,
                techStack: ["test"],
                jobs: ["test"],
              }}
            >
              <UserCard.InfoArea>
                <span>{val.id}</span>
                <UserCard.AvatarArea>
                  <UserCard.Avatar />
                </UserCard.AvatarArea>
                <UserCard.EssentialInfoArea>
                  <UserCard.Name />
                  <UserCard.Info type="age" />
                  <UserCard.Info type="techStack" />
                  <UserCard.Info type="jobs" />
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
