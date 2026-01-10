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

---

## 🎨 CSS Styling Refactoring

### Spacing System Consolidation

- [ ] **Unify spacing scale** - Replace scattered `px` values with consistent `rem`-based scale:
  - `xs: 0.25rem` (4px), `sm: 0.5rem` (8px), `md: 1rem` (16px), `lg: 1.5rem` (24px), `xl: 2rem` (32px)
  - Update all component padding/margin in `layout.css` to use scale
  - Convert hardcoded `14px`, `16px`, `18px`, `12px`, `24px` values

- [ ] **Standardize gap values** - Replace `gap: 12px`, `14px`, `16px`, `18px` with consistent `gap` values from spacing scale
  - `.site-nav`: `gap: 1rem` instead of `16px`
  - `.card-grid`, `.project-grid`: standardize gap across components
  - `.site-links`: `gap: 0.875rem` instead of `14px`

- [ ] **Fix container max-widths** - Resolve inconsistency between:
  - Layout containers: `max-width: 980px` in `layout.css`
  - Prose content: `max-width: 75ch` in `layout.css`
  - Create consistent constraint or justify dual approach

### Font Size & Typography Scale

- [ ] **Create modular font scale** - Establish ratio-based scale tied to `20px` root:
  - Use 1.25 ratio or golden ratio (1.618) for consistency
  - Define CSS variables: `--fs-xs`, `--fs-sm`, `--fs-base`, `--fs-lg`, `--fs-xl`, `--fs-2xl`, `--fs-3xl`
  - Update all `font-size` declarations to use variables

- [ ] **Review heading hierarchy** - Current h1–h6 sizes feel arbitrary; align with modular scale
  - Audit actual usage in templates (h1 might need reduction per `.prose h1` override at `2.2em`)

- [ ] **Standardize button/link sizing** - Apply consistent font sizes to CTAs and interactive elements

### Color System & CSS Variables

- [ ] **Replace hardcoded colors** - Replace `rgba(127, 127, 127, 0.25)` border values with CSS variables:
  - Add `--color-border`, `--color-border-light` variables to `:root`
  - Update `.card`, `.project-card`, `.site-footer` border declarations

- [ ] **Extend semantic tokens** - Ensure all semantic color variables have `-light` backgrounds:
  - Verify `--color-success-light`, `--color-error-light`, etc. are actually used
  - Add `-text` or `-dark` variants if needed for contrast

- [ ] **Document color palette** - Add comment section at top of `global.css` explaining:
  - Primary accent usage
  - Gray scale purpose/contrast ratios
  - When to use semantic vs. utility colors

### Component Styling Issues

- [ ] **Fix card styling inconsistencies**:
  - `.card` and `.project-card` have identical styles (`14px` padding, same border)—consolidate or differentiate intentionally
  - `.card-grid` and `.project-grid` use same grid but different min-widths (`240px` vs `280px`)—document reason or unify

- [ ] **Clean up margin/padding patterns**:
  - Replace `margin: X 0 Y 0` with `margin-block: X Y` (CSS logical properties)
  - Apply consistently across `.prose` elements

- [ ] **Heading spacing in prose**:
  - Review `.prose h1–h6` margins (`margin-top: 1.6em`, `margin-bottom: 0.6em`)—verify rhythm feels natural
  - Consider if `em` is best unit here or should be `rem`

### Responsive Design & Breakpoints

- [ ] **Audit existing breakpoint** - Single `@media (max-width: 720px)` in `global.css`:
  - Add tablet breakpoint (`768px`) for layout adjustments
  - Review mobile stacking of `.site-nav`, `.hero-cta`, `.card-grid`, `.project-grid`
  - Test on actual devices/viewport sizes

- [ ] **Improve responsive typography**:
  - Consider `font-size` reduction for mobile (currently only body goes `20px → 18px`)
  - Adjust heading sizes for smaller screens if needed

- [ ] **Mobile-specific spacing**:
  - Reduce padding on `.site-header`, `.site-main`, `.site-footer` on mobile
  - Stack flex containers appropriately

### Dark Mode Implementation

- [ ] **Add dark mode CSS** - Implement `@media (prefers-color-scheme: dark)` overrides:
  - Invert `--black`, `--gray`, `--gray-light`, `--gray-dark` variables
  - Test all components render correctly in dark mode
  - Ensure contrast ratios meet WCAG AA standard

- [ ] **Test color accessibility** - Run contrast checker on:
  - Text on background colors
  - Links on page backgrounds (accent color)
  - Borders and subtle UI elements

### Performance & Cleanup

- [ ] **Remove unused CSS** - Audit and remove:
  - Unused component classes if any pages are removed
  - Duplicate or overridden rules

- [ ] **Optimize critical CSS** - Consider inlining above-the-fold styles if bundle size warrants

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
