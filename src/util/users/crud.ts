import axios from "axios";

export const createUser = async ({
  email,
  username,
  techStack,
  jobs,
}: {
  username: string;
  email: string;
  techStack: string;
  jobs: string;
}) => {
  try {
    const response = await axios.post(
      "/api/users",
      {
        email,
        username,
        techStack,
        jobs,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response.data);
  } catch (error) {
    console.error("Error:", error);
  }
};
/* async function의 반환 값은 Promise
  resolve 한것과 마찬가지임.
*/
export const getUser = async ({
  limit,
  page,
}: {
  limit: number;
  page: number;
}) => {
  try {
    const response = await axios.get(`/api/users?limit=${limit}&page=${page}`);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
};
