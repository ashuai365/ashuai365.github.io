"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type WarehouseItem={id:string;name:string;company:string;region:string;city:string;address:string;area:number;available:number;type:string;goods:string[];tags:string[];height:number;load:number;fire:string;structure:string;ownership:string;digital:boolean;rail:string;expressway:string;color:string;x:number;y:number;roads:string[];landmarks:string[]};

const warehouseItems:WarehouseItem[]=[
  {id:"linyi",name:"临沂中储供应链有限公司库",company:"临沂中储供应链有限公司",region:"华北",city:"临沂",address:"山东临沂市河东区凤仪街700号",area:40000,available:12800,type:"通用 / 常温库",goods:["塑料化工","有色金属","普通标品"],tags:["金融物流","期货交割","铁路专线"],height:4,load:5,fire:"丙二类",structure:"钢混",ownership:"自有",digital:true,rail:"临沂火车东站专用线",expressway:"长深高速 3km",color:"#16a36a",x:73,y:52,roads:["凤仪街","东兴路","温泉路","北京东路"],landmarks:["河东区政务中心","临沂东站","凤仪社区"]},
  {id:"shanghai",name:"上海青浦高标云仓",company:"华东智链仓储有限公司",region:"华东",city:"上海",address:"上海市青浦区华新镇嘉松中路",area:62500,available:8600,type:"高标立体仓",goods:["电子快消","普通标品"],tags:["仓储系统在线开单","城配一体","原房东"],height:9,load:3,fire:"丙二类",structure:"钢结构",ownership:"租赁",digital:true,rail:"虹桥货运站 18km",expressway:"沈海高速 2.4km",color:"#2076e8",x:79,y:63,roads:["嘉松中路","华志路","华隆路","纪鹤公路"],landmarks:["华新公园","上海虹桥站","华新镇政府"]},
  {id:"wuhan",name:"武汉东西湖电商云仓",company:"九州云链物流科技",region:"华中",city:"武汉",address:"武汉市东西湖区走马岭街道",area:36000,available:15200,type:"常温仓",goods:["电子快消","纸品类"],tags:["一件代发","自动分拣","租期灵活"],height:8.5,load:4,fire:"丙二类",structure:"钢混",ownership:"自有",digital:true,rail:"吴家山铁路中心站 7km",expressway:"沪蓉高速 4km",color:"#8c5ce6",x:67,y:65,roads:["走新路","革新大道","惠安大道","兴工三路"],landmarks:["走马岭公园","吴家山站","食品工业园"]},
  {id:"guangzhou",name:"广州南沙冷链中心",company:"湾区冷链产业服务有限公司",region:"华南",city:"广州",address:"广州市南沙区龙穴街道",area:48800,available:6200,type:"低温冷库",goods:["肉类","水产","果蔬"],tags:["港口仓","全温区","食品资质"],height:10,load:4,fire:"丙二类",structure:"钢结构",ownership:"租赁",digital:false,rail:"南沙港铁路站 5km",expressway:"南沙港快速 3km",color:"#f28a2e",x:65,y:86,roads:["龙穴大道","启航路","港荣二街","新港大道"],landmarks:["南沙港区","龙穴岛码头","港务大厦"]},
  {id:"chengdu",name:"成都双流智慧物流园",company:"西部陆港供应链管理",region:"西南",city:"成都",address:"成都市双流区航空港经济开发区",area:52200,available:21400,type:"保税仓",goods:["电子快消","医药冷链"],tags:["保税监管","航空货运","智能门锁"],height:9,load:5,fire:"丙二类",structure:"钢混",ownership:"自有",digital:true,rail:"双流西站 9km",expressway:"机场高速 2km",color:"#dd4e4e",x:50,y:65,roads:["西航港大道","空港四路","双华路","物流大道"],landmarks:["成都双流机场","西航港产业园","双流西站"]},
];

const warehouseImages:Record<string,string>={linyi:"/warehouse-linyi.jpg",shanghai:"/warehouse-shanghai.jpg",wuhan:"/warehouse-wuhan.jpg",guangzhou:"/warehouse-guangzhou.jpg",chengdu:"/warehouse-chengdu.jpg"};
const warehousePhotoLabels:Record<string,string>={linyi:"园区全景",shanghai:"高标库房",wuhan:"作业区域",guangzhou:"冷链设施",chengdu:"仓内通道"};

