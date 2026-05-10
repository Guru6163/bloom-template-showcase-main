import { useEffect } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowUpRight,
  Github,
  ExternalLink,
  Clock,
  Gauge,
  Sparkles,
  Check,
  Tag,
  KeyRound,
} from "lucide-react";
import type { Template } from "@/data/templates";
import { CodeViewer } from "./CodeViewer";
import { getIntegrationIcon } from "./icons";

export function TemplateDetail({ template }: { template: Template }) {
  useEffect(() => {
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "auto" });
  }, [template.slug]);

  const Icon = getIntegrationIcon(template.integrationName);

  return (
    <div className="relative px-4 sm:px-6 pt-24 sm:pt-28 pb-16 sm:pb-24">
      {/* Soft aurora */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bloom-aurora opacity-50" />

      <div className="relative mx-auto max-w-[1200px]">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 mb-10 text-bloom-muted hover:text-bloom-ink text-sm transition-colors"
        >
          <ArrowLeft size={14} strokeWidth={1.8} />
          All templates
        </Link>

        {/* HERO HEADER */}
        <header className="mb-14">
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white border border-bloom-border px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-bloom-muted">
              <Tag size={11} strokeWidth={2} />
              {template.category}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white border border-bloom-border px-3 py-1 text-[11px] text-bloom-muted">
              <Gauge size={11} strokeWidth={2} />
              {template.difficulty}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white border border-bloom-border px-3 py-1 text-[11px] text-bloom-muted">
              <Clock size={11} strokeWidth={2} />
              {template.setupTime}
            </span>
          </div>

          <div className="flex items-start gap-4 sm:gap-6 flex-wrap">
            {/* Integration mark */}
            <div className="flex items-center gap-3 shrink-0">
              <div className="w-14 h-14 rounded-2xl bg-bloom-purple-tint border border-bloom-border flex items-center justify-center text-bloom-purple shadow-sm">
                <Sparkles size={22} strokeWidth={1.6} />
              </div>
              <div className="font-serif italic text-bloom-muted text-3xl leading-none">×</div>
              <div className="w-14 h-14 rounded-2xl bg-white border border-bloom-border flex items-center justify-center text-bloom-ink shadow-sm">
                <Icon size={26} strokeWidth={1.6} aria-label={template.integrationName} />
              </div>
            </div>

            <div className="flex-1 min-w-[280px]">
              <h1
                className="text-bloom-ink font-serif tracking-[-0.025em] break-words"
                style={{ fontSize: "clamp(30px, 5vw, 60px)", lineHeight: 1.04 }}
              >
                {template.title.split(" ").slice(0, -1).join(" ")}{" "}
                <em className="text-bloom-purple">
                  {template.title.split(" ").slice(-1)}
                </em>
              </h1>
              <p className="mt-4 text-bloom-muted text-[15px] sm:text-[17px] leading-relaxed max-w-[640px]">
                {template.longDescription}
              </p>
            </div>
          </div>

          {/* Action bar */}
          <div className="flex flex-wrap items-center gap-2 mt-8">
            <a
              href="https://trybloom.ai/developers"
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-bloom-purple hover:bg-bloom-purple-deep text-white text-sm font-medium transition-colors shadow-[0_8px_24px_-8px_rgba(124,58,237,0.5)]"
            >
              <KeyRound size={14} strokeWidth={2} />
              Get your Bloom API key
            </a>
            <a
              href={template.githubUrl}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-bloom-border-strong hover:border-bloom-ink text-bloom-ink text-sm transition-colors"
            >
              <Github size={14} strokeWidth={1.8} />
              View on GitHub
            </a>
            {template.demoUrl && (
              <a
                href={template.demoUrl}
                target="_blank"
                rel="noopener"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-bloom-border-strong hover:border-bloom-ink text-bloom-ink text-sm transition-colors"
              >
                <ExternalLink size={14} strokeWidth={1.8} />
                Live demo
              </a>
            )}
          </div>
        </header>

        {/* MAIN GRID */}
        <div className="grid gap-8 lg:gap-14 items-start lg:grid-cols-[5fr_7fr]">
          {/* LEFT — How it works + tags */}
          <aside className="lg:sticky" style={{ top: 96 }}>
            <div className="rounded-3xl bg-white border border-bloom-border p-5 sm:p-7 shadow-[0_24px_60px_-32px_rgba(124,58,237,0.18)]">
              <div className="flex items-center gap-2 text-bloom-ink text-xs font-semibold uppercase mb-5 tracking-[0.14em]">
                <Sparkles size={13} strokeWidth={2} className="text-bloom-purple" />
                How it works
              </div>
              <ul className="m-0 p-0 list-none space-y-3.5">
                {template.whatItDoes.map((line) => (
                  <li key={line} className="flex gap-3">
                    <span className="mt-0.5 inline-flex w-5 h-5 rounded-full bg-bloom-purple-tint text-bloom-purple items-center justify-center shrink-0">
                      <Check size={12} strokeWidth={2.5} />
                    </span>
                    <span className="text-bloom-text text-[14.5px] leading-relaxed">
                      {line}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="h-px bg-bloom-border my-7" />

              <div className="text-bloom-dim text-xs uppercase mb-3 tracking-[0.14em]">
                Built with
              </div>
              <div className="flex flex-wrap gap-1.5">
                {template.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full text-[11px] px-2.5 py-1 bg-bloom-cream text-bloom-text border border-bloom-border"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <a
              href="https://trybloom.ai/developers"
              target="_blank"
              rel="noopener"
              className="group mt-4 flex items-center justify-between gap-3 px-5 py-4 rounded-2xl bg-bloom-ink text-white text-sm transition-colors hover:bg-black"
            >
              <span className="flex items-center gap-2.5">
                <span className="inline-flex w-7 h-7 rounded-full bg-white/10 items-center justify-center">
                  <KeyRound size={13} strokeWidth={2} />
                </span>
                <span>
                  <span className="block font-medium">Free to start</span>
                  <span className="block text-white/60 text-[12px]">No credit card required</span>
                </span>
              </span>
              <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </aside>

          {/* RIGHT — Code */}
          <div>
            <div className="flex items-center justify-between mb-3 px-1">
              <div className="text-bloom-ink text-xs font-semibold uppercase tracking-[0.14em]">
                The code
              </div>
              <div className="text-bloom-dim text-[11px]">
                {template.tabs.length} {template.tabs.length === 1 ? "snippet" : "snippets"}
              </div>
            </div>
            <CodeViewer tabs={template.tabs} />
          </div>
        </div>
      </div>
    </div>
  );
}
