import { create } from "zustand";

interface UserInfo {
  email: string;
  name: string;
  age: number;
  techStack: string[];
  job: string[];
  intro: string;
}

interface UserInfoStoreProps {
  userInfo: UserInfo;
  onChangeUserInfo: (update: (prev: UserInfo) => UserInfo) => void;
}

export const useUserInfoStore = create<UserInfoStoreProps>((set) => ({
  userInfo: { email: "", name: "", age: 0, techStack: [], job: [], intro: "" },
  onChangeUserInfo: (update) => {
    set((state) => ({ userInfo: update(state.userInfo) }));
  },
}));
