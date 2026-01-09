# Copilot Instructions

- Repo: Astro 5 static blog for adamlacasse.dev with MDX + sitemap integrations set in [astro.config.mjs](astro.config.mjs#L1-L7); no server runtime.
- Install/run: `npm install`; `npm run dev` (localhost:4321); `npm run build`; `npm run preview` (scripts in [package.json](package.json#L1-L18)). No tests configured.
- Content model: blog collection schema in [src/content/config.ts](src/content/config.ts#L1-L15) requires `title`, `description`, `pubDate`, optional `updatedDate`, `tags` array (default empty), and `draft` flag (default `false`). Posts live in [src/content/blog](src/content/blog).
- Publishing rules: blog listings and feeds exclude drafts and sort newest-first via `getCollection("blog")` + filter/sort in [src/pages/blog/index.astro](src/pages/blog/index.astro#L1-L27) and [src/pages/rss.xml.js](src/pages/rss.xml.js#L1-L19); detail pages only build non-drafts in [src/pages/blog/[...slug].astro](src/pages/blog/%5B...slug%5D.astro#L1-L27).
- Layouts: use [src/layouts/BaseLayout.astro](src/layouts/BaseLayout.astro#L1-L44) for site chrome (inline styles, simple meta, light/dark color-scheme); [src/layouts/BlogPostLayout.astro](src/layouts/BlogPostLayout.astro#L1-L39) wraps posts with title/date/tag display and slots content. Keep titles/descriptions passed in; BaseLayout sets the `<title>`/description tags directly.
- Pages: homepage hero + featured tiles in [src/pages/index.astro](src/pages/index.astro); projects list data is hardcoded array in [src/pages/projects.astro](src/pages/projects.astro); about/contact are simple text pages.
- RSS: generated at `/rss.xml` from the same filtered collection; keep `site` from context for absolute URLs in [src/pages/rss.xml.js](src/pages/rss.xml.js#L1-L19).
- Styling: current live pages lean on inline styles in layouts/pages. Legacy global styles/font preloads live in [src/components/BaseHead.astro](src/components/BaseHead.astro) and [src/styles/global.css](src/styles/global.css); these components are currently unused but can be re-enabled if you want the Bear Blog theme.
- Components shipped by the Astro starter (Header, Footer, HeaderLink, FormattedDate) under [src/components](src/components) are unused in the live layout; avoid mixing them unless intentionally reverting to the starter theme.
- Content config duplication: starter-era config remains in [src/content.config.ts](src/content.config.ts#L1-L15); the active schema is [src/content/config.ts](src/content/config.ts#L1-L15). Edit the latter when changing frontmatter.
- Integrations/SEO: canonical/sitemap handled by Astro integrations; BaseLayout includes only minimal meta and favicon. Add Open Graph/Twitter tags manually if needed per page.
- Draft workflow: mark `draft: true` in frontmatter to hide from listings, RSS, and static paths while keeping content renderable locally (still available if directly navigated during dev). Ensure `pubDate`/`updatedDate` parse as dates.
- Assets: fonts served from [public/fonts](public/fonts); hero/og fallback image lives at [src/assets/blog-placeholder-1.jpg](src/assets/blog-placeholder-1.jpg).
- MDX support is available; MDX posts can go under [src/content/blog](src/content/blog) alongside Markdown.
- Preferred patterns: reuse BaseLayout/BlogPostLayout for consistent spacing/typography; preserve the hardcoded nav/footer links unless product decision changes.

Questions or unclear areas? Tell me what to adjust and I’ll iterate.
