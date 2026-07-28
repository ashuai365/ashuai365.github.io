"use client";

import { useState } from "react";

const demandRows = [
  ["螺纹钢 HRB400E", "500 吨", "上海", "今日 16:00 截止"],
  ["电解铜 1号", "120 吨", "江苏", "月度长协"],
  ["热轧板卷 Q235B", "300 吨", "宁波", "三日内交付"],
  ["主焦煤 低硫", "800 吨", "河北", "资质企业优先"],
];

const supplyRows = [
  ["PB 粉 61.5%", "2,000 吨", "日照港", "港口自提"],
  ["铝锭 A00", "50 吨", "佛山", "今日可发"],
  ["冷轧板卷 SPCC", "100 吨", "上海", "支持议价"],
  ["工业级甲醇", "600 吨", "山东", "含税出厂"],
];

const productGroups = [
  ["钢铁", "建筑钢材 · 板卷 · 型钢 · 管材"],
  ["矿产原料", "铁矿石 · 煤焦 · 废钢 · 合金"],
  ["有色金属", "铜 · 铝 · 铅 · 锌 · 镍"],
  ["能源化工", "原油 · 天然气 · 甲醇 · 橡塑"],
  ["农林产品", "玉米 · 大豆 · 棉花 · 白糖"],
];

const indexItems = [["钢材综合","3,684.26","-0.32%"],["铁矿石","781.00","-0.76%"],["沪铜","78,420","+0.46%"],["焦煤","1,452","+1.04%"],["布伦特原油","82.36","+0.21%"]];

const assistantAnswers = [
  { question: "最近钢材价格怎么走？", verdict: "短期震荡偏强", detail: "库存去化速度加快，成本支撑增强；关注华东成交持续性与终端补库节奏。", factors: ["社会库存周环比 -3.2%","主流钢厂挺价意愿增强","需求恢复仍存在区域分化"] },
  { question: "现在适合补库吗？", verdict: "建议分批补库", detail: "当前价格处于区间中位，建议覆盖基础用量，并为价格回调保留采购空间。", factors: ["现货成交较昨日改善","短期波动区间仍未突破","重点关注库存覆盖天数"] },
  { question: "有哪些采购风险？", verdict: "关注交付与价差", detail: "跨区域价差正在收窄，采购决策应同时核验货权、交期和物流成本。", factors: ["核验供应商履约记录","锁定合同交付窗口","比较含运价而非裸价"] },
];

const trendPanels = [
  { id:"copper", group:"有色", name:"电解铜价格走势", source:"长江现货 · 1号电解铜", price:"78,420", unit:"元/吨", change:"+0.46%", high:"79,180", low:"76,920", trend:"up", series:[72,68,61,55,47,39,31,24] },
  { id:"steel", group:"黑色", name:"螺纹钢价格走势", source:"上海现货 · HRB400E", price:"3,684", unit:"元/吨", change:"+1.62%", high:"3,720", low:"3,445", trend:"up", series:[79,72,66,58,61,49,38,29] },
  { id:"meal", group:"农粮", name:"豆粕价格走势", source:"张家港现货 · 43%蛋白", price:"3,285", unit:"元/吨", change:"+0.22%", high:"3,360", low:"3,210", trend:"steady", series:[62,58,61,55,50,47,42,39] },
  { id:"oil", group:"石化", name:"原油价格走势", source:"上海能源中心 · 主力合约", price:"582", unit:"元/桶", change:"-0.38%", high:"605", low:"548", trend:"down", series:[28,34,39,46,42,51,58,65] },
];

function OpportunityList({ type, rows }: { type: "采购" | "供应"; rows: string[][] }) {
  return (
    <article className={`btpNextOpportunity ${type === "采购" ? "isBuy" : "isSell"}`}>
      <header>
        <div><i>{type === "采购" ? "求" : "供"}</i><span><b>{type === "采购" ? "采购需求" : "供应资源"}</b><small>{type === "采购" ? "严选真实买方需求" : "认证企业现货资源"}</small></span></div>
        <button>查看全部</button>
      </header>
      <div className="btpNextOpportunityList">
        {rows.map((row, index) => (
          <button key={row[0]}>
            <span className="btpNextRowIndex">{String(index + 1).padStart(2, "0")}</span>
            <span className="btpNextRowMain"><b>{row[0]}</b><small>{row[2]} · {row[3]}</small></span>
            <strong>{row[1]}</strong>
            <em>询价</em>
          </button>
        ))}
      </div>
    </article>
  );
}

