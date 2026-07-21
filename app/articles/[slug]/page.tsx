import { notFound } from "next/navigation";
import { articles } from "../article-data";

export function generateStaticParams() {
  return articles.map(({ slug }) => ({ slug }));
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = articles.find((item) => item.slug === slug);
  if (!article) notFound();

  return (
    <div className="articlePage">
      <header className="siteHeader">
        <div className="headerInner">
          <a className="siteBrand" href="/"><span className="logoMark">M</span><span className="brandCopy"><strong>MADAO</strong><small>产品经理的文稿与原型</small></span></a>
          <nav><a href="/">返回首页</a><a href="/demos/">产品演示</a><a href="#article">正文</a></nav>
        </div>
      </header>
      <main className="articleWrap" id="article">
        <a className="backLink" href="/">← 返回文章列表</a>
        <header className="articleHero">
          <div className="postMeta"><time>{article.date}</time><b>·</b><span>{article.category}</span><b>·</b><span>阅读时长 {article.readTime}</span></div>
          <h1>{article.title}</h1>
          <p>{article.lead}</p>
          <div className="tagRow">{article.tags.map((tag) => <span key={tag}># {tag}</span>)}</div>
        </header>
        <article className="articleBody">
          {article.sections.map((section) => <section key={section.heading}>
            <h2>{section.heading}</h2>
            {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            {section.bullets && <ul>{section.bullets.map((item) => <li key={item}>{item}</li>)}</ul>}
          </section>)}
        </article>
        <footer className="articleEnd"><span>END</span><a href="/">继续浏览文章 →</a></footer>
      </main>
    </div>
  );
}
