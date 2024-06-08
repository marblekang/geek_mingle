import HomeFrame from "@/component/home/Home";
import AuthenticationCheck from "@/component/AuthenticationCheck";

export default function Home() {
  return (
    <>
      <AuthenticationCheck />
      <HomeFrame />
    </>
  );
}
