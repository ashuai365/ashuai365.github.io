"use client";

import { useState } from "react";

const projects = [
  {
    id: "01",
    label: "品牌系统",
    title: "NEON\nHARVEST",
    note: "从策略到发布，为新一代食品科技品牌打造有温度的数字身份。",
    color: "#d7ff3f",
    ink: "#10110f",
  },
  {
    id: "02",
    label: "数字产品",
    title: "CITY\nAFTER DARK",
    note: "把城市夜生活变成一个可探索、可收藏的沉浸式界面。",
    color: "#4f46f6",
    ink: "#f5f1e8",
  },
  {
    id: "03",
    label: "创意技术",
    title: "KINETIC\nARCHIVE",
    note: "一座会呼吸的线上档案馆，让文化内容随每次访问重新编排。",
    color: "#ff6846",
    ink: "#151515",
  },
];

export default function Home() {
  const [active, setActive] = useState(0);
  const project = projects[active];

  return (
    <main>
      <nav className="nav shell" aria-label="主导航">
        <a className="brand" href="#top" aria-label="NOVA 首页">
          NO<span>V</span>A<sup>®</sup>
        </a>
        <div className="navLinks">
          <a href="#work">案例</a>
          <a href="#method">方法</a>
          <a href="#contact">联系</a>
        </div>
        <a className="navCta" href="#contact">发起项目 <span>↗</span></a>
      </nav>

      <section className="hero shell" id="top">
        <div className="eyebrow"><i /> 独立创意工作室 · 上海 / 全球</div>
        <h1>
          <span>MAKE IDEAS</span>
          <span className="outline">IMPOSSIBLE</span>
          <span>TO IGNORE<i className="spark">✦</i></span>
        </h1>
        <div className="heroBottom">
          <p>我们把大胆的想法变成<br />鲜活、清晰、有影响力的体验。</p>
          <a className="roundButton" href="#work" aria-label="查看精选案例">↓</a>
          <div className="heroIndex">( 2026—27 )</div>
        </div>
      </section>

      <section className="ticker" aria-label="服务范围">
        <div>品牌策略 ✦ 视觉系统 ✦ 数字体验 ✦ 创意开发 ✦ 品牌策略 ✦ 视觉系统 ✦ 数字体验 ✦ 创意开发 ✦</div>
      </section>

      <section className="work shell" id="work">
        <header className="sectionHead">
          <p>精选案例</p>
          <h2>不同，不只是<br />看起来不同。</h2>
          <span>03 / 12</span>
        </header>

        <div className="projectGrid">
          <div className="projectTabs" role="tablist" aria-label="精选项目">
            {projects.map((item, index) => (
              <button
                key={item.id}
                className={active === index ? "active" : ""}
                onClick={() => setActive(index)}
                role="tab"
                aria-selected={active === index}
              >
                <small>{item.id}</small>
                <span>{item.label}</span>
                <b>↗</b>
              </button>
            ))}
          </div>

          <article className="projectCard" style={{ background: project.color, color: project.ink }}>
            <div className="cardMeta"><span>PROJECT / {project.id}</span><span>© NOVA STUDIO</span></div>
            <div className="orb orbOne" />
            <div className="orb orbTwo" />
            <h3>{project.title.split("\n").map((line) => <span key={line}>{line}</span>)}</h3>
            <p>{project.note}</p>
            <div className="cardMark">N°</div>
          </article>
        </div>
      </section>

      <section className="statement" id="method">
        <div className="shell statementInner">
          <p className="sideLabel">我们的信念<br />( NO. 01 )</p>
          <blockquote>
            平庸的设计<br />让人<span>滑过。</span><br />好的设计<br />让人<span className="highlight">停下。</span>
          </blockquote>
          <div className="methodNote">
            <span>策略 × 设计 × 技术</span>
            <p>不套模板，不追逐短暂的潮流。我们从问题本身出发，用清晰的逻辑和意想不到的表达，让品牌被真正记住。</p>
          </div>
        </div>
      </section>

      <section className="numbers shell">
        <div><strong>12</strong><span>年持续创造</span></div>
        <div><strong>48</strong><span>个国际奖项</span></div>
        <div><strong>91%</strong><span>客户再次合作</span></div>
        <div><strong>07</strong><span>城市协作网络</span></div>
      </section>

      <footer id="contact">
        <div className="shell footerInner">
          <p>有一个大胆的想法？</p>
          <a href="mailto:hello@nova.studio">LET’S MAKE<br />IT REAL <span>↗</span></a>
          <div className="footerMeta">
            <span>HELLO@NOVA.STUDIO</span>
            <span>INSTAGRAM · LINKEDIN · 小红书</span>
            <span>© 2026 NOVA</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
