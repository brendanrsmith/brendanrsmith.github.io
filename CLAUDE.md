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

**Astro 5** static site with file-based routing. Deployed to GitHub Pages at `brendansmith.dev`.

### Zone-based layout system

The site is organized into independent "zones", each with its own layout and stylesheet. Zones share a common `Base.astro` shell but are visually independent.

**Layouts** (`src/layouts/`):

- `Base.astro` — minimal HTML shell: `<html>`, `<head>`, font loading, `<ClientRouter>`, `global.css`. No nav, no footer, no visual chrome.
- `Layout.astro` — wraps Base; used by existing case-study pages. Adds `SiteFooter`.
- `PostLayout.astro` — wraps Base; used by legacy markdown pages via `layout:` frontmatter.
- `Writing.astro` — writing zone layout: fixed nav, big title, article structure with sidenote support.
- `Gallery.astro` — stub for future photo zone (Vince Lo / PXP-inspired).
- `Lab.astro` — bare minimum wrapper for standalone experiments. No Base inheritance.

**Zone stylesheets** (`src/styles/zones/`):

- `writing.css` — writing zone styles. Pure CSS, no Tailwind. Uses CSS custom properties (`--accent`, `--bg`, `--text`, etc.) with `@media (prefers-color-scheme: dark)` overrides at the bottom of the file (must come _after_ base rules to win the cascade).

**Global styles** (`src/global.css`): Tailwind v4 import, Atkinson Hyperlegible font, base body/link colors. Used by all zones via Base.

### Content collections

Writing posts live in `src/content/writing/` and are defined in `src/content.config.ts`.

**Schema fields:** `title`, `date`, `description`, `draft` (default false), `listed` (default true).

**`listed: false`** — marks a page as a sub-page/appendix. It builds at its route but is excluded from the `/writing` index. Use for notebook pages, appendices, etc.

**Subdirectory structure** — posts with sub-pages use a directory:

```
src/content/writing/
  my-post/
    index.mdx       → /writing/my-post
    notebook.mdx    → /writing/my-post/notebook  (listed: false)
    image.png       → colocated, Astro-optimized
  simple-post.mdx   → /writing/simple-post
```

**Slug normalization** (in `[...slug].astro` and `index.astro`):

```js
post.id.replace(/\/index\.(md|mdx)$/, "").replace(/\.(md|mdx)$/, "");
```

### Routes

```
/                         src/pages/index.astro          (Layout.astro)
/writing                  src/pages/writing/index.astro  (Base.astro + writing.css)
/writing/[...slug]        src/pages/writing/[...slug].astro (Writing.astro)
/photos                   (stub — Gallery.astro)
/lab/[...slug]            (escape hatch — Lab.astro or no layout)
```

Legacy pages (`/ferryfriend`, `/rebu`, `/alerts`, `/avybot`, etc.) remain in `src/pages/` using `Layout.astro` or `PostLayout.astro`.

### Page types

- `.astro` pages — structured project case-study pages
- `.md` pages — legacy markdown pages with `layout:` frontmatter
- `.mdx` pages — markdown with components; used for writing content and any page needing `<Sidenote>` etc.

### Images

- **Writing content images**: colocated in `src/content/writing/[post]/` alongside the MDX. Reference with relative paths (`./image.png`) — Astro auto-optimizes.
- **Case study images**: `src/images/[project]/` — import explicitly and use `<Image>` component.
- **Static assets**: `public/` — served as-is, no optimization.

### Components

- `Sidenote.astro` — Tufte-style margin note for MDX posts. Floats right on wide screens, collapses inline on mobile. Requires `.writing-article` context for CSS.
- `Post.astro`, `PortfolioCard.astro`, `Section.astro`, `Card.astro`, `siteFooter.astro` — used by legacy layout.

### Styling approach

- **Zone stylesheets**: pure CSS for zone-specific design. Zone styles are intentional design documents, not utility collections.
- **Tailwind**: available everywhere via `global.css`, used in legacy pages and for quick utilities in `.astro` files. Not used in zone CSS files.
- **Dark mode property overrides** must appear _after_ base rules in the CSS file. CSS variable overrides can go anywhere (top of file is fine).
- **`mix-blend-mode`**: writing nav uses `multiply` (light mode) / `screen` (dark mode) to float over content without a background.

### Deployment

GitHub Actions → GitHub Pages. Pushes to `main` auto-deploy.
