import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "产品经理club — MADAO",
  description: "记录产品、业务与 AI 的思考，聚焦大宗交易、供应链金融、产业互联网和产品方法论。",
  icons: {
    icon: "/madao-avatar.png",
    shortcut: "/madao-avatar.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
