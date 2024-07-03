export interface ClientUserInfo {
  age: number;
  createdAt: Date;
  email: string;
  hateUserList: string[];
  id: number;
  job: string[];
  likeUserList: string[];
  name: string;
  techStack: string[];
}

export interface ServerUserInfo {
  age: number;
  createdAt: Date;
  email: string;
  hateUserList: string;
  id: number;
  job: string;
  likeUserList: string;
  name: string;
  techStack: string;
}
