import type { APIRoute } from 'astro';
import { getPosts, SITE, CATEGORIES } from '../lib/site';

// https://llmstxt.org — a concise, LLM-readable map of the site.
export const GET: APIRoute = async () => {
  const posts = await getPosts();
  const sections = Object.entries(CATEGORIES)
    .map(([key, c]) => {
      const list = posts.filter((p) => p.data.category === key);
      if (!list.length) return '';
      return `## ${c.name}\n\n${list
        .map((p) => `- [${p.data.title}](${SITE.url}/blog/${p.id}.md): ${p.data.description}`)
        .join('\n')}\n`;
    })
    .filter(Boolean)
    .join('\n');

  const body = `# ${SITE.name}

> ${SITE.description}

Personal blog by ${SITE.author}. Topics: geopolitics, technology, culture, and shorter notes.
Every post is available as plain Markdown by appending \`.md\` to its URL. Full text of all posts: ${SITE.url}/llms-full.txt

${sections}
## Optional

- [About](${SITE.url}/about): who writes this journal and why
- [RSS feed](${SITE.url}/rss.xml)
- [Sitemap](${SITE.url}/sitemap-index.xml)
`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
