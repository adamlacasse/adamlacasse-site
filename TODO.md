# Project TODO

> **Last updated:** January 11, 2026
>
> High Priority: 6/6 ✅ | Medium Priority: 6/6 ✅ | Low Priority: 7/7 ✅

This file tracks identified issues and improvements for adamlacasse.dev. Items are organized by priority and category.

---

## 🚨 High Priority

### Features

- [x] **Wire theme toggle to CSS** - Add `[data-theme]` variable overrides so clicking the header Theme button actually changes the palette
      (currently only `prefers-color-scheme` media query responds)

### Setup & Configuration

- [x] **Fix site constants** - Update `src/consts.ts` with actual site metadata or replace all hardcoded "Adam LaCasse" titles/descriptions with imports from constants
- [x] **Fix now.md double H1** - Remove duplicate H1 in `src/pages/now.md` (frontmatter title + markdown heading conflict)

### Performance

      Either remove imports or document why they're needed

- [x] **Add font preloading** - Implement `<link rel="preload">` in BaseLayout for `/fonts/atkinson-*.woff` files to prevent late waterfall loading

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

- [x] **Handle unused starter components** - Deleted BaseHead, Header, Footer, FormattedDate from archive; moved active HeaderLink to main components folder
- [x] **Update package.json metadata** - Fix:
  - `"name": "src"` → `"name": "adamlacasse-site"`
  - Add `description`, `author`, `license`, `repository` fields

---

## 📋 Low Priority (All Complete ✅)

### Setup & Configuration

- [x] **Enhance sitemap configuration** - Add to `astro.config.mjs`:
  - `changefreq` values (optional)
  - `priority` values (optional)
  - Excluded paths (if any)
- [x] **Document TypeScript config** - Clarify what strict checks are enforced (extends `strict` + explicit `strictNullChecks`)

---

---

## 📝 Notes

### Asset Reference ✅ Verified

- **Status:** Assets ready for use when blog posts need featured images

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

---

## 🔄 In Progress

_No items currently in progress._

---

## ✅ Recently Completed

### Features

- [x] **Fix theme toggle two-click bug** - Theme button requires two clicks to register change:
  - **Issue description:** Clicking the theme toggle button sometimes takes two clicks before the dark/light mode change appears
  - **Root cause investigation needed:** Multiple potential issues:
    1. Event listener attached multiple times (removed one duplicate `<script src="/theme.js">` from BaseLayout, but issue persists)
    2. Race condition between script initialization and DOM readiness
    3. Possible event delegation or event handler cleanup issues
  - **Affected files:**
    - `src/components/ThemeToggle.astro` - Button markup with id="theme-toggle"
    - `src/layouts/BaseLayout.astro` - Loads `/theme.js` script
    - `public/theme.js` - Public script that initializes theme toggle (uses `initThemeToggle()`)
  - **Key observations:**
    - Theme script loads in `<head>` once, runs immediately and on DOMContentLoaded
    - Button rendered in nav via ThemeToggle component
    - localStorage persistence works correctly (theme change does persist)
    - Issue is intermittent—sometimes single click works, sometimes needs two clicks
  - **Next steps:**
    1. Add debug logging to `public/theme.js` to track event listener attachment and click event firing
    2. Check if `initThemeToggle()` is being called multiple times despite `{ once: true }` flag
    3. Verify the click handler is added with proper event listener cleanup
    4. Test with browser DevTools to verify event listener count on button element

- [x] **Dark mode toggle** - Implement client-side theme switcher:
  - Default to system preferences (`prefers-color-scheme`)
  - Allow user override via toggle button in header/nav
  - Persist choice in localStorage under `theme-preference` key
  - Add `ThemeToggle` component in `src/components/`
  - Store values: `'light'`, `'dark'`, `'system'` (system = use OS preference)
  - Implementation: Created `src/components/ThemeToggle.astro` with inline theme initialization script in BaseLayout
  - Styling: Uses CSS variables (`--text`, `--bg-hover`), svg icons for light/dark, smooth transitions
  - Cycles through themes: light → dark → system (repeats)
  - Accessible: ARIA labels, semantic button, keyboard-navigable
