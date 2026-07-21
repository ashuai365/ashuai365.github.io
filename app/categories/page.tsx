import SiteHeader from "../SiteHeader";

const categories = [
  ["AI 产品", "从行业智能体、可信回答到商业化路径，记录 AI 能力如何成为真正的产品价值。", "8 篇", ["大宗智能体", "AI 可信度", "商业化"], "/articles/commodity-ai-commercial-loop/"],
  ["产品设计", "围绕用户旅程、付费体验和复杂业务流程，拆解产品方案背后的取舍。", "6 篇", ["用户体验", "会员体系", "原型"], "/articles/paywall-after-value/"],
  ["产业与供应链", "关注大宗交易、供应链金融与产业互联网中的真实问题和数字化机会。", "5 篇", ["大宗交易", "供应链", "产业互联网"], "/articles/commodity-ai-commercial-loop/"],
  ["产品方法论", "关于验证、指标、需求优先级与团队协作的可复用方法。", "4 篇", ["MVP", "指标体系", "产品规划"], "/articles/90-day-validation-framework/"],
];

export default function CategoriesPage(){return <div><SiteHeader active="categories"/><main className="hubPage"><header className="hubHero"><span>TOPICS / 内容地图</span><h1>分类</h1><p>沿着几个长期关注的方向，浏览 MADAO 对产品、行业与 AI 的持续思考。</p></header><section className="categoryGrid">{categories.map((item,index)=><a href={item[4] as string} className="categoryTile" key={item[0] as string}><span>0{index+1}</span><small>{item[2]}</small><h2>{item[0]}</h2><p>{item[1]}</p><div>{(item[3] as string[]).map(tag=><i key={tag}># {tag}</i>)}</div><b>阅读代表文章 →</b></a>)}</section><nav className="channelNext" aria-label="继续浏览"><a href="/">← 返回文章首页</a><a href="/tags/">按标签继续浏览 →</a></nav></main><footer className="siteFooter"><p>© 2026 MADAO · 一个产品经理的网站</p></footer></div>}
