"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  where,
} from "@firebase/firestore";
import db from "@/fire-config";
import styles from "./chat.module.css";
import dayjs from "dayjs";
import axios from "axios";
import { useUserInfoStore } from "@/ilb/store/useUserInfoStore";
import { useAuthToken } from "../customHooks/useAuthToken";
import { getRoomsById } from "@/util/room/crud";
/**
 * @description
 * 채팅 목록 컴포넌트
 * firebase-firestore에서 채팅 데이터 목록을 보여줍니다.
 */
const ChatCollection = () => {
  interface ChatInfo {
    createdAt: Timestamp;
    sender: string;
    text: string;
    id: string;
  }
  // 채팅 목록 데이터
  const [chatData, setChatData] = useState<ChatInfo[]>([]);

  const messageRef = useRef<HTMLDivElement | null>(null);

  //
  /**
   * @description
   * 채팅 목록 데이터를 조회합니다. onSnapShot을 데이터가 실시간으 확인될 수 있도록 해줍니다.
   * 페이지가 사라질 때, 실시간 연결을 해지해주기 위해 실시간 파이어베이스 연결 함수를 반환해줍니다.
   * @param cb setState로 data를 설정해주기위한 함수 인자
   * @return unsubscribe 실시간 파이어베이스 연결 함수
   */

  interface Timestamp {
    seconds: number;
    nanoseconds: number;
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  function formatTimestamp(timestamp: Timestamp): string | undefined {
    if (!timestamp) {
      return;
    }
    const { seconds, nanoseconds } = timestamp;
    const milliseconds = nanoseconds / 1_000_000; // 나노초를 밀리초로 변환
    // Unix epoch 기준 시간 계산
    const date = dayjs.unix(seconds).add(milliseconds, "millisecond");
    // 원하는 형식으로 변환
    return date.format("YYYY-MM-DD HH:mm:ss");
  }

  console.log(chatData, "chatDat");
  /* 스크롤로 데이터 추가된건지, 메시지 입력해서 데이터 추가된건지 구분하는 로직 필요함. */

  useEffect(() => {
    /* inView false 일때 차트데이터 추가됐으면 하단으로 */
    messageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatData]);

  return (
    <div className={styles["chat-collection-container"]}>
      {chatData.map((chat, index) => (
        <div key={index} style={{ width: "100%", display: "flex" }}>
          <span className={styles.message}>{chat.sender}</span>
          <span className={styles.message}>{chat.text}</span>
          <span className={styles.message}>
            {formatTimestamp(chat.createdAt as Timestamp)}
          </span>
        </div>
      ))}
      <div ref={messageRef} />
    </div>
  );
};

export default ChatCollection;
