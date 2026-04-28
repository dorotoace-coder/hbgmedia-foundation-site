import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Heartbeat of God Foundation | A Reason to Live",
  description:
    "Heartbeat of God Ministry media and transformation system: Win Souls, Build Believers, Send Lights through Spirit-filled ministry, discipleship, prayer, evangelism, and digital media."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
