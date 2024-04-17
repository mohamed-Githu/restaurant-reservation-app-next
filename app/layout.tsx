import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/nav-bar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BuonAppetito",
  description:
    "Make online reservations, read restaurant reviews from diners, and earn points towards free meals. OpenTable is a real-time online reservation network for fine dining restaurants.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <main className="container">{children}</main>
      </body>
    </html>
  );
}
