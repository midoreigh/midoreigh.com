import type { APIRoute } from 'astro';
import { getPosts, SITE, CATEGORIES } from '../lib/site';

export const GET: APIRoute = async () => {
  const posts = await getPosts();
  const body = [
    `# ${SITE.name} — full text\n\n> ${SITE.description}\n`,
    ...posts.map(
      (p) =>
        `\n---\n\n# ${p.data.title}\n\nURL: ${SITE.url}/blog/${p.id}\nPublished: ${p.data.pubDate.toISOString().slice(0, 10)}\nCategory: ${CATEGORIES[p.data.category].name}\n\n${p.body?.trim() ?? ''}\n`,
    ),
  ].join('');
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
