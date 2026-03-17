# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```sh
npm run dev       # Start dev server at localhost:4321
npm run build     # Build production site to ./dist/
npm run preview   # Preview production build locally
```

## Environment

Copy `.env` and set `DATOCMS_CDA_TOKEN` to a valid DatoCMS Content Delivery API token. The token is declared as a typed server-side secret in `astro.config.mjs` via Astro's `env.schema`.

## Architecture

This is an **Astro 5** site with **React** (for interactive islands) and **Tailwind CSS v4** (imported via `@tailwindcss/vite` plugin, not PostCSS).

**Data layer:** All CMS data comes from **DatoCMS** via GraphQL. `src/lib/datocms.js` wraps `@datocms/cda-client`'s `executeQuery`, injecting the token automatically. Pages call `executeQuery` at build/request time with inline GraphQL queries and pass the result down as props.

**Component model:**
- `.astro` components handle layout and static rendering. They receive CMS data as props and pass it into React islands.
- `.jsx` React components (e.g. `popup.jsx`) are used only where client-side interactivity is needed, mounted with `client:load`.
- `src/layouts/Layout.astro` is the single HTML shell; it imports `src/styles/global.css` which contains only `@import "tailwindcss"`.

**Current pages/components:**
- `src/pages/index.astro` — queries `landindPage` (logo, hero, ticket URLs) and renders `Welcome`
- `src/components/Welcome.astro` — full-page layout: logo + `Menu`, hero image, ticket `Popup`
- `src/components/Menu.astro` — static nav bar (Retailers, Events, News, Sign up, Gift Card, Search, Cart)
- `src/components/popup.jsx` — dismissible ticket image overlay; clicking it links to an external sweepstakes URL
