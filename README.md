# midoreigh.com

Personal journal on geopolitics, technology and culture. Built with [Astro](https://astro.build), hosted on Cloudflare Workers (static assets, free plan).

Design: modern "editorial luxe" Indian maximalism — oxblood, emerald and gold; Fraunces + Newsreader type; every ornament (yantra, gilt frames, emblems) is drawn in SVG/CSS code. Pictures sit in a gilt miniature frame (`src/components/Gilt.astro`) that settles in with a gold sheen; dark mode adds a lacquer glow, faint brocade pattern and grain.

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
cover: '../../assets/blog/my-essay/cover.jpg'   # optional; shown on the post, in lists and as the share image
coverAlt: 'Describe the image'
draft: false
---

Your essay…
```

The filename becomes the URL: `src/content/blog/my-essay.md` → `/blog/my-essay`.

Images go in `src/assets/blog/<post>/` and are optimised at build time (WebP, several sizes). In the post, an italic line straight after an image becomes its caption:

```md
![Alt text describing the image](../../assets/blog/my-essay/photo.jpg)

*Caption shown under the image.*
```

## Deploying

Cloudflare Workers Builds watches this repo: every push to `main` runs `npm run build` and `npx wrangler deploy`. Push a new post and it's live in a minute or two.

## Commands

| Command | Does |
| --- | --- |
| `npm run dev` | Local dev server at http://localhost:4321 |
| `npm run build` | Build static site into `dist/` |
| `npm run deploy` | Build and deploy to Cloudflare by hand (pushes to `main` deploy automatically) |
| `npm run deploy:www` | Deploy the tiny Worker that redirects www.midoreigh.com to midoreigh.com |
| `npm run og` | Regenerate the social share image `public/og.png` |

## SEO and AI-friendliness

- Canonical URLs, Open Graph/Twitter cards, JSON-LD (`WebSite`, `Blog`, `BlogPosting`, `BreadcrumbList`, `ProfilePage`)
- `sitemap-index.xml`, `rss.xml`, `robots.txt` (search and AI crawlers explicitly allowed)
- `llms.txt` and `llms-full.txt` ([llmstxt.org](https://llmstxt.org))
- Every post has a plain Markdown twin at `/blog/<slug>.md`, advertised via `<link rel="alternate" type="text/markdown">`
