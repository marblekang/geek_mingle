import { ReactNode } from "react";
import NavBottom from "@/component/nav-bottom/NavBottom";
interface AuthorizedLayoutProps {
  children: ReactNode;
}
const AuthorizedLayout = ({ children }: AuthorizedLayoutProps) => {
  return (
    <div>
      <div>{children}</div>
      <NavBottom />
    </div>
  );
};

export default AuthorizedLayout;
