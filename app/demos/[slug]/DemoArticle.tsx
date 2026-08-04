import type { CSSProperties, ReactNode } from "react";
import type { DemoArticleContent } from "../demo-articles";

function FigureFrame({
  article,
  children,
  className,
}: {
  article: DemoArticleContent;
  children: ReactNode;
  className: string;
}) {
  return (
    <figure className={`demoArticleVisual ${className}`} aria-label={article.visual.title}>
      <header>
        <span>产品拆解图 · 关键逻辑示意</span>
        <h3>{article.visual.title}</h3>
      </header>
      {children}
      <figcaption>{article.visual.caption}</figcaption>
    </figure>
  );
}

function ArticleVisual({ article }: { article: DemoArticleContent }) {
  const { variant, steps } = article.visual;

  if (variant === "warehouse") {
    const warehouses = [
      ["/warehouse-shanghai.jpg", "上海 · 高标仓", "8,600㎡ 可租"],
      ["/warehouse-wuhan.jpg", "武汉 · 电商云仓", "15,200㎡ 可租"],
      ["/warehouse-guangzhou.jpg", "广州 · 冷链中心", "6,200㎡ 可租"],
    ];
    return (
      <FigureFrame article={article} className="warehouseArticleVisual">
        <div className="warehouseVisualToolbar">
          <span>全国</span><span>华东</span><span>华中</span><span>华南</span>
          <b>5 个匹配仓库</b>
        </div>
        <div className="warehouseVisualBody">
          <div className="warehouseMiniMap" aria-hidden="true">
            <i className="warehouseRoute routeA"/><i className="warehouseRoute routeB"/>
            <b className="warehouseDot dotA">沪</b>
            <b className="warehouseDot dotB">汉</b>
            <b className="warehouseDot dotC">穗</b>
            <span>地图用于建立空间感，列表负责做参数比较</span>
          </div>
          <div className="warehouseResultCards">
            {warehouses.map(([image, title, area]) => (
              <article key={title}>
                <img src={image} alt=""/>
                <div><b>{title}</b><small>{area}</small></div>
              </article>
            ))}
          </div>
        </div>
      </FigureFrame>
    );
  }

  if (variant === "flywheel") {
    return (
      <FigureFrame article={article} className="flywheelArticleVisual">
        <div className="revenueFlywheel">
          <section className="revenueEngine subscription">
            <small>高频价值</small><strong>会员订阅</strong><p>AI 解读 · 价格预警 · 深度额度</p><b>¥99 / 月</b>
          </section>
          <div className="flywheelCore"><span>用户账户</span><b>偏好与行为</b><i>↻</i></div>
          <section className="revenueEngine quote">
            <small>低频结果</small><strong>具体报价</strong><p>需求审核 · 真实询价 · 报价核验</p><b>¥19—99 / 次</b>
          </section>
        </div>
        <div className="flywheelLoop">
          {steps.map((step, index) => <span key={step.label}><i>{index + 1}</i><b>{step.label}</b><small>{step.note}</small></span>)}
        </div>
      </FigureFrame>
    );
  }

  if (variant === "alert") {
    return (
      <FigureFrame article={article} className="alertArticleVisual">
        <div className="alertDecisionChart">
          <div className="priceScale"><strong>¥4,100</strong><strong>¥3,850</strong><strong>¥3,550</strong><strong>¥3,400</strong></div>
          <div className="decisionBands">
            <section className="risk"><span>高位风险</span><b>暂停追价 · 检查替代货源</b></section>
            <section className="watch"><span>区间观察</span><b>保持预警 · 不改变采购节奏</b></section>
            <section className="buy"><span>采购窗口</span><b>按库存覆盖天数分批锁量</b></section>
            <i className="currentPrice"><b>当前 ¥3,720</b></i>
          </div>
          <aside><small>决策输入</small>{["现货价格","库存天数","波动率","数据时效"].map(x=><b key={x}>{x}</b>)}</aside>
        </div>
      </FigureFrame>
    );
  }

  if (variant === "matrix") {
    return (
      <FigureFrame article={article} className="matrixArticleVisual">
        <div className="priorityCanvas">
          <span className="axisY">用户 / 业务价值 ↑</span><span className="axisX">实施成本 →</span>
          <section className="quadrant quick"><b>快速落地</b><small>高价值 · 低成本</small></section>
          <section className="quadrant strategic"><b>战略投入</b><small>高价值 · 高成本</small></section>
          <section className="quadrant fill"><b>顺手优化</b><small>低价值 · 低成本</small></section>
          <section className="quadrant pause"><b>暂缓投入</b><small>低价值 · 高成本</small></section>
          <i className="featureDot featureA">A</i><i className="featureDot featureB">B</i><i className="featureDot featureC">C</i><i className="featureDot featureD">D</i>
        </div>
        <div className="priorityFormula"><span>综合分</span><b>用户价值 × 45%</b><i>+</i><b>业务收益 × 40%</b><i>+</i><b>可行性 × 15%</b></div>
      </FigureFrame>
    );
  }

  if (variant === "confidence") {
    return (
      <FigureFrame article={article} className="confidenceArticleVisual">
        <div className="evidenceDashboard">
          <div className="confidenceGauge" style={{"--gauge":"309deg"} as CSSProperties}><strong>86</strong><span>高可信</span></div>
          <div className="evidenceBars">
            {[["来源可追溯",92],["数据时效",84],["多源一致",81],["推理完整",88]].map(([label,score])=><div key={label as string}><span><b>{label as string}</b><em>{score as number}%</em></span><i><b style={{width:`${score}%`}}/></i></div>)}
          </div>
          <aside><b>硬门槛</b><p>无来源、来源冲突或关键数据过期时，直接降为低可信。</p></aside>
        </div>
      </FigureFrame>
    );
  }

  return (
    <FigureFrame article={article} className="ecosystemArticleVisual">
      <div className="industryEcosystem">
        <div className="ecosystemCore"><small>产业交易入口</small><strong>大宗商品平台</strong><span>统一商品 · 企业 · 需求 · 报价</span></div>
        {[
          ["行情","判断价格"],["资讯研报","理解原因"],["采购需求","寻找买方"],
          ["供应货源","找货比价"],["仓储物流","完成履约"],["数智金融","解决资金"],
        ].map(([name,note],index)=><section className={`ecosystemNode node${index+1}`} key={name}><b>{name}</b><small>{note}</small></section>)}
      </div>
      <div className="ecosystemPath"><span>信息</span><i>→</i><span>判断</span><i>→</i><span>机会</span><i>→</i><span>连接</span><i>→</i><span>履约</span></div>
    </FigureFrame>
  );
}

