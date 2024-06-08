"use client";
import React, { useState } from "react";
import { addDoc, collection, serverTimestamp } from "@firebase/firestore";
import db from "@/fire-config";
import styles from "./chat.module.css";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
/**
 * @description
 * 채팅 작성 인풋 컴포넌트입니다.
 */
const ChatInput = () => {
  // 채팅 인풋 값
  const [message, setMessage] = useState("");

  // 채팅 메시지를 DB에 전송하고 전송되면 메시지 인풋 값을 초기화해줍니다.

  const onSubmit = async (
    e?: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e?.preventDefault();
    const copyMessage = message;
    setMessage("");
    await addDoc(collection(db, "chat"), {
      sender: userName,
      text: copyMessage,
      createdAt: serverTimestamp(),
    }).catch((e) => {
      alert(e);
      setMessage(copyMessage);
    });
  };
  const onPressEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.isComposing) return;
    if (e.key === "Enter") {
      onSubmit();
    }
  };
  const [userName, setUserName] = useState<string>("");
  return (
    <div className={styles["chat-input-container"]}>
      <input
        className={styles.textarea}
        name="chat"
        id="chat"
        placeholder="Send your Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => onPressEnter(e)}
        autoComplete="off"
      />
      <button onClick={(e) => onSubmit(e)} className={styles["submit-button"]}>
        <FontAwesomeIcon icon={faPaperPlane} color="#fff" />
      </button>
    </div>
  );
};

export default ChatInput;
