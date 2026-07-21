import { notFound } from "next/navigation";
import { demos } from "../demo-data";
import DemoExperience from "./DemoExperience";

export function generateStaticParams(){return demos.map(({slug})=>({slug}));}

export default async function DemoPage({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params; const demo=demos.find(item=>item.slug===slug); if(!demo) notFound();
  return <div className="demoDetail">
    <header className="siteHeader"><div className="headerInner"><a className="siteBrand" href="/"><span className="logoMark">M</span><span className="brandCopy"><strong>MADAO</strong><small>产品经理的文稿与原型</small></span></a><nav><a href="/">文章</a><a className="navActive" href="/demos/">产品演示</a></nav></div></header>
    <main className="demoStage" style={{"--demo-accent":demo.accent} as React.CSSProperties}>
      <header><a href="/demos/">← 返回演示列表</a><div><span>{demo.category} / DEMO {demo.index}</span><h1>{demo.title}</h1><p>{demo.description}</p></div></header>
      <DemoExperience slug={slug}/>
      <footer><span>这是一个功能概念原型，数据仅用于演示。</span><a href="/demos/">查看其他演示 →</a></footer>
    </main>
  </div>;
}
