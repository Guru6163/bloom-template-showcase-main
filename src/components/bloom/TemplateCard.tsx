import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { useInView } from "@/hooks/useInView";
import type { Template } from "@/data/templates";
import { getIntegrationIcon } from "./icons";

const categoryGradient: Record<string, string> = {
  Slack: "from-[#f3edff] via-[#fbeaf3] to-[#fff7ee]",
  "Design Tools": "from-[#fbeaf3] via-[#f3edff] to-[#fff7ee]",
  "E-commerce": "from-[#fff1e6] via-[#f7f1ea] to-[#f3edff]",
  Automation: "from-[#eef3ff] via-[#f3edff] to-[#fbeaf3]",
  Developer: "from-[#f7f1ea] via-[#ece5dd] to-[#f3edff]",
};

export function TemplateCard({
  template,
  index,
  featured = false,
}: {
  template: Template;
  index: number;
  featured?: boolean;
}) {
  const { ref, inView } = useInView<HTMLAnchorElement>();
  const grad = categoryGradient[template.category] ?? "from-bloom-cream to-white";
  const num = String(index + 1).padStart(2, "0");
  const Icon = getIntegrationIcon(template.integrationName);

  return (
    <Link
      to="/templates/$slug"
      params={{ slug: template.slug }}
      ref={ref as any}
      data-visible={inView}
      style={{ transitionDelay: `${index * 60}ms` }}
      className={[
        "bloom-fade-up group relative overflow-hidden rounded-3xl border border-bloom-border bg-white",
        "transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_30px_60px_-30px_rgba(124,58,237,0.35)] hover:border-bloom-purple-soft",
        "no-underline flex flex-col",
        featured ? "lg:col-span-2 lg:row-span-2 min-h-[420px]" : "min-h-[280px]",
      ].join(" ")}
    >
      {/* Gradient wash */}
      <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${grad} opacity-70`} />
      {/* Grain / noise overlay via radial */}
      <div className="pointer-events-none absolute -top-24 -right-24 w-72 h-72 rounded-full bg-bloom-purple/10 blur-3xl" />

      <div className="relative flex flex-col h-full p-7">
        {/* Top row: number + category */}
        <div className="flex items-center justify-between">
          <span className="font-serif italic text-bloom-purple/70 text-[18px] leading-none">
            {num}
          </span>
          <span className="text-[10px] uppercase tracking-[0.18em] text-bloom-muted">
            {template.category}
          </span>
        </div>

        {/* Integration mark */}
        <div className="mt-7 flex items-center gap-3">
          <div
            className={[
              "flex items-center justify-center rounded-2xl bg-white border border-bloom-border shadow-sm text-bloom-ink",
              featured ? "w-16 h-16" : "w-12 h-12",
            ].join(" ")}
          >
            <Icon
              size={featured ? 28 : 22}
              strokeWidth={1.6}
              aria-label={template.integrationName}
            />
          </div>
          <div className="text-bloom-muted text-[12px]">
            <div className="text-bloom-ink font-medium text-[13px]">{template.integrationName}</div>
            <div>{template.difficulty} · {template.setupTime}</div>
          </div>
        </div>

        {/* Title */}
        <h3
          className={[
            "mt-6 font-serif text-bloom-ink tracking-[-0.01em] leading-[1.05]",
            featured ? "text-[40px]" : "text-[24px]",
          ].join(" ")}
        >
          {template.title.split(" ").slice(0, -1).join(" ")}{" "}
          <em className="text-bloom-purple">{template.title.split(" ").slice(-1)}</em>
        </h3>

        {/* Description */}
        <p
          className={[
            "mt-3 text-bloom-text/80 leading-relaxed",
            featured ? "text-[15px] max-w-[52ch]" : "text-[13.5px] line-clamp-3",
          ].join(" ")}
        >
          {template.description}
        </p>

        {/* Featured: code peek */}
        {featured && (
          <div className="mt-6 hidden lg:block rounded-xl bg-bloom-code-bg border border-bloom-code-border p-4 font-mono text-[12px] text-[#f5efe7] leading-relaxed overflow-hidden max-h-[140px]">
            <div className="text-[#a78bfa]">$ git clone</div>
            <div className="text-[#f5d3e8] truncate">{template.githubUrl}</div>
            <div className="text-bloom-muted/80 mt-2">// {template.whatItDoes[0]}</div>
          </div>
        )}

        {/* Footer: tags + arrow */}
        <div className="mt-auto pt-6 flex items-end justify-between gap-3">
          <div className="flex flex-wrap gap-1.5">
            {template.tags.slice(0, featured ? 4 : 2).map((t) => (
              <span
                key={t}
                className="rounded-full text-[11px] px-2.5 py-1 bg-white/70 backdrop-blur text-bloom-text border border-bloom-border"
              >
                {t}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-1.5 text-bloom-purple text-[13px] font-medium whitespace-nowrap">
            <span className="font-serif italic">Open</span>
            <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </div>
      </div>
    </Link>
  );
}
