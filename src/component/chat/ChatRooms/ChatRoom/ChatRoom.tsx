"use client";
import { getMessagesById } from "@/util/room/crud";
import { Timestamp } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import ChatInput from "../../ChatInput";
interface Props {
  roomId: string;
}

const ChatRoom = ({ roomId }: Props) => {
  interface Message {
    createdAt: Timestamp;
    id: string;
    sender: string;
    text: string;
  }
  const [messages, setMessages] = useState<Message[]>();
  useEffect(() => {
    const unsubscribe = getMessagesById(
      roomId,
      (newMessages) => setMessages(newMessages),
      (error) => console.error(error)
    );

    // 컴포넌트가 언마운트될 때 구독 해제
    return () => unsubscribe && unsubscribe();
  }, [roomId]);

  return (
    <>
      {messages?.map(({ createdAt, sender, text, id }) => {
        return (
          <div key={id}>
            <div>{text}</div>
            <div>{sender}</div>
            <div></div>
          </div>
        );
      })}
      <ChatInput roomId={roomId} />
    </>
  );
};

export default ChatRoom;
