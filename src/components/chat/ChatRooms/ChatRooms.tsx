"use client";
import CustomLink from "@/components/common/custom-link/CustomLink";
import { useAuthToken } from "@/components/customHooks/useAuthToken";
import { useUserInfoStore } from "@/ilb/store/useUserInfoStore";
import { getRoomsById } from "@/util/room/crud";
import axios from "axios";
import { Timestamp } from "firebase/firestore";
import Link from "next/link";
import React, { Fragment, useEffect, useMemo, useState } from "react";

const ChatRooms = () => {
  interface ChatRoomData {
    accepted?: true;
    createdAt: Timestamp;
    id: string;
    lastMessage: string;
    receiverEmail: string;
    senderEmail: string;
  }
  const { removeToken } = useAuthToken();
  const { userInfo } = useUserInfoStore();
  const [roomIds, setRoomIds] = useState<number[]>([]);
  const [chatRooms, setChatRooms] = useState<ChatRoomData[]>([]);
  const getRoomIds = async () => {
    try {
      if (!userInfo.email) {
        return;
      }
      const response = await axios.get("/api/room/chat", {
        params: { userEmail: userInfo.email },
      });

      setRoomIds(response.data);
    } catch (e) {
      console.log(e);
      removeToken();
    }
  };
  useEffect(() => {
    if (userInfo) {
      getRoomIds();
    }
  }, [userInfo]);

  const findChatPartner = (
    myEmail: string,
    senderEmail: string,
    receiverEmail: string
  ): string => {
    return senderEmail === myEmail ? receiverEmail : senderEmail;
  };

  useEffect(() => {
    if (!roomIds || roomIds.length === 0) {
      console.log(roomIds, "roomIds");
      return;
    }
    getRoomsById("conversations", roomIds)
      .then((documents) => {
        setChatRooms(documents as any);
      })
      .catch((e) => {
        console.error(e);
      });
  }, [roomIds]);
  console.log(chatRooms, chatRooms);
  return (
    <div>
      {chatRooms.map((val) => {
        return (
          <CustomLink href={{ pathname: `/chat/${val.id}` }} key={val.id}>
            <div style={{ padding: "1rem", border: "1px solid black" }}>
              <div>{val.id}</div>
              <div>
                {findChatPartner(
                  userInfo.email,
                  val.receiverEmail,
                  val.senderEmail
                )}
              </div>
              <div>{val.lastMessage}</div>
            </div>
          </CustomLink>
        );
      })}
    </div>
  );
};

export default ChatRooms;
