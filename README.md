# Build with Bloom — Developer Templates

A static marketing and documentation-style site that showcases [Bloom](https://trybloom.ai) API integration templates: real code samples, categories, and detail pages for each template. It is built for fast browsing and cloning ideas—there is no backend or auth in this repo; everything is rendered as a TanStack Start app with optional Cloudflare Workers deployment.

## Stack

- [TanStack Start](https://tanstack.com/start) + [TanStack Router](https://tanstack.com/router) + [React 19](https://react.dev)
- [Vite 7](https://vite.dev), [TypeScript](https://www.typescriptlang.org)
- [Tailwind CSS 4](https://tailwindcss.com), [Radix UI](https://www.radix-ui.com) primitives


## Requirements

- **Node.js** 22+ recommended (matches TanStack Start tooling expectations)
- **npm**, **pnpm**, or **bun** for installs

## Scripts

| Command            | Description                          |
| ------------------ | ------------------------------------ |
| `npm install`      | Install dependencies                 |
| `npm run dev`      | Local dev server (default port 8080) |
| `npm run build`    | Production client + SSR/worker build |
| `npm run preview`  | Preview production output            |
| `npm run lint`     | ESLint                               |
| `npm run format`   | Prettier                             |

## Project layout

- `src/routes/` — file-based routes (`/`, `/templates/:slug`, root shell and meta)
- `src/data/templates.ts` — template definitions, categories, and tabbed code samples
- `src/components/bloom/` — page sections (hero, grid, detail, navbar, footer, etc.)
- `src/server.ts` — Cloudflare Worker entry that wraps TanStack’s server handler
- `vite.config.ts` — Vite, Tailwind, TanStack Start, and Cloudflare build integration
- `wrangler.jsonc` — Wrangler project name, compatibility, and worker `main`

## Deploying to Cloudflare

1. Run `npm run build`.
2. Use [Wrangler](https://developers.cloudflare.com/workers/wrangler/) to deploy the bundle Vite emits under `dist/server/` (see `dist/server/wrangler.json` after a build). Adjust routes, custom domains, and secrets in the Cloudflare dashboard as needed.

## Bloom API

- Product: [trybloom.ai](https://trybloom.ai)
- Developers: [trybloom.ai/developers](https://trybloom.ai/developers)
- API reference: [trybloom.ai API docs](https://www.trybloom.ai/api/v1/docs)

## License

Private / unlicensed unless you add a `LICENSE` file.
