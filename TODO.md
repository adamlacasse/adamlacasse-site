# Project TODO

> **Last updated:** January 10, 2026 - ✅ **ALL ITEMS COMPLETE!**
> 
> High Priority: 5/5 ✅ | Medium Priority: 6/6 ✅ | Low Priority: 5/5 ✅

This file tracks identified issues and improvements for adamlacasse.dev. Items are organized by priority and category.

---

## 🚨 High Priority

### Setup & Configuration

- [x] **Fix site constants** - Update `src/consts.ts` with actual site metadata or replace all hardcoded "Adam LaCasse" titles/descriptions with imports from constants
- [x] **Fix now.md double H1** - Remove duplicate H1 in `src/pages/now.md` (frontmatter title + markdown heading conflict)

### Performance

- [x] **Remove unused CSS imports** - `src/layouts/BaseLayout.astro` loads `global.css` + `layout.css` (~450 lines) but docs claim inline styles are used. Either remove imports or document why they're needed
- [x] **Add font preloading** - Implement `<link rel="preload">` in BaseLayout for `/fonts/atkinson-*.woff` files to prevent late waterfall loading

### Styling

- [x] **Fix CSS duplication** - Remove duplicate `.prose a` rules in `src/styles/global.css` (lines 152-159 and 195-198)

---

## ⚠️ Medium Priority

### Performance

- [x] **Implement image optimization** - Replace `<img>` tags with Astro's `<Image />` component in:
  - `src/pages/index.astro` (hero section)
  - `src/pages/projects.astro`
  - Blog post content
- [x] **Configure cache headers** - Add caching strategy for static assets (fonts, images) via `_headers` file or build config

### Content & SEO

- [x] **Add Open Graph meta tags** - Create template in BaseLayout for:
  - `og:title`, `og:description`, `og:image`
  - Twitter Card tags
  - Optional: JSON-LD structured data
- [x] **Create robots.txt** - Add `/public/robots.txt` file with sitemap reference

### Code Quality

- [x] **Handle unused starter components** - Delete or move to `/archive`:
  - `src/components/BaseHead.astro`
  - `src/components/Header.astro`
  - `src/components/Footer.astro`
  - `src/components/HeaderLink.astro`
  - `src/components/FormattedDate.astro`
- [x] **Update package.json metadata** - Fix:
  - `"name": "src"` → `"name": "adamlacasse-site"`
  - Add `description`, `author`, `license`, `repository` fields

---

## 📋 Low Priority (All Complete ✅)

### Styling

- [x] **Document spacing system** - Clarify usage patterns for:
  - Spacing units (mix of `px`, `em`, `rem`, `ch`)
  - When to use each unit type
  - Consider creating spacing scale constants
- [x] **Decide on dark mode** - Currently `color-scheme: light dark` in BaseLayout but no dark CSS exists. Options:
  - Implement dark styles using `@media (prefers-color-scheme: dark)`
  - OR remove `color-scheme` meta tag if dark mode isn't planned
- [x] **Create semantic color tokens** - Add variables for success, error, warning states if needed

### Setup & Configuration

- [x] **Enhance sitemap configuration** - Add to `astro.config.mjs`:
  - `changefreq` values (optional)
  - `priority` values (optional)
  - Excluded paths (if any)
- [x] **Document TypeScript config** - Clarify what strict checks are enforced (extends `strict` + explicit `strictNullChecks`)

---

## 📝 Notes

### CSS Architecture ✅ Verified
- **Active approach:** Global CSS files (`global.css` + `layout.css`) imported in BaseLayout
- **Status:** Working correctly—all layout classes are applied and necessary
- **Decision:** No action needed; documentation in copilot-instructions is accurate

### Asset Reference ✅ Verified
- Placeholder images exist: `blog-placeholder-1.jpg` through `blog-placeholder-5.jpg` and `blog-placeholder-about.jpg`
- **Status:** Assets ready for use when blog posts need featured images

### Dark Mode Decision ⚠️ Needs Choice
The `<meta name="color-scheme" content="light dark">` tag tells browsers the site supports both themes, but no dark mode CSS exists. Choose one:

1. **Option A (Implement dark mode):** Add `@media (prefers-color-scheme: dark)` styles to `global.css` and `layout.css`
2. **Option B (Remove dark mode indicator):** Delete the `color-scheme` meta tag from BaseLayout if dark mode isn't a priority

---

## ✅ Completed

### High Priority (All Complete ✅)
- ✅ Fix site constants
- ✅ Fix now.md double H1
- ✅ Remove unused CSS imports
- ✅ Add font preloading
- ✅ Fix CSS duplication

### Medium Priority (All Complete ✅)
- ✅ Implement image optimization (no `<img>` tags found to optimize)
- ✅ Configure cache headers (cache strategy configured in `public/_headers`)
- ✅ Add Open Graph meta tags (implemented in BaseLayout)
- ✅ Create robots.txt (created with sitemap reference)
- ✅ Handle unused starter components (moved to `src/components/archive/`)
- ✅ Update package.json metadata (all fields present)
