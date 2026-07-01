# Createam — Build Specification (for Claude Code)

This document specifies the technical build for the Createam website. Hand it to Claude Code as the source of truth. Content copy lives in two companion files (Bosnian): `createam-website-copy.md` (homepage) and `createam-remaining-pages-copy.md` (all other pages). Visual design was produced separately in Claude Design — port those layouts/styles into the components described here.

---

## 1. Project goals

- Marketing website for Createam, a team offering web design, development, WordPress, custom plugins, app development, graphic design, photography, copywriting, translation, and SEO/marketing.
- Priorities, in order: **SEO, speed, modularity, easy content editing for non-technical people.**
- Must be **deployable to any hosting** (shared, cPanel, VPS) — achieved via static export.
- Content (blog, case studies, team, services, header, footer) must be **CMS-driven and modular** — editable without touching code.

---

## 2. Tech stack

- **Framework:** Next.js (latest, App Router)
- **Rendering:** Static Site Generation via `output: 'export'` — the public site compiles to plain HTML/CSS/JS in an `/out` folder, deployable to any host. No Node.js required on the hosting.
- **CMS:** Payload CMS (latest, self-hosted) as a **headless backend**. Runs as a live Node app on the developer's own server (for content editing). NOT deployed to the public hosting.
- **Database (Payload):** PostgreSQL (developer already runs Postgres). MongoDB is an acceptable alternative if simpler for the environment.
- **Styling:** Match whatever the Claude Design output used. Default recommendation: Tailwind CSS (utility-first, fast, pairs well with Next.js). If the design was hand-authored CSS, CSS Modules is fine too. Pick ONE and stay consistent.
- **Content flow:** Next.js pulls content from Payload's REST or GraphQL API **at build time**, then bakes it into static pages.
- **Deploy:** Build on developer's server → `rsync`/FTP the `/out` folder to any hosting.
- **Rebuild trigger:** Payload `afterChange` hook fires a webhook that triggers a rebuild + redeploy when an editor clicks "Publish". Manual build script also provided as fallback.

### Architecture summary (two separable parts)

```
┌─────────────────────────────┐         ┌──────────────────────────────┐
│  CMS BACKEND (dev server)   │         │  PUBLIC SITE (any hosting)   │
│  Payload + Postgres         │         │  Static HTML/CSS/JS (/out)   │
│  Admin panel for editors    │  build  │  No Node.js needed           │
│  Source of truth            │ ──────► │  Deployed via rsync/FTP      │
└─────────────────────────────┘         └──────────────────────────────┘
```

---

## 3. Repository structure

Monorepo with two workspaces, or two folders in one repo:

```
createam/
├── cms/                      # Payload CMS app (runs on dev server)
│   ├── src/
│   │   ├── collections/      # Content models (see section 4)
│   │   ├── globals/          # Header, Footer, SiteSettings
│   │   └── payload.config.ts
│   └── ...
├── web/                      # Next.js public site (static export)
│   ├── app/                  # App Router routes (see section 5)
│   ├── components/           # Modular, isolated components (see section 6)
│   ├── lib/                  # Payload API fetch helpers
│   ├── next.config.js        # output: 'export'
│   └── ...
├── scripts/
│   ├── build.sh              # build web from cms content
│   └── deploy.sh             # rsync /out to hosting
└── createam-build-spec.md    # this file
```

If a monorepo adds friction, `web/` may fetch from `cms/`'s public API over HTTP at build time — the two only need to talk during the build.

---

## 4. Payload content models

### Collections

**Services** (10 entries, one per service)
- `title` (text)
- `slug` (text, unique)
- `category` (select: `digital` | `brand` | `growth`)
- `order` (number — controls display order)
- `heroTitle` (text)
- `heroSubtitle` (text)
- `intro` (richText)
- `whatYouGet` (array of text — bullet items)
- `forWhom` (textarea)
- `howWeWork` (array of { `stepTitle`, `stepDescription` })
- `ctaText` (text)
- `seo` (group: metaTitle, metaDescription — see section 7)

