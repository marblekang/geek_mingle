export interface ClientUserInfo {
  age: number;

  email: string;

  job: string[];

  name: string;
  techStack: string[];
  preferences: string[];
}

export interface ServerUserInfo {
  age: number;

  email: string;

  job: string;

  name: string;
  techStack: string;
  preferences: string;
}
