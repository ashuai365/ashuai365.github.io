"use client";

import { useState } from "react";

type Stage = "welcome" | "login" | "wechat" | "profile" | "app";
type Tab = "首页" | "商机" | "行情" | "我的";
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
  const [agreed,setAgreed]=useState(true);
  const [commodity,setCommodity]=useState("钢材");
  const [period,setPeriod]=useState("7日");
  const [alertOn,setAlertOn]=useState(true);
  const [saved,setSaved]=useState(false);
  const [authMethod,setAuthMethod]=useState<"微信"|"手机号"|"本机号码"|null>(null);
  const setMarketView=(_:string)=>setTab("行情");

  const startChat=(mode:Chat)=>{setChat(mode);setTab("首页");setStep(mode==="idle"?0:1)};
  const send=()=>{if(!input.trim())return;setChat(input.includes("采购")||input.includes("10吨")?"buy":"market");setStep(1);setInput("")};
  const finishAuth=(method:"微信"|"手机号"|"本机号码")=>{setAuthMethod(method);setStage("profile")};

  return <div className="aiAppDemo">
    <aside className="appGuide">
      <span>INTERACTIVE PROTOTYPE</span><h2>体验路径</h2>
      {["注册登录","完善偏好","AI 行情问答","采购需求补全","查看行情"].map((item,index)=><button key={item} className={(stage==="welcome"&&index===0)||(stage==="login"&&index===0)||(stage==="profile"&&index===1)||(stage==="app"&&((tab==="行情"&&index===4)||(tab!=="行情"&&index>=2&&index<4)))?"active":""} onClick={()=>{if(index===0)setStage("login");else if(index===1)setStage("profile");else{setStage("app");index===4?setTab("行情"):startChat(index===3?"buy":"market")}}}><i>{index+1}</i>{item}</button>)}
      <p>点击左侧步骤或直接操作手机界面。所有数据均为产品演示。</p>
    </aside>
    <div className="phoneShell">
      <div className="phoneTop"><span>12:00</span><i/><b>▮▮⌁</b></div>
      <div className="phoneScreen">
        {stage==="welcome"&&<section className="welcomeScreen"><div className="aiGlyph">M<span>AI</span></div><h2>大宗智能体</h2><p>你的行业决策与交易助手</p><div><button className="wechatEntry" onClick={()=>setStage("wechat")}>微信授权登录</button><button onClick={()=>finishAuth("本机号码")}>本机号码一键登录</button><button className="ghost" onClick={()=>setStage("login")}>其他手机号登录</button></div><small>首次登录即完成注册 · 演示环境无需真实信息</small></section>}
        {stage==="login"&&<section className="loginScreen"><button className="back" onClick={()=>setStage("welcome")}>‹</button><span>手机号注册 / 登录</span><h2>验证手机号</h2><p>未注册手机号验证后将自动创建账号</p><label>手机号<input value={phone} onChange={e=>setPhone(e.target.value.replace(/\D/g,"").slice(0,11))} placeholder="请输入手机号" inputMode="numeric"/></label><label>验证码<div><input placeholder="6 位验证码" inputMode="numeric"/><button>获取验证码</button></div></label><button className="primary" disabled={!agreed} onClick={()=>finishAuth("手机号")}>验证并继续</button><label className="agreement"><input type="checkbox" checked={agreed} onChange={e=>setAgreed(e.target.checked)}/> 已阅读并同意《用户协议》和《隐私政策》</label><small>演示环境无需输入真实信息</small></section>}
        {stage==="wechat"&&<section className="wechatAuthScreen"><button className="back" onClick={()=>setStage("welcome")}>‹</button><div className="wechatBrand"><i>微</i><span>微信授权</span></div><h2>大宗智能体申请获得</h2><div className="wechatUser"><div>猫</div><span><b>你的微信头像、昵称</b><small>用于创建并识别你的平台账号</small></span><em>✓</em></div><div className="authFlow"><span>微信身份</span><b>→</b><span>创建账号</span><b>→</b><span>完善偏好</span></div><button className="wechatConfirm" disabled={!agreed} onClick={()=>finishAuth("微信")}>允许并继续</button><button className="wechatCancel" onClick={()=>setStage("login")}>改用手机号登录</button><label className="agreement"><input type="checkbox" checked={agreed} onChange={e=>setAgreed(e.target.checked)}/> 同意《用户协议》和《隐私政策》</label><small>此页面为授权流程演示，不会读取真实微信信息</small></section>}
        {stage==="profile"&&<section className="profileScreen"><span>{authMethod?`${authMethod}登录成功 · 可选设置`:"可选设置"}</span><h2>你关注哪些品类？</h2><p>用于推荐行情、政策和商机，你也可以稍后设置</p><div className="chips">{["螺纹钢","热轧卷板","铁矿石","焦煤","焦炭","有色金属"].map((x,i)=><button key={x} className={i<2?"selected":""}>{i<2?"✓ ":""}{x}</button>)}</div><h3>你的主要角色</h3><div className="roleCards"><button className="selected">采购方<small>找货 · 比价 · 控风险</small></button><button>贸易商<small>看行情 · 找商机</small></button></div><div className="profileActions"><button className="skip" onClick={()=>setStage("app")}>暂时跳过</button><button className="primary" onClick={()=>setStage("app")}>保存并开始</button></div></section>}
        {stage==="app"&&<section className="mainScreen">
          <header><button>☰</button><nav>{(["首页","商机","行情","我的"] as Tab[]).map(x=><button key={x} className={tab===x?"active":""} onClick={()=>{setTab(x);if(x!=="首页")setChat("idle")}}>{x}</button>)}</nav><i>●</i></header>
          {tab==="首页"&&<div className="chatScreen">
            {chat==="idle"&&<><div className="assistantHello"><div className="avatar">AI</div><div><h3><span>✦</span> Hi，我是你的大宗采销 AI 助手</h3><p>产业问数、行情分析、采销撮合、企业洞察</p></div></div><div className="quickPrompts"><button onClick={()=>startChat("buy")}>我想采购 10 吨螺纹钢。</button><button onClick={()=>startChat("market")}>螺纹钢目前的行情如何？</button><button onClick={()=>startChat("market")}>钢铁行业现状及发展趋势如何？</button><button onClick={()=>{setTab("商机");setChat("idle")}}>帮我寻找螺纹钢采购商</button></div></>}
            {chat==="market"&&<><div className="userBubble">螺纹钢目前的行情如何？</div>{step>0&&<div className="aiAnswer"><small>已完成思考</small><h2>螺纹钢行情：淡季累库压制价格，短期维持低位震荡</h2><div className="insight"><b>核心洞察</b><p>当前市场处于“弱现实”主导的淡季累库阶段，供需双弱叠加库存累积导致价格承压运行。短期交易温度不高，需求改善仍需观察。</p></div><p>现货均价约为 <strong>3,289 元/吨</strong>，较上周回落 0.8%。建议关注库存拐点与基建项目资金到位节奏。</p><div className="miniQuote"><span>上海螺纹钢</span><b>3,289</b><small>元/吨 · -18</small></div></div>}</>}
            {chat==="buy"&&<><div className="userBubble">我要采购螺纹钢 10 吨</div>{step>0&&<div className="aiAnswer purchase"><p>好的，已记录你的采购需求：</p><table><tbody><tr><th>品类</th><td>螺纹钢</td></tr><tr><th>数量</th><td><strong>10 吨</strong></td></tr></tbody></table><p>为了匹配更合适的卖家报价，还需要补充：</p><ul><li><b>规格 / 材质</b> — 如 HRB400E Φ12mm</li><li><b>交货城市</b> — 货送到哪个地区？</li><li><b>期望交期</b> — 大概什么时候要货？</li><li><b>期望价格</b> — 采购预算是多少？</li></ul><button onClick={()=>setTab("商机")}>继续完善需求 →</button></div>}</>}
            <div className="chatInput"><button>◉</button><input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&send()} placeholder="发消息或按住说话…"/><button onClick={send}>↑</button></div><small className="aiNote">内容由 AI 生成</small>
          </div>}
          {tab==="行情"&&<div className="marketScreen"><div className="marketTitle"><span>MARKET INTELLIGENCE</span><h2>行情中心</h2><p>按品种查看价格、快讯与研究</p></div><div className="commodityTabs">{["钢材","铁矿石","煤焦","有色","化工"].map(x=><button key={x} className={commodity===x?"active":""} onClick={()=>setCommodity(x)}>{x}</button>)}</div><section className="marketSection"><header><h3>{commodity}价格走势</h3><button onClick={()=>{setTab("首页");setChat("market");setStep(1)}}>AI 分析 ›</button></header><div className="marketList">{marketRows.slice(0,2).map((row,i)=><button key={row[0]} onClick={()=>{setTab("首页");setChat("market");setStep(1)}}><span><b>{commodity}{i===0?"主力":"现货指数"}</b><small>{row[3]} · 元/吨</small></span><strong>{row[1]}</strong><i className={row[2].startsWith("+")?"rise":"fall"}>{row[2]}</i></button>)}</div><div className="trendCard"><header><span>{commodity}综合价格</span><div>{["7日","30日","1年"].map(x=><button key={x} className={period===x?"active":""} onClick={()=>setPeriod(x)}>{x}</button>)}</div></header><div className={`trendLine period${period}`}><i/><i/><i/><i/><i/><i/><i/></div></div></section><section className="marketSection"><header><h3>最新快讯</h3><button>更多 ›</button></header><div className="flashFeed">{[["10:36",`${commodity}市场成交较早盘回暖，主流报价以稳为主。`],["09:52",`${commodity}主力合约窄幅震荡，关注库存去化速度。`]].map((x,i)=><article key={x[0]}><time>{x[0]}</time><div><b>{i===0?"即时":"快讯"}</b><p>{x[1]}</p></div></article>)}</div></section><section className="marketSection"><header><h3>精选研报</h3><button>全部 ›</button></header><div className="reportList"><article><small>{commodity}周报 · 今日</small><h3>{commodity}供需格局与价格展望</h3><p>供需 · 库存 · 成本</p><footer><button onClick={()=>setSaved(true)}>☆ {saved?"已收藏":"收藏"}</button><button onClick={()=>{setTab("首页");setChat("market");setStep(1)}}>AI 解读 →</button></footer></article></div></section><small className="demoDataNote">信息结构参考公开行业资讯平台 · 本页均为虚构演示数据</small></div>}
          {tab==="商机"&&<div className="opportunityScreen"><span>SMART MATCH</span><h2>为你推荐 3 个商机</h2><p>基于螺纹钢 10 吨采购需求</p>{[["上海浦东","HRB400E Φ12","3,315"],["江苏无锡","HRB400E Φ12","3,298"],["浙江嘉兴","HRB400E Φ14","3,326"]].map((x,i)=><article key={x[0]}><div><small>匹配度 {96-i*4}%</small><h3>{x[0]} · 现货供应</h3><p>{x[1]} · 可当天出库</p></div><strong>¥{x[2]}</strong><button>联系卖家</button></article>)}</div>}
          {tab==="我的"&&<div className="profileHome"><section className="userCard"><div className="avatar">马</div><div><small>已完成快捷登录</small><h2>马到成功</h2><p>采购方 · 关注钢材与原料</p></div><button>编辑</button></section><section className="memberCard"><span>MADAO PRO</span><h3>大宗决策会员</h3><p>AI 行情解读、价格预警与商机推荐</p><button>查看权益 →</button></section><div className="profileStats"><button><b>6</b><span>关注品种</span></button><button><b>{saved?1:0}</b><span>收藏研报</span></button><button><b>3</b><span>采购需求</span></button></div><section className="profileMenu"><button onClick={()=>setTab("行情")}><span>◎</span><b>我的关注</b><i>6 个品种 ›</i></button><button onClick={()=>setAlertOn(!alertOn)}><span>◔</span><b>价格预警</b><i className={alertOn?"switch on":"switch"}/></button><button onClick={()=>setMarketView("研报")}><span>▤</span><b>收藏与研报</b><i>›</i></button><button><span>⚙</span><b>账号与设置</b><i>›</i></button></section><button className="logout" onClick={()=>setStage("welcome")}>退出登录</button></div>}
        </section>}
      </div>
      <div className="homeBar"/>
    </div>
  </div>
}
