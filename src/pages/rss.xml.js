import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { AUTHOR } from '../consts';

export async function GET(context) {
  const posts = (await getCollection('blog'))
    .filter((p) => !p.data.draft && !p.slug.startsWith('politics/'))
    .sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime());

  return rss({
    title: `${AUTHOR} — Blog`,
    description: 'A blog on software, music, meaning, and miscellany.',
    site: context.site,
    items: posts.map((p) => ({
      title: p.data.title,
      description: p.data.description,
      pubDate: p.data.pubDate,
      link: `/blog/${p.slug}/`,
    })),
  });
}
