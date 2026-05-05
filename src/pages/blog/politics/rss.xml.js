import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { AUTHOR } from '../../../consts';

export async function GET(context) {
  const posts = (await getCollection('blog'))
    .filter((post) => !post.data.draft && post.slug.startsWith('politics/'))
    .sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime());

  return rss({
    title: `${AUTHOR} — Politics`,
    description: 'Political blog from Adam LaCasse.',
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: `/blog/${post.slug}/`,
    })),
  });
}
