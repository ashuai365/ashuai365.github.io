"use client";

import { useState } from "react";

const steps = [
  {role:"用户",title:"创建商机",desc:"选择采购或供应，填写品类、数量、价格、交付区域与有效期。",output:"商机草稿",sla:"即时"},
  {role:"用户",title:"提交认证资料",desc:"补充企业认证、联系人与相关凭证，确认信息真实性。",output:"待区域初审",sla:"即时"},
  {role:"区域公司",title:"区域初审",desc:"核验主体资质、业务真实性、属地区域和服务归属。",output:"初审意见",sla:"4 小时"},
  {role:"平台运营",title:"平台复审",desc:"检查内容合规、价格合理性、重复商机与风险标签。",output:"发布决定",sla:"2 小时"},
  {role:"平台",title:"商机发布",desc:"生成商机编号，进入公开大厅并按品种、区域精准分发。",output:"已发布商机",sla:"自动"},
  {role:"区域公司",title:"线索跟进",desc:"承接意向线索，组织双方沟通并持续更新跟进状态。",output:"跟进记录",sla:"1 工作日"},
  {role:"用户",title:"成交与评价",desc:"确认成交结果，补充金额、数量并评价本次平台服务。",output:"业务闭环",sla:"完成后"},
];

const roleColors:Record<string,string>={"用户":"#2563eb","区域公司":"#0891b2","平台运营":"#7c3aed","平台":"#475569"};

export default function OpportunityWorkflow(){
  const [current,setCurrent]=useState(0);
  const [selected,setSelected]=useState(0);
  const [branch,setBranch]=useState<"normal"|"returned">("normal");
  const [view,setView]=useState<"flow"|"responsibility">("flow");
  const node=steps[selected];
  const advance=()=>{setBranch("normal");setCurrent(x=>Math.min(x+1,steps.length-1));setSelected(Math.min(current+1,steps.length-1));};
  const reset=()=>{setCurrent(0);setSelected(0);setBranch("normal")};

  return <div className="workflowDemo">
    <header className="workflowTop">
      <div><span>BUSINESS PROCESS</span><h2>商机发布与运营协同流程</h2><p>从用户发起，到区域审核、平台发布、线索跟进与成交闭环。</p></div>
      <div className="workflowProgress"><strong>{current+1}<small> / {steps.length}</small></strong><span>当前进度</span></div>
    </header>
    <div className="workflowToolbar">
      <div><button className={view==="flow"?"active":""} onClick={()=>setView("flow")}>流程视图</button><button className={view==="responsibility"?"active":""} onClick={()=>setView("responsibility")}>职责视图</button></div>
      <button onClick={reset}>重新演示</button>
    </div>

    {view==="flow"?<div className="workflowBoard">
      <div className="swimlaneLabels">{["用户","区域公司","平台运营","平台"].map(role=><div key={role}><i style={{background:roleColors[role]}}/><b>{role}</b><small>{role==="用户"?"发布方 / 需求方":role==="区域公司"?"属地服务与初审":role==="平台运营"?"复审与规则运营":"系统自动执行"}</small></div>)}</div>
      <div className="swimlanes">{["用户","区域公司","平台运营","平台"].map(role=><div key={role} className="swimlane"><span>{role}</span>{steps.map((step,index)=>step.role===role&&<button key={step.title} className={`${index<current?"done":""} ${index===current?"current":""} ${index===selected?"selected":""}`} style={{"--role-color":roleColors[role],"--step-index":index} as React.CSSProperties} onClick={()=>setSelected(index)}><i>{index<current?"✓":index+1}</i><span><b>{step.title}</b><small>{step.output}</small></span>{index===current&&<em>进行中</em>}</button>)}</div>)}</div>
      <div className="workflowPath" aria-hidden="true">{steps.slice(0,-1).map((_,i)=><i key={i} className={i<current?"done":""}/>)}</div>
    </div>:<div className="responsibilityGrid">{["用户","区域公司","平台运营","平台"].map(role=><section key={role} style={{"--role-color":roleColors[role]} as React.CSSProperties}><header><i/><h3>{role}</h3></header>{steps.filter(x=>x.role===role).map(x=><article key={x.title}><b>{x.title}</b><p>{x.desc}</p><small>交付：{x.output} · 时效：{x.sla}</small></article>)}</section>)}</div>}

    <section className="workflowInspector">
      <div className="inspectorMain"><span style={{color:roleColors[node.role]}}>{node.role} · 第 {selected+1} 步</span><h3>{node.title}</h3><p>{node.desc}</p><div><small>节点产出</small><b>{node.output}</b></div><div><small>目标时效</small><b>{node.sla}</b></div></div>
      <aside><h4>模拟处理</h4>{branch==="returned"?<div className="returnedNotice"><b>已退回用户修改</b><p>原因：交付区域与联系人信息不完整。</p><button onClick={()=>{setBranch("normal");setCurrent(1);setSelected(1)}}>用户补充后重新提交</button></div>:<><p>{current===steps.length-1?"流程已完成，商机进入成交数据沉淀与服务评价。":"完成当前节点后，业务将自动流转至下一责任角色。"}</p><button className="advance" onClick={advance} disabled={current===steps.length-1}>{current===steps.length-1?"流程已完成":"通过并流转下一步"}</button>{(current===2||current===3)&&<button className="return" onClick={()=>setBranch("returned")}>退回用户修改</button>}</>}</aside>
    </section>
    <footer className="workflowLegend"><span><i className="done"/>已完成</span><span><i className="current"/>处理中</span><span><i/>未开始</span><p>演示规则：用户提交后需经过区域公司初审与平台运营复审；审核节点支持退回修改。</p></footer>
  </div>;
}
