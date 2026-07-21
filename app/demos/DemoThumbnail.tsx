export default function DemoThumbnail({index}:{index:string}){return <div className={`demoThumb demoThumb${index}`} aria-hidden="true">
  {index==="00"&&<div className="thumbPhone"><header><i/><b>首页　商机　行情</b></header><p><span>AI</span> 螺纹钢行情如何？</p><div className="thumbChart"><i/><i/><i/><i/><i/></div></div>}
  {index==="01"&&<div className="thumbAlert"><b>价格预警</b><strong>¥ 3,289</strong><div><i/><i/><i/><i/><i/></div><span>跌破目标价 · 建议关注</span></div>}
  {index==="02"&&<div className="thumbMatrix"><span>高价值</span><b>立即做</b><i/><i/><i/><small>低成本　　　　　　　　　高成本</small></div>}
  {index==="03"&&<div className="thumbConfidence"><b>AI 可信度</b><strong>86<small>%</small></strong><div><i/><i/><i/></div><p>来源 92　时效 84　验证 81</p></div>}
  {index==="04"&&<div className="thumbTrading"><header><b>万贸达</b><span>行情　资讯　报告　商机</span></header><div className="thumbTradingHero"><strong>大宗商品<br/>交易服务平台</strong><i>行情 · 采购 · 供应链</i></div><section><i/><i/><i/></section></div>}
</div>}
