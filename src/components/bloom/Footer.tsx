export function Footer() {
  const links = [
    { label: "Templates", href: "/" },
    { label: "API Docs", href: "https://www.trybloom.ai/api/v1/docs" },
    { label: "GitHub", href: "https://github.com/Guru6163" },
    { label: "trybloom.ai", href: "https://trybloom.ai" },
  ];
  return (
    <footer className="border-t border-bloom-border py-12 px-6 bg-bloom-bg">
      <div className="mx-auto max-w-[1200px] flex flex-wrap items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-bloom-ink">
            <span className="text-bloom-purple text-lg" aria-hidden>✦</span>
            <span className="font-serif italic text-[20px] leading-none">Bloom</span>
          </div>
          <div className="text-bloom-dim text-[13px] mt-1.5">The Brand OS</div>
        </div>
        <nav className="flex flex-wrap gap-8">
          {links.map((l) => (
            <a key={l.label} href={l.href}
              target={l.href.startsWith("http") ? "_blank" : undefined}
              rel="noopener"
              className="text-bloom-muted hover:text-bloom-ink text-[13px] transition-colors">
              {l.label}
            </a>
          ))}
        </nav>
        <div className="text-bloom-dim text-[13px]">
          Built for the Bloom developer community
        </div>
      </div>
    </footer>
  );
}
