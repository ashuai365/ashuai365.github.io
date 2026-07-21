"use client";

import { useState } from "react";
import CommodityAiApp from "./CommodityAiApp";

function PriceAlert() {
  const [price,setPrice]=useState(3720);
  const change=price-3650;
  const level=price>=3850?"高位风险":price<=3550?"采购窗口":"区间震荡";
  const tone=price>=3850?"danger":price<=3550?"safe":"watch";
  return <div className="productPanel">
    <div className="metricRow"><div><span>华东现货价</span><strong>¥ {price.toLocaleString()}</strong><small className={change>=0?"up":"down"}>{change>=0?"+":""}{change} / 吨</small></div><div className={`signal ${tone}`}><i/>{level}</div></div>
    <div className="chartMock"><div className="chartLine" style={{transform:`scaleY(${.72+(price-3400)/1600})`}}/><span className="targetLine">目标价 ¥3,550</span></div>
    <label className="controlLabel"><span>模拟市场价格</span><b>¥3,400 — ¥4,100</b></label>
    <input className="range" type="range" min="3400" max="4100" step="10" value={price} onChange={e=>setPrice(Number(e.target.value))}/>
    <div className="recommendation"><span>AI 决策建议</span><p>{price<=3550?"已进入目标采购区间。建议锁定 30% 基础用量，并继续观察区域价差。":price>=3850?"价格偏离近 30 日均值。建议暂停追高，检查库存覆盖天数与替代货源。":"价格仍在正常波动区间。保持预警，暂不改变采购节奏。"}</p></div>
  </div>;
}

function PriorityMatrix() {
  const [value,setValue]=useState(8),[revenue,setRevenue]=useState(7),[cost,setCost]=useState(5);
  const score=Math.round((value*.45+revenue*.4+(11-cost)*.15)*10);
  const label=score>=75?"优先进入迭代":score>=55?"继续验证":"暂缓投入";
  return <div className="productPanel">
    <div className="scoreHero"><div><span>综合优先级</span><strong>{score}</strong><small>/ 100</small></div><b className={score>=75?"safe":score>=55?"watch":"danger"}>{label}</b></div>
    <div className="sliderGroup">{[["用户价值",value,setValue],["业务收益",revenue,setRevenue],["实施成本",cost,setCost]].map(([name,val,setter])=><label key={name as string}><span>{name as string}<b>{val as number}</b></span><input type="range" min="1" max="10" value={val as number} onChange={e=>(setter as (n:number)=>void)(Number(e.target.value))}/></label>)}</div>
    <div className="decisionBars"><div><span>价值贡献</span><i style={{width:`${value*10}%`}}/></div><div><span>收入潜力</span><i style={{width:`${revenue*10}%`}}/></div><div><span>交付可行性</span><i style={{width:`${(11-cost)*10}%`}}/></div></div>
    <p className="demoHint">提示：成本越高，综合优先级越低。尝试调整三个变量观察结论。</p>
  </div>;
}

function AiConfidence() {
  const [source,setSource]=useState(true),[fresh,setFresh]=useState(false),[cross,setCross]=useState(false);
  const score=38+(source?24:0)+(fresh?20:0)+(cross?18:0);
  return <div className="productPanel">
    <div className="answerBox"><span>示例回答</span><p>近期华东区域价格上行主要受短期到港节奏与下游补库共同影响，持续性仍需观察库存数据。</p></div>
    <div className="confidence"><div className="confidenceDial" style={{"--score":`${score*3.6}deg`} as React.CSSProperties}><strong>{score}</strong><span>可信度</span></div><div><h3>{score>=85?"证据较完整":score>=65?"具备参考价值":"需要谨慎使用"}</h3><p>系统根据证据来源、数据时效和交叉验证动态解释置信水平。</p></div></div>
    <div className="evidenceList">{[["标注原始数据来源","回答引用了可追溯的行情数据",source,setSource],["验证数据时效性","数据更新时间在 2 小时以内",fresh,setFresh],["完成多源交叉验证","至少两个独立来源结论一致",cross,setCross]].map(([title,desc,on,setter])=><button className={on?"on":""} key={title as string} onClick={()=> (setter as (v:boolean)=>void)(!on)} aria-pressed={on as boolean}><i>{on?"✓":""}</i><span><b>{title as string}</b><small>{desc as string}</small></span></button>)}</div>
  </div>;
}

export default function DemoExperience({slug}:{slug:string}) {
  if(slug==="commodity-ai-app") return <CommodityAiApp/>;
  if(slug==="price-alert") return <PriceAlert/>;
  if(slug==="priority-matrix") return <PriorityMatrix/>;
  return <AiConfidence/>;
}
