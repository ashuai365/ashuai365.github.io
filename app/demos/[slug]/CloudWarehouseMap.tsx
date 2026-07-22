"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type WarehouseItem={id:string;name:string;company:string;region:string;city:string;address:string;area:number;available:number;type:string;goods:string[];tags:string[];height:number;load:number;fire:string;structure:string;ownership:string;digital:boolean;rail:string;expressway:string;color:string;x:number;y:number};

const warehouseItems:WarehouseItem[]=[
  {id:"linyi",name:"临沂中储供应链有限公司库",company:"临沂中储供应链有限公司",region:"华北",city:"临沂",address:"山东临沂市河东区凤仪街700号",area:40000,available:12800,type:"通用 / 常温库",goods:["塑料化工","有色金属","普通标品"],tags:["金融物流","期货交割","铁路专线"],height:4,load:5,fire:"丙二类",structure:"钢混",ownership:"自有",digital:true,rail:"临沂火车东站专用线",expressway:"长深高速 3km",color:"#16a36a",x:73,y:52},
  {id:"shanghai",name:"上海青浦高标云仓",company:"华东智链仓储有限公司",region:"华东",city:"上海",address:"上海市青浦区华新镇嘉松中路",area:62500,available:8600,type:"高标立体仓",goods:["电子快消","普通标品"],tags:["WMS在线开单","城配一体","原房东"],height:9,load:3,fire:"丙二类",structure:"钢结构",ownership:"租赁",digital:true,rail:"虹桥货运站 18km",expressway:"G15 沈海高速 2.4km",color:"#2076e8",x:79,y:63},
  {id:"wuhan",name:"武汉东西湖电商云仓",company:"九州云链物流科技",region:"华中",city:"武汉",address:"武汉市东西湖区走马岭街道",area:36000,available:15200,type:"常温仓",goods:["电子快消","纸品类"],tags:["一件代发","自动分拣","租期灵活"],height:8.5,load:4,fire:"丙二类",structure:"钢混",ownership:"自有",digital:true,rail:"吴家山铁路中心站 7km",expressway:"沪蓉高速 4km",color:"#8c5ce6",x:67,y:65},
  {id:"guangzhou",name:"广州南沙冷链中心",company:"湾区冷链产业服务有限公司",region:"华南",city:"广州",address:"广州市南沙区龙穴街道",area:48800,available:6200,type:"低温冷库",goods:["肉类","水产","果蔬"],tags:["港口仓","全温区","食品资质"],height:10,load:4,fire:"丙二类",structure:"钢结构",ownership:"租赁",digital:false,rail:"南沙港铁路站 5km",expressway:"南沙港快速 3km",color:"#f28a2e",x:65,y:86},
  {id:"chengdu",name:"成都双流智慧物流园",company:"西部陆港供应链管理",region:"西南",city:"成都",address:"成都市双流区航空港经济开发区",area:52200,available:21400,type:"保税仓",goods:["电子快消","医药冷链"],tags:["保税监管","航空货运","智能门锁"],height:9,load:5,fire:"丙二类",structure:"钢混",ownership:"自有",digital:true,rail:"双流西站 9km",expressway:"机场高速 2km",color:"#dd4e4e",x:50,y:65},
];

const regions=["全国","华北","华东","华中","华南","西南"];

