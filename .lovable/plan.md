# Build with Bloom — Developer Templates Page

A pixel-faithful "Build with Bloom" templates page matching trybloom.ai's dark, warm-cream aesthetic with orange accents. Static, no backend, ships 8 fully-detailed templates.

## Pages & Routing

Use TanStack Router (project default) — not React Router DOM:
- `/` (`src/routes/index.tsx`) — Navbar + Hero + Template Grid + Bottom CTA + Footer
- `/templates/$slug` (`src/routes/templates.$slug.tsx`) — Detail page with sticky left column + tabbed code viewer
- `__root.tsx` head() — title "Build with Bloom — Developer Templates", description, og tags
- Detail route head() — per-template title/description/og from loader

(Spec said "React state, no router" but project is TanStack Start; using real routes gives SSR + sharable URLs which matches the agentmail.to/build/templates quality bar. Internal nav still feels instant.)

## Design Tokens (src/styles.css)

Add Bloom tokens to `:root` (oklch equivalents of the spec hex values), plus raw hex CSS vars for exact matches:

```text
--bloom-bg: #0A0A0A           --bloom-text: #F5F0E8
--bloom-card: #111111         --bloom-muted: #A09890
--bloom-elevated: #161616     --bloom-dim: #555555
--bloom-border-subtle: #1A1A1A
--bloom-border: #222222
--bloom-orange: #FF4500       --bloom-orange-hover: #E03D00
--bloom-tag-bg / tag-text / tag-border (orange tints)
--bloom-code-bg: #0D0D0D      --bloom-code-border: #1F1F1F
```

Map semantic Tailwind tokens (`--background`, `--foreground`, `--primary`, `--card`, `--border`, `--muted-foreground`) to these so existing shadcn primitives stay coherent. Inter + JetBrains Mono loaded via Google Fonts in `__root.tsx` head links.

## Data

`src/data/templates.ts` — single exported array of 8 template objects exactly as spec'd (slug, category, title, description, longDescription, integrationEmoji, integrationName, tags, difficulty, setupTime, githubUrl, demoUrl?, whatItDoes[], tabs: { label, language, code }[]). Helper `getTemplateBySlug(slug)`.

## Components (src/components/bloom/)

- `Navbar.tsx` — fixed, backdrop-blur, links + two CTAs
- `Hero.tsx` — orbs, tag pill, static + cycling headline (`useEffect` setInterval 2500ms, 300ms fade), subhead, CTAs, integration pill strip
- `CyclingWord.tsx` — handles fade out/in
- `TemplateGrid.tsx` — section header, category filter pills, responsive CSS grid
- `TemplateCard.tsx` — IntersectionObserver fade-up with `style={{ transitionDelay: index*50 + 'ms' }}`, `<Link to="/templates/$slug">`
- `BottomCTA.tsx`
- `Footer.tsx`
- `CodeViewer.tsx` — tabbed code panel for detail page; copy-to-clipboard button; highlight.js
- `TemplateDetail.tsx` — two-column layout (5fr / 7fr, stacks on mobile), sticky left, back link, badges, "How it works", tech stack, CTA buttons, embeds CodeViewer

## Syntax Highlighting

Install `highlight.js` via `bun add highlight.js`, import `highlight.js/styles/atom-one-dark.css` in `__root.tsx`. In `CodeViewer.tsx`, register only needed languages (typescript, bash, python, json) and call `hljs.highlightElement(ref.current)` in a `useEffect` keyed on active tab. (CDN script tags don't play well with SSR; npm import is the SSR-safe equivalent and matches the spec's intent.)

## Animations

- Hero word cycle: opacity transition 300ms via state machine (`fading` → swap → `visible`)
- Card scroll-in: shared `useInView` hook with IntersectionObserver, toggles a `data-visible` attribute; CSS handles `opacity` + `translateY` with 400ms ease and per-index `transition-delay`
- Card hover: `transition-all duration-200`, `hover:-translate-y-0.5`, `hover:border-[#2A2A2A]`

## Responsiveness

- Grid: `repeat(auto-fill, minmax(320px, 1fr))`
- Detail: `lg:grid-cols-[5fr_7fr]`, single column < 1024px; sticky disabled on mobile
- Navbar collapses center links < 768px (keeps CTAs)

## SEO

- Per-route `head()` with unique title + description + og:title/og:description
- Detail route: og uses template title; canonical implicit
- Single H1 per page, semantic `<section>`, alt text on emoji-as-text via aria-labels where meaningful

## Files to Create / Modify

```text
src/styles.css                          (add Bloom tokens, map semantic vars)
src/routes/__root.tsx                   (fonts, hljs css, base meta)
src/routes/index.tsx                    (replace placeholder; compose home)
src/routes/templates.$slug.tsx          (new — detail route + head + 404 handling)
src/data/templates.ts                   (new)
src/components/bloom/Navbar.tsx
src/components/bloom/Hero.tsx
src/components/bloom/CyclingWord.tsx
src/components/bloom/TemplateGrid.tsx
src/components/bloom/TemplateCard.tsx
src/components/bloom/BottomCTA.tsx
src/components/bloom/Footer.tsx
src/components/bloom/CodeViewer.tsx
src/components/bloom/TemplateDetail.tsx
src/hooks/useInView.ts
package.json                            (+ highlight.js)
```

## Out of Scope

No backend, no Lovable Cloud, no auth — fully static. External links (`trybloom.ai`, GitHub, Discord) open in new tabs with `rel="noopener"`.
