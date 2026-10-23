import type { APIRoute, GetStaticPaths } from 'astro';
import { getPosts, SITE, CATEGORIES, type Post } from '../../lib/site';

// Plain Markdown twin of every post, for readers, scripts and LLMs.
export const getStaticPaths: GetStaticPaths = async () =>
  (await getPosts()).map((post) => ({ params: { slug: post.id }, props: { post } }));

export const GET: APIRoute = ({ props }) => {
  const { data, body, id } = props.post as Post;
  const md = `# ${data.title}

> ${data.description}

- Author: ${SITE.author}
- Published: ${data.pubDate.toISOString().slice(0, 10)}${data.updatedDate ? `\n- Updated: ${data.updatedDate.toISOString().slice(0, 10)}` : ''}
- Category: ${CATEGORIES[data.category].name}
- Tags: ${data.tags.join(', ')}
- Canonical: ${SITE.url}/blog/${id}

---

${body?.trim() ?? ''}
`;
  return new Response(md, { headers: { 'Content-Type': 'text/markdown; charset=utf-8' } });
};
