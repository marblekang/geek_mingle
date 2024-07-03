// src/utils/api.ts
import axios from "axios";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  QueryDocumentSnapshot,
  DocumentData,
  Timestamp,
  addDoc,
  orderBy,
  onSnapshot,
  QuerySnapshot,
  doc,
  runTransaction,
} from "firebase/firestore";
import db from "@/fire-config";
export interface ReqState {
  success: boolean;
  message: string;
  status: number;
}

export const createRoom = async (
  senderEmail: string,
  receiverEmail: string
): Promise<ReqState> => {
  try {
    const response = await axios.post("/api/room", {
      senderEmail,
      receiverEmail,
    });

    if (response.status === 201) {
      return {
        success: true,
        message: "Room created successfully",
        status: response.status,
      };
    }
    if (response.status === 200) {
      return {
        success: true,
        message: "Room updated successfully",
        status: response.status,
      };
    } else {
      return {
        success: false,
        message: response.data.message || "Error creating room",
        status: response.status,
      };
    }
  } catch (error: any) {
    console.error(error);
    return { success: false, message: "Error creating room", status: 500 };
  }
};
interface Document {
  id: string;
  messages?: Message[];
  [key: string]: any;
}

interface Message {
  createdAt: Timestamp;
  id: string;
  sender: string;
  text: string;
}

export const getRoomsById = async (
  collectionName: string,
  ids: number[]
): Promise<Document[]> => {
  const documents: Document[] = [];

  // ID 배열이 비어 있는 경우 빈 배열 반환
  if (ids.length === 0) {
    return documents;
  }

  // ID 배열을 10개씩 나눕니다
  for (let i = 0; i < ids.length; i += 10) {
    const chunk = ids.slice(i, i + 10);
    if (chunk.length > 0) {
      const q = query(
        collection(db, collectionName),
        where("__name__", "in", chunk.map(String))
      );
      const querySnapshot = await getDocs(q);

      for (const docSnapshot of querySnapshot.docs) {
        const docData: Document = { id: docSnapshot.id, ...docSnapshot.data() };
        documents.push(docData);
      }
    }
  }

  return documents;
};
export const getMessagesById = (
  id: string,
  onUpdate: (messages: Message[]) => void,
  onError: (error: Error) => void
) => {
  try {
    const messageCollection = collection(db, `conversations/${id}/messages`);
    const messagesQuery = query(messageCollection, orderBy("createdAt", "asc"));

    const unsubscribe = onSnapshot(
      messagesQuery,
      (querySnapshot: QuerySnapshot<DocumentData>) => {
        const messages: Message[] = querySnapshot.docs.map((messageDoc) => ({
          ...(messageDoc.data() as Message),
        }));
        onUpdate(messages);
      },
      (error) => {
        console.error("Error getting messages: ", error);
        onError(error);
      }
    );

    return unsubscribe; // 구독을 해제할 수 있도록 함수 반환
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error getting messages: ", error.message);
      onError(error);
    } else {
      console.error("Unknown error getting messages");
      onError(new Error("Unknown error getting messages"));
    }
  }
};

export const addMessageToCollection = async (
  conversationId: string,
  messageData: Message
): Promise<ReqState> => {
  try {
    const messageCollection = collection(
      db,
      `conversations/${conversationId}/messages`
    );
    const conversationDocRef = doc(db, `conversations/${conversationId}`);

    await runTransaction(db, async (transaction) => {
      // 메시지를 추가하고 문서 참조를 얻음
      const newMessageRef = await addDoc(messageCollection, messageData);

      // lastMessage 필드를 업데이트
      transaction.update(conversationDocRef, {
        lastMessage: messageData.text,
      });
    });

    return {
      success: true,
      message: "Message added successfully and lastMessage updated",
      status: 200,
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error adding message: ", error.message);
    } else {
      console.error("Unknown error adding message");
    }
    return {
      success: false,
      message: "Error adding message",
      status: 500,
    };
  }
};
