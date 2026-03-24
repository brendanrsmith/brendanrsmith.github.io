# brendansmith.dev

Personal portfolio and experimental playground. Built with Astro 5, deployed to GitHub Pages.

## Stack

- [Astro 5](https://astro.build/) — static site generation, file-based routing
- [Tailwind CSS v4](https://tailwindcss.com/) — utilities for legacy pages; zone stylesheets use plain CSS
- [Bun](https://bun.sh/) — package manager and runtime

## Development

```sh
bun install
bun run dev      # localhost:4321
bun run build    # type-check + build to ./dist/
bun run preview  # preview production build
```

## Architecture

The site uses a **zone-based layout system** — independent sections with their own design languages, all sharing a minimal `Base.astro` shell.

### Zones

| Route      | Zone    | Design reference                                     |
| ---------- | ------- | ---------------------------------------------------- |
| `/`        | Landing | Biz card                                             |
| `/writing` | Writing | Curve/bnjmnmddn — text-forward, big type, sidenotes  |
| `/photos`  | Gallery | Vince Lo / PXP — fixed frame, image-forward _(stub)_ |
| `/lab`     | Lab     | Anything goes — standalone experiments               |

### Writing content

Posts live in `src/content/writing/`. Each post is an `.mdx` file (or a directory with `index.mdx` for posts with sub-pages).

**Frontmatter:**

```yaml
---
title: My Post
date: "2025-01-15"
description: Optional description for SEO.
draft: false # exclude from build entirely
listed: true # false = sub-page, hidden from index
---
```

**Sub-pages** (appendices, notebooks, etc.) use a directory structure:

```
src/content/writing/
  my-post/
    index.mdx        → /writing/my-post
    notebook.mdx     → /writing/my-post/notebook  (listed: false)
    image.png        → colocated, auto-optimized
```

**Sidenotes** — available in `.mdx` files:

```mdx
import Sidenote from "../../components/Sidenote.astro";

Main text here. <Sidenote>This appears in the right margin on wide screens.</Sidenote>
```

### Lab pages

Any `.astro` file in `src/pages/lab/` becomes a route. Lab pages can use `Lab.astro` for a minimal wrapper, or write raw `<html>` with no layout — useful for spatial or interactive experiments.

## Deployment

Pushes to `main` auto-deploy via GitHub Actions → GitHub Pages at `brendansmith.dev`.