const regions=["全国","华北","华东","华中","华南","西南"];
const warehouseTypes=["全部仓型","通用 / 常温库","高标立体仓","常温仓","低温冷库","保税仓"];
const goodsTypes=["全部品类","塑料化工","有色金属","电子快消","纸品类","肉类","水产","果蔬","医药冷链"];
const warehouseCategories=[
  {title:"大宗原料仓",items:"黑色金属 · 有色金属 · 塑料化工",goods:"有色金属"},
  {title:"通用标准仓",items:"普通标品 · 纸品 · 建材",goods:"纸品类"},
  {title:"冷链温控仓",items:"肉类 · 水产 · 果蔬 · 医药",goods:"肉类"},
  {title:"高标智慧仓",items:"电子快消 · 自动分拣 · 城配",goods:"电子快消"},
  {title:"保税专项仓",items:"保税监管 · 航空货运 · 专项品类",goods:"医药冷链"},
];

function InteractiveMapViewport({children,className="",focusPoint}:{children:React.ReactNode;className?:string;focusPoint?:{x:number;y:number}}){
  const [view,setView]=useState({scale:1,x:0,y:0});
  const viewportRef=useRef<HTMLDivElement>(null);
  const dragRef=useRef<{x:number;y:number;originX:number;originY:number}|null>(null);
  const zoom=(nextScale:number,originX?:number,originY?:number)=>setView(current=>{
    const scale=Math.min(3.5,Math.max(1,nextScale));
    if(focusPoint&&viewportRef.current){const rect=viewportRef.current.getBoundingClientRect();const ox=rect.width*focusPoint.x,oy=rect.height*focusPoint.y;return {scale,x:ox-ox*scale,y:oy-oy*scale}}
    const ox=originX??0,oy=originY??0,ratio=scale/current.scale;
    return {scale,x:ox-(ox-current.x)*ratio,y:oy-(oy-current.y)*ratio};
  });
  return <div ref={viewportRef} className={`cloudInteractiveMap ${className}`} onWheel={event=>{event.preventDefault();const rect=event.currentTarget.getBoundingClientRect();zoom(view.scale*(event.deltaY<0?1.16:.86),event.clientX-rect.left,event.clientY-rect.top)}} onPointerDown={event=>{if((event.target as HTMLElement).closest("button"))return;event.currentTarget.setPointerCapture(event.pointerId);dragRef.current={x:event.clientX,y:event.clientY,originX:view.x,originY:view.y}}} onPointerMove={event=>{const drag=dragRef.current;if(!drag)return;setView(current=>({...current,x:drag.originX+event.clientX-drag.x,y:drag.originY+event.clientY-drag.y}))}} onPointerUp={()=>{dragRef.current=null}} onPointerCancel={()=>{dragRef.current=null}} onDoubleClick={event=>{const rect=event.currentTarget.getBoundingClientRect();zoom(view.scale*1.45,event.clientX-rect.left,event.clientY-rect.top)}}>
    <div className="cloudMapTransform" style={{transform:`translate3d(${view.x}px,${view.y}px,0) scale(${view.scale})`}}>{children}</div>
    <div className="cloudZoomControls"><button onClick={()=>zoom(view.scale*1.25)} aria-label="放大地图">＋</button><button onClick={()=>zoom(view.scale/1.25)} aria-label="缩小地图">−</button></div>
  </div>;
}

