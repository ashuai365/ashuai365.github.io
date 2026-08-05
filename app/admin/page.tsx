"use client";

import { FormEvent, useEffect, useState } from "react";
import SiteHeader from "../SiteHeader";
import { demos } from "../demos/demo-data";
import { getDemoAccessHref, getDemoAccessPassword } from "../demos/access-config";

const ADMIN_SESSION_KEY="demo-password-admin-authenticated";
const ANALYTICS_API="https://ai.madao5.top/api/analytics/summary";
const ANALYTICS_AUTH="Basic YWRtaW46YWRtaW4=";

type SiteKey="all"|"www"|"ai";
type AnalyticsSummary={
  generatedAt:string;
  days:number;
  total:{views:number;visitors:number;pagesPerVisitor:number;todayViews:number};
  bySite:{www:{views:number;visitors:number};ai:{views:number;visitors:number}};
  trend:Array<{date:string;views:number;visitors:number}>;
  topPages:Array<{site:"www"|"ai";path:string;views:number}>;
  referrers:Array<{name:string;views:number}>;
  devices:Array<{name:string;views:number}>;
  regions:Array<{name:string;views:number}>;
};

function MetricList({items,total}:{items:Array<{name:string;views:number}>;total:number}){
  if(!items.length)return <p className="analyticsEmptyLine">暂无数据</p>;
  return <div className="analyticsBreakdown">{items.map(item=><div key={item.name}>
    <span><b>{item.name}</b><small>{item.views}</small></span>
    <i><em style={{width:`${Math.max(4,item.views/Math.max(total,1)*100)}%`}}/></i>
  </div>)}</div>;
}

