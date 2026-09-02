# Kislay Tinker — Portfolio (Next.js + TypeScript)

A single-page data-science portfolio built with the **Next.js App Router**, **TypeScript**,
**Tailwind CSS**, **Framer Motion** and **lucide-react**. It is a faithful, componentised port
of the standalone `index.html` in the parent folder — same design system, same content, same
interactions (hero node-network, live K-Means playground, hand-built charts, case-study drawer,
custom cursor, scroll reveals).

---

## Getting started

```bash
cd portfolio-nextjs
npm install
npm run dev      # http://localhost:3000
```

Other scripts:

```bash
npm run build    # production build
npm run start    # serve the production build
npm run lint     # eslint (next/core-web-vitals)
```

> Requires Node 18.17+ (Next.js 14). If `npm install` fails behind a proxy/registry block,
> run it on a machine with normal npm access — no offline vendoring is included.

---

## ⚙️ Configuration you must fill in

All content lives in one file: **`data/content.ts`**. Three values are placeholders because they
were not provided, and are intentionally *not* invented:

```ts
export const SITE = {
  // ...
  linkedin: "https://www.linkedin.com/in/your-handle", // TODO: your real LinkedIn URL
  email:    "your.email@example.com",                   // TODO: your real email
};
```

1. **`linkedin`** — replace with your actual LinkedIn profile URL.
2. **`email`** — replace with your actual email (used by the Contact buttons + "Say hello").
3. **Per-project `repo` links** — every project currently points to your GitHub *profile*
   (`https://github.com/KislayTinker`) so there are no broken/404 links. When you know each
   repository's exact URL, set the `repo` field on that project in `PROJECTS`.

Optional, once you deploy:

- In `app/layout.tsx`, add `openGraph.url` and an `openGraph.images` / `twitter.images` entry
  (a 1200×630 preview) pointing at your deployed domain.

---

## Content & honesty notes

This portfolio deliberately **does not fabricate metrics, employment, certifications or awards.**
A few things are honest inferences or presentation choices worth knowing:

- **Case-study "Evaluation" / "Result"** describe *methodology and capability*, not invented
  accuracy/F1 numbers. The fake-news project is explicitly framed as in-development.
- **Self-assessment is labelled as such** — the "Focus radar" chart is described in the UI as
  *self-assessed emphasis*, not a measured statistic.
- **Technology attributions** reflect each project's stated stack (e.g. Power BI/DAX with Retail
  Analytics; PyTorch/Transformers/BERT/ViT with the multimodal detector; Java with the search
  engine). Adjust the `tech` arrays in `data/content.ts` if any differ from reality.
- **Counts** (CGPA 9.51, 460+ LeetCode, 7 featured projects) come from your provided profile.

---

## Project structure

```
portfolio-nextjs/
├─ app/
│  ├─ layout.tsx        # fonts (next/font), SEO metadata, JSON-LD, Navbar, SiteEffects
│  ├─ page.tsx          # section order
│  └─ globals.css       # full design system (ported 1:1 from index.html)
├─ components/
│  ├─ Navbar.tsx        # (client) scroll state, mobile toggle, scrollspy
│  ├─ Hero.tsx / HeroCanvas.tsx   # hero + cursor-reactive node network (client canvas)
│  ├─ About.tsx, Experience.tsx, Education.tsx, ProblemSolving.tsx,
│  │  GitHubSection.tsx, Contact.tsx, Footer.tsx        # server components
│  ├─ Skills.tsx        # (client) hover cross-highlight
│  ├─ Projects.tsx      # (client) filters + accessible case-study modal
│  ├─ ProjectViz.tsx    # deterministic per-project SVG diagrams (SSR-safe)
│  ├─ InsideData.tsx    # (client) radar + tech-footprint bars + donut, reveal on scroll
│  ├─ DataPlayground.tsx# (client) live K-Means from scratch
│  └─ SiteEffects.tsx   # (client) global progressive enhancement: reveals, counters,
│                       #          GPA ring, problem-solving matrix, custom cursor
├─ data/content.ts      # ← single source of truth (edit me)
├─ lib/hooks.ts         # small client hooks (in-view, reduced-motion, mounted, count-up)
└─ tailwind.config.ts, tsconfig.json, next.config.mjs, postcss.config.mjs
```

## Architecture notes

- **Progressive enhancement:** static sections render on the server with class/attribute hooks
  (`.reveal`, `[data-count]`, `#gpaArc`, `#ps-matrix`). A single client component, `SiteEffects`,
  attaches the cross-cutting behaviour after mount. Interactive/canvas pieces are their own
  self-contained client components.
- **`prefers-reduced-motion`** is respected everywhere (animations collapse to final state).
- **React StrictMode** is on; every effect cleans up (listeners removed, timers cleared,
  imperatively-built DOM cleared) so double-mount in dev is safe.
- **Accessibility:** skip link, focus-trapped modal (ESC + scrim close), `aria-live` skill note,
  labelled SVG charts, keyboard-usable controls.
