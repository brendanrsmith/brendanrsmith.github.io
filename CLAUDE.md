# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

Use `bun` as the package manager (not npm/yarn).

```sh
bun install          # Install dependencies
bun run dev          # Start dev server at localhost:4321
bun run build        # Type-check (astro check) then build to ./dist/
bun run preview      # Preview production build locally
```

There are no tests in this project.

## Architecture

**Astro 5** static site with file-based routing. All pages live in `src/pages/` — Astro routes them by filename.

**Page types:**
- `.astro` pages — structured project case-study pages (e.g., `ferryfriend.astro`, `rebu.astro`)
- `.md` pages — simple markdown content pages (e.g., `about.md`, `avybot.md`)
- `.mdx` pages — markdown with embedded components (used in `alerts/` subdirectory)

**Layouts:**
- `Layout.astro` — main HTML wrapper; includes nav, footer, dark mode support, Atkinson Hyperlegible font, and Astro's `<ClientRouter>` for view transitions
- `PostLayout.astro` — wraps `Layout.astro`; used by markdown/MDX frontmatter (`layout:` field) for blog-style posts; handles date display via the `Post.astro` component

**Styling:** Tailwind CSS v4 (Vite plugin, not PostCSS). Global styles and theme in `src/global.css`. Typography plugin enabled for prose content. Color scheme uses indigo as primary, with dark mode variants.

**React** is available via `@astrojs/react` for interactive components, but most pages are pure Astro.

**Images** are organized by project under `src/images/` (e.g., `ff/`, `rebu/`, `tilemaker/`). Use Astro's `<Image>` component for optimization.

**Deployment:** GitHub Actions → GitHub Pages. Pushes to `main` auto-deploy. Custom domain: `brendansmith.dev`.
