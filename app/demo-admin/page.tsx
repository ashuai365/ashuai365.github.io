"use client";

import { useEffect } from "react";

export default function LegacyDemoAdminPage(){
  useEffect(()=>window.location.replace("/admin/"),[]);
  return <main className="demoAdminPage"><p>正在前往新的演示访问管理页面… <a href="/admin/">立即打开</a></p></main>;
}
