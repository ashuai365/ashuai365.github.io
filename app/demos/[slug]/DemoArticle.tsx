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

      <div className="demoArticleLayout">
        <div className="demoArticleBody">
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
