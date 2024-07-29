import HomeFrame from "@/components/home/Home";
import AuthenticationCheck from "@/components/AuthenticationCheck";

export default function Home() {
  return (
    <>
      <AuthenticationCheck />
      <HomeFrame />
    </>
  );
}
