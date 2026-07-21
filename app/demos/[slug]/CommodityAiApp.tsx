"use client";

import { useState } from "react";

type Stage = "welcome" | "login" | "profile" | "app";
type Tab = "首页" | "商机" | "行情";
type Chat = "idle" | "market" | "buy";

const marketRows = [
  ["螺纹钢 HRB400E", "3,289", "-18", "上海"],
  ["热轧卷板 Q235B", "3,412", "+12", "杭州"],
  ["铁矿石 PB粉", "781", "-6", "青岛"],
];

export default function CommodityAiApp(){
  const [stage,setStage]=useState<Stage>("welcome");
  const [tab,setTab]=useState<Tab>("首页");
  const [chat,setChat]=useState<Chat>("idle");
  const [step,setStep]=useState(0);
  const [phone,setPhone]=useState("");
  const [input,setInput]=useState("");

  const startChat=(mode:Chat)=>{setChat(mode);setTab("首页");setStep(mode==="idle"?0:1)};
  const send=()=>{if(!input.trim())return;setChat(input.includes("采购")||input.includes("10吨")?"buy":"market");setStep(1);setInput("")};

  return <div className="aiAppDemo">
    <aside className="appGuide">
      <span>INTERACTIVE PROTOTYPE</span><h2>体验路径</h2>
      {["注册登录","完善偏好","AI 行情问答","采购需求补全","查看行情"].map((item,index)=><button key={item} className={(stage==="welcome"&&index===0)||(stage==="login"&&index===0)||(stage==="profile"&&index===1)||(stage==="app"&&((tab==="行情"&&index===4)||(tab!=="行情"&&index>=2&&index<4)))?"active":""} onClick={()=>{if(index===0)setStage("login");else if(index===1)setStage("profile");else{setStage("app");index===4?setTab("行情"):startChat(index===3?"buy":"market")}}}><i>{index+1}</i>{item}</button>)}
      <p>点击左侧步骤或直接操作手机界面。所有数据均为产品演示。</p>
    </aside>
    <div className="phoneShell">
      <div className="phoneTop"><span>12:00</span><i/><b>▮▮⌁</b></div>
      <div className="phoneScreen">
        {stage==="welcome"&&<section className="welcomeScreen"><div className="aiGlyph">M<span>AI</span></div><h2>大宗智能体</h2><p>你的行业决策与交易助手</p><div><button onClick={()=>setStage("login")}>手机号登录</button><button className="ghost" onClick={()=>setStage("profile")}>快速体验</button></div><small>行情洞察 · 供需匹配 · 风险提醒</small></section>}
        {stage==="login"&&<section className="loginScreen"><button className="back" onClick={()=>setStage("welcome")}>‹</button><span>欢迎回来</span><h2>登录大宗智能体</h2><p>登录后同步你的品类关注与预警</p><label>手机号<input value={phone} onChange={e=>setPhone(e.target.value.replace(/\D/g,"").slice(0,11))} placeholder="请输入手机号" inputMode="numeric"/></label><label>验证码<div><input placeholder="6 位验证码" inputMode="numeric"/><button>获取验证码</button></div></label><button className="primary" onClick={()=>setStage("profile")}>登录 / 注册</button><small>演示环境无需输入真实信息</small></section>}
        {stage==="profile"&&<section className="profileScreen"><span>只需一步</span><h2>你关注哪些品类？</h2><p>我们会据此推荐行情、政策和商机</p><div className="chips">{["螺纹钢","热轧卷板","铁矿石","焦煤","焦炭","有色金属"].map((x,i)=><button key={x} className={i<2?"selected":""}>{i<2?"✓ ":""}{x}</button>)}</div><h3>你的主要角色</h3><div className="roleCards"><button className="selected">采购方<small>找货 · 比价 · 控风险</small></button><button>贸易商<small>看行情 · 找商机</small></button></div><button className="primary" onClick={()=>setStage("app")}>开始使用</button></section>}
        {stage==="app"&&<section className="mainScreen">
          <header><button>☰</button><nav>{(["首页","商机","行情"] as Tab[]).map(x=><button key={x} className={tab===x?"active":""} onClick={()=>{setTab(x);if(x!=="首页")setChat("idle")}}>{x}</button>)}</nav><i>●</i></header>
          {tab==="首页"&&<div className="chatScreen">
            {chat==="idle"&&<><div className="assistantHello"><div className="avatar">AI</div><div><h3><span>✦</span> Hi，我是你的大宗采销 AI 助手</h3><p>产业问数、行情分析、采销撮合、企业洞察</p></div></div><div className="quickPrompts"><button onClick={()=>startChat("buy")}>我想采购 10 吨螺纹钢。</button><button onClick={()=>startChat("market")}>螺纹钢目前的行情如何？</button><button onClick={()=>startChat("market")}>钢铁行业现状及发展趋势如何？</button><button onClick={()=>{setTab("商机");setChat("idle")}}>帮我寻找螺纹钢采购商</button></div></>}
            {chat==="market"&&<><div className="userBubble">螺纹钢目前的行情如何？</div>{step>0&&<div className="aiAnswer"><small>已完成思考</small><h2>螺纹钢行情：淡季累库压制价格，短期维持低位震荡</h2><div className="insight"><b>核心洞察</b><p>当前市场处于“弱现实”主导的淡季累库阶段，供需双弱叠加库存累积导致价格承压运行。短期交易温度不高，需求改善仍需观察。</p></div><p>现货均价约为 <strong>3,289 元/吨</strong>，较上周回落 0.8%。建议关注库存拐点与基建项目资金到位节奏。</p><div className="miniQuote"><span>上海螺纹钢</span><b>3,289</b><small>元/吨 · -18</small></div></div>}</>}
            {chat==="buy"&&<><div className="userBubble">我要采购螺纹钢 10 吨</div>{step>0&&<div className="aiAnswer purchase"><p>好的，已记录你的采购需求：</p><table><tbody><tr><th>品类</th><td>螺纹钢</td></tr><tr><th>数量</th><td><strong>10 吨</strong></td></tr></tbody></table><p>为了匹配更合适的卖家报价，还需要补充：</p><ul><li><b>规格 / 材质</b> — 如 HRB400E Φ12mm</li><li><b>交货城市</b> — 货送到哪个地区？</li><li><b>期望交期</b> — 大概什么时候要货？</li><li><b>期望价格</b> — 采购预算是多少？</li></ul><button onClick={()=>setTab("商机")}>继续完善需求 →</button></div>}</>}
            <div className="chatInput"><button>◉</button><input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&send()} placeholder="发消息或按住说话…"/><button onClick={send}>↑</button></div><small className="aiNote">内容由 AI 生成</small>
          </div>}
          {tab==="行情"&&<div className="marketScreen"><div className="marketTitle"><span>MARKET</span><h2>重点行情</h2><p>07 月 21 日 · 数据延时 15 分钟</p></div><div className="marketTabs"><button className="active">钢材</button><button>原料</button><button>有色</button></div><div className="marketList">{marketRows.map(row=><button key={row[0]} onClick={()=>{setTab("首页");setChat("market");setStep(1)}}><span><b>{row[0]}</b><small>{row[3]} · 元/吨</small></span><strong>{row[1]}</strong><i className={row[2].startsWith("+")?"rise":"fall"}>{row[2]}</i></button>)}</div><div className="trendCard"><span>螺纹钢 · 近 7 日</span><div className="trendLine"><i/><i/><i/><i/><i/><i/><i/></div><footer><b>3,356</b><b>3,289</b></footer></div></div>}
          {tab==="商机"&&<div className="opportunityScreen"><span>SMART MATCH</span><h2>为你推荐 3 个商机</h2><p>基于螺纹钢 10 吨采购需求</p>{[["上海浦东","HRB400E Φ12","3,315"],["江苏无锡","HRB400E Φ12","3,298"],["浙江嘉兴","HRB400E Φ14","3,326"]].map((x,i)=><article key={x[0]}><div><small>匹配度 {96-i*4}%</small><h3>{x[0]} · 现货供应</h3><p>{x[1]} · 可当天出库</p></div><strong>¥{x[2]}</strong><button>联系卖家</button></article>)}</div>}
        </section>}
      </div>
      <div className="homeBar"/>
    </div>
  </div>
}
