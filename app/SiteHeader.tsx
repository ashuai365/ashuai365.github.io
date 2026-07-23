type Section = "home" | "demos" | "categories" | "tags" | "about";

const links: { href: string; label: string; key: Section }[] = [
  { href: "/", label: "首页", key: "home" },
  { href: "/demos/", label: "产品演示", key: "demos" },
  { href: "/categories/", label: "分类", key: "categories" },
  { href: "/tags/", label: "标签", key: "tags" },
  { href: "/about/", label: "关于", key: "about" },
];

export default function SiteHeader({ active }: { active: Section }) {
  return <header className="siteHeader"><div className="headerInner">
    <a className="siteBrand" href="/">
      <img className="brandAvatar" src="/product-manager-club-logo.png" alt="产品经理club Logo" />
      <span className="brandCopy"><strong>产品经理club</strong><small>作者：MADAO</small></span>
    </a>
    <nav aria-label="网站主导航">{links.map(link=><a key={link.key} className={active===link.key?"navActive":""} aria-current={active===link.key?"page":undefined} href={link.href}>{link.label}</a>)}</nav>
  </div></header>;
}
