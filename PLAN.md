# PLAN.md — SEO Improvement Plan for codepedia.top

> Status: **DRAFT — awaiting approval** · Created: 2026-09-14
> Scope: `codepedia-website` (Next.js 16.2.7 App Router, MDX, Tailwind v4)
> This document is analysis only. No code changes have been made.

---

## 1. Current SEO State — What Works (Keep)

| # | Item | Where | Why it's good |
|---|------|-------|---------------|
| K1 | `metadataBase` set to `https://www.codepedia.top` | `app/layout.tsx` | OG/canonical URLs resolve to correct absolute form |
| K2 | Per-post `generateMetadata` | `app/(blog)/blog/[slug]/page.tsx` | title, description, authors, keywords (tags), `locale: fa_IR` |
| K3 | Open Graph `type: "article"` with `publishedTime` / `modifiedTime` / image | same | good social preview + freshness signals |
| K4 | Twitter card `summary_large_image` | same | rich share previews |
| K5 | Semantic HTML: `<article>`, `<header>`, `<time dateTime>`, proper h1→h2→h3 | post page | crawler-friendly structure |
| K6 | Server Components everywhere, `next/font` self-hosted fonts, `priority`+`sizes`+fixed aspect-ratio hero image | site-wide | strong Core Web Vitals potential (low CLS, fast LCP) |
| K7 | Clean English slugs, `lang="fa"` + `dir="rtl"` | URLs / root layout | correct language declaration, readable URLs |
| K8 | Static homepage built from `fs` | `lib/get-posts.ts` | fast TTFB, indexable HTML |

---

## 2. Misconfigurations & Wrong Things Found (Fix)

### 🔴 Critical — site stability affects SEO directly

| # | Problem | Location | Detail | Fix direction |
|---|---------|----------|--------|---------------|
| C1 | `updatedAt` optional in schema but used unconditionally | `lib/zodschemas.ts` + `generateMetadata` | `new Date(metadata.updatedAt).toISOString()` throws `RangeError` if a post omits `updatedAt` → 500 on that post page | Make `updatedAt` required, or guard: `updatedAt ? new Date(...) : new Date(publishedAt)` |
| C2 | One malformed post crashes the entire site | `lib/get-posts.ts` | `metadataSchema.parse()` throws; `new Function()` eval of regex-extracted metadata is fragile → homepage, listings, and future sitemap all 500 | Switch to `safeParse` with per-file error logging; skip bad files instead of crashing |
| C3 | `draft` is never filtered | `lib/zodschemas.ts`, listings, post page | Draft posts are published, crawlable, and indexable → thin-content risk | Filter `draft: true` in `getAllPosts` (or return 404 in `[slug]/page.tsx`) |
| C4 | No canonical URLs anywhere | `app/layout.tsx`, `[slug]/page.tsx` | `www` vs apex, trailing slash, and query variants = duplicate content | Add `alternates: { canonical: ... }` to root + post metadata; enforce one host with 301 at host level |

### 🟡 High — missing SEO infrastructure

| # | Problem | Location | Fix direction |
|---|---------|----------|---------------|
| H1 | No `sitemap.xml` | missing `app/sitemap.ts` | Add convention file generating from `getAllPosts()` |
| H2 | No `robots.txt` | missing `app/robots.ts` | Add convention file: allow all + sitemap reference |
| H3 | No structured data (JSON-LD) | no `ld+json` anywhere | Add `BlogPosting`/`Article` + `BreadcrumbList` + `WebSite` |
| H4 | No RSS/Atom feed | no feed route | Add `app/rss.xml/route.ts` or `app/feed.xml/route.ts` |
| H5 | No OG image for homepage | root metadata | Add default 1200×630 OG image |
| H6 | Homepage metadata is thin | `app/layout.tsx` | title is only `"codepedia"`, description `"codepedia blog"` — write real, keyword-bearing copy |

### 🟢 Medium — structure & hygiene

| # | Problem | Location | Fix direction |
|---|---------|----------|---------------|
| M1 | Pages render on demand; no `generateStaticParams` | `[slug]/page.tsx` | Prerender all posts at build → faster TTFB, broken MDX fails the build not production |
| M2 | Weak internal linking | header nav is empty (commented out), no tag pages, no related posts, no breadcrumbs | Homepage is the only hub — add nav, tag pages, related posts |
| M3 | Slug typos baked into URLs | `content/posts/` | `formmated`, `dollors`, `knowlege` — needs 301 redirects if renamed |
| M4 | Dead code `metadata.tag` (singular) | `[slug]/page.tsx` line ~96 | Schema only defines `tags` — badge never renders; remove or use `tags[0]` |
| M5 | Unused components | `components/shiny-text.tsx`, `components/ui/aspect-ratio.tsx` | Remove or use |
| M6 | Typos in code | `cards.tsx` (`items-canter`, `justify-canter`), `CategiricalCard`, `ai-knowlege...` filename | Cosmetic; fix opportunistically |
| M7 | No custom 404 | no `not-found.tsx` | Add branded 404 with links into content |
| M8 | No `viewport` export / theme-color | `app/layout.tsx` | Minor; modern UX signal |

