import ChatCollection from "@/component/chat/ChatCollection";
import ChatInput from "@/component/chat/ChatInput";
import styles from "./chat.module.css";
import { Fragment } from "react";
import axios from "axios";
import ChatRooms from "@/component/chat/ChatRooms/ChatRooms";
interface Chat {
  id: string;
  text: string;
}

/**
 * @description
 * 채팅 페이지 컴포넌트입니다.
 */
export default async function Chat() {
  return (
    <div className={styles["chat-container"]}>
      <ChatRooms />
    </div>
  );
}
