import { demos } from "./demo-data";
import SiteHeader from "../SiteHeader";

export default function DemoListPage() {
  return <div className="demoChannel">
    <SiteHeader active="demos" />
    <main className="demoListWrap">
      <header className="demoListHero">
        <span>PRODUCT PLAYGROUND / 交互实验室</span>
        <h1>产品演示</h1>
        <p>一些可以亲手操作的产品片段。每个演示都聚焦一个具体问题，用最小交互验证产品逻辑。</p>
      </header>
      <section className="demoGrid" aria-label="演示列表">
        {demos.map((demo) => <a className="demoCard" href={`/demos/${demo.slug}/`} key={demo.slug} style={{"--demo-accent":demo.accent} as React.CSSProperties}>
          <div className="demoCardTop"><span>{demo.index}</span><b>{demo.category}</b></div>
          <div className={`demoThumb demoThumb${demo.index}`} aria-hidden="true">
            {demo.index==="00"&&<div className="thumbPhone"><header><i/><b>首页　商机　行情</b></header><p><span>AI</span> 螺纹钢行情如何？</p><div className="thumbChart"><i/><i/><i/><i/><i/></div></div>}
            {demo.index==="01"&&<div className="thumbAlert"><b>价格预警</b><strong>¥ 3,289</strong><div><i/><i/><i/><i/><i/></div><span>跌破目标价 · 建议关注</span></div>}
            {demo.index==="02"&&<div className="thumbMatrix"><span>高价值</span><b>立即做</b><i/><i/><i/><small>低成本　　　　　　　　　高成本</small></div>}
            {demo.index==="03"&&<div className="thumbConfidence"><b>AI 可信度</b><strong>86<small>%</small></strong><div><i/><i/><i/></div><p>来源 92　时效 84　验证 81</p></div>}
            {demo.index==="04"&&<div className="thumbTrading"><header><b>万贸达</b><span>行情　资讯　报告　商机</span></header><div className="thumbTradingHero"><strong>大宗商品<br/>交易服务平台</strong><i>行情 · 采购 · 供应链</i></div><section><i/><i/><i/></section></div>}
          </div>
          <h2>{demo.title}</h2><p>{demo.description}</p>
          <footer><span>打开演示</span><b>↗</b></footer>
        </a>)}
      </section>
    </main>
    <footer className="siteFooter"><p>© 2026 MADAO · 产品演示频道</p><a href="#top">↑</a></footer>
  </div>;
}
