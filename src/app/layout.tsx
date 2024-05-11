import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { NextAuthProvider } from "@/component/auth-provider/NextAuthProvider";
import styles from "./page.module.css";
import Link from "next/link";
import Nav from "@/component/nav/Nav";
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
          <Nav />
          {children}
        </NextAuthProvider>
      </body>
    </html>
  );
}
