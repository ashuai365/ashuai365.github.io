"use client";

import SiteHeader from "../SiteHeader";
import Pagination, { usePagination } from "../Pagination";
import { categoryDefinitions, indexedContents } from "../content-index-data";

const categories=categoryDefinitions.map(category=>({...category,count:indexedContents.filter(item=>item.category===category.name).length,tags:[...new Set(indexedContents.filter(item=>item.category===category.name).flatMap(item=>item.tags))].slice(0,3)}));

export default function CategoriesPage(){const {page,setPage,totalPages,visibleItems}=usePagination(categories,10);return <div><SiteHeader active="categories"/><main className="hubPage"><header className="hubHero"><span>TOPICS / 内容地图</span><h1>分类</h1><p>沿着几个长期关注的方向，浏览 MADAO 对产品、行业与 AI 的持续思考。</p></header><section className="categoryGrid">{visibleItems.map((item,index)=><a href={`/categories/${item.slug}/`} className="categoryTile" key={item.slug}><span>{String((page-1)*10+index+1).padStart(2,"0")}</span><small>{item.count} 篇内容</small><h2>{item.name}</h2><p>{item.description}</p><div>{item.tags.map(tag=><i key={tag}># {tag}</i>)}</div><b>查看内容列表 →</b></a>)}</section><Pagination page={page} totalPages={totalPages} onChange={setPage}/><nav className="channelNext" aria-label="继续浏览"><a href="/">← 返回文章首页</a><a href="/tags/">按标签继续浏览 →</a></nav></main><footer className="siteFooter"><p>© 2026 MADAO · 一个产品经理的网站</p></footer></div>}
