import { notFound } from "next/navigation";
import { demos } from "../demo-data";
import DemoExperience from "./DemoExperience";
import SiteHeader from "../../SiteHeader";

export function generateStaticParams(){return demos.map(({slug})=>({slug}));}

export default async function DemoPage({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params; const demo=demos.find(item=>item.slug===slug); if(!demo) notFound();
  return <div className="demoDetail">
    <SiteHeader active="demos" />
    <main className="demoStage" style={{"--demo-accent":demo.accent} as React.CSSProperties}>
      <header><a href="/demos/">← 返回演示列表</a><div><span>{demo.category} / DEMO {demo.index}</span><h1>{demo.title}</h1><p>{demo.description}</p></div></header>
      <DemoExperience slug={slug}/>
      <footer><span>这是一个功能概念原型，数据仅用于演示。</span><a href="/demos/">查看其他演示 →</a></footer>
    </main>
  </div>;
}
