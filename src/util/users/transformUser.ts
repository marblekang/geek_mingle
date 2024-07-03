import { ServerUserInfo } from "@/ilb/types/users";

const parseJSON = (data: string | null) => {
  try {
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

const transformSingleUser = (user: ServerUserInfo) => ({
  ...user,
  job: parseJSON(user.job),
  techStack: parseJSON(user.techStack),
  likeUserList: parseJSON(user.likeUserList),
  hateUserList: parseJSON(user.hateUserList),
});

export const transformUser = (userData: ServerUserInfo | ServerUserInfo[]) => {
  if (Array.isArray(userData)) {
    return userData.map(transformSingleUser);
  } else {
    return transformSingleUser(userData);
  }
};
