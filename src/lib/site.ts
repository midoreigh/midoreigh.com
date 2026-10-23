import { getCollection, type CollectionEntry } from 'astro:content';

export const SITE = {
  name: 'Midoreigh',
  url: 'https://midoreigh.com',
  title: 'Midoreigh — Geopolitics, Tech & Culture',
  tagline: 'Dispatches on power, code & culture.',
  description:
    'A personal journal by Mido Reigh — long-form essays and notes on geopolitics, technology, and culture, written loud and read slowly.',
  author: 'Mido Reigh',
  github: 'https://github.com/midoreigh',
  locale: 'en_IN',
};

export const CATEGORIES = {
  geopolitics: {
    name: 'Geopolitics',
    color: '#4A0D17',
    blurb: 'Power, borders, alliances — and the long game nations play.',
  },
  tech: {
    name: 'Tech',
    color: '#0B3A2F',
    blurb: 'Software, AI and infrastructure, and the societies they rewire.',
  },
  culture: {
    name: 'Culture',
    color: '#5B3A10',
    blurb: 'Art, language, food, cinema — the stories we live inside.',
  },
  notes: {
    name: 'Notes',
    color: '#1E2440',
    blurb: 'Shorter thoughts, links, and works in progress.',
  },
} as const;

export const LANGUAGES = { en: 'English', ml: 'മലയാളം', hi: 'हिन्दी', ta: 'தமிழ்' } as const;

export type CategoryKey = keyof typeof CATEGORIES;
export type Post = CollectionEntry<'blog'>;

export async function getPosts(): Promise<Post[]> {
  const posts = await getCollection('blog', ({ data }) => import.meta.env.DEV || !data.draft);
  return posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

export function readingTime(body = ''): number {
  return Math.max(1, Math.round(body.split(/\s+/).filter(Boolean).length / 220));
}

export function formatDate(d: Date): string {
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
}
