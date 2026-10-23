# midoreigh.com

Personal journal on geopolitics, technology and culture. Built with [Astro](https://astro.build), hosted on Cloudflare Workers (static assets, free plan).

Design: modern "editorial luxe" Indian maximalism — oxblood, emerald and gold; Fraunces + Newsreader type; every ornament (yantra, arches, emblems) is drawn in SVG code, no images.

## Writing

Add a Markdown file to `src/content/blog/`:

```md
---
title: 'Your title'
description: 'One-sentence summary (used for SEO, cards, RSS).'
pubDate: 2026-10-24
category: geopolitics   # geopolitics | tech | culture | notes
lang: en                # en | ml | hi | ta
tags: ['tag one', 'tag two']
featured: false         # true = cover story on the home page
draft: false
---

Your essay…
```

The filename becomes the URL: `src/content/blog/my-essay.md` → `/blog/my-essay`.

## Commands

| Command | Does |
| --- | --- |
| `npm run dev` | Local dev server at http://localhost:4321 |
| `npm run build` | Build static site into `dist/` |
| `npm run deploy` | Build and deploy to Cloudflare |
| `npm run og` | Regenerate the social share image `public/og.png` |

## SEO and AI-friendliness

- Canonical URLs, Open Graph/Twitter cards, JSON-LD (`WebSite`, `Blog`, `BlogPosting`, `BreadcrumbList`, `ProfilePage`)
- `sitemap-index.xml`, `rss.xml`, `robots.txt` (search and AI crawlers explicitly allowed)
- `llms.txt` and `llms-full.txt` ([llmstxt.org](https://llmstxt.org))
- Every post has a plain Markdown twin at `/blog/<slug>.md`, advertised via `<link rel="alternate" type="text/markdown">`
