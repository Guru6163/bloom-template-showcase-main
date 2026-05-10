export function BottomCTA() {
  return (
    <section className="relative overflow-hidden py-24 px-6">
      <div aria-hidden className="absolute inset-0 bloom-aurora opacity-60 pointer-events-none" />
      <div className="relative mx-auto max-w-[680px] text-center">
        <span className="inline-flex items-center gap-2 mb-8 px-3.5 py-1.5 rounded-full bg-white/80 backdrop-blur border border-bloom-border text-[12px] text-bloom-muted">
          <span className="w-1.5 h-1.5 rounded-full bg-bloom-purple" />
          Get started
        </span>
        <h2 className="text-bloom-ink font-serif tracking-[-0.02em] mb-4"
          style={{ fontSize: "clamp(36px, 5vw, 60px)", lineHeight: 1.05 }}>
          Start building with <em className="text-bloom-purple">Bloom</em>
        </h2>
        <p className="text-bloom-muted text-[18px] mb-10">
          Free API key. 50 credits to start. No credit card required.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <a href="https://trybloom.ai/developers" target="_blank" rel="noopener"
            className="inline-flex items-center px-6 py-3 rounded-full bg-bloom-purple hover:bg-bloom-purple-deep text-white text-[15px] font-medium transition-colors shadow-[0_8px_24px_-8px_rgba(124,58,237,0.5)]">
            Get your API key →
          </a>
          <a href="https://www.trybloom.ai/api/v1/docs" target="_blank" rel="noopener"
            className="inline-flex items-center px-6 py-3 rounded-full bg-white border border-bloom-border-strong hover:border-bloom-ink text-bloom-ink text-[15px] transition-colors">
            Read the docs
          </a>
        </div>
      </div>
    </section>
  );
}
