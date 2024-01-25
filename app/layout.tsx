import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "US airports distance calculator",
  description: "Test task for mtklabs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <link type={'image/png'} rel="icon" href="./favicon.png" />
      <body className={inter.className}>{children}</body>
    </html>
  );
}
