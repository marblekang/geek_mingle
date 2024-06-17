// src/utils/api.ts
import axios from "axios";

export interface ReqState {
  success: boolean;
  message: string;
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
      return { success: true, message: "Room created successfully" };
    } else {
      return {
        success: false,
        message: response.data.message || "Error creating room",
      };
    }
  } catch (error: any) {
    console.error(error);
    return { success: false, message: "Error creating room" };
  }
};