export default function DemoAdminPage(){
  const [authenticated,setAuthenticated]=useState(false);
  const [username,setUsername]=useState("");
  const [password,setPassword]=useState("");
  const [error,setError]=useState("");
  const [copiedSlug,setCopiedSlug]=useState("");
  const [module,setModule]=useState<"access"|"analytics">("access");
  const [days,setDays]=useState(30);
  const [site,setSite]=useState<SiteKey>("all");
  const [stats,setStats]=useState<AnalyticsSummary|null>(null);
  const [statsLoading,setStatsLoading]=useState(false);
  const [statsError,setStatsError]=useState("");
  const [refreshKey,setRefreshKey]=useState(0);

  useEffect(()=>setAuthenticated(sessionStorage.getItem(ADMIN_SESSION_KEY)==="1"),[]);
  useEffect(()=>{
    if(!authenticated||module!=="analytics")return;
    let active=true;
    setStatsLoading(true);setStatsError("");
    fetch(`${ANALYTICS_API}?days=${days}&site=${site}`,{headers:{Authorization:ANALYTICS_AUTH},cache:"no-store"})
      .then(async response=>{if(!response.ok)throw new Error("统计服务暂时不可用");return response.json();})
      .then(data=>{if(active)setStats(data);})
      .catch(()=>{if(active)setStatsError("暂时无法读取统计数据，请稍后刷新。");})
      .finally(()=>{if(active)setStatsLoading(false);});
    return()=>{active=false;};
  },[authenticated,module,days,site,refreshKey]);

  const login=(event:FormEvent<HTMLFormElement>)=>{
    event.preventDefault();
    if(username==="admin"&&password==="admin"){
      sessionStorage.setItem(ADMIN_SESSION_KEY,"1");
      setAuthenticated(true);setError("");return;
    }
    setError("账号或密码不正确");setPassword("");
  };

  const copy=async(slug:string)=>{
    await navigator.clipboard.writeText(getDemoAccessPassword(slug));
    setCopiedSlug(slug);window.setTimeout(()=>setCopiedSlug(""),1600);
  };

  const logout=()=>{
    sessionStorage.removeItem(ADMIN_SESSION_KEY);setAuthenticated(false);setUsername("");setPassword("");
  };
  const sortedDemos=[...demos].sort((a,b)=>b.updatedAt.localeCompare(a.updatedAt));
  const maxTrend=Math.max(1,...(stats?.trend.map(item=>item.views)||[1]));

  return <div className="demoAdminPage"><SiteHeader active="demos"/><main className="demoAdminWrap">
    {!authenticated?<section className="demoAdminLogin">
      <div className="demoAdminMark">M</div><span>网站管理后台</span><h1>管理与数据中心</h1><p>登录后管理演示访问密码并查看两个站点的访问数据。</p>
      <form onSubmit={login}><label>登录账号<input value={username} onChange={event=>{setUsername(event.target.value);setError("")}} autoComplete="username" placeholder="请输入账号"/></label><label>登录密码<input type="password" value={password} onChange={event=>{setPassword(event.target.value);setError("")}} autoComplete="current-password" placeholder="请输入密码"/></label>{error&&<strong role="alert">{error}</strong>}<button disabled={!username||!password}>登录后台 →</button></form>
    </section>:<section className="demoAdminDashboard">
      <header><div><span>网站管理后台</span><h1>{module==="access"?"演示访问管理":"数据统计"}</h1><p>{module==="access"?`共 ${sortedDemos.length} 个产品演示，每项使用独立的四位访问密码。`:"查看 www.madao5.top 与 ai.madao5.top 的匿名访问数据。"}</p></div><button onClick={logout}>退出登录</button></header>
      <nav className="adminModuleTabs" aria-label="后台功能">
        <button className={module==="access"?"active":""} onClick={()=>setModule("access")}>演示访问管理</button>
        <button className={module==="analytics"?"active":""} onClick={()=>setModule("analytics")}>数据统计</button>
      </nav>

      {module==="access"?<>
        <section className="demoAdminList" aria-label="产品演示访问密码列表">
          <div className="demoAdminListHead"><span>产品演示</span><span>类型 / 更新时间</span><span>查看密码</span><span>操作</span></div>
          {sortedDemos.map(demo=><article key={demo.slug}>
            <div className="demoAdminProduct"><i style={{background:demo.accent}}>{demo.index}</i><span><b>{demo.title}</b><small>/demos/{demo.slug}/</small></span></div>
            <div className="demoAdminMeta"><b>{demo.category}</b><time>{demo.updatedAt.slice(0,10)}</time></div>
            <strong>{getDemoAccessPassword(demo.slug)}</strong>
            <div className="demoAdminActions"><button onClick={()=>copy(demo.slug)}>{copiedSlug===demo.slug?"已复制 ✓":"复制"}</button><a href={getDemoAccessHref(demo.slug)} target="_blank" rel="noreferrer">打开 ↗</a></div>
          </article>)}
        </section>
        <aside><b>使用说明</b><ol><li>每个产品演示拥有独立密码，请将对应密码发送给访问人员。</li><li>访客输入密码后，仅解锁当前演示，本次浏览器会话内有效。</li><li>此后台为轻量管理入口，请勿用于存放敏感信息。</li></ol><a href="/demos/">前往产品演示频道 →</a></aside>
      </>:<section className="analyticsPanel" aria-label="网站访问数据统计">
        <div className="analyticsToolbar">
          <div className="analyticsSiteSwitch" role="group" aria-label="选择站点">
            <button className={site==="all"?"active":""} onClick={()=>setSite("all")}>全部站点</button>
            <button className={site==="www"?"active":""} onClick={()=>setSite("www")}>www.madao5.top</button>
            <button className={site==="ai"?"active":""} onClick={()=>setSite("ai")}>ai.madao5.top</button>
          </div>
          <div className="analyticsPeriod" role="group" aria-label="统计周期">
            {[7,30,90].map(value=><button key={value} className={days===value?"active":""} onClick={()=>setDays(value)}>近{value}天</button>)}
            <button onClick={()=>setRefreshKey(value=>value+1)}>刷新</button>
          </div>
        </div>

        {statsLoading&&!stats?<div className="analyticsState">正在读取访问数据…</div>:statsError?<div className="analyticsState error">{statsError}</div>:stats&&<>
          <div className="analyticsMetrics">
            <article><span>访问量</span><strong>{stats.total.views.toLocaleString()}</strong><small>页面浏览次数</small></article>
            <article><span>独立访客</span><strong>{stats.total.visitors.toLocaleString()}</strong><small>匿名访客数量</small></article>
            <article><span>人均浏览</span><strong>{stats.total.pagesPerVisitor}</strong><small>页 / 人</small></article>
            <article><span>今日访问</span><strong>{stats.total.todayViews.toLocaleString()}</strong><small>今日页面浏览</small></article>
          </div>

          <div className="analyticsSites">
            <article><span>主站</span><h3>www.madao5.top</h3><div><b>{stats.bySite.www.views}</b><small>访问量</small><b>{stats.bySite.www.visitors}</b><small>访客</small></div></article>
            <article><span>人工智能站</span><h3>ai.madao5.top</h3><div><b>{stats.bySite.ai.views}</b><small>访问量</small><b>{stats.bySite.ai.visitors}</b><small>访客</small></div></article>
          </div>

          <article className="analyticsChartCard">
            <header><div><span>访问趋势</span><h2>近 {stats.days} 天访问变化</h2></div><small>访问量 / 独立访客</small></header>
            <div className="analyticsChart">{stats.trend.map((item,index)=><div key={item.date} title={`${item.date}：${item.views} 次访问，${item.visitors} 位访客`}>
              <span className="visitorBar" style={{height:`${Math.max(2,item.visitors/maxTrend*100)}%`}}/><span className="viewBar" style={{height:`${Math.max(3,item.views/maxTrend*100)}%`}}/><small>{index===0||index===stats.trend.length-1||index%Math.ceil(stats.trend.length/6)===0?item.date.slice(5):""}</small>
            </div>)}</div>
          </article>

          <div className="analyticsDetailGrid">
            <article className="analyticsTopPages"><header><span>热门页面</span><b>访问量</b></header>{stats.topPages.length?stats.topPages.map(item=><div key={`${item.site}-${item.path}`}><i>{item.site==="www"?"主站":"人工智能站"}</i><span title={item.path}>{item.path}</span><b>{item.views}</b></div>):<p>暂无访问记录</p>}</article>
            <article><header><span>访问来源</span></header><MetricList items={stats.referrers} total={stats.total.views}/></article>
            <article><header><span>设备分布</span></header><MetricList items={stats.devices} total={stats.total.views}/></article>
            <article><header><span>访客地区</span></header><MetricList items={stats.regions} total={stats.total.views}/></article>
          </div>
          <p className="analyticsNote">数据从统计模块上线后开始累计，仅记录匿名访客标识和页面访问信息，不保存姓名、联系方式或完整网络地址。{statsLoading?" 正在刷新…":""}</p>
        </>}
      </section>}
    </section>}
  </main></div>;
}
