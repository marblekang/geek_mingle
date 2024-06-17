import axios from "axios";

// export const createUser = async ({
//   email,
//   username,
//   techStack,
//   jobs,
// }: {
//   username: string;
//   email: string;
//   techStack: string;
//   jobs: string;
// }) => {
//   try {
//     const response = await axios.post(
//       "/api/users",
//       {
//         email,
//         username,
//         techStack,
//         jobs,
//       },
//       {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }
//     );
//     console.log(response.data);
//   } catch (error) {
//     console.error("Error:", error);
//   }
// };
/* async function의 반환 값은 Promise
  resolve 한것과 마찬가지임.
*/
export const updateUser = async ({
  email,
  job,
  techStack,
}: {
  email: string;
  job: string;
  techStack: string[];
}): Promise<any> => {
  try {
    const response = await axios.put("/api/users", {
      email,
      job,
      techStack,
    });

    return response.data;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
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