export default function BulkTradingPlatform() {
  const [activeNav, setActiveNav] = useState("首页");
  const [assistantTopic, setAssistantTopic] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState("钢材综合");
  const [marketFocus, setMarketFocus] = useState("copper");
  const [marketPeriod, setMarketPeriod] = useState("近3月");
  const assistant = assistantAnswers[assistantTopic];

  return (
    <div className="btpNext">
      <div className="btpNextUtility">
        <span>欢迎来到万贸达产业数字交易平台</span>
        <nav><button>企业入驻</button><button>客户服务</button><button>下载应用</button><button>登录</button><b>免费注册</b></nav>
      </div>

      <div className="btpNextBlue">
        <header className="btpNextHeader">
          <a className="btpNextLogo"><i>W</i><span><b>万贸达</b><small>大宗商品交易服务平台</small></span></a>
          <div className="btpNextSearch"><input aria-label="搜索" placeholder="搜索品种、规格、企业或资讯"/><button>搜索</button></div>
          <div className="btpNextHeaderActions"><button>发布采购</button><button>发布资源</button></div>
        </header>
        <nav className="btpNextNav">
          {["首页","采购大厅","供应大厅","行情中心","万联云仓","供应链金融","产业集群","研究资讯"].map(item => <button key={item} className={activeNav === item ? "active" : ""} onClick={() => setActiveNav(item)}>{item}</button>)}
          <button className="ai">✦ 智能助手</button>
        </nav>
      </div>

      <main className="btpNextBody">
        <section className="btpNextCategoryBar">
          <button className="btpNextAllCategory"><i>☷</i><span><b>全部商品分类</b><small>覆盖 30+ 产业品类</small></span></button>
          {productGroups.map(([name, detail]) => <button key={name}><b>{name}</b><small>{detail}</small></button>)}
        </section>

        <section className="btpNextLead">
          <article className="btpNextHero">
            <div className="btpNextHeroCopy">
              <span><i>✦</i> 产业智能交易中枢</span>
              <h1>让复杂的大宗交易<br/>变得清晰、高效、可信</h1>
              <p>从找货、询价到交付与融资，一站连接真实供需、即时行情和产业服务。</p>
              <div><button>发布采购需求</button><button>浏览现货资源 <b>→</b></button></div>
            </div>
            <div className="btpNextHeroOrbit" aria-hidden="true">
              <i className="orbitOne"></i><i className="orbitTwo"></i><i className="orbitThree"></i>
              <strong>交易</strong><span className="orbitItem a">行情</span><span className="orbitItem b">仓储</span><span className="orbitItem c">金融</span><span className="orbitItem d">物流</span>
            </div>
            <footer>
              <span><b>12,680</b><small>认证企业</small></span>
              <span><b>38,426</b><small>今日有效商机</small></span>
              <span><b>36 个</b><small>核心仓储节点</small></span>
              <span><b>98.6%</b><small>履约满意度</small></span>
            </footer>
          </article>

          <aside className="btpNextAssistant">
            <header><i>✦</i><span><b>产业智能助手</b><small>实时理解市场与供需</small></span><em>在线</em></header>
            <div className="btpNextAssistantQuestions">
              {assistantAnswers.map((item,index) => <button key={item.question} className={assistantTopic === index ? "active" : ""} onClick={() => setAssistantTopic(index)}>{item.question}</button>)}
            </div>
            <div className="btpNextAssistantAnswer">
              <span>综合判断</span><strong>{assistant.verdict}</strong>
              <p>{assistant.detail}</p>
              <ul>{assistant.factors.map(item => <li key={item}>{item}</li>)}</ul>
            </div>
            <button>开始智能对话 <b>→</b></button>
          </aside>
        </section>

        <section className="btpNextIndexStrip">
          <header><div><b>核心指数</b><small>重点品类实时价格概览</small></div><button>查看全部行情 →</button></header>
          <div className="btpNextIndexGrid">
            {indexItems.map(item =>
              <button className={`btpNextIndexItem ${selectedIndex === item[0] ? "active" : ""}`} onClick={() => setSelectedIndex(item[0])} key={item[0]}>
                <span><small>{item[0]}</small><i className={item[2].startsWith("+") ? "up" : "down"}>{item[2]}</i></span>
                <strong>{item[1]}</strong>
                <em aria-hidden="true"><b></b></em>
              </button>
            )}
          </div>
        </section>

        <section className="btpNextSectionHead">
          <div><span>真实供需 · 精准触达</span><h2>大宗商机</h2></div>
          <p>信息经过企业认证与时效校验，减少无效询盘，让买卖双方更快进入实质沟通。</p>
        </section>
        <section className="btpNextOpportunityGrid">
          <OpportunityList type="采购" rows={demandRows}/>
          <OpportunityList type="供应" rows={supplyRows}/>
          <aside className="btpNextServices">
            <article className="finance"><span>供应链金融</span><h3>货在仓，资金活起来</h3><p>基于真实交易、仓单和履约记录，为企业匹配更合适的融资方案。</p><ul><li>在线申请与进度跟踪</li><li>合作机构多方案比选</li></ul><button>测算融资方案 →</button></article>
            <article className="warehouse"><span>万联云仓</span><h3>看得见的仓，更放心的货</h3><p>全国仓源检索、地图找仓、在线咨询与货权监管。</p><button>进入云仓 →</button></article>
          </aside>
        </section>

        <section className="btpQuadMarket">
          <header className="btpQuadHeader">
            <div><span>四大品类 · 一屏掌握</span><h2>品类价格趋势</h2><p>围绕有色、黑色、农粮与石化四类核心商品，快速比较市场方向与波动区间。</p></div>
            <nav aria-label="行情周期">{["近7天","近1月","近3月","近半年"].map(item => <button className={marketPeriod === item ? "active" : ""} onClick={() => setMarketPeriod(item)} key={item}>{item}</button>)}</nav>
          </header>
          <div className="btpQuadTabs">
            {trendPanels.map(item => <button className={marketFocus === item.id ? "active" : ""} onClick={() => setMarketFocus(item.id)} key={item.id}><i></i><span><b>{item.group}</b><small>{item.name.replace("价格走势","")}</small></span></button>)}
          </div>
          <div className="btpQuadGrid">
            {trendPanels.map(item => {
              const polygon = item.series.map((point,index) => `${index * (100 / (item.series.length - 1))}% ${point}%`).join(",");
              return <article className={`${marketFocus === item.id ? "active" : ""} tone-${item.trend}`} key={item.id} onClick={() => setMarketFocus(item.id)}>
                <header>
                  <div><span>{item.group}</span><h3>{item.name}</h3><small>{item.source}</small></div>
                  <button aria-label={`关注${item.name}`}>＋</button>
                </header>
                <div className="btpQuadPrice"><strong>{item.price}</strong><small>{item.unit}</small><em>{item.change}</em></div>
                <div className="btpQuadPlot" aria-label={`${item.name}${marketPeriod}趋势图`}>
                  <i className="btpQuadArea" style={{clipPath:`polygon(${polygon},100% 100%,0 100%)`}}></i>
                  {item.series.map((point,index) => <b key={index} style={{left:`${index * (100 / (item.series.length - 1))}%`,top:`${point}%`}}></b>)}
                  <div><span>{marketPeriod === "近7天" ? "周一" : "期初"}</span><span>中段</span><span>今日</span></div>
                </div>
                <footer><span><small>区间最高</small><b>{item.high}</b></span><span><small>区间最低</small><b>{item.low}</b></span><button>查看行情 →</button></footer>
              </article>;
            })}
          </div>
        </section>

        <section className="btpNextFinanceBanner">
          <div><span>供应链金融解决方案</span><h2>从一笔真实交易，获得更灵活的资金支持</h2><p>订单、仓单与应收账款融资 · 合作机构在线比选 · 全流程进度可视</p></div>
          <div className="btpNextFinanceSteps"><span><i>01</i><b>提交需求</b></span><em>→</em><span><i>02</i><b>智能匹配</b></span><em>→</em><span><i>03</i><b>获取方案</b></span></div>
          <button>立即申请 →</button>
        </section>

        <section className="btpNextSectionHead compact">
          <div><span>链接区域产业能力</span><h2>核心产业集群</h2></div><button>查看全部集群 →</button>
        </section>
        <section className="btpNextClusters">
          <article className="featured"><span>重点推荐</span><h2>万贸达核心产业集群</h2><p>围绕钢铁、有色、能源化工等优势产业，聚合区域企业、商品、仓储和服务资源。</p><div><b>4 个<small>优势产业</small></b><b>686 家<small>入驻企业</small></b><b>8,500+<small>在线商品</small></b></div><button>立即入驻 →</button></article>
          {[["唐山钢铁集群","河北 · 钢铁","320+","规模制造与深加工"],["云浮石材集群","广东 · 石材","156","原料、加工与贸易"],["临沂物流集群","山东 · 商贸物流","210","仓储与多式联运"]].map(item => <article key={item[0]}><i>{item[0].slice(0,1)}</i><span>{item[1]}</span><h3>{item[0]}</h3><p>{item[3]}</p><footer><b>{item[2]}</b><small>入驻企业</small><button>进入 →</button></footer></article>)}
        </section>

        <section className="btpNextInfoGrid">
          <article className="btpNextReports">
            <header><h2>研究报告</h2><button>更多报告 →</button></header>
            <div className="featured"><span>本周焦点</span><h3>钢材库存拐点与下半年需求修复路径</h3><p>从供应、库存、利润与项目资金四个维度研判价格方向。</p><small>万贸达研究院 · 今日 09:30</small></div>
            {["铁矿石估值回归与钢厂补库节奏","有色金属月度供需平衡观察","煤焦产业链利润传导跟踪"].map((item,index) => <button key={item}><i>0{index+1}</i><span>{item}<small>{["深度报告","月度策略","产业观察"][index]}</small></span><b>→</b></button>)}
          </article>
          <article className="btpNextNews">
            <header><h2>市场快讯</h2><button>更多快讯 →</button></header>
            {[["10:36","华东建材成交回暖，市场价格稳中偏强","重要"],["10:12","铁矿石港口库存连续第二周下降",""],["09:48","多地重点工程三季度采购计划启动",""],["09:15","焦煤主力合约早盘涨幅扩大","行情"],["08:42","公开市场净投放呵护流动性",""],["08:18","有色板块开盘分化，沪铜震荡走高",""]].map(item => <div key={item[0]}><time>{item[0]}</time><p>{item[1]}</p>{item[2] && <em>{item[2]}</em>}</div>)}
          </article>
        </section>

        <section className="btpNextCompanies">
          <header><div><span>可信企业网络</span><h2>名企精选</h2></div><button>查看全部企业 →</button></header>
          <div>{[["宝","宝钢股份","钢铁制造","央企"],["吉","吉林森工","林业资源","国企"],["上","上海钢联","产业互联网","上市"],["华","华峰集团","新材料","民营"],["后","后谷咖啡","农林产品","龙头"],["云","云南铜业","有色金属","上市"]].map(item => <article key={item[1]}><i>{item[0]}</i><span><b>{item[1]} <em>{item[3]}</em></b><small>{item[2]} · 认证企业</small></span><button>查看 →</button></article>)}</div>
        </section>

        <section className="btpNextServiceDock">
          {[["仓","万联云仓","地图找仓 · 在线咨询 · 货权监管"],["图","企业智能地图","产业链分布 · 区域经营洞察"],["报","产业研究","行业资讯 · 深度研报 · 决策参考"],["盾","交易保障","企业认证 · 合同存证 · 履约服务"]].map(item => <button key={item[1]}><i>{item[0]}</i><span><b>{item[1]}</b><small>{item[2]}</small></span><em>→</em></button>)}
        </section>
        <footer className="btpNextNote">页面数据均为产品演示 · 万贸达大宗商品交易服务平台</footer>
      </main>
    </div>
  );
}
