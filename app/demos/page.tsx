"use client";

import { demos } from "./demo-data";
import SiteHeader from "../SiteHeader";
import DemoThumbnail from "./DemoThumbnail";
import Pagination, { usePagination } from "../Pagination";

export default function DemoListPage() {
  const sortedDemos=[...demos].sort((a,b)=>b.updatedAt.localeCompare(a.updatedAt));
  const {page,setPage,totalPages,visibleItems}=usePagination(sortedDemos,10);
  return <div className="demoChannel">
    <SiteHeader active="demos" />
    <main className="demoListWrap">
      <header className="demoListHero">
        <span>PRODUCT PLAYGROUND / 交互实验室</span>
        <h1>产品演示</h1>
        <p>一些可以亲手操作的产品片段。每个演示都聚焦一个具体问题，用最小交互验证产品逻辑。</p>
      </header>
      <section className="demoGrid" aria-label="演示列表">
        {visibleItems.map((demo) => <a className="demoCard" href={`/demos/${demo.slug}/`} key={demo.slug} style={{"--demo-accent":demo.accent} as React.CSSProperties}>
          <div className="demoCardTop"><span>{demo.index}</span><b>{demo.category}</b></div>
          <DemoThumbnail index={demo.index}/>
          <h2>{demo.title}</h2><p>{demo.description}</p>
          <footer><span>打开演示</span><b>↗</b></footer>
        </a>)}
      </section>
      <Pagination page={page} totalPages={totalPages} onChange={setPage}/>
    </main>
    <footer className="siteFooter"><p>© 2026 MADAO · 产品演示频道</p><a href="#top">↑</a></footer>
  </div>;
}
