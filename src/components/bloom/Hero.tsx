import { useEffect, useState } from "react";
import { ArrowDown, ArrowUpRight, MessageSquare, Figma, Image as ImageIcon, Zap, type LucideIcon } from "lucide-react";

const CYCLING_WORDS = [
  "Slack agents",
  "Figma plugins",
  "Canva apps",
  "campaign generators",
];

const INTEGRATIONS: { name: string; Icon: LucideIcon }[] = [
  { name: "Slack", Icon: MessageSquare },
  { name: "Figma", Icon: Figma },
  { name: "Canva", Icon: ImageIcon },
  { name: "Automation", Icon: Zap },
];

export function Hero() {
  const [idx, setIdx] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIdx((i) => (i + 1) % CYCLING_WORDS.length);
        setVisible(true);
      }, 300);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const scrollToTemplates = () => {
    document.getElementById("templates")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="relative overflow-hidden pt-36 pb-28 px-6 text-center">
      {/* Aurora wash */}
      <div aria-hidden className="absolute inset-0 bloom-aurora opacity-70 pointer-events-none" />
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-40 pointer-events-none"
        style={{ background: "linear-gradient(180deg, transparent, #fdfaf7)" }} />

      <div className="relative z-10 mx-auto max-w-[920px]">
        <span className="inline-flex items-center gap-2 mb-10 px-3.5 py-1.5 rounded-full bg-white/80 backdrop-blur border border-bloom-border text-[12px] text-bloom-muted">
          <span className="w-1.5 h-1.5 rounded-full bg-bloom-purple" />
          Build with Bloom
        </span>

        <h1 className="text-bloom-ink font-serif"
          style={{ fontSize: "clamp(48px, 7vw, 88px)", lineHeight: 1.02, letterSpacing: "-0.02em" }}>
          <span>Templates for </span>
          <em
            className="text-bloom-purple inline-block transition-opacity duration-300 align-baseline"
            style={{ opacity: visible ? 1 : 0, fontStyle: "italic" }}
          >
            {CYCLING_WORDS[idx]}
          </em>
        </h1>

        <p className="mt-8 mx-auto max-w-[560px] text-bloom-muted text-[18px] leading-relaxed">
          Real working integrations built on Bloom's API and MCP.
          Clone and deploy in minutes.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={scrollToTemplates}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-bloom-purple hover:bg-bloom-purple-deep text-white text-[15px] font-medium transition-colors shadow-[0_8px_24px_-8px_rgba(124,58,237,0.5)]"
          >
            Browse templates
            <ArrowDown size={15} strokeWidth={2} />
          </button>
          <a
            href="https://www.trybloom.ai/api/v1/docs"
            target="_blank" rel="noopener"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white border border-bloom-border-strong hover:border-bloom-ink text-bloom-ink text-[15px] transition-colors"
          >
            Read the docs
            <ArrowUpRight size={15} strokeWidth={2} />
          </a>
        </div>

        <div className="mt-16">
          <div className="text-bloom-dim text-[11px] uppercase mb-4 tracking-[0.18em]">
            Works with
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {INTEGRATIONS.map(({ name, Icon }) => (
              <span key={name}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-bloom-border bg-white/70 backdrop-blur text-[13px] text-bloom-text">
                <Icon size={14} strokeWidth={1.8} className="text-bloom-purple" />
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
