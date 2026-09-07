# SBK.dev

Personal site for Sibongakonke — junior systems developer. Built with [Astro](https://astro.build), deployed as a static site on Cloudflare Pages.

## Local

```sh
npm install
npm run dev
```

Dev server: `http://localhost:4321`. Production check: `npm run build && npm run preview`.

Node 22+ (see `.node-version`).

## Content

| File | What to edit |
| --- | --- |
| [`src/data/site.ts`](src/data/site.ts) | Name, city, email, GitHub, LinkedIn, availability |
| [`src/data/projects.ts`](src/data/projects.ts) | Project titles, summaries, stacks, repo URLs |
| [`src/content/blog/*.md`](src/content/blog) | Writing posts (frontmatter: `title`, `pubDate`, `description`, optional `draft`) |
| [`public/resume.pdf`](public/resume.pdf) | Replace this file with your real résumé; keep the same filename so the hero button keeps working |

## Deploy (Cloudflare Pages)

1. Push this repo to GitHub (`main`).
2. Cloudflare dashboard → **Workers & Pages** → **Create** → connect the GitHub repo.
3. Build command: `npm run build`
4. Output directory: `dist`
5. Environment variable: `NODE_VERSION` = `22`

Preview URLs are created for pull requests. Production tracks `main`. A custom domain can be added later in the Pages project.

The `site` URL in [`astro.config.mjs`](astro.config.mjs) is set to `https://sbk-dev.pages.dev`. Change it to your Pages URL or custom domain so canonicals, Open Graph, sitemap, and RSS stay accurate.
