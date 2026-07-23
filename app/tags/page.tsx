"use client";

import SiteHeader from "../SiteHeader";
import Pagination, { usePagination } from "../Pagination";
import { indexedContents, tagDefinitions } from "../content-index-data";

const tags=tagDefinitions.map(tag=>({...tag,count:indexedContents.filter(item=>item.tags.includes(tag.name)).length}));

export default function TagsPage(){const {page,setPage,totalPages,visibleItems}=usePagination(tags,10);return <div><SiteHeader active="tags"/><main className="hubPage"><header className="hubHero"><span>INDEX / 关键词索引</span><h1>标签</h1><p>从一个关键词出发，快速找到相关的文章、产品判断和交互实验。</p></header><section className="tagIndex">{visibleItems.map((tag,index)=><a href={`/tags/${tag.slug}/`} key={tag.slug}><span>{String((page-1)*10+index+1).padStart(2,"0")}</span><h2>{tag.name}</h2><p>{tag.count} 篇内容</p><b>↗</b></a>)}</section><Pagination page={page} totalPages={totalPages} onChange={setPage}/><section className="tagFeatured"><span>当前关注</span><h2>行业智能体，不只是一次 AI 问答。</h2><p>我正在持续研究如何让行业数据、决策建议与业务行动形成闭环。</p><a href="/demos/commodity-ai-app/">体验大宗智能体 APP →</a></section><nav className="channelNext" aria-label="继续浏览"><a href="/categories/">← 浏览内容分类</a><a href="/about/">了解 MADAO →</a></nav></main><footer className="siteFooter"><p>© 2026 MADAO · 产品经理club</p></footer></div>}
