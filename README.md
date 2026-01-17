# adamlacasse.dev

Static site for Adam LaCasse built with Astro 5 + MDX. Ships as a static build (no SSR) with sitemap, RSS, and Open Graph defaults baked in.

## Overview

- Content lives in `src/content/blog` (Markdown/MDX) and is validated by `src/content/config.ts` (requires `title`, `description`, `pubDate`;
  optional `updatedDate`, `tags`, `draft`).
- Site metadata is defined in `src/consts.ts` (`AUTHOR`, `SITE_TITLE`, `SITE_DESCRIPTION`) and consumed by layouts/pages.
- Layouts: `BaseLayout.astro` (chrome, meta, OG/Twitter tags, font preloads, nav/footer) and `BlogPostLayout.astro` (post wrapper).
- SEO & perf: sitemap + robots.txt, RSS feed, OG/Twitter meta, font preloading, `_headers` with cache rules (fonts 1yr, images 1mo, CSS/JS 1wk, HTML 1d, RSS 6h).
- Footer links: GitHub, LinkedIn, and RSS are available in the footer for quick navigation.
- **Deployment:** Hosted on [Cloudflare Pages](https://pages.cloudflare.com/); static build (`npm run build` → `dist/`) is deployed automatically. Cache rules configured via `public/_headers`.

## Project Structure (essentials)

```text
public/          static assets, robots.txt, _headers
src/
 consts.ts      site metadata constants
 assets/        images (e.g., blog placeholders)
 styles/        CSS
 layouts/       BaseLayout, BlogPostLayout
 pages/         static pages (about, contact, now, projects, blog, rss)
 content/       blog posts + content config (Zod schema)
 components/    active components (ThemeToggle, HeaderLink)
```

## Commands

| Command           | Action                               |
| :---------------- | :----------------------------------- |
| `npm install`     | Install dependencies                 |
| `npm run dev`     | Start dev server at `localhost:4321` |
| `npm run build`   | Build static site to `dist/`         |
| `npm run preview` | Preview the production build         |

## Notes & Conventions

- Draft posts: set `draft: true` in frontmatter to exclude from listings/RSS/paths.
- Images: prefer Astro `<Image />` when adding real images (none live today besides placeholders).
- Open Graph: layouts accept `ogTitle`, `ogDescription`, `ogImage`; defaults to page title/description.
- Caching: `public/_headers` configures cache rules on Cloudflare Pages (fonts/images long-term, HTML/feeds short-term).

### Social Sharing

- Blog posts include a "Share on LinkedIn" CTA rendered by `BlogPostLayout.astro`.
- The link uses the page's canonical URL (derived from `Astro.site` + `Astro.url.pathname`), the post `title`, and `description` (as summary).
- No server runtime is required; the CTA opens LinkedIn's share flow in a new tab.
- If you need to customize behavior per post, pass an explicit `description` (frontmatter) and ensure `Astro.site` is set for correct absolute URLs.

## Content Authoring

- Blog schema (validated in `src/content/config.ts`):
  - Required: `title` (string), `description` (string), `pubDate` (Date)
  - Optional: `updatedDate` (Date), `tags` (string[]), `draft` (boolean, defaults false)
- Draft workflow: set `draft: true`; drafts stay out of listings, RSS, and static paths. Clear the flag to publish.
- Images: place in `src/assets/` or `public/`; prefer Astro `<Image />` for optimization when adding new images.
- Open Graph per page: pass `ogTitle`, `ogDescription`, `ogImage` to `BaseLayout`; otherwise falls back to `title`/`description`.

### Add a Blog Post (checklist)

1. Create `src/content/blog/my-post.md` (or `.mdx`).
2. Add frontmatter: `title`, `description`, `pubDate`; optional `updatedDate`, `tags`, `draft`.
3. Write content; use `<Image />` for new images; keep links absolute where needed.
4. For drafts, set `draft: true`; remove to publish.
5. Build locally: `npm run build` (schema validation will catch bad frontmatter/dates).

### Release Checklist

- `npm run build` passes locally.
- New/updated posts have valid frontmatter and correct dates.
- OG/Twitter image specified if needed (`ogImage`) or acceptable fallback.
- Cache headers still appropriate for new assets (`public/_headers`).
- Robots/sitemap unchanged unless routes change.

### Add / Update Static Page (checklist)

1. Create or edit page under `src/pages/` (e.g., `about.astro`, `projects.astro`).
2. Use `BaseLayout` and pass `title`/`description`; add `ogTitle`/`ogDescription`/`ogImage` if page-specific OG is needed.
3. Keep links and nav consistent; update nav only in `BaseLayout` if needed.
4. If adding assets, place in `public/` or `src/assets/` and consider `<Image />` for optimization.
5. Run `npm run build` to validate.

### Update Site Metadata (checklist)

1. Edit `src/consts.ts` (`AUTHOR`, `SITE_TITLE`, `SITE_DESCRIPTION`).
2. Verify pages/layouts that pass explicit titles still make sense (e.g., `BaseLayout` title props).
3. If nav text changes, update links in `BaseLayout.astro`.
4. If social profiles change, update footer links in `BaseLayout.astro`.
5. Run `npm run build` to ensure meta/OG render without errors.

## Working With AI Agents (solo + AI team)

- Source of truth for site meta: `src/consts.ts` (`AUTHOR`, `SITE_TITLE`, `SITE_DESCRIPTION`).
- Layouts:
  - `BaseLayout.astro`: nav/footer, global meta, OG/Twitter tags, canonical, font preloads.
  - `BlogPostLayout.astro`: wraps posts, uses `BaseLayout` and frontmatter for title/description/dates/tags.
- Theme management: `public/theme.js` handles dark/light mode toggling with localStorage persistence; activated via script tag in `BaseLayout.astro`.
- Performance/SEO:
  - `_headers` sets cache rules (fonts 1yr, images 1mo, CSS/JS 1wk, HTML 1d, RSS 6h).
  - `robots.txt` and sitemap are in `public/`; RSS at `/rss.xml`.
- Social integrations:
  - LinkedIn MCP can be used to automate publishing updates; current site includes a client-side LinkedIn share link on posts.
  - For automation, consider a small script or workflow invoking MCP on new content.
- Commands: `npm install`, `npm run dev`, `npm run build`, `npm run preview`.
- Error triage: run `npm run build` to catch TypeScript/Zod schema validation errors.