**CaseStudies**
- `title` (text)
- `slug` (text, unique)
- `client` (text)
- `servicesUsed` (relationship → Services, hasMany)
- `year` (text)
- `category` (select — matches the portfolio filter tabs: `web-design` | `wordpress` | `app` | `brand-content` | `seo-marketing`)
- `featured` (checkbox — shows on homepage)
- `heroImage` (upload → Media)
- `gallery` (array of upload → Media, optional)
- `problem` (richText)
- `approach` (richText)
- `result` (richText)
- `stats` (array of { `value`, `label` } — e.g. "40%", "brži sajt")
- `quote` (group: `text`, `author` — optional)
- `seo` (group)

**BlogPosts**
- `title` (text)
- `slug` (text, unique)
- `excerpt` (textarea)
- `coverImage` (upload → Media)
- `body` (richText)
- `author` (relationship → TeamMembers)
- `publishedDate` (date)
- `tags` (array of text, optional)
- `seo` (group)

**TeamMembers**
- `name` (text)
- `photo` (upload → Media)
- `role` (text — e.g. "Developer", "Grafički dizajner")
- `bio` (textarea — one sentence on approach)
- `order` (number)

**Media** — Payload's built-in upload collection. Configure image resizing/optimization (generate web-optimized sizes on upload).

### Globals

**Header**
- `logo` (upload → Media)
- `navItems` (array of { `label`, `href` })
- `ctaLabel` (text), `ctaHref` (text)

**Footer**
- `description` (textarea)
- `linkColumns` (array of { `heading`, `links`: array of { `label`, `href` } })
- `copyright` (text)
- `socialLinks` (array of { `platform`, `href` }, optional)

**HomePage** (makes homepage sections editable)
- `heroTitle`, `heroSubtitle`, `heroCtaPrimary`, `heroCtaSecondary`, `heroMicrocopy`
- `problemsSectionTitle`, `problemsSectionSubtitle`
- `problems` (array of { `icon`, `title` } — 6 items)
- `featuredCaseStudies` (relationship → CaseStudies, hasMany — or auto-pull `featured: true`)

**SiteSettings**
- `contactEmail`, `contactPhone`
- `defaultSeo` (group: metaTitle, metaDescription, ogImage)

---

## 5. Routes (Next.js App Router)

All routes statically generated. Bosnian slugs to match content and SEO.

| Route | Source | Notes |
|---|---|---|
| `/` | HomePage global + featured CaseStudies | Homepage |
| `/usluge` | Services (all) | Services index, grouped by category |
| `/usluge/[slug]` | Services (by slug) | `generateStaticParams` from all services |
| `/tim` | TeamMembers (all) | Team page |
| `/radovi` | CaseStudies (all) | Portfolio index with category filter |
| `/radovi/[slug]` | CaseStudies (by slug) | `generateStaticParams` from all case studies |
| `/blog` | BlogPosts (all) | Blog index |
| `/blog/[slug]` | BlogPosts (by slug) | `generateStaticParams` from all posts |
| `/kontakt` | SiteSettings + static copy | Contact page with form + FAQ |

**Contact form note:** since the site is static, the form needs an external submission endpoint (no server at runtime). Use a static-friendly option: Formspree, Web3Forms, or a serverless function on a service like Cloudflare Workers. Do NOT rely on a Node server on the hosting. Document the chosen option in the form component.

---

## 6. Modular components (isolation requirement)

These must be self-contained and CMS-driven so they can be reasoned about and edited independently:

- **`<Header />`** — reads from Header global. Used on every page.
- **`<Footer />`** — reads from Footer global. Used on every page.
- **`<BlogList />`, `<BlogPost />`** — the blog module, isolated. Reads BlogPosts.
- **`<CaseStudyList />`, `<CaseStudyDetail />`** — the case study module, isolated. Reads CaseStudies.

