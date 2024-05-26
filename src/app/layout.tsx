import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { NextAuthProvider } from "@/component/auth-provider/NextAuthProvider";
import styles from "./page.module.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider>
          {/* <Nav /> */}
          <div className={styles["common-wrapper"]}>
            <div className={styles["common-container"]}>{children}</div>
          </div>
        </NextAuthProvider>
      </body>
    </html>
  );
}
