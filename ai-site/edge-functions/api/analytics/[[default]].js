import { getStore } from "@edgeone/pages-blob";

const STORE_NAME="madao-site-analytics";
const ALLOWED_ORIGINS=new Set([
  "https://madao5.top",
  "https://www.madao5.top",
  "https://ai.madao5.top",
]);
const ADMIN_AUTH="Basic YWRtaW46YWRtaW4=";

function corsHeaders(request){
  const origin=request.headers.get("Origin")||"";
  return {
    "Access-Control-Allow-Origin":ALLOWED_ORIGINS.has(origin)?origin:"https://www.madao5.top",
    "Access-Control-Allow-Methods":"GET,POST,OPTIONS",
    "Access-Control-Allow-Headers":"Content-Type,Authorization",
    "Access-Control-Max-Age":"86400",
    "Vary":"Origin",
  };
}

function json(data,status,request){
  return new Response(JSON.stringify(data),{
    status,
    headers:{"Content-Type":"application/json; charset=utf-8",...corsHeaders(request),"Cache-Control":"no-store"},
  });
}

function cleanText(value,max=160){
  return typeof value==="string"?value.replace(/[<>]/g,"").trim().slice(0,max):"";
}

function getReferrerHost(value){
  try{return value?new URL(value).hostname.replace(/^www\./,""):"直接访问";}catch{return "其他来源";}
}

function getDevice(userAgent){
  if(/ipad|tablet/i.test(userAgent))return "平板";
  if(/mobile|iphone|android/i.test(userAgent))return "手机";
  return "电脑";
}

function dateKeys(days){
  const result=[];
  const now=new Date();
  for(let offset=days-1;offset>=0;offset--){
    const date=new Date(now);
    date.setUTCDate(now.getUTCDate()-offset);
    result.push(date.toISOString().slice(0,10));
  }
  return result;
}

async function collect(request){
  const origin=request.headers.get("Origin")||"";
  if(origin&&!ALLOWED_ORIGINS.has(origin))return json({ok:false,error:"origin_not_allowed"},403,request);
  let body={};
  if(request.method==="GET"){
    const params=new URL(request.url).searchParams;
    for(const key of ["site","path","visitorId","referrer","language","viewport"])body[key]=params.get(key)||"";
  }else{
    try{body=await request.json();}catch{return json({ok:false,error:"invalid_json"},400,request);}
  }
  const site=body.site==="ai"?"ai":"www";
  const path=cleanText(body.path||"/",240)||"/";
  const visitorId=cleanText(body.visitorId,100);
  if(!visitorId)return json({ok:false,error:"missing_visitor"},400,request);
  const now=new Date();
  const day=now.toISOString().slice(0,10);
  const requestInfo=request.eo||{};
  const geo=requestInfo.geo||{};
  const event={
    site,
    path,
    visitorId,
    timestamp:now.toISOString(),
    referrer:getReferrerHost(cleanText(body.referrer,500)),
    device:getDevice(request.headers.get("User-Agent")||""),
    language:cleanText(body.language,24),
    viewport:cleanText(body.viewport,24),
    region:cleanText(geo.province||geo.region||geo.countryName||geo.countryCode||"未知",48)||"未知",
  };
  const key=`events/${day}/${now.getTime()}-${crypto.randomUUID()}.json`;
  const store=getStore(STORE_NAME);
  await store.setJSON(key,event,{onlyIfNew:true});
  return json({ok:true},201,request);
}

function increment(map,key){map.set(key,(map.get(key)||0)+1);}

function topList(map,limit=8){
  return [...map.entries()].sort((a,b)=>b[1]-a[1]).slice(0,limit).map(([name,views])=>({name,views}));
}

async function summary(request){
  if(request.headers.get("Authorization")!==ADMIN_AUTH)return json({error:"unauthorized"},401,request);
  const url=new URL(request.url);
  const days=Math.min(90,Math.max(7,Number(url.searchParams.get("days"))||30));
  const selectedSite=["www","ai"].includes(url.searchParams.get("site"))?url.searchParams.get("site"):"all";
  const dates=dateKeys(days);
  const dateSet=new Set(dates);
  const store=getStore({name:STORE_NAME,consistency:"strong"});
  const listed=await Promise.all(dates.map(date=>store.list({prefix:`events/${date}/`,consistency:"strong"})));
  const keys=listed.flatMap(item=>item.blobs.map(blob=>blob.key)).slice(-10000);
  const events=[];
  for(let index=0;index<keys.length;index+=100){
    const batch=keys.slice(index,index+100);
    const rows=await Promise.all(batch.map(key=>store.get(key,{type:"json",consistency:"strong"}).catch(()=>null)));
    events.push(...rows.filter(Boolean));
  }
  const filtered=events.filter(event=>!String(event.visitorId).startsWith("test-")&&dateSet.has(String(event.timestamp).slice(0,10))&&(selectedSite==="all"||event.site===selectedSite));
  const visitorSet=new Set();
  const siteVisitors={www:new Set(),ai:new Set()};
  const siteViews={www:0,ai:0};
  const trendMap=new Map(dates.map(date=>[date,{views:0,visitors:new Set()}]));
  const pages=new Map(),referrers=new Map(),devices=new Map(),regions=new Map();
  filtered.forEach(event=>{
    const visitor=`${event.site}:${event.visitorId}`;
    visitorSet.add(visitor);
    siteVisitors[event.site]?.add(event.visitorId);
    if(event.site in siteViews)siteViews[event.site]+=1;
    const day=String(event.timestamp).slice(0,10);
    const trend=trendMap.get(day);
    if(trend){trend.views+=1;trend.visitors.add(visitor);}
    increment(pages,`${event.site}|${event.path}`);
    increment(referrers,event.referrer||"直接访问");
    increment(devices,event.device||"其他设备");
    increment(regions,event.region||"未知");
  });
  const views=filtered.length;
  const visitors=visitorSet.size;
  return json({
    generatedAt:new Date().toISOString(),
    days,
    site:selectedSite,
    total:{views,visitors,pagesPerVisitor:visitors?Number((views/visitors).toFixed(1)):0,todayViews:trendMap.get(dates.at(-1))?.views||0},
    bySite:{
      www:{views:siteViews.www,visitors:siteVisitors.www.size},
      ai:{views:siteViews.ai,visitors:siteVisitors.ai.size},
    },
    trend:dates.map(date=>({date,views:trendMap.get(date).views,visitors:trendMap.get(date).visitors.size})),
    topPages:topList(pages).map(item=>{const [site,path]=item.name.split("|");return{site,path,views:item.views};}),
    referrers:topList(referrers,6),
    devices:topList(devices,4),
    regions:topList(regions,6),
  },200,request);
}

export default async function onRequest(context){
  const {request}=context;
  if(request.method==="OPTIONS")return new Response(null,{status:204,headers:corsHeaders(request)});
  const path=new URL(request.url).pathname.replace(/\/+$/,"");
  try{
    if((request.method==="GET"||request.method==="POST")&&path.endsWith("/collect"))return await collect(request);
    if(request.method==="GET"&&path.endsWith("/summary"))return await summary(request);
    return json({error:"not_found"},404,request);
  }catch(error){
    return json({error:"analytics_unavailable",message:String(error?.message||error)},500,request);
  }
}