Additional shared components: `<ServiceCard />`, `<ProblemCard />`, `<TeamCard />`, `<CTASection />`, `<SEOHead />`. Keep each component's data-fetching separate from its presentation where practical, so a component can be re-skinned without touching data logic.

---

## 7. SEO requirements

SEO is a top priority — implement thoroughly:

- Per-page `<title>` and `<meta name="description">` from each entry's `seo` group, falling back to `SiteSettings.defaultSeo`.
- Open Graph + Twitter card meta tags (title, description, image).
- `generateMetadata` in each App Router route.
- Semantic HTML: one `<h1>` per page, proper heading hierarchy, `<article>` for blog/case studies, descriptive `alt` on all images.
- Auto-generate `sitemap.xml` and `robots.txt` at build.
- JSON-LD structured data: `Organization` on homepage, `Article` on blog posts, `BreadcrumbList` where relevant.
- Static export means fully pre-rendered HTML → ideal for crawlers and for AI/LLM crawlers (aligns with the "AI SEO" service the brand offers).
- Optimize images (Payload generates sized variants; serve modern formats, lazy-load below the fold).
- Target Lighthouse 95+ on Performance, SEO, Accessibility, Best Practices.

---

## 8. Build & deploy flow

**`scripts/build.sh`**
1. Ensure Payload is running / reachable (content source).
2. Run `next build` in `web/` with `output: 'export'`.
3. Output lands in `web/out/`.

**`scripts/deploy.sh`**
1. `rsync` (or FTP) `web/out/` to the target hosting's public directory.
2. Parametrize host/path so the same script works for shared hosting, VPS, or any target.

**Rebuild on publish (automation):**
- Payload `afterChange` hook on CaseStudies / BlogPosts / Services / globals → POST to a small webhook that runs `build.sh && deploy.sh`.
- Also provide a manual "rebuild" path (npm script or a button) as fallback.

---

## 9. Suggested build order for Claude Code

Build in phases; verify each before moving on.

1. **Scaffold** — Next.js app in `web/`, Payload in `cms/`, shared config. Confirm both run locally.
2. **Payload models** — implement all collections + globals from section 4. Seed with a couple of sample entries (one service, one case study, one blog post, two team members).
3. **API layer** — build `web/lib/` fetch helpers to pull from Payload at build time.
4. **Global components** — `<Header />`, `<Footer />`, base layout, styling system. Port visual design from Claude Design.
5. **Homepage** — all sections from `createam-website-copy.md`, driven by the HomePage global + featured case studies.
6. **Services** — index (`/usluge`) + detail template (`/usluge/[slug]`), copy from `createam-remaining-pages-copy.md` §2. Verify all 10 render from CMS.
7. **Case studies module** — index (`/radovi`) with filter + detail (`/radovi/[slug]`). Copy §4–5.
8. **Blog module** — index (`/blog`) + post (`/blog/[slug]`).
9. **Team** (`/tim`) — copy §3.
10. **Contact** (`/kontakt`) — form + FAQ, wire up static-friendly form endpoint. Copy §6.
11. **SEO pass** — metadata, sitemap, robots, JSON-LD, image optimization, Lighthouse audit.
12. **Build + deploy scripts** — `build.sh`, `deploy.sh`, rebuild webhook.
13. **Static export verification** — confirm `/out` renders correctly when served as plain static files (test locally with a static server before deploying).

---

## 10. Open items to confirm before/during build

- Final font pairing + accent color + spacing system (decided in Claude Design — bring those exact values here).
- Static form endpoint choice (Formspree / Web3Forms / Cloudflare Worker).
- Whether Payload runs on home server (byteticsf) or a small VPS for production editing reliability.
- English-language version of the site (i18n) — not in current scope; if needed later, Next.js App Router supports it and Payload supports localized fields, so leave room for it in the content models.