---

## 3. Roadmap — What We Must Do (In Order)

### Phase 1 — Stabilize the foundation *(do first; everything depends on it)*
- [ ] **P1.1** Fix `updatedAt` handling (C1): guard or make required
- [ ] **P1.2** Harden `getAllPosts` (C2): `safeParse`, skip + log invalid posts
- [ ] **P1.3** Filter drafts (C3) in `getAllPosts` and 404 on draft pages
- [ ] **P1.4** Add `alternates.canonical` (C4) to root layout + post pages; decide www vs apex
- [ ] **P1.5** Write real homepage title/description (H6)

**Success criteria:** `pnpm build` green; no page can 500 from content edits; canonical URLs present in HTML.

### Phase 2 — Discovery infrastructure
- [ ] **P2.1** `app/sitemap.ts` — 13 URLs (home + 12 posts), `lastmod = updatedAt ?? publishedAt`, skip drafts, no `changefreq`/`priority` (Google ignores both)
- [ ] **P2.2** `app/robots.ts` — `Allow: /` + `Sitemap:` line
- [ ] **P2.3** RSS feed route + `<link rel="alternate" type="application/rss+xml">`
- [ ] **P2.4** JSON-LD: `BlogPosting` (headline, image, datePublished, dateModified, author) on posts; `WebSite` on home; `BreadcrumbList` if breadcrumbs added
- [ ] **P2.5** Default OG image (1200×630) for home + fallback for posts

**Success criteria:** `/sitemap.xml` and `/robots.txt` live; validate sitemap in Google Search Console; Rich Results Test passes.

### Phase 3 — Performance & static generation
- [ ] **P3.1** `generateStaticParams` for `[slug]` (M1) — full SSG
- [ ] **P3.2** Re-verify Core Web Vitals (fonts, image `sizes`, LCP)
- [ ] **P3.3** Decide and apply 301 redirects for typo slugs (M3) or keep as-is knowingly

**Success criteria:** all post routes static in build output; Lighthouse SEO ≥ 95; CWV green in field data.

### Phase 4 — Content structure & internal linking
- [ ] **P4.1** Header nav links (M2) — Home / Blog / Tags
- [ ] **P4.2** Tag/category pages (e.g. `blog/tag/[tag]`) + sitemap inclusion
- [ ] **P4.3** Related posts on article pages
- [ ] **P4.4** Breadcrumbs with JSON-LD
- [ ] **P4.5** Custom `not-found.tsx` (M7) with navigation back into content

**Success criteria:** every post reachable in ≤ 3 clicks from home; crawl depth shallow.

### Phase 5 — Monitoring & ongoing
- [ ] **P5.1** Register Google Search Console + Bing Webmaster; submit sitemap
- [ ] **P5.2** Monitor "Submitted vs Indexed" weekly; investigate exclusions
- [ ] **P3.3 → follow-up:** track CWV in CrUX/psi after traffic
- [ ] **P5.3** Quarterly content review: update `updatedAt` honestly, prune/refresh old posts

---

## 4. Explicitly Not Scheduled (Deliberate Decisions)

| Item | Reason |
|---|---|
| `changefreq` / `priority` in sitemap | Google officially ignores both |
| hreflang / `xhtml:link` | single-language site (fa) |
| Sitemap index files | 13 URLs ≪ 50,000 limit |
| hreflang alternates for RTL | no second locale exists |
| AMP | deprecated; not needed |
| Fixing code typos (M5–M6) | cosmetic; bundle into any nearby code change |

---

## 5. Decisions Needed From You

1. **Canonical host**: `www.codepedia.top` or apex `codepedia.top`? (metadataBase currently says `www`.)
2. **Typo slugs** (M3): 301-redirect to corrected slugs, or keep as-is?
3. **`updatedAt`**: make it required in the schema (breaks posts missing it) or code-level fallback to `publishedAt`?
4. **Tags**: single `tag` or keep `tags[]` with `tags[0]` display?
5. **RSS vs Atom** format preference?

---

*End of plan. Awaiting review and approval before any implementation or commit.*
