import { notFound } from "next/navigation";
import { demos } from "../demo-data";
import DemoExperience from "./DemoExperience";
import DemoArticle from "./DemoArticle";
import SiteHeader from "../../SiteHeader";
import { demoArticles } from "../demo-articles";

export function generateStaticParams(){return demos.map(({slug})=>({slug}));}

export default async function DemoPage({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params; const demo=demos.find(item=>item.slug===slug); if(!demo) notFound();
  const article=demoArticles[slug]; if(!article) notFound();
  return <div className="demoDetail">
    <SiteHeader active="demos" />
    <main id="top" className={`demoStage ${slug==="bulk-trading-platform"||slug==="cloud-warehouse-map"||slug==="commodity-ai-app"?"wideDemoStage":""}`} style={{"--demo-accent":demo.accent} as React.CSSProperties}>
      <header><a href="/demos/">← 返回演示列表</a><div><span>{demo.category} / DEMO {demo.index}</span><h1>{demo.title}</h1><p>{demo.description}</p></div></header>
      <nav className="demoDetailNav" aria-label="本页内容">
        <a href="#demo-experience">体验产品演示</a>
        <a href="#demo-introduction">阅读产品介绍</a>
      </nav>
      <section id="demo-experience" className="demoExperienceRegion" aria-label={`${demo.title}交互演示`}>
        <DemoExperience slug={slug}/>
      </section>
      <DemoArticle article={article} demoTitle={demo.title}/>
      <footer><span>这是一个功能概念原型，数据仅用于演示。</span><a href="/demos/">查看其他演示 →</a></footer>
    </main>
  </div>;
}