function ChinaAdministrativeMap({selectedId,onSelect,onDetail}:{selectedId:string;onSelect:(id:string)=>void;onDetail:(item:WarehouseItem)=>void}){
  const canvasRef=useRef<HTMLCanvasElement>(null);
  const [ready,setReady]=useState(false);
  const selectedItem=warehouseItems.find(item=>item.id===selectedId)??warehouseItems[0];

  useEffect(()=>{
    const canvas=canvasRef.current;
    if(!canvas)return;
    let cancelled=false;
    let mapData:{features:Array<{properties:{name?:string;center?:number[];centroid?:number[]};geometry:{type:string;coordinates:unknown}}>};
    const draw=()=>{
      if(cancelled||!mapData)return;
      const rect=canvas.getBoundingClientRect(),ratio=window.devicePixelRatio||1;
      canvas.width=Math.max(1,Math.round(rect.width*ratio)); canvas.height=Math.max(1,Math.round(rect.height*ratio));
      const ctx=canvas.getContext("2d"); if(!ctx)return; ctx.scale(ratio,ratio); ctx.clearRect(0,0,rect.width,rect.height);
      const minLon=73,maxLon=135,minLat=18,maxLat=54,pad=18;
      const project=(point:number[])=>[pad+(point[0]-minLon)/(maxLon-minLon)*(rect.width-pad*2),pad+(maxLat-point[1])/(maxLat-minLat)*(rect.height-pad*2)];
      const polygons=(geometry:{type:string;coordinates:unknown})=>geometry.type==="Polygon"?[geometry.coordinates]:geometry.coordinates as unknown[];
      for(const feature of mapData.features){
        ctx.beginPath();
        for(const polygon of polygons(feature.geometry) as number[][][][]){for(const ring of polygon){ring.forEach((point,index)=>{const [x,y]=project(point);index?ctx.lineTo(x,y):ctx.moveTo(x,y)});ctx.closePath()}}
        ctx.fillStyle="#e8f1ec";ctx.fill();ctx.strokeStyle="#9db6a7";ctx.lineWidth=.8;ctx.stroke();
        const center=feature.properties.centroid||feature.properties.center;
        if(center&&feature.properties.name){const [x,y]=project(center);ctx.fillStyle="#64766c";ctx.font="10px Arial, sans-serif";ctx.textAlign="center";ctx.fillText(feature.properties.name.replace(/省|市|自治区|壮族|回族|维吾尔/g,""),x,y)}
      }
      setReady(true);
    };
    fetch("/china-provinces.json").then(response=>response.json()).then(data=>{mapData=data;draw()});
    const observer=new ResizeObserver(draw);observer.observe(canvas);
    return()=>{cancelled=true;observer.disconnect()};
  },[]);

  return <div className="cloudMap administrative"><div className={`cloudMapScene ${selectedId?"focused":""}`} style={{transformOrigin:`${selectedItem.x}% ${selectedItem.y}%`}}><canvas ref={canvasRef}/>{warehouseItems.map(item=><button key={item.id} aria-label={`选择${item.name}`} className={`cloudPin ${selectedId===item.id?"active":""}`} onClick={()=>onSelect(item.id)} style={{"--pin":item.color,left:`${item.x}%`,top:`${item.y}%`} as React.CSSProperties}><small>{item.city}</small><b>●</b></button>)}</div>{!ready&&<div className="cloudMapLoading">正在加载中国行政地图…</div>}{selectedId&&<div className="cloudFocusCard"><span style={{background:selectedItem.color}}/><div><small>当前选中 · {selectedItem.city}</small><b>{selectedItem.name}</b><p>{selectedItem.type} · 可租 {selectedItem.available.toLocaleString()}㎡</p></div><button onClick={()=>onDetail(selectedItem)}>查看仓库详情 →</button></div>}<button className="cloudResetMap" onClick={()=>onSelect("")}>全国视图</button><div className="cloudLegend">● 常温/高标仓　<span>●</span> 冷链仓　<i>●</i> 保税/专项仓　<em>行政区数据：DataV</em></div></div>;
}

