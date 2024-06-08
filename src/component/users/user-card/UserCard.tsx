"use client";
import Image, { StaticImageData } from "next/image";
import React, {
  MutableRefObject,
  ReactNode,
  Ref,
  createContext,
  useContext,
} from "react";
import styles from "./user-card.module.css";
import FlexContainer from "@/component/common/flex-container/FlexContainer";
interface IUserInfo {
  avatar: StaticImageData /* 임시로 작성, s3에서 주소 가져오도록 수정해야함.. */;
  name: string;
  age: number;
  techStack: string[];
  jobs: string[];
  intro: string;
}

interface UserCardChildren {
  children: ReactNode;
}

interface UserCardProps extends UserCardChildren {
  userInfo: IUserInfo;
}

const UserCardContext = createContext<IUserInfo | null>(null);

const UserCard = ({ userInfo, children }: UserCardProps) => {
  return (
    <UserCardContext.Provider value={userInfo}>
      <div className={styles["user-card-container"]}>{children}</div>
    </UserCardContext.Provider>
  );
};

const useUserCardContext = () => {
  const context = useContext(UserCardContext);
  if (!context) {
    throw new Error("Error!");
  }
  return context;
};

const UserName = () => {
  const userInfo = useUserCardContext();
  return <span>{userInfo.name}</span>;
};

const UserAvatar = () => {
  const userInfo = useUserCardContext();
  return <Image src={userInfo.avatar} alt="avatar" />;
};

type UserInfoType = "age" | "techStack" | "jobs";
interface UserInfoProps {
  type: UserInfoType;
}

const UserInfo = ({ type }: UserInfoProps) => {
  const userInfo = useUserCardContext();
  const value = userInfo[type];
  if (Array.isArray(value)) {
    return (
      <FlexContainer flexDirection="row">
        <span>{type}</span> : <span>{value.map((val) => val).join(", ")}</span>
      </FlexContainer>
    );
  }
  return (
    <div>
      <span>{type}</span> : <span>{value}</span>
    </div>
  );
};

const UserInfoArea = ({ children }: UserCardChildren) => {
  return <div className={styles["user-info-area"]}>{children}</div>;
};

const UserAvatarArea = ({ children }: UserCardChildren) => {
  return <div className={styles["user-avatar-area"]}>{children}</div>;
};

const UserEssentialInfoArea = ({ children }: UserCardChildren) => {
  return <div className={styles["user-essential-info-area"]}>{children}</div>;
};

/* List Wrapper 만들어서 아이템 배치 고려 */
UserCard.Name = UserName;
UserCard.Avatar = UserAvatar;
UserCard.Info = UserInfo;
UserCard.AvatarArea = UserAvatarArea;
UserCard.InfoArea = UserInfoArea;
UserCard.EssentialInfoArea = UserEssentialInfoArea;

export default UserCard;
