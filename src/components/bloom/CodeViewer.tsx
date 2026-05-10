import { useEffect, useRef, useState } from "react";
import hljs from "highlight.js/lib/core";
import typescript from "highlight.js/lib/languages/typescript";
import bash from "highlight.js/lib/languages/bash";
import python from "highlight.js/lib/languages/python";
import json from "highlight.js/lib/languages/json";
import type { TemplateTab } from "@/data/templates";

let registered = false;
function ensureRegistered() {
  if (registered) return;
  hljs.registerLanguage("typescript", typescript);
  hljs.registerLanguage("javascript", typescript);
  hljs.registerLanguage("bash", bash);
  hljs.registerLanguage("shell", bash);
  hljs.registerLanguage("python", python);
  hljs.registerLanguage("json", json);
  registered = true;
}

export function CodeViewer({ tabs }: { tabs: TemplateTab[] }) {
  ensureRegistered();
  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState(false);
  const codeRef = useRef<HTMLElement | null>(null);

  const tab = tabs[active];

  useEffect(() => {
    if (codeRef.current) {
      codeRef.current.removeAttribute("data-highlighted");
      codeRef.current.className = `language-${tab.language}`;
      codeRef.current.textContent = tab.code;
      try {
        hljs.highlightElement(codeRef.current);
      } catch {
        /* ignore */
      }
    }
  }, [active, tab]);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(tab.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  };

  return (
    <div className="bloom-code rounded-2xl overflow-hidden border border-bloom-code-border shadow-[0_24px_60px_-24px_rgba(26,20,23,0.35)]"
      style={{ backgroundColor: "#1a1417" }}>
      <div className="flex border-b border-white/5 overflow-x-auto" style={{ backgroundColor: "rgba(255,255,255,0.03)" }}>
        {tabs.map((t, i) => (
          <button
            key={t.label}
            onClick={() => setActive(i)}
            className={
              "px-4 py-3 text-[13px] whitespace-nowrap transition-colors border-b-2 " +
              (i === active
                ? "text-white border-bloom-purple-soft"
                : "text-white/55 border-transparent hover:text-white")
            }
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="relative" style={{ maxHeight: 520, overflow: "auto" }}>
        <button
          onClick={onCopy}
          className="absolute top-3 right-3 z-10 px-2.5 py-1 rounded-md text-[11px] border border-white/10 bg-white/5 text-white/70 hover:text-white hover:bg-white/10 transition-colors"
        >
          {copied ? "✓ Copied!" : "Copy"}
        </button>
        <pre className="m-0 p-4 sm:p-6 text-[12px] sm:text-[13px]" style={{ background: "transparent" }}>
          <code ref={codeRef} className={`language-${tab.language}`}>
            {tab.code}
          </code>
        </pre>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 px-4 sm:px-6 py-3 sm:py-4 border-t border-white/5">
        <span className="text-white/50 text-[11px] sm:text-[12px]">
          Replace <code className="font-mono">bloom_sk_...</code> with your API key
        </span>
        <a
          href="https://trybloom.ai/developers"
          target="_blank" rel="noopener"
          className="text-bloom-purple-soft hover:text-white text-[11px] sm:text-[12px] transition-colors"
        >
          Get free API key →
        </a>
      </div>
    </div>
  );
}
