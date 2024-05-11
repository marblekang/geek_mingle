import RootLayout from "./layout";
import Link from "next/link";
import styles from "./page.module.css";
import PageWithAuth from "@/component/submit/SessionState";
export default function Home() {
  return (
    <RootLayout>
      <span>home</span>
    </RootLayout>
  );
}
