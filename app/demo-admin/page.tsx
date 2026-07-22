"use client";

import { FormEvent, useEffect, useState } from "react";
import SiteHeader from "../SiteHeader";
import { DEMO_ACCESS_PASSWORD } from "../demos/access-config";

const ADMIN_SESSION_KEY="demo-password-admin-authenticated";

export default function DemoAdminPage(){
  const [authenticated,setAuthenticated]=useState(false);
  const [username,setUsername]=useState("");
  const [password,setPassword]=useState("");
  const [error,setError]=useState("");
  const [copied,setCopied]=useState(false);

  useEffect(()=>setAuthenticated(sessionStorage.getItem(ADMIN_SESSION_KEY)==="1"),[]);

  const login=(event:FormEvent<HTMLFormElement>)=>{
    event.preventDefault();
    if(username==="admin"&&password==="admin"){
      sessionStorage.setItem(ADMIN_SESSION_KEY,"1");
      setAuthenticated(true); setError(""); return;
    }
    setError("账号或密码不正确"); setPassword("");
  };

  const copy=async()=>{
    await navigator.clipboard.writeText(DEMO_ACCESS_PASSWORD);
    setCopied(true); window.setTimeout(()=>setCopied(false),1600);
  };

  return <div className="demoAdminPage"><SiteHeader active="demos"/><main className="demoAdminWrap">
    {!authenticated?<section className="demoAdminLogin">
      <div className="demoAdminMark">M</div><span>DEMO ACCESS CONSOLE</span><h1>演示密码后台</h1><p>登录后查看当前产品演示的查阅密码。</p>
      <form onSubmit={login}><label>登录账号<input value={username} onChange={event=>{setUsername(event.target.value);setError("")}} autoComplete="username" placeholder="请输入账号"/></label><label>登录密码<input type="password" value={password} onChange={event=>{setPassword(event.target.value);setError("")}} autoComplete="current-password" placeholder="请输入密码"/></label>{error&&<strong role="alert">{error}</strong>}<button disabled={!username||!password}>登录后台 →</button></form>
    </section>:<section className="demoAdminDashboard">
      <header><div><span>DEMO ACCESS CONSOLE</span><h1>演示访问管理</h1><p>用于获取个人站产品演示频道的当前查阅密码。</p></div><button onClick={()=>{sessionStorage.removeItem(ADMIN_SESSION_KEY);setAuthenticated(false);setUsername("");setPassword("")}}>退出登录</button></header>
      <article><div><small>当前查阅密码</small><strong>{DEMO_ACCESS_PASSWORD}</strong><p>4 位随机数字 · 适用于全部产品演示</p></div><button onClick={copy}>{copied?"已复制 ✓":"复制密码"}</button></article>
      <aside><b>使用说明</b><ol><li>将当前查阅密码发送给需要访问演示的人员。</li><li>访客在任一演示详情页输入一次，本次浏览器会话内均可访问。</li><li>此后台为原型站轻量管理入口，请勿用于存放敏感信息。</li></ol><a href="/demos/">前往产品演示频道 →</a></aside>
    </section>}
  </main></div>;
}