function WarehouseStreetMap({item,onBack,onDetail}:{item:WarehouseItem;onBack:()=>void;onDetail:(item:WarehouseItem)=>void}){
  return <div className="cloudStreetMap">
    <InteractiveMapViewport key={item.id} className="cloudStreetViewport" focusPoint={{x:.5,y:.46}}><div className="streetBlocks">{Array.from({length:18},(_,index)=><i key={index}/>)}</div>
      <div className="streetRoad roadMain"><b>{item.roads[0]}</b></div>
      <div className="streetRoad roadSecond"><b>{item.roads[1]}</b></div>
      <div className="streetRoad roadThird"><b>{item.roads[2]}</b></div>
      <div className="streetRoad roadFourth"><b>{item.roads[3]}</b></div>
      <div className="streetLandmark landmarkOne">● {item.landmarks[0]}</div>
      <div className="streetLandmark landmarkTwo">● {item.landmarks[1]}</div>
      <div className="streetLandmark landmarkThree">● {item.landmarks[2]}</div>
      <div className="warehouseMapMarker" style={{"--pin":item.color} as React.CSSProperties}><span><i>仓</i></span><b>{item.name}</b><small>{item.address}</small></div>
    </InteractiveMapViewport>
    <button className="cloudMapBack" onClick={onBack} aria-label="返回全国地图">‹</button>
    <div className="streetScale"><span/>500 米</div>
    <div className="cloudFocusCard local"><span style={{background:item.color}}/><div><small>{item.city} · 已定位到仓库入口</small><b>{item.name}</b><p>⌖ {item.address}</p></div><button onClick={()=>onDetail(item)}>查看仓库详情 →</button></div>
  </div>;
}

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
        ctx.fillStyle="#e8f3ff";ctx.fill();ctx.strokeStyle="#9bb8ee";ctx.lineWidth=.8;ctx.stroke();
        const center=feature.properties.centroid||feature.properties.center;
        if(center&&feature.properties.name){const [x,y]=project(center);ctx.fillStyle="#5f7194";ctx.font="10px Arial, sans-serif";ctx.textAlign="center";ctx.fillText(feature.properties.name.replace(/省|市|自治区|壮族|回族|维吾尔/g,""),x,y)}
      }
      setReady(true);
    };
    fetch("/china-provinces.json").then(response=>response.json()).then(data=>{mapData=data;draw()});
    const observer=new ResizeObserver(draw);observer.observe(canvas);
    return()=>{cancelled=true;observer.disconnect()};
  },[selectedId]);

  return <div className="cloudMap administrative">{selectedId?<WarehouseStreetMap item={selectedItem} onBack={()=>onSelect("")} onDetail={onDetail}/>:<><InteractiveMapViewport><div className="cloudMapScene"><canvas ref={canvasRef}/>{warehouseItems.map(item=><button key={item.id} aria-label={`选择${item.name}`} className="cloudPin" onClick={()=>onSelect(item.id)} style={{"--pin":item.color,left:`${item.x}%`,top:`${item.y}%`} as React.CSSProperties}><small>{item.city}</small><b>●</b></button>)}</div></InteractiveMapViewport>{!ready&&<div className="cloudMapLoading">正在加载中国行政地图…</div>}<div className="cloudLegend">● 常温/高标仓　<span>●</span> 冷链仓　<i>●</i> 保税/专项仓</div></>}</div>;
}

const wmdNav=[
  ["⌂","首页","/home"],["▣","商品大厅","/search"],["◆","商机寻源","/purchase-hall"],["▰","万联云仓","#wanlian-cloud-home"],["▤","资讯中心","/information"],["✣","AI智能助手","/ai-assistant"],["◉","数智金融","/digital-finance"],["▰","物流服务","/findLogistics"],["✧","产业集群","/industry-cluster"],
];

function WmdPublicHeader({onCloudHome}:{onCloudHome:()=>void}){
  const base="https://www.10000mao.com";
  return <header className="wmdPublicHeader">
    <div className="wmdTop"><span>您好，欢迎来到万贸达　⌖ 朝阳区</span><nav><span>站内信(99+)</span><span>会话消息(0)</span><span>购物车</span><span>买家中心⌄</span><span>卖家中心⌄</span><span>生态服务⌄</span><span>移动端</span><span>平台规则</span><span>客户服务⌄</span></nav></div>
    <div className="wmdSearch"><a href={base} target="_blank" rel="noreferrer" aria-label="访问万贸达官网"><img src="/wmd-logo.svg" alt="万贸达"/></a><div className="wmdSearchBox"><span>商品⌄</span><input aria-label="万贸达商品搜索" placeholder="商家/商品名称/品类/品牌/规格"/><button>搜索</button></div><a className="wmdQuick" href={`${base}/purchase-hall`} target="_blank" rel="noreferrer">▣ 快速求购</a></div>
    <div className="wmdNotice">◁　<b>平台公告：</b> 关于修订用户服务及隐私政策、商家服务、新增订单评价规则的公告</div>
    <nav className="wmdNav" aria-label="万贸达公共导航">{wmdNav.map(([icon,label,path])=>label==="万联云仓"
      ?<a className="active" key={label} href={path} onClick={event=>{event.preventDefault();onCloudHome()}}><i>{icon}</i>{label}</a>
      :<a key={label} href={`${base}${path}`} target="_blank" rel="noreferrer"><i>{icon}</i>{label}</a>)}</nav>
  </header>;
}

function WarehouseGallery({item}:{item:WarehouseItem}){
  const [active,setActive]=useState(0);
  const photos=[item.id,...warehouseItems.map(warehouse=>warehouse.id).filter(id=>id!==item.id)].slice(0,5);
  const move=(offset:number)=>setActive(current=>(current+offset+photos.length)%photos.length);
  return <div className="cloudProductGallery">
    <div className="cloudGalleryMain">
      <img src={warehouseImages[photos[active]]} alt={`${item.name}实景图 ${active+1}`}/>
      <span>实景拍摄 · {active+1}/{photos.length}</span>
      <button className="previous" onClick={()=>move(-1)} aria-label="上一张实景图">‹</button>
      <button className="next" onClick={()=>move(1)} aria-label="下一张实景图">›</button>
    </div>
    <div className="cloudGalleryThumbs">{photos.map((photo,index)=><button className={active===index?"active":""} onClick={()=>setActive(index)} key={photo} aria-label={`查看${warehousePhotoLabels[photo]}`}><img src={warehouseImages[photo]} alt=""/><small>{index===0?"本仓实景":warehousePhotoLabels[photo]}</small></button>)}</div>
  </div>;
}