export default function CloudWarehouseMap(){
  const [region,setRegion]=useState("全国"),[keyword,setKeyword]=useState(""),[selected,setSelected]=useState(""),[detail,setDetail]=useState<WarehouseItem|null>(null),[leadOpen,setLeadOpen]=useState(false),[sent,setSent]=useState(false);
  const filtered=useMemo(()=>warehouseItems.filter(item=>(region==="全国"||item.region===region)&&`${item.name}${item.city}${item.type}${item.goods.join("")}`.includes(keyword)),[region,keyword]);
  if(detail)return <div className="cloudPrototype"><div className="cloudAppBar"><button onClick={()=>setDetail(null)}>← 返回云仓地图</button><b>仓枢 · 云仓资源原型</b><span>DEMO 06</span></div><div className="cloudDetailHero"><div><small>已认证云仓 · 信息更新于 3 天前</small><h2>{detail.name}</h2><p>⌖ {detail.address}</p><section>{detail.tags.map(tag=><i key={tag}>{tag}</i>)}</section></div><div className="cloudDetailMap"><span>CHINA / {detail.city}</span><b>⌖</b></div></div><div className="cloudDetailBody"><article><div className="cloudMetrics"><span><small>库房面积</small><b>{detail.area.toLocaleString()}㎡</b></span><span><small>可租面积</small><b>{detail.available.toLocaleString()}㎡</b></span><span><small>仓库类型</small><b>{detail.type}</b></span><span><small>场地权属</small><b>{detail.ownership}</b></span></div><h3>仓库概览</h3><p>面向大宗商品、零售及供应链客户提供仓储保管、装卸、运输与数字化管理服务。园区具备全天候运营与安全监管能力。</p><div className="cloudFacilities"><span>库房顶高<b>{detail.height} 米</b></span><span>地面承重<b>{detail.load} 吨/㎡</b></span><span>建筑结构<b>{detail.structure}</b></span><span>防火等级<b>{detail.fire}</b></span><span>仓库系统<b>{detail.digital?"WMS / ERP":"标准管理"}</b></span><span>适存品类<b>{detail.goods.join("、")}</b></span></div><h3>区位交通</h3><div className="cloudTransport"><span>铁路节点<b>{detail.rail}</b></span><span>高速节点<b>{detail.expressway}</b></span></div></article><aside><small>云仓顾问</small><h3>获取该仓完整资料</h3><p>包含可租库区、报价、平面图及现场视频</p>{sent?<div className="cloudSuccess">✓ 需求已提交<br/><small>顾问将在 1 个工作日内联系</small></div>:<><input placeholder="您的称呼"/><input placeholder="联系电话"/><button onClick={()=>setSent(true)}>提交看仓意向 →</button></>}</aside></div></div>;
  return <div className="cloudPrototype"><div className="cloudAppBar"><b>仓枢 · 云仓资源原型</b><nav><span className="active">云仓地图</span><span>仓储服务</span><span>需求大厅</span></nav><button onClick={()=>setLeadOpen(true)}>发布选址需求 →</button></div><div className="cloudIntro"><div><small>全国云仓资源一张图</small><h2>找对仓，比找仓更重要。</h2><p>聚合真实仓源与运营能力，让每一次选址都有数据依据。</p></div><section><span><b>7,350</b>认证云仓</span><span><b>285</b>覆盖城市</span><span><b>15,577万㎡</b>可租面积</span></section></div><div className="cloudFilters"><div>{regions.map(item=><button className={region===item?"active":""} onClick={()=>setRegion(item)} key={item}>{item}</button>)}</div><input value={keyword} onChange={event=>setKeyword(event.target.value)} placeholder="⌕ 搜索城市、仓库或品类"/></div><div className="cloudMapShell"><aside><header><b>{filtered.length}</b> 个匹配仓库 <small>· 点击仓库定位地图</small></header>{filtered.map(item=><button key={item.id} onClick={()=>setSelected(item.id)} className={selected===item.id?"active":""}><div><i style={{background:item.color}}/><span><b>{item.name}</b><small>⌖ {item.city} · {item.address.replace(/^.*?市/,"")}</small></span></div><section><span><b>{(item.area/10000).toFixed(1)}</b>万㎡<small>库房面积</small></span><span><b>{(item.available/10000).toFixed(2)}</b>万㎡<small>可租面积</small></span><span><b>{item.height}</b>m<small>库房顶高</small></span></section><footer>{item.tags.slice(0,3).map(tag=><i key={tag}>{tag}</i>)}</footer></button>)}</aside><ChinaAdministrativeMap selectedId={selected} onSelect={setSelected} onDetail={setDetail}/></div>{leadOpen&&<div className="cloudModal" onClick={()=>setLeadOpen(false)}><section onClick={event=>event.stopPropagation()}><button onClick={()=>setLeadOpen(false)}>×</button><small>智能选址需求</small><h3>告诉我们，你需要什么仓？</h3><p>填写基础信息，系统将匹配区域内合适仓源。</p><label>目标城市<input placeholder="例如：上海、临沂"/></label><label>所需面积<input placeholder="例如：10,000㎡"/></label><label>联系电话<input placeholder="请输入手机号"/></label><button className="submit" onClick={()=>{setLeadOpen(false);setSent(true)}}>提交需求 →</button></section></div>}</div>;
}
