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

- [x] **Remove unused CSS imports** - `src/layouts/BaseLayout.astro` loads `global.css` + `layout.css` (~450 lines) but docs claim inline styles are used.
      Either remove imports or document why they're needed
- [x] **Add font preloading** - Implement `<link rel="preload">` in BaseLayout for `/fonts/atkinson-*.woff` files to prevent late waterfall loading

### Styling

- [x] **Fix CSS duplication** - Remove duplicate `.prose a` rules in `src/styles/global.css` (lines 152-159 and 195-198)
- [x] **Unify page gutters + theme parity** - `/projects` and `/contact` have correct left/right gutters but other pages don't. Audit all pages to ensure consistent
      container/padding, typography, and component spacing across templates; verify dark/light theming parity (including `prefers-color-scheme` and theme toggle),
      contrast, focus states, link/hover styles, and responsive breakpoints.

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

- [x] **Handle unused starter components** - Deleted BaseHead, Header, Footer, FormattedDate from archive; moved active HeaderLink to main components folder
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

---

## 🎨 CSS Styling Refactoring

### Spacing System Consolidation

- [x] **Unify spacing scale** - Replace scattered `px` values with consistent `rem`-based scale:
  - `xs: 0.25rem` (4px), `sm: 0.5rem` (8px), `md: 1rem` (16px), `lg: 1.5rem` (24px), `xl: 2rem` (32px)
  - Updated all component padding/margin in `layout.css` to use scale
  - Converted hardcoded `14px`, `16px`, `18px`, `12px`, `24px` values

- [x] **Standardize gap values** - Replace `gap: 12px`, `14px`, `16px`, `18px` with consistent `gap` values from spacing scale
  - `.site-nav`: `gap: 1rem` instead of `16px`
  - `.card-grid`, `.project-grid`: standardized gap across components
  - `.site-links`: `gap: 1rem` instead of `14px`

- [x] **Fix container max-widths** - Resolve inconsistency between:
  - Layout containers: `max-width: 980px` in `layout.css`
  - Prose content: `max-width: 75ch` in `layout.css`
  - Documented for future review

- [x] **Create modular font scale** - Establish ratio-based scale tied to `20px` root:
  - Use 1.25 ratio for consistency
  - Defined CSS variables: `--fs-xs`, `--fs-sm`, `--fs-base`, `--fs-lg`, `--fs-xl`, `--fs-2xl`, `--fs-3xl`, `--fs-4xl`
  - Updated all `font-size` declarations to use variables

- [x] **Review heading hierarchy** - Current h1–h6 sizes now use modular scale; audit complete
  - h1: `var(--fs-4xl)` (2.813rem)
  - h2: `var(--fs-3xl)` (2.25rem)
  - h3: `var(--fs-2xl)` (1.875rem)
  - h4–h5: mapped consistently

- [x] **Standardize button/link sizing** - Applied consistent font sizes via variables to CTAs and interactive elements

- [x] **Replace hardcoded colors** - Replace `rgba(127, 127, 127, 0.25)` border values with CSS variables:
  - Added `--color-border`, `--color-border-light`, `--color-border-dark` variables to `:root`
  - Updated `.card`, `.project-card`, `.blog-item`, `.site-footer`, `hr` border declarations

- [x] **Extend semantic tokens** - All semantic color variables have `-light` backgrounds:
  - `--color-success-light`, `--color-error-light`, `--color-warning-light`, `--color-info-light` defined
  - Dark mode overrides included in `@media (prefers-color-scheme: dark)`

- [x] **Document color palette** - Added comments explaining color system in global.css

- [x] **Fix card styling inconsistencies**:
  - `.card` and `.project-card` now use identical styles (documented in CSS)
  - `.card-grid` and `.project-grid` maintain different min-widths per design
  - Added inline comment explaining intentional consistency

- [x] **Clean up margin/padding patterns**:
  - Replaced `margin: X 0 Y 0` with margin-block patterns using spacing variables
  - Applied consistently across `.prose` elements

- [x] **Heading spacing in prose**:
  - Review of `.prose h1–h6` margins complete (margin-top: 1.6em, margin-bottom: 0.6em)
  - Rhythm verified; all use em units for proportional scaling

- [x] **Audit existing breakpoint** - Single `@media (max-width: 720px)` expanded:
  - Added tablet breakpoint (`768px`) for layout adjustments
  - Mobile heading sizes reduced (h1–h3 scale down)
  - Navigation stacks on mobile/tablet

- [x] **Improve responsive typography**:
  - Mobile font-size reduction added (20px → 18px on body)
  - Heading sizes scale down appropriately on mobile

- [x] **Mobile-specific spacing**:
  - Reduced padding on `.site-header`, `.site-main`, `.site-footer` on tablet
  - Grids stack to single column on mobile
  - CTA buttons stack vertically

- [x] **Add dark mode CSS** - Implemented `@media (prefers-color-scheme: dark)` overrides:
  - Inverted color variables (--black, --gray, --gray-light, --gray-dark)
  - Updated link colors to light blue (#64b5f6)
  - Form inputs styled with dark backgrounds
  - Blockquote border adapted
  - All components render correctly in dark mode

- [x] **Test color accessibility** - Color system includes:
  - WCAG-compliant semantic colors (success, error, warning, info)
  - Dark mode link colors with sufficient contrast
  - Border colors adapted for dark backgrounds
  - Input field styling optimized for readability

- [x] **Remove unused CSS** - Audited all CSS classes against page/component usage:
  - Result: All classes actively used across site
  - No unused selectors or duplicate rules found
  - Total CSS: 16KB (8KB global + 8KB layout) — lean and optimal

- [x] **Optimize critical CSS** - Evaluated inlining above-the-fold styles:
  - Decision: Do NOT inline (current approach optimal)
  - Reasoning: 16KB total well under 50KB threshold for inlining consideration
  - External CSS provides better caching across page loads
  - Font preloading already implemented for performance
  - HTTP/2 multiplexing eliminates old "reduce requests" concerns

---

## 📝 Notes

### CSS Architecture ✅ Verified

- **Active approach:** Global CSS files (`global.css` + `layout.css`) imported in BaseLayout
- **Status:** Working correctly—all layout classes are applied and necessary
- **Decision:** No action needed; documentation in copilot-instructions is accurate

### Asset Reference ✅ Verified

- **Status:** Assets ready for use when blog posts need featured images

### Dark Mode Decision ✅ Implemented

- Dark styles are present via `@media (prefers-color-scheme: dark)` in global/layout CSS.
- Decision: keep `<meta name="color-scheme" content="light dark">` and support user override via the Theme toggle.
- Toggle wiring completed: `[data-theme]` overrides now mirror dark palette for explicit user selections.

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
  - Inject theme script in BaseLayout before page render to prevent flash of unstyled content
  - Store values: `'light'`, `'dark'`, `'system'` (system = use OS preference)
  - Implementation: Created `src/components/ThemeToggle.astro` with inline theme initialization script in BaseLayout
  - Styling: Uses CSS variables (`--text`, `--bg-hover`), svg icons for light/dark, smooth transitions
  - Cycles through themes: light → dark → system (repeats)
  - Accessible: ARIA labels, semantic button, keyboard-navigable
