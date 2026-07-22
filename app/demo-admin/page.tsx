"use client";

import { FormEvent, useEffect, useState } from "react";
import SiteHeader from "../SiteHeader";
import { demos } from "../demos/demo-data";
import { getDemoAccessPassword } from "../demos/access-config";

const ADMIN_SESSION_KEY="demo-password-admin-authenticated";

export default function DemoAdminPage(){
  const [authenticated,setAuthenticated]=useState(false);
  const [username,setUsername]=useState("");
  const [password,setPassword]=useState("");
  const [error,setError]=useState("");
  const [copiedSlug,setCopiedSlug]=useState("");

  useEffect(()=>setAuthenticated(sessionStorage.getItem(ADMIN_SESSION_KEY)==="1"),[]);

  const login=(event:FormEvent<HTMLFormElement>)=>{
    event.preventDefault();
    if(username==="admin"&&password==="admin"){
      sessionStorage.setItem(ADMIN_SESSION_KEY,"1");
      setAuthenticated(true); setError(""); return;
    }
    setError("账号或密码不正确"); setPassword("");
  };

  const copy=async(slug:string)=>{
    await navigator.clipboard.writeText(getDemoAccessPassword(slug));
    setCopiedSlug(slug); window.setTimeout(()=>setCopiedSlug(""),1600);
  };

  const sortedDemos=[...demos].sort((a,b)=>b.updatedAt.localeCompare(a.updatedAt));

  return <div className="demoAdminPage"><SiteHeader active="demos"/><main className="demoAdminWrap">
    {!authenticated?<section className="demoAdminLogin">
      <div className="demoAdminMark">M</div><span>DEMO ACCESS CONSOLE</span><h1>演示密码后台</h1><p>登录后查看当前产品演示的查阅密码。</p>
      <form onSubmit={login}><label>登录账号<input value={username} onChange={event=>{setUsername(event.target.value);setError("")}} autoComplete="username" placeholder="请输入账号"/></label><label>登录密码<input type="password" value={password} onChange={event=>{setPassword(event.target.value);setError("")}} autoComplete="current-password" placeholder="请输入密码"/></label>{error&&<strong role="alert">{error}</strong>}<button disabled={!username||!password}>登录后台 →</button></form>
    </section>:<section className="demoAdminDashboard">
      <header><div><span>DEMO ACCESS CONSOLE</span><h1>演示访问管理</h1><p>共 {sortedDemos.length} 个产品演示，每项使用独立的四位访问密码。</p></div><button onClick={()=>{sessionStorage.removeItem(ADMIN_SESSION_KEY);setAuthenticated(false);setUsername("");setPassword("")}}>退出登录</button></header>
      <section className="demoAdminList" aria-label="产品演示访问密码列表">
        <div className="demoAdminListHead"><span>产品演示</span><span>类型 / 更新时间</span><span>查看密码</span><span>操作</span></div>
        {sortedDemos.map(demo=><article key={demo.slug}>
          <div className="demoAdminProduct"><i style={{background:demo.accent}}>{demo.index}</i><span><b>{demo.title}</b><small>/demos/{demo.slug}/</small></span></div>
          <div className="demoAdminMeta"><b>{demo.category}</b><time>{demo.updatedAt.slice(0,10)}</time></div>
          <strong>{getDemoAccessPassword(demo.slug)}</strong>
          <div className="demoAdminActions"><button onClick={()=>copy(demo.slug)}>{copiedSlug===demo.slug?"已复制 ✓":"复制"}</button><a href={`/demos/${demo.slug}/`} target="_blank" rel="noreferrer">打开 ↗</a></div>
        </article>)}
      </section>
      <aside><b>使用说明</b><ol><li>每个产品演示拥有独立密码，请将对应密码发送给访问人员。</li><li>访客输入密码后，仅解锁当前演示，本次浏览器会话内有效。</li><li>此后台为原型站轻量管理入口，请勿用于存放敏感信息。</li></ol><a href="/demos/">前往产品演示频道 →</a></aside>
    </section>}
  </main></div>;
}
