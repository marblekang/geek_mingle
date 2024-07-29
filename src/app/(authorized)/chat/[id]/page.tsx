import ChatRoom from "@/components/chat/ChatRooms/ChatRoom/ChatRoom";
import React from "react";
import styles from "./chat-room.module.css";
interface Params {
  params: { id: string };
}
const ChatRoomPage = ({ params }: Params) => {
  const { id } = params;
  return (
    <div className={styles["chat-container"]}>
      <ChatRoom roomId={id} />
    </div>
  );
};

export default ChatRoomPage;
