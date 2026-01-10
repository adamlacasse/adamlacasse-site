# Copilot Instructions

- Repo: Astro 5 static blog for adamlacasse.dev with MDX + sitemap integrations set in [astro.config.mjs](astro.config.mjs); no server runtime.
- Install/run: `npm install`; `npm run dev` (localhost:4321); `npm run build`; `npm run preview` (scripts in [package.json](package.json#L1-L18)). No tests configured.
- Content model: blog collection schema in [src/content/config.ts](src/content/config.ts#L1-L15) requires `title`, `description`, `pubDate`, optional `updatedDate`, `tags` array (default empty), and `draft` flag (default `false`). Posts live in [src/content/blog](src/content/blog).
- Publishing rules: blog listings and feeds exclude drafts and sort newest-first via `getCollection("blog")` + filter/sort in [src/pages/blog/index.astro](src/pages/blog/index.astro#L1-L27) and [src/pages/rss.xml.js](src/pages/rss.xml.js#L1-L19); detail pages only build non-drafts in [src/pages/blog/[...slug].astro](src/pages/blog/%5B...slug%5D.astro#L1-L27).
- Layouts: use [src/layouts/BaseLayout.astro](src/layouts/BaseLayout.astro#L1-L44) for site chrome (imports global.css + layout.css, renders header/nav/main/footer with semantic HTML, handles meta tags); [src/layouts/BlogPostLayout.astro](src/layouts/BlogPostLayout.astro#L1-L39) wraps posts with title/date/tag display and slots content. Keep titles/descriptions passed in; BaseLayout sets the `<title>`/description tags directly. All layout classes (`.site-header`, `.site-nav`, `.site-brand`, etc.) defined in layout.css. **Sticky footer pattern**: body uses flexbox (`display: flex`, `flex-direction: column`, `min-height: 100vh`) with `.site-main` set to `flex: 1` to ensure footer stays at viewport bottom on pages with minimal content.
- Pages: homepage hero + featured tiles in [src/pages/index.astro](src/pages/index.astro); projects list data is hardcoded array in [src/pages/projects.astro](src/pages/projects.astro); about/contact are simple text pages.
- RSS: generated at `/rss.xml` from the same filtered collection; keep `site` from context for absolute URLs in [src/pages/rss.xml.js](src/pages/rss.xml.js#L1-L19).
- Styling: **Design system fully implemented** in [src/styles/global.css](src/styles/global.css) and [src/styles/layout.css](src/styles/layout.css).
  - **Spacing scale** (rem-based): Use `--space-xs` (0.25rem/4px) through `--space-2xl` (2rem/32px) for ALL spacing. Never hardcode px values for spacing. Common: `--space-sm-md` (0.75rem/12px) for component padding, `--space-md` (1rem/16px) for standard gaps, `--space-lg` (1.5rem/24px) for section spacing.
  - **Font scale** (1.25 ratio): Use `--fs-xs` (0.75rem/12px) through `--fs-4xl` (2.813rem/45px) for ALL font sizes. Headings: h1 uses `--fs-4xl`, h2 uses `--fs-3xl`, h3 uses `--fs-2xl`, h4 uses `--fs-xl`, h5 uses `--fs-lg`. Body text is 20px root.
  - **Color tokens**: Use `--color-border` for all borders (replaces hardcoded rgba values). Semantic tokens: `--color-success`, `--color-error`, `--color-warning`, `--color-info` (all have `-light` variants for backgrounds).
  - **Dark mode**: Fully implemented via `@media (prefers-color-scheme: dark)` with inverted color variables, light blue accents (#64b5f6), and optimized contrast. All components support dark mode automatically.
  - **Responsive breakpoints**: Tablet (768px) reduces padding, stacks navigation, single-column grids. Mobile (720px) further reduces heading sizes and stacks all flex containers. Mobile-first approach.
  - **Layout constraints**: Site containers max-width 980px; prose content max-width 75ch (for readability). Both intentional and documented.
  - Font preloading configured in [src/layouts/BaseLayout.astro](src/layouts/BaseLayout.astro) for Atkinson regular/bold fonts.
- Components shipped by the Astro starter (Header, Footer, HeaderLink, FormattedDate) under [src/components](src/components) are unused in the live layout; avoid mixing them unless intentionally reverting to the starter theme.
- Constants: site metadata lives in [src/consts.ts](src/consts.ts); import `SITE_TITLE`/`SITE_DESCRIPTION` for headers and meta tags. Projects data and nav links are currently hardcoded inline in pages; when adding reusable data structures, export them from consts.ts for consistency.
- Integrations/SEO: Open Graph and Twitter Card meta tags implemented in [src/layouts/BaseLayout.astro](src/layouts/BaseLayout.astro) with `ogTitle`, `ogDescription`, `ogImage` props. Canonical URLs auto-generated. Sitemap configured in astro.config.mjs with `changefreq: 'weekly'` and `priority: 0.7`.
- Draft workflow: mark `draft: true` in frontmatter to hide from listings, RSS, and static paths while keeping content renderable locally (still available if directly navigated during dev). Ensure `pubDate`/`updatedDate` parse as dates.
- Assets: fonts served from [public/fonts](public/fonts); hero/og fallback image lives at [src/assets/blog-placeholder-1.jpg](src/assets/blog-placeholder-1.jpg).
- Images: Sharp installed for optimization; use Astro's `<Image />` component for blog images and assets. Open Graph/social images require manual implementation per page.
- MDX support is available; MDX posts can go under [src/content/blog](src/content/blog) alongside Markdown.
- TypeScript: Strict mode enforced via `extends "astro/tsconfigs/strict"` in [tsconfig.json](tsconfig.json). All strict checks enabled: noImplicitAny, strictNullChecks, strictFunctionTypes, noUnusedLocals, noUnusedParameters, noImplicitReturns. Zod schema in content config validates blog frontmatter at build time.
- Error handling: Zod schema catches malformed frontmatter at build; no custom runtime error pages or 404 defined. Failed date parsing or missing required fields will fail the build with clear errors.
- Build output: Static site generates to `dist/` directory; no SSR/hybrid modes configured. All pages pre-rendered at build time via `astro build`.
- Dependencies: Currently on Astro 5.x (5.16.8) with MDX 4.x and sitemap integrations. MDX 4.x requires Astro 5+; check compatibility matrix before major version upgrades. Sharp handles image optimization automatically.
- Preferred patterns: reuse BaseLayout/BlogPostLayout for consistent spacing/typography; preserve the hardcoded nav/footer links unless product decision changes.
## Design System Quick Reference

When adding new components or modifying styles, follow these guidelines:

**Spacing (always use variables):**
```css
padding: var(--space-sm-md);  /* 12px, typical card/component padding */
gap: var(--space-md);          /* 16px, standard flex/grid gaps */
margin-top: var(--space-lg);   /* 24px, section spacing */
```

**Typography (always use variables):**
```css
font-size: var(--fs-lg);       /* 18px, large body text */
font-size: var(--fs-xl);       /* 24px, subheadings */
font-size: var(--fs-2xl);      /* 30px, section titles */
```

**Colors:**
```css
border: 1px solid var(--color-border);              /* Standard borders */
background: var(--color-success-light);             /* Success state background */
color: var(--accent);                                /* Links and primary actions */
```

**Component patterns:**
- Cards: 12px padding (`--space-sm-md`), `--color-border`, 12px border-radius
- Grids: Use `grid-template-columns: repeat(auto-fit, minmax(Xpx, 1fr))` with `gap: var(--space-sm-md)`
- Sections: Vertical padding `var(--space-md-lg)` or `var(--space-xl)`
- Buttons/CTAs: Use `flex` with `gap: var(--space-sm-md)` and `flex-wrap: wrap`

**Responsive:**
- Start mobile-first with base styles
- Add tablet adjustments at `@media (max-width: 768px)` if needed
- Mobile-specific at `@media (max-width: 720px)` (body font reduces to 18px)
- Grid layouts automatically stack to single column on mobile

**Never:**
- Hardcode px values for spacing (except 1px borders)
- Hardcode rgba() for borders (use `--color-border`)
- Hardcode font-size with px or rem (use `--fs-*`)
- Create styles without dark mode consideration (test with prefers-color-scheme)
Questions or unclear areas? Tell me what to adjust and I’ll iterate.
