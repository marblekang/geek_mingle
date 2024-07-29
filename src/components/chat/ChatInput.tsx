"use client";
import React, { useState } from "react";
import { serverTimestamp } from "firebase/firestore";

import styles from "./chat.module.css";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { addMessageToCollection } from "@/util/room/crud";

/**
 * @description
 * 채팅 작성 인풋 컴포넌트입니다.
 */
interface Props {
  roomId: string;
}

const ChatInput = ({ roomId }: Props) => {
  // 채팅 인풋 값
  const [message, setMessage] = useState("");
  const [userName, setUserName] = useState<string>("");

  // 채팅 메시지를 DB에 전송하고 전송되면 메시지 인풋 값을 초기화해줍니다.
  const onSubmit = async (
    e?: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e?.preventDefault();
    const copyMessage = message;
    setMessage("");

    const messageData = {
      createdAt: serverTimestamp() as any,
      id: "", // Firestore에서 자동으로 생성됩니다.
      sender: userName,
      text: copyMessage,
    };

    const response = await addMessageToCollection(roomId, messageData);
    if (!response.success) {
      alert(response.message);
      setMessage(copyMessage); // 오류가 발생하면 메시지 복원
    }
  };

  const onPressEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.isComposing) return;
    if (e.key === "Enter") {
      onSubmit();
    }
  };

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
