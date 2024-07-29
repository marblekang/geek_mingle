import ChatCollection from "@/components/chat/ChatCollection";
import ChatInput from "@/components/chat/ChatInput";
import styles from "./chat.module.css";
import { Fragment } from "react";
import axios from "axios";
import ChatRooms from "@/components/chat/ChatRooms/ChatRooms";
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
