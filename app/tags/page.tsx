import SiteHeader from "../SiteHeader";

const tags = [["AI 产品",8],["大宗交易",7],["产品规划",6],["供应链",5],["用户体验",5],["商业化",4],["行业智能体",4],["MVP",3],["指标体系",3],["会员体系",3],["原型设计",2],["产业互联网",2]];

export default function TagsPage(){return <div><SiteHeader active="tags"/><main className="hubPage"><header className="hubHero"><span>INDEX / 关键词索引</span><h1>标签</h1><p>从一个关键词出发，快速找到相关的文章、产品判断和交互实验。</p></header><section className="tagIndex">{tags.map(([tag,count],index)=><a href="/" key={tag}><span>{String(index+1).padStart(2,"0")}</span><h2>{tag}</h2><p>{count} 篇内容</p><b>↗</b></a>)}</section><section className="tagFeatured"><span>当前关注</span><h2>行业智能体，不只是一次 AI 问答。</h2><p>我正在持续研究如何让行业数据、决策建议与业务行动形成闭环。</p><a href="/demos/commodity-ai-app/">体验大宗智能体 APP →</a></section></main><footer className="siteFooter"><p>© 2026 MADAO · 一个产品经理的网站</p></footer></div>}
