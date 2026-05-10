import { useMemo, useState } from "react";
import { CATEGORIES, templates } from "@/data/templates";
import { TemplateCard } from "./TemplateCard";

export function TemplateGrid() {
  const [active, setActive] = useState<(typeof CATEGORIES)[number]>("All");

  const filtered = useMemo(
    () => (active === "All" ? templates : templates.filter((t) => t.category === active)),
    [active],
  );

  return (
    <section id="templates" className="py-28 px-6 relative">
      {/* Soft aurora behind grid */}
      <div className="pointer-events-none absolute inset-0 bloom-aurora opacity-40" />

      <div className="relative mx-auto max-w-[1240px]">
        {/* Header */}
        <div className="mb-14 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <div className="max-w-[640px]">
            <div className="flex items-center gap-2 text-bloom-muted text-[11px] font-medium uppercase tracking-[0.22em] mb-5">
              <span className="w-8 h-px bg-bloom-purple/50" />
              <span>The Library</span>
            </div>
            <h2
              className="text-bloom-ink font-serif tracking-[-0.025em]"
              style={{ fontSize: "clamp(40px, 5.5vw, 68px)", lineHeight: 1 }}
            >
              Four templates.{" "}
              <em className="text-bloom-purple">One afternoon</em> to ship.
            </h2>
            <p className="mt-5 text-bloom-muted text-[16.5px] leading-relaxed max-w-[520px]">
              Real, production-ready integrations. Clone the repo, drop in your Bloom key,
              and you're live before your coffee gets cold.
            </p>
          </div>

          <div className="text-bloom-muted text-[13px] tabular-nums">
            <div className="font-serif italic text-bloom-ink text-[44px] leading-none">
              {String(filtered.length).padStart(2, "0")}
            </div>
            <div className="mt-1">
              {active === "All" ? "templates available" : `in ${active}`}
            </div>
          </div>
        </div>

        {/* Filter pills */}
        <div className="flex flex-wrap items-center gap-1.5 mb-12 p-1.5 rounded-full bg-white border border-bloom-border w-fit shadow-[0_4px_24px_-12px_rgba(124,58,237,0.18)]">
          {CATEGORIES.map((cat) => {
            const isActive = active === cat;
            return (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={[
                  "rounded-full text-[13px] px-4 py-2 transition-all duration-200 font-medium",
                  isActive
                    ? "bg-bloom-ink text-white shadow-sm"
                    : "text-bloom-muted hover:text-bloom-ink",
                ].join(" ")}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Grid */}
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((t, i) => (
            <TemplateCard key={t.slug} template={t} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
