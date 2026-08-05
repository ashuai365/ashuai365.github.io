"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const ANALYTICS_ENDPOINT="https://ai.madao5.top/api/analytics/collect";
const VISITOR_KEY="madao-anonymous-visitor";

function getVisitorId(){
  const existing=localStorage.getItem(VISITOR_KEY);
  if(existing)return existing;
  const id=crypto.randomUUID?.()||`${Date.now()}-${Math.random().toString(36).slice(2)}`;
  localStorage.setItem(VISITOR_KEY,id);
  return id;
}

export default function AnalyticsTracker(){
  const pathname=usePathname();

  useEffect(()=>{
    if(!pathname||pathname.startsWith("/admin")||pathname.startsWith("/demo-admin"))return;
    const timer=window.setTimeout(()=>{
      const params=new URLSearchParams({
        site:"www",
        path:pathname,
        visitorId:getVisitorId(),
        referrer:document.referrer,
        language:navigator.language,
        viewport:`${window.innerWidth}x${window.innerHeight}`,
        timestamp:String(Date.now()),
      });
      fetch(`${ANALYTICS_ENDPOINT}?${params}`,{keepalive:true,mode:"cors",cache:"no-store"}).catch(()=>undefined);
    },700);
    return()=>window.clearTimeout(timer);
  },[pathname]);

  return null;
}
