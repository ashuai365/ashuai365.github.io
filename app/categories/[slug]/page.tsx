import { notFound } from "next/navigation";
import SiteHeader from "../../SiteHeader";
import ContentList from "../../ContentList";
import { categoryDefinitions, indexedContents } from "../../content-index-data";

export function generateStaticParams(){return categoryDefinitions.map(item=>({slug:item.slug}));}

export default async function CategoryContentPage({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params; const category=categoryDefinitions.find(item=>item.slug===slug); if(!category) notFound();
  const items=indexedContents.filter(item=>item.category===category.name);
  return <div><SiteHeader active="categories"/><main className="hubPage contentIndexPage"><header className="contentIndexHero"><a href="/categories/">← 返回全部分类</a><span>CATEGORY / 内容分类</span><h1>{category.name}</h1><p>{category.description}，共 {items.length} 篇内容，按更新时间倒序排列。</p></header><ContentList items={items}/><nav className="channelNext"><a href="/categories/">查看其他分类</a><a href="/tags/">按标签浏览 →</a></nav></main><footer className="siteFooter"><p>© 2026 MADAO · 产品经理club</p></footer></div>;
}
