import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://adamlacasse.dev',
  integrations: [
    mdx(),
    sitemap({
      // Set change frequency for different page types
      changefreq: 'weekly',
      // Set priority (0.0 to 1.0) - blog posts slightly lower than homepage
      priority: 0.7,
      // Generate a sitemap index for large sites (optional)
      i18n: undefined,
    }),
  ],
});
