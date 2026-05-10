import { Link } from "@tanstack/react-router";
import bloomLogo from "@/assets/bloom-logo.png";

const NAV_LINKS = [
  { label: "Features", href: "https://trybloom.ai" },
  { label: "Teams", href: "https://trybloom.ai/teams" },
  { label: "MCP", href: "https://trybloom.ai/mcp" },
  { label: "Pricing", href: "https://trybloom.ai/pricing" },
];

function BloomLogo() {
  return (
    <a
      href="https://trybloom.ai"
      target="_blank"
      rel="noopener"
      className="flex items-center gap-2 text-bloom-ink"
      aria-label="Bloom"
    >
      <img
        src={bloomLogo}
        alt="Bloom"
        className="h-7 w-7 rounded-md object-cover"
      />
      <span
        className="font-serif italic text-[22px] leading-none"
        style={{ fontFamily: '"Instrument Serif", serif' }}
      >
        Bloom
      </span>
    </a>
  );
}

export function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 pt-4 px-4">
      <div
        className="mx-auto max-w-[1180px] h-14 px-5 flex items-center justify-between rounded-full backdrop-blur-xl"
        style={{
          backgroundColor: "rgba(255,255,255,0.72)",
          border: "1px solid rgba(236,229,221,0.9)",
          boxShadow: "0 8px 30px -12px rgba(124,58,237,0.12)",
        }}
      >
        <BloomLogo />

        <nav className="hidden md:flex items-center gap-7 text-[14px]">
          {NAV_LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target="_blank"
              rel="noopener"
              className="text-bloom-text/80 hover:text-bloom-ink transition-colors"
            >
              {l.label}
            </a>
          ))}
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-bloom-ink hover:text-bloom-purple transition-colors"
          >
            Templates
            <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-bloom-purple/10 text-bloom-purple uppercase tracking-wider">
              New
            </span>
          </Link>
        </nav>

        <a
          href="https://trybloom.ai"
          target="_blank"
          rel="noopener"
          className="inline-flex items-center px-4 py-2 rounded-full bg-bloom-ink text-white text-[13px] font-medium hover:bg-black transition-colors"
        >
          Get started
        </a>
      </div>
    </header>
  );
}
