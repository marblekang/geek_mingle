import { INITIAL_USERINFO } from "@/util/initialState";
import { create } from "zustand";

interface UserInfo {
  email: string;
  name: string;
  age: number;
  techStack?: string[];
  job?: string[];
  intro?: string;
}

interface UserInfoStoreProps {
  userInfo: UserInfo;
  onChangeUserInfo: (update: (prev: UserInfo) => UserInfo) => void;
}

export const useUserInfoStore = create<UserInfoStoreProps>((set) => ({
  userInfo: INITIAL_USERINFO,
  onChangeUserInfo: (update) => {
    set((state) => ({ userInfo: update(state.userInfo) }));
  },
}));
