# Project TODO

> **Last updated:** January 10, 2026

This file tracks identified issues and improvements for adamlacasse.dev. Items are organized by priority and category.

---

## 🚨 High Priority

### Setup & Configuration

- [ ] **Fix site constants** - Update `src/consts.ts` with actual site metadata or replace all hardcoded "Adam LaCasse" titles/descriptions with imports from constants
- [ ] **Fix now.md double H1** - Remove duplicate H1 in `src/pages/now.md` (frontmatter title + markdown heading conflict)

### Performance

- [ ] **Remove unused CSS imports** - `src/layouts/BaseLayout.astro` loads `global.css` + `layout.css` (~450 lines) but docs claim inline styles are used. Either remove imports or document why they're needed
- [ ] **Add font preloading** - Implement `<link rel="preload">` in BaseLayout for `/fonts/atkinson-*.woff` files to prevent late waterfall loading

### Styling

- [ ] **Fix CSS duplication** - Remove duplicate `.prose a` rules in `src/styles/global.css` (lines 152-159 and 195-198)

---

## ⚠️ Medium Priority

### Performance

- [ ] **Implement image optimization** - Replace `<img>` tags with Astro's `<Image />` component in:
  - `src/pages/index.astro` (hero section)
  - `src/pages/projects.astro`
  - Blog post content
- [ ] **Configure cache headers** - Add caching strategy for static assets (fonts, images) via `_headers` file or build config

### Content & SEO

- [ ] **Add Open Graph meta tags** - Create template in BaseLayout for:
  - `og:title`, `og:description`, `og:image`
  - Twitter Card tags
  - Optional: JSON-LD structured data
- [ ] **Create robots.txt** - Add `/public/robots.txt` file with sitemap reference

### Code Quality

- [ ] **Handle unused starter components** - Delete or move to `/archive`:
  - `src/components/BaseHead.astro`
  - `src/components/Header.astro`
  - `src/components/Footer.astro`
  - `src/components/HeaderLink.astro`
  - `src/components/FormattedDate.astro`
- [ ] **Update package.json metadata** - Fix:
  - `"name": "src"` → `"name": "adamlacasse-site"`
  - Add `description`, `author`, `license`, `repository` fields

---

## 📋 Low Priority

### Styling

- [ ] **Document spacing system** - Clarify usage patterns for:
  - Spacing units (mix of `px`, `em`, `rem`, `ch`)
  - When to use each unit type
  - Consider creating spacing scale constants
- [ ] **Fix color system** - Either:
  - Implement dark mode styles (CSS currently sets `color-scheme: light dark` but no dark styles exist)
  - OR remove `color-scheme` meta tag if dark mode isn't planned
- [ ] **Create semantic color tokens** - Add variables for success, error, warning states if needed

### Setup & Configuration

- [ ] **Configure sitemap options** - Add to `astro.config.mjs`:
  - `changefreq` values
  - `priority` values
  - Excluded paths (if any)
- [ ] **Clarify TypeScript config** - Document what strict checks are actually enforced (tsconfig extends `strict` but only `strictNullChecks` is explicit)

---

## 📝 Notes

### CSS Architecture Decision Needed

The project currently has two approaches:

1. **Active:** Global CSS files (`global.css` + `layout.css`) imported in BaseLayout
2. **Documented:** "Inline styles in layouts/pages"

**Action required:** Choose one approach and update either the code or the documentation accordingly.

### Asset Reference Check

Documentation mentions `src/assets/blog-placeholder-1.jpg` - verify this asset is actually used somewhere or update docs if it's just an example.

### Dark Mode Decision

The `<meta name="color-scheme" content="light dark">` tag tells browsers the site supports both themes, but no dark mode CSS exists. Either:

- Implement dark mode styles using `@media (prefers-color-scheme: dark)`
- Remove the meta tag if dark mode isn't a priority

---

## ✅ Completed

_(Move items here as they're finished)_
