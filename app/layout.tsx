import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import ClientSWRConfig from "./ClientSWRConfig";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "KickPick",
  description: "KickPick - 축구 선수 투표 플랫폼",
  icons: {
    icon: [
      {
        url: "/kickpick_favicon.ico",
        sizes: "any",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable}  w-full flex flex-col items-center min-h-screen bg-gradient-to-b from-green-100 to-blue-100 bg-white px-4`}
      >
        <ClientSWRConfig>
          <div className="max-w-md mx-auto w-full">
            {children}
            <Navbar />
          </div>
        </ClientSWRConfig>
      </body>
    </html>
  );
}