function ArticleToolkit({ article }: { article: DemoArticleContent }) {
  const { toolkit } = article;

  return (
    <section className={`demoArticleToolkit toolkit-${toolkit.variant}`}>
      <header><span>{toolkit.eyebrow}</span><h3>{toolkit.title}</h3><p>{toolkit.intro}</p></header>

      {toolkit.variant === "fieldCards" && <div className="fieldCardGrid">
        {toolkit.rows.map((row,index)=><article key={row[0]}><b>{String(index+1).padStart(2,"0")}</b><h4>{row[0]}</h4><p>{row[1]}</p><small>{row[2]}</small></article>)}
      </div>}

      {toolkit.variant === "metrics" && <div className="commercialMetricBoard">
        {toolkit.rows.map((row,index)=><article className={index===toolkit.rows.length-1?"featured":""} key={row[0]}><span>{row[0]}</span><strong>{row[1]}</strong><small>{row[2]}</small></article>)}
      </div>}

      {toolkit.variant === "ruleBands" && <div className="alertRuleBands">
        {toolkit.rows.map((row,index)=><article className={`ruleTone tone${index}`} key={row[0]}><span>{row[1]}</span><div><b>{row[0]}</b><p>{row[2]}</p></div></article>)}
      </div>}

      {toolkit.variant === "rubric" && <div className="rubricCards">
        {toolkit.rows.map(row=><article key={row[0]}><h4>{row[0]}</h4><div>{[3,7,10].map((score,index)=><span key={score}><b>{score} 分</b><small>{row[index+1]}</small></span>)}</div></article>)}
      </div>}

      {toolkit.variant === "weights" && <div className="weightBoard">
        {toolkit.rows.map((row,index)=>index<4?<article key={row[0]}><header><b>{row[0]}</b><strong>{row[1]}</strong></header><i><span style={{width:`${[30,25,25,20][index]}%`}}/></i><p>{row[2]}</p></article>:<aside key={row[0]}><b>{row[0]} · {row[1]}</b><p>{row[2]}</p></aside>)}
      </div>}

      {toolkit.variant === "blueprint" && <div className="blueprintCards">
        {toolkit.rows.map((row,index)=><article key={row[0]}><i>{String(index+1).padStart(2,"0")}</i><div><h4>{row[0]}</h4><p>{row[1]}</p></div><b>{row[2]}</b><code>{row[3]}</code></article>)}
      </div>}

      <p className="demoArticleToolkitNote"><b>落地建议</b>{toolkit.note}</p>
      <div className="demoArticleChecklist">
        <h4>上线前检查清单</h4>
        <ul>{article.checklist.map(item=><li key={item}><i aria-hidden="true">✓</i><span>{item}</span></li>)}</ul>
      </div>
    </section>
  );
}

export default function DemoArticle({
  article,
  demoTitle,
}: {
  article: DemoArticleContent;
  demoTitle: string;
}) {
  return (
    <article className="demoIntroduction" id="demo-introduction">
      <header className="demoIntroductionHeader">
        <div><span>PRODUCT STORY / 产品介绍</span><h2>{article.title}</h2><p>{article.summary}</p></div>
        <dl>
          <div><dt>适合阅读</dt><dd>{article.audience}</dd></div>
          <div><dt>阅读时间</dt><dd>{article.readTime}</dd></div>
          <div><dt>关联演示</dt><dd>{demoTitle}</dd></div>
        </dl>
      </header>

      <ArticleVisual article={article}/>

      <div className="demoArticleLayout">
        <div className="demoArticleBody">
          <ArticleToolkit article={article}/>
          {article.sections.map(section=><section key={section.heading}><h3>{section.heading}</h3>{section.paragraphs.map(paragraph=><p key={paragraph}>{paragraph}</p>)}</section>)}
          <blockquote>{article.closing}</blockquote>
        </div>
        <aside className="demoArticleAside">
          <span>设计要点</span>
          <ol>{article.highlights.map((highlight,index)=><li key={highlight}><b>{String(index+1).padStart(2,"0")}</b><p>{highlight}</p></li>)}</ol>
          <a href="#top">回到顶部 ↑</a>
        </aside>
      </div>
    </article>
  );
}
