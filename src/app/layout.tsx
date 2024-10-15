import type { Metadata } from "next";
import "./globals.css";
// import ClientProvider from "@/providers/ClientProvider";

export const metadata: Metadata = {
  title: "Blog Admin Panel",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {/* <ClientProvider> */}
        {children}
        {/* </ClientProvider> */}
      </body>
    </html>
  );
}
