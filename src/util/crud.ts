// export const createUser = async ({
//   username,
//   email,
// }: {
//   username: string;
//   email: string;
// }) => {
//   const userData = {
//     username,
//     email,
//   };

import axios from "axios";

//   try {
//     console.log("요청전송 (버튼클릭?)");
//     const response = await fetch("/api/users/create", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(userData),
//     });

//     if (!response.ok) {
//       throw new Error("Network response was not ok");
//     }

//     const newUser = await response.json();
//     console.log("New user created:", newUser);
//   } catch (error) {
//     console.error("Error:", error);
//   }
// };

export const handleSubmit = async ({
  email,
  username,
  techStack,
  jobs,
}: any) => {
  fetch("/api/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      username,
      techStack,
      jobs,
    }),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Network response was not ok.");
      }
    })
    .then((data) => console.log(data))
    .catch((error) => console.error("Error:", error));
};
