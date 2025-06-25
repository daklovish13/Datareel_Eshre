import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Datareel",
  icons: { icon: { url: "/favicon.ico", type: "image/x-icon" } },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0. maximum-scale=1.0, user-scalable=no"
      ></meta>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased relative container !mx-auto`}
      >
        {children}
      </body>
    </html>
  );
}