function CloudWarehouseMapContent(){
  const [region,setRegion]=useState("全国"),[warehouseType,setWarehouseType]=useState("全部仓型"),[goodsType,setGoodsType]=useState("全部品类"),[selected,setSelected]=useState(""),[mapOpen,setMapOpen]=useState(false),[detail,setDetail]=useState<WarehouseItem|null>(null),[leadOpen,setLeadOpen]=useState(false),[sent,setSent]=useState(false);
  const filtered=useMemo(()=>warehouseItems.filter(item=>(region==="全国"||item.region===region)&&(warehouseType==="全部仓型"||item.type===warehouseType)&&(goodsType==="全部品类"||item.goods.includes(goodsType))),[region,warehouseType,goodsType]);
  if(detail)return <div className="cloudPrototype"><div className="cloudAppBar"><button onClick={()=>setDetail(null)}>← 返回云仓地图</button><b>万联云仓</b><span>仓库详情</span></div><div className="cloudDetailProduct"><WarehouseGallery key={detail.id} item={detail}/><div className="cloudDetailSummary"><small>● 已认证云仓 · 信息更新于 3 天前</small><h2>{detail.name}</h2><p>⌖ {detail.address}</p><section>{detail.tags.map(tag=><i key={tag}>{tag}</i>)}</section><div className="cloudDetailQuick"><span><small>可租面积</small><b>{detail.available.toLocaleString()}㎡</b></span><span><small>仓库类型</small><b>{detail.type}</b></span></div><button onClick={()=>setLeadOpen(true)}>获取报价与完整资料 →</button></div></div><div className="cloudDetailBody"><article><div className="cloudMetrics"><span><small>库房面积</small><b>{detail.area.toLocaleString()}㎡</b></span><span><small>可租面积</small><b>{detail.available.toLocaleString()}㎡</b></span><span><small>仓库类型</small><b>{detail.type}</b></span><span><small>场地权属</small><b>{detail.ownership}</b></span></div><h3>仓库概览</h3><p>面向大宗商品、零售及供应链客户提供仓储保管、装卸、运输与数字化管理服务。园区具备全天候运营与安全监管能力。</p><div className="cloudFacilities"><span>库房顶高<b>{detail.height} 米</b></span><span>地面承重<b>{detail.load} 吨/㎡</b></span><span>建筑结构<b>{detail.structure}</b></span><span>防火等级<b>{detail.fire}</b></span><span>仓库系统<b>{detail.digital?"仓储与企业管理系统":"标准管理"}</b></span><span>适存品类<b>{detail.goods.join("、")}</b></span></div><h3>区位交通</h3><div className="cloudTransport"><span>铁路节点<b>{detail.rail}</b></span><span>高速节点<b>{detail.expressway}</b></span></div></article><aside><small>云仓顾问</small><h3>获取该仓完整资料</h3><p>包含可租库区、报价、平面图及现场视频</p>{sent?<div className="cloudSuccess">✓ 需求已提交<br/><small>顾问将在 1 个工作日内联系</small></div>:<><input placeholder="您的称呼"/><input placeholder="联系电话"/><button onClick={()=>setSent(true)}>提交看仓意向 →</button></>}</aside></div>{leadOpen&&<div className="cloudModal" onClick={()=>setLeadOpen(false)}><section onClick={event=>event.stopPropagation()}><button onClick={()=>setLeadOpen(false)}>×</button><small>获取仓库资料</small><h3>{detail.name}</h3><p>留下联系方式，获取报价、平面图与现场视频。</p><label>您的称呼<input placeholder="请输入称呼"/></label><label>联系电话<input placeholder="请输入手机号"/></label><button className="submit" onClick={()=>{setLeadOpen(false);setSent(true)}}>提交需求 →</button></section></div>}</div>;
  return <div className="cloudPrototype" id="wanlian-cloud-home">
    <section className="cloudMarketplaceHero">
      <aside className="cloudCategoryMenu"><h3>全部云仓分类</h3>{warehouseCategories.map((category,index)=><button key={category.title} onClick={()=>setGoodsType(category.goods)}><i>{["◇","▦","❄","◎","▣"][index]}</i><span><b>{category.title}</b><small>{category.items}</small></span><em>›</em></button>)}</aside>
      <div className="cloudMarketplaceVisual">
        <img src="/warehouse-linyi.jpg" alt="万联云仓园区主视觉"/>
        <div className="cloudMarketplaceShade"/>
        <div className="cloudMarketplaceCopy"><small>万联云仓</small><h2>全国仓储资源，一站式快速匹配</h2><p>从区域、仓型到适存品类，快速筛选适合的仓储资源。</p></div>
        <div className="cloudMarketplaceFilters">
          <label><span>目标区域</span><select value={region} onChange={event=>setRegion(event.target.value)}>{regions.map(item=><option key={item}>{item}</option>)}</select></label>
          <label><span>仓库类型</span><select value={warehouseType} onChange={event=>setWarehouseType(event.target.value)}>{warehouseTypes.map(item=><option key={item}>{item}</option>)}</select></label>
          <label><span>适存品类</span><select value={goodsType} onChange={event=>setGoodsType(event.target.value)}>{goodsTypes.map(item=><option key={item}>{item}</option>)}</select></label>
          <button onClick={()=>{setMapOpen(true);setSelected("")}}>⌖ 地图找仓</button>
        </div>
      </div>
    </section>
    <section className="cloudMarketplaceStats" aria-label="万联云仓业务数据"><span><i>◉</i><b>15,577万㎡</b><small>在线仓房总面积</small></span><span><i>✓</i><b>7,350</b><small>认证云仓数量</small></span><span><i>⌖</i><b>285</b><small>覆盖城市</small></span></section>
    {mapOpen&&<section className="cloudMarketplaceMap"><header><div><small>按位置查找</small><h3>地图找仓</h3></div><button onClick={()=>setMapOpen(false)}>关闭地图 ×</button></header><div><ChinaAdministrativeMap selectedId={selected} onSelect={setSelected} onDetail={setDetail}/></div></section>}
    <section className="cloudWarehouseMarket"><header><div><small>云仓资源</small><h2>精选云仓资源</h2><p>共找到 {filtered.length} 个匹配仓库，点击卡片查看实景与完整资料。</p></div><button onClick={()=>setLeadOpen(true)}>发布选址需求 →</button></header>
      {filtered.length?<div className="cloudWarehouseGrid">{filtered.map(item=><article key={item.id} onClick={()=>setDetail(item)}><div className="cloudWarehouseCover"><img src={warehouseImages[item.id]} alt={`${item.name}实景`}/><span>{item.type}</span></div><div className="cloudWarehouseCardBody"><header><h3>{item.name}</h3><strong>价格面议</strong></header><p>⌖ {item.city} · {item.address}</p><dl><div><dt>可租面积</dt><dd>{item.available.toLocaleString()}㎡</dd></div><div><dt>库房顶高</dt><dd>{item.height}m</dd></div><div><dt>场地权属</dt><dd>{item.ownership}</dd></div></dl><section>{item.tags.slice(0,3).map(tag=><i key={tag}>{tag}</i>)}</section><footer><span>适存：{item.goods.join("、")}</span><button onClick={event=>{event.stopPropagation();setDetail(item)}}>查看详情</button></footer></div></article>)}</div>:<div className="cloudWarehouseEmpty"><b>暂未找到匹配仓库</b><p>可以调整筛选条件，或发布选址需求由顾问协助匹配。</p><button onClick={()=>setLeadOpen(true)}>发布选址需求</button></div>}
    </section>
    {leadOpen&&<div className="cloudModal" onClick={()=>setLeadOpen(false)}><section onClick={event=>event.stopPropagation()}><button onClick={()=>setLeadOpen(false)}>×</button><small>智能选址需求</small><h3>告诉我们，你需要什么仓？</h3><p>填写基础信息，系统将匹配区域内合适仓源。</p><label>目标城市<input placeholder="例如：上海、临沂"/></label><label>所需面积<input placeholder="例如：10,000㎡"/></label><label>联系电话<input placeholder="请输入手机号"/></label><button className="submit" onClick={()=>{setLeadOpen(false);setSent(true)}}>提交需求 →</button></section></div>}
  </div>;
}

export default function CloudWarehouseMap(){
  const [homeKey,setHomeKey]=useState(0);
  const openCloudHome=()=>{setHomeKey(current=>current+1);window.setTimeout(()=>document.getElementById("wanlian-cloud-home")?.scrollIntoView({behavior:"smooth",block:"start"}),0)};
  return <div className="wmdDemoShell"><WmdPublicHeader onCloudHome={openCloudHome}/><CloudWarehouseMapContent key={homeKey}/></div>;
}
