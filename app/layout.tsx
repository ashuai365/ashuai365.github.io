import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://madao5.top"),
  title: "产品经理club — MADAO",
  description: "记录产品、业务与 AI 的思考，聚焦大宗交易、供应链金融、产业互联网和产品方法论。",
  icons: {
    icon: "/product-manager-club-logo.png",
    shortcut: "/product-manager-club-logo.png",
  },
  openGraph: {
    title: "大宗智能体 APP — MADAO",
    description: "会员订阅日常 AI 决策，商机按次获取真实、可核验的具体报价。",
    url: "https://madao5.top/demos/commodity-ai-app/",
    siteName: "MADAO · 产品经理club",
    locale: "zh_CN",
    type: "website",
    images: [{ url: "https://madao5.top/og.png", width: 1731, height: 909, alt: "大宗智能体 APP：会员订阅加具体报价" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "大宗智能体 APP — MADAO",
    description: "会员订阅日常 AI 决策，商机按次获取真实、可核验的具体报价。",
    images: ["https://madao5.top/og.png"],
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
