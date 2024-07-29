import { UpdateUserParams, UserInfo } from "@/components/form/useSelectTag";
import { generateSelectionArray } from "@/ilb/config/selectTag";
import axios, { AxiosResponse } from "axios";

/* async function의 반환 값은 Promise
  resolve 한것과 마찬가지임.
*/
export const updateUser = async ({
  email,
  job,
  techStack,
}: UpdateUserParams): Promise<UserInfo> => {
  try {
    const selectedKeywords = [...job, ...techStack];
    const preferences = generateSelectionArray(selectedKeywords);
    const response: AxiosResponse<UserInfo> = await axios.put("/api/users", {
      email,
      job,
      techStack,
      preferences,
    });
    if (response.status !== 200) {
      throw new Error("Error!");
    }
    return response.data;
  } catch (error) {
    throw new Error(`Error updating user:, ${error}`);
  }
};

export const getUserList = async ({
  limit,
  page,
  loggedInEmail,
}: {
  limit: number;
  page: number;
  loggedInEmail: string;
}) => {
  console.log(loggedInEmail, "loggedInEmail");
  try {
    const response = await axios.get(`/api/users`, {
      params: { page, limit },
      headers: { "x-logged-in-email": loggedInEmail },
    });
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
};

export const getUser = async ({ email }: { email: string }) => {
  try {
    const response = await axios.get(`/api/users?email=${email}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
};

export const markUser = async ({
  senderEmail,
  receiverEmail,
  type,
}: {
  senderEmail: string;
  receiverEmail: string;
  type: "like" | "skip";
}) => {
  return axios.put("/api/users/mark", { senderEmail, receiverEmail, type });
};
