# Copilot Instructions

- Repo: Astro 5 static blog for adamlacasse.dev with MDX + sitemap integrations set in [astro.config.mjs](../astro.config.mjs); no server runtime.
- **Deployment:** Hosted on [Cloudflare Pages](https://pages.cloudflare.com/); static build outputs to `dist/` and is auto-deployed. Cache strategy configured via `public/_headers`.
- Install/run: `npm install`; `npm run dev` (localhost:4321); `npm run build`; `npm run preview` (scripts in [package.json](../package.json)). No tests configured.
- Content model: blog collection schema in [src/content/config.ts](../src/content/config.ts) requires `title`, `description`, `pubDate`, optional `updatedDate`,
  `tags` array (default empty), and `draft` flag (default `false`). Posts live in [src/content/blog](../src/content/blog).
- Publishing rules: blog listings and feeds exclude drafts and sort newest-first via `getCollection("blog")` + filter/sort in
  [src/pages/blog/index.astro](../src/pages/blog/index.astro) and [src/pages/rss.xml.js](../src/pages/rss.xml.js); detail pages only build non-drafts in [src/pages/blog/[slug].astro](../src/pages/blog/[slug].astro).
- Layouts: use [src/layouts/BaseLayout.astro](../src/layouts/BaseLayout.astro) for site chrome (imports Bulma CSS, renders header/nav/main/footer
  with semantic HTML, handles meta tags, includes theme toggle script in `<head>`);\n [src/layouts/BlogPostLayout.astro](../src/layouts/BlogPostLayout.astro) wraps posts with title/date/tag display, share buttons, and slots content. Keep titles/descriptions passed
  in; BaseLayout sets the `<title>`/description tags directly. Sticky footer pattern uses flexbox (`display: flex`, `flex-direction: column`) with `main` set to `flex: 1`.
- Styling: **Bulma CSS framework** for all layout/component styling (imported from CDN in BaseLayout). Spacing/typography use Bulma's utility classes (e.g., `mb-3`, `mt-4`, `is-4`). Theme toggle uses inline script in `<head>` to manage `data-theme` attribute for light/dark mode persistence via localStorage.
- Pages (8 total):
  - [src/pages/index.astro](../src/pages/index.astro) — homepage hero + featured tiles
  - [src/pages/blog/index.astro](../src/pages/blog/index.astro) — blog listing (filtered, newest-first)
  - [src/pages/blog/[slug].astro](../src/pages/blog/[slug].astro) — individual blog posts
  - [src/pages/projects.astro](../src/pages/projects.astro) — projects gallery (hardcoded array)
  - [src/pages/about.astro](../src/pages/about.astro) — about page
  - [src/pages/now.astro](../src/pages/now.astro) — now page
  - [src/pages/resume.astro](../src/pages/resume.astro) — resume/CV (web) with JSON-LD structured data
  - [src/pages/resume/pdf.astro](../src/pages/resume/pdf.astro) — resume PDF export
  - [src/pages/contact.astro](../src/pages/contact.astro) — contact page
- RSS: generated at `/rss.xml` from the same filtered collection; keep `site` from context for absolute URLs in [src/pages/rss.xml.js](../src/pages/rss.xml.js).
- **Resume system**: Single-source-of-truth pattern using [src/data/resume.ts](../src/data/resume.ts) (TypeScript interfaces + `resumeData` object). Reusable [src/components/ResumeContent.astro](../src/components/ResumeContent.astro) component shared between web (`resume.astro`) and PDF (`resume/pdf.astro`) pages. Structured data (JSON-LD Person schema) added in `resume.astro` for SEO.
- Active components: [src/components/HeaderLink.astro](../src/components/HeaderLink.astro) (demo/utility), [src/components/ResumeContent.astro](../src/components/ResumeContent.astro) (resume shared component). Theme toggle button lives directly in BaseLayout header (no separate component); theme logic is inline script in `<head>`.
- Constants: site metadata lives in [src/consts.ts](../src/consts.ts); import `SITE_TITLE`/`SITE_DESCRIPTION`/`AUTHOR` for headers and meta tags. Projects data (hardcoded array in [src/pages/projects.astro](../src/pages/projects.astro)) and nav links are currently inline. Resume data is centralized in [src/data/resume.ts](../src/data/resume.ts) as the preferred pattern for large, reusable data sets.
- Integrations/SEO: Open Graph and Twitter Card meta tags implemented in [src/layouts/BaseLayout.astro](../src/layouts/BaseLayout.astro) with `ogTitle`, `ogDescription`,
  `ogImage` props. Canonical URLs auto-generated. Structured data (JSON-LD) added per-page as needed (e.g., Person schema in resume). Sitemap configured in astro.config.mjs with `changefreq: 'weekly'` and `priority: 0.7`.
- Draft workflow: mark `draft: true` in frontmatter to hide from listings, RSS, and static paths while keeping content renderable locally (still available if
  directly navigated during dev). Ensure `pubDate`/`updatedDate` parse as dates.
- Assets: fonts served from [public/fonts](../public/fonts); hero/og fallback image lives at [src/assets/blog-placeholder-1.jpg](../src/assets/blog-placeholder-1.jpg).
- Images: Sharp installed for optimization; use Astro's `<Image />` component for blog images and assets. Open Graph/social images require manual implementation
  per page.
- MDX support is available; MDX posts can go under [src/content/blog](../src/content/blog) alongside Markdown.
- TypeScript: Strict mode enforced via `extends "astro/tsconfigs/strict"` in [tsconfig.json](../tsconfig.json). All strict checks enabled: noImplicitAny,
  strictNullChecks, strictFunctionTypes, noUnusedLocals, noUnusedParameters, noImplicitReturns. Zod schema in content config validates blog frontmatter at build
  time.
- Error handling: Zod schema catches malformed frontmatter at build; no custom runtime error pages or 404 defined. Failed date parsing or missing required fields
  will fail the build with clear errors.
- Build output: Static site generates to `dist/` directory; no SSR/hybrid modes configured. All pages pre-rendered at build time via `astro build`.
- Dependencies: Currently on Astro 5.x (5.16.8) with MDX 4.x and sitemap integrations. MDX 4.x requires Astro 5+; check compatibility matrix before major version
  upgrades. Sharp handles image optimization automatically.
- Preferred patterns: reuse BaseLayout/BlogPostLayout for consistent spacing/typography; centralize large data sets (like resume) in `src/data/` with TypeScript interfaces; preserve the hardcoded nav/footer links unless product decision changes; use Bulma utility classes for styling.

## Code Quality & Formatting

**Tooling:**

- ESLint: Configured with TypeScript, Astro, and Prettier integration in [eslint.config.mjs](../eslint.config.mjs). Rules enforce recommended practices for JS/TS/Astro.
- Prettier: Configured in [.prettierrc](../.prettierrc) with 100 char line length, single quotes, trailing commas (es5), and Astro plugin.
- Markdownlint: Configured in [.markdownlint.json](../.markdownlint.json) with 100 char line length (matching Prettier), duplicate headings
  allowed, exceptions for code blocks/tables/headings.
- EditorConfig: Configured in [.editorconfig](../.editorconfig) with 2-space indents, LF line endings, UTF-8, trim trailing whitespace (except .md files).

**When to run formatting/linting:**

- **Before committing code:** Always run `npm run format` (or `npm run lint:fix` if you prefer ESLint auto-fix).
- **Check without changes:** Use `npm run format:check` or `npm run lint` to verify without modifying files.
- **IDE integration:** VS Code should auto-format on save if configured; respect .editorconfig and .prettierrc settings.

**Import ordering (enforced by ESLint):**

1. Astro components/layouts (e.g., `import BaseLayout from '../layouts/BaseLayout.astro'`)
2. Node modules/packages (e.g., `import { getCollection } from 'astro:content'`)
3. Local utilities/constants (e.g., `import { SITE_TITLE } from '../consts'`)

**File naming conventions:**

- Components: PascalCase (e.g., `BaseLayout.astro`, `BlogPostLayout.astro`)
- Pages: kebab-case or lowercase (e.g., `index.astro`, `[slug].astro`, `rss.xml.js`)
- Utilities/configs: kebab-case (e.g., `content/config.ts`, `consts.ts`)

**Comments/JSDoc:**

- Add JSDoc comments for exported functions/types where purpose is not immediately obvious from name.
- Inline comments should explain _why_, not _what_ (code should be self-documenting).
- Use `// TODO:` for intentional tech debt; add these to [TODO.md](../TODO.md) if they're significant.

## Git Workflow & Conventions

**Branch naming:**

- Features: `feature/description` (e.g., `feature/add-tags-page`)
- Fixes: `fix/description` (e.g., `fix/broken-rss-feed`)
- Docs: `docs/description` (e.g., `docs/update-readme`)
- Chores: `chore/description` (e.g., `chore/update-dependencies`)

**Commit messages:**

- Format: `type: brief description` (e.g., `feat: add tags filtering to blog index`)
- Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`
- Keep first line under 72 chars; add detailed explanation in body if needed.
- Reference issues if applicable (e.g., `fix: resolve dark mode contrast issue (#12)`)

**AI agent guidance:**

- Commit after completing logical units of work (e.g., one feature, one bug fix).
- Do not commit formatting-only changes mixed with logic changes; separate them.
- If uncertain about commit message, describe changes and ask user for preferred format.

## TODO.md Workflow

**When to update [TODO.md](../TODO.md):**

- **User explicitly requests it:** Add, update, or mark items complete as instructed.
- **Discovering new issues during work:** Add them to the appropriate section with clear description.
- **Completing tracked items:** Mark as `[x]` when done; do not remove completed items (they serve as project history).

**When NOT to update TODO.md:**

- Simple one-off requests that don't require tracking (e.g., "fix this typo").
- Work that's immediately completed in the same session without multi-step planning.

**Structure:**

- Items organized by priority/category (Completed, High Priority, Content, Performance, etc.).
- Use `[x]` for completed, `[ ]` for pending.
- Include file paths and line numbers where relevant for AI agent context.

## Testing Philosophy

**Current state:** No automated tests configured. No test framework, no test files, no CI/CD testing pipeline.

**Approach:**

- Manual testing via `npm run dev` (development server) and `npm run preview` (production build preview).
- Build-time validation via TypeScript strict checks and Zod schema for content frontmatter.
- Visual regression testing is manual (human review in browser).

**AI agent guidance:**

- Do not create test files or testing infrastructure unless explicitly requested by user.
- Do not suggest adding tests unless user asks "how would I test this?"
- If user wants to add testing later, recommend Vitest for unit tests, Playwright for e2e.
