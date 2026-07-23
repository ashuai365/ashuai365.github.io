import { notFound } from "next/navigation";
import SiteHeader from "../../SiteHeader";
import ContentList from "../../ContentList";
import { indexedContents, tagDefinitions } from "../../content-index-data";

export function generateStaticParams(){return tagDefinitions.map(item=>({slug:item.slug}));}

export default async function TagContentPage({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params; const tag=tagDefinitions.find(item=>item.slug===slug); if(!tag) notFound();
  const items=indexedContents.filter(item=>item.tags.includes(tag.name));
  return <div><SiteHeader active="tags"/><main className="hubPage contentIndexPage"><header className="contentIndexHero"><a href="/tags/">← 返回全部标签</a><span>TAG / 关键词</span><h1># {tag.name}</h1><p>与“{tag.name}”相关的文章和产品演示，共 {items.length} 篇，按更新时间倒序排列。</p></header><ContentList items={items}/><nav className="channelNext"><a href="/tags/">查看其他标签</a><a href="/categories/">按分类浏览 →</a></nav></main><footer className="siteFooter"><p>© 2026 MADAO · 产品经理club</p></footer></div>;
}
