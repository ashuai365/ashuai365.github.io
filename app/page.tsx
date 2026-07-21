const posts = [
  {
    slug: "commodity-ai-commercial-loop",
    date: "2026-07-20",
    title: "大宗智能体如何从 AI 问答走向商业闭环",
    category: "AI 产品",
    tags: ["大宗智能体", "产品规划"],
    excerpt: "为什么行业智能体不应止于付费问答，以及如何连接决策、服务与交易价值。",
    readTime: "7 分钟",
  },
  {
    slug: "paywall-after-value",
    date: "2026-07-18",
    title: "先让用户感知价值，再谈付费墙",
    category: "产品设计",
    tags: ["付费墙", "会员体系"],
    excerpt: "行业 AI 产品如何设计免费额度、会员权益和单项付费，而不伤害核心体验。",
    readTime: "6 分钟",
  },
  {
    slug: "90-day-validation-framework",
    date: "2026-07-16",
    title: "用 90 天验证一个行业智能体是否成立",
    category: "方法论",
    tags: ["指标体系", "MVP"],
    excerpt: "从产品价值、商业化、交易转化和 AI 成本四个维度建立验证框架。",
    readTime: "8 分钟",
  },
];

const archives = [
  ["2026 年 7 月", 4],
  ["2026 年 6 月", 3],
  ["2026 年 5 月", 2],
];

export default function Home() {
  return (
    <div className="siteFrame">
      <header className="siteHeader">
        <div className="headerInner">
          <a className="siteBrand" href="#top">
            <span className="logoMark" aria-hidden="true">M</span>
            <span className="brandCopy">
              <strong>MADAO</strong>
              <small>产品经理的文稿与原型</small>
            </span>
          </a>
          <nav aria-label="博客导航">
            <a href="#top">首页</a>
            <a href="/demos/">产品演示</a>
            <a href="#archive">归档</a>
            <a href="#categories">分类</a>
            <a href="#tags">标签</a>
            <a href="#about">关于</a>
          </nav>
        </div>
      </header>

      <main className="page" id="top">
        <section className="content" aria-label="文章列表">
          <div className="intro">
            <span>产品经理个人网站</span>
            <h1>把复杂的业务，<br />写成清晰的产品。</h1>
            <p>这里记录一名产品经理对大宗交易、供应链金融、产业互联网与 AI 产品的实践和思考。</p>
          </div>

          <div className="postList">
            {posts.map((post, index) => (
              <article className="post" key={post.title}>
                <header>
                  <h2><a href={`/articles/${post.slug}/`}>{post.title}</a></h2>
                  <div className="postMeta">
                    <time>{post.date}</time><b>·</b><span>{post.category}</span><b>·</b><span>阅读时长 {post.readTime}</span>
                  </div>
                </header>
                <p>{post.excerpt}</p>
                <footer>
                  <div className="tagRow">{post.tags.map((tag) => <span key={tag}># {tag}</span>)}</div>
                  <a className="readMore" href={`/articles/${post.slug}/`}>阅读全文 →</a>
                </footer>
              </article>
            ))}
          </div>

          <nav className="pagination" aria-label="分页">
            <span className="current">1</span><a href="#top">2</a><a href="#top">3</a><a href="#top">下一页 ›</a>
          </nav>
        </section>

        <aside className="sidebar">
          <section className="profile" id="about">
            <div className="profileLogo"><span className="logoMark" aria-hidden="true">M</span></div>
            <h2>MADAO</h2>
            <p>高级产品经理</p>
            <div className="profileStats">
              <a href="#archive"><strong>23</strong><span>日志</span></a>
              <a href="#categories"><strong>6</strong><span>分类</span></a>
              <a href="#tags"><strong>18</strong><span>标签</span></a>
            </div>
            <div className="focus">大宗交易 · 供应链金融<br />产业互联网 · AI 产品</div>
          </section>

          <section className="sideCard" id="categories">
            <h3>分类</h3>
            <ul>
              <li><a href="#top"><span>AI 产品</span><b>8</b></a></li>
              <li><a href="#top"><span>产品设计</span><b>6</b></a></li>
              <li><a href="#top"><span>供应链</span><b>5</b></a></li>
              <li><a href="#top"><span>方法论</span><b>4</b></a></li>
            </ul>
          </section>

          <section className="sideCard" id="archive">
            <h3>归档</h3>
            <ul>{archives.map(([month, count]) => <li key={month}><a href="#top"><span>{month}</span><b>{count}</b></a></li>)}</ul>
          </section>

          <section className="sideCard" id="tags">
            <h3>标签云</h3>
            <div className="tagCloud">
              <a href="#top">产品规划</a><a href="#top">AI</a><a href="#top">大宗交易</a><a href="#top">供应链</a><a href="#top">原型</a><a href="#top">业务流程</a>
            </div>
          </section>
        </aside>
      </main>

      <footer className="siteFooter">
        <p>© 2026 MADAO · 用产品视角理解复杂世界</p>
        <a href="#top" aria-label="返回顶部">↑</a>
      </footer>
    </div>
  );
}
