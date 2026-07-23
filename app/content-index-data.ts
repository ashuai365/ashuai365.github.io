export type IndexedContent={title:string;description:string;date:string;type:"文章"|"产品演示";href:string;category:string;tags:string[]};

export const indexedContents=([
  {title:"大宗智能体 APP",description:"一个入口切换移动用户端与 PC 平台运营端，体验 AI 决策、行情、交易和平台运营完整闭环。",date:"2026-07-23",type:"产品演示",href:"/demos/commodity-ai-app/",category:"AI 产品",tags:["行业智能体","大宗交易","原型设计"]},
  {title:"大宗商品交易平台",description:"覆盖行情、资讯、研报、商机、产业集群与供应链服务的产业交易门户。",date:"2026-07-21",type:"产品演示",href:"/demos/bulk-trading-platform/",category:"产业与供应链",tags:["大宗交易","供应链","产业互联网","原型设计"]},
  {title:"大宗智能体如何从 AI 问答走向商业闭环",description:"为什么行业智能体不应止于付费问答，以及如何连接决策、服务与交易价值。",date:"2026-07-20",type:"文章",href:"/articles/commodity-ai-commercial-loop/",category:"AI 产品",tags:["AI 产品","行业智能体","商业化","产品规划"]},
  {title:"先让用户感知价值，再谈付费墙",description:"行业 AI 产品如何设计免费额度、会员权益和单项付费，而不伤害核心体验。",date:"2026-07-18",type:"文章",href:"/articles/paywall-after-value/",category:"产品设计",tags:["用户体验","会员体系","商业化"]},
  {title:"价格预警决策器",description:"模拟市场价格变化，实时观察采购建议、风险等级与预警信息。",date:"2026-07-18",type:"产品演示",href:"/demos/price-alert/",category:"产业与供应链",tags:["大宗交易","供应链","原型设计"]},
  {title:"需求优先级计算器",description:"调整用户价值、业务收益和实施成本，快速得到功能优先级建议。",date:"2026-07-17",type:"产品演示",href:"/demos/priority-matrix/",category:"产品方法论",tags:["产品规划","MVP","原型设计"]},
  {title:"用 90 天验证一个行业智能体是否成立",description:"从产品价值、商业化、交易转化和 AI 成本四个维度建立验证框架。",date:"2026-07-16",type:"文章",href:"/articles/90-day-validation-framework/",category:"产品方法论",tags:["MVP","指标体系","产品规划"]},
  {title:"AI 回答可信度面板",description:"通过来源、时效与交叉验证，体验 AI 回答可信度如何被解释和校准。",date:"2026-07-16",type:"产品演示",href:"/demos/ai-confidence/",category:"AI 产品",tags:["AI 产品","用户体验","原型设计"]},
] satisfies IndexedContent[]).sort((a,b)=>b.date.localeCompare(a.date));

export const categoryDefinitions=[
  {slug:"ai-products",name:"AI 产品",description:"行业智能体、可信回答与商业化路径"},
  {slug:"product-design",name:"产品设计",description:"用户旅程、付费体验与复杂业务流程"},
  {slug:"industry-supply-chain",name:"产业与供应链",description:"大宗交易、供应链金融与产业互联网"},
  {slug:"product-methodology",name:"产品方法论",description:"验证、指标、需求优先级与团队协作"},
];

export const tagDefinitions=["AI 产品","大宗交易","产品规划","供应链","用户体验","商业化","行业智能体","MVP","指标体系","会员体系","原型设计","产业互联网"].map((name,index)=>({slug:["ai-product","commodity-trading","product-planning","supply-chain","user-experience","commercialization","industry-agent","mvp","metrics","membership","prototype","industrial-internet"][index],name}));
