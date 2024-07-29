import { ClientUserInfo, ServerUserInfo } from "@/ilb/types/users";

const parseJSON = (data: string | null) => {
  try {
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

const transformSingleUser = (user: ServerUserInfo) => ({
  age: user.age,
  email: user.email,
  name: user.name,
  job: parseJSON(user.job),
  techStack: parseJSON(user.techStack),
});

export const transformUser = (userData: ServerUserInfo | ServerUserInfo[]) => {
  if (Array.isArray(userData)) {
    return userData.map(transformSingleUser);
  } else {
    return transformSingleUser(userData);
  }
};
