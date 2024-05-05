import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/nav-bar";
import SearchBar from "@/components/search-bar";
import { Toaster } from "@/components/ui/toaster";
import AuthContextProvider from "./context/auth-context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BuonAppetito",
  description:
    "Make online reservations, read restaurant reviews from diners, and earn points towards free meals. OpenTable is a real-time online reservation network for fine dining restaurants.",
  openGraph: {
    type: "website",
    url: "https://buonappetito.vercel.app/",
    title: "BuonAppetito",
    description:
      "Make online reservations, read restaurant reviews from diners, and earn points towards free meals. OpenTable is a real-time online reservation network for fine dining restaurants.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AuthContextProvider>
        <body className={inter.className}>
          <Toaster />
          <Navbar />
          <SearchBar />
          <main className="container -mt-10 mb-20 px-2">{children}</main>
        </body>
      </AuthContextProvider>
    </html>
  );
}
