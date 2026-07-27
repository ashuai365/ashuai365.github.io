import type { DemoArticleContent } from "../demo-articles";

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
        <div>
          <span>PRODUCT STORY / 产品介绍</span>
          <h2>{article.title}</h2>
          <p>{article.summary}</p>
        </div>
        <dl>
          <div>
            <dt>适合阅读</dt>
            <dd>{article.audience}</dd>
          </div>
          <div>
            <dt>阅读时间</dt>
            <dd>{article.readTime}</dd>
          </div>
          <div>
            <dt>关联演示</dt>
            <dd>{demoTitle}</dd>
          </div>
        </dl>
      </header>

      <figure className="demoArticleVisual" aria-labelledby="demo-visual-title">
        <div>
          <span>PROCESS MAP / 核心流程图</span>
          <h3 id="demo-visual-title">{article.visual.title}</h3>
        </div>
        <ol>
          {article.visual.steps.map((step, index) => (
            <li key={step.label}>
              <b>{String(index + 1).padStart(2, "0")}</b>
              <strong>{step.label}</strong>
              <small>{step.note}</small>
            </li>
          ))}
        </ol>
        <figcaption>{article.visual.caption}</figcaption>
      </figure>

      <div className="demoArticleLayout">
        <div className="demoArticleBody">
          <section className="demoArticleToolkit">
            <span>{article.toolkit.eyebrow}</span>
            <h3>{article.toolkit.title}</h3>
            <p>{article.toolkit.intro}</p>
            <div className="demoArticleTableWrap">
              <table>
                <thead>
                  <tr>
                    {article.toolkit.columns.map((column) => (
                      <th key={column}>{column}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {article.toolkit.rows.map((row) => (
                    <tr key={row.join("-")}>
                      {row.map((cell, index) => (
                        <td key={`${cell}-${index}`}>{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="demoArticleToolkitNote">
              <b>落地建议</b>
              {article.toolkit.note}
            </p>
            <div className="demoArticleChecklist">
              <h4>上线前检查清单</h4>
              <ul>
                {article.checklist.map((item) => (
                  <li key={item}>
                    <i aria-hidden="true">✓</i>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {article.sections.map((section) => (
            <section key={section.heading}>
              <h3>{section.heading}</h3>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </section>
          ))}
          <blockquote>{article.closing}</blockquote>
        </div>

        <aside className="demoArticleAside">
          <span>设计要点</span>
          <ol>
            {article.highlights.map((highlight, index) => (
              <li key={highlight}>
                <b>{String(index + 1).padStart(2, "0")}</b>
                <p>{highlight}</p>
              </li>
            ))}
          </ol>
          <a href="#top">回到顶部 ↑</a>
        </aside>
      </div>
    </article>
  );
}
