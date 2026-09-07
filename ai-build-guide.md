# AI Build Guide — Sibongakonke's Personal Site

Instructions for an AI assistant (or any dev) continuing work on this site. Read this before making changes.

## Project Snapshot

- **Owner**: Sibongakonke — junior systems developer, Java/backend focus
- **File**: single-file HTML (`sibongakonke-portfolio.html`), all CSS and JS inline, no build step
- **GitHub**: github.com/sivuhsGorha (verify this is correct and public before relying on live data)
- **Status**: structure and design system are done; content and some links are placeholders

## Design System — Do Not Deviate Without Reason

| Token | Value | Use |
|---|---|---|
| `--ink` | `#0F1B2D` | page background |
| `--ink-soft` | `#16263C` | panel/card background |
| `--paper` | `#EDE7D9` | primary text |
| `--steel` | `#5C7086` | secondary/muted text |
| `--line` | `#33465C` | borders, rules |
| `--amber` | `#E3A857` | accent, CTAs, links |
| `--ok` | `#7FA88C` | status/success indicators |

- **Display font**: Fraunces (serif) — headlines only
- **Body font**: IBM Plex Sans — all paragraph text
- **Mono font**: JetBrains Mono — labels, data, code, nav eyebrow text
- **Visual direction**: blueprint/schematic — sharp corners (2–3px radius max), hairline borders, technical-diagram feel. Do not introduce rounded "SaaS card" styling, drop shadows, or gradients — they break the established identity.
- Respect `prefers-reduced-motion` on any new animation.

If a change requires deviating from these tokens, say so explicitly and explain why before applying it — don't silently drift the palette or type system.

## What's Already Built

- Sticky nav with command palette (`⌘K` / `Ctrl+K`)
- Hero with live uptime counter panel
- About section with facts list + live GitHub stats block (repos, followers, gists, recent repos)
- Skills grid (4 categories)
- Projects list (3 placeholder projects) — one has an expandable SVG architecture diagram
- Copy-to-clipboard on email and project tech tags
- Writing/blog section (placeholder posts)
- Contact footer

## Task Priority — Work in This Order

1. **Replace placeholder projects** with Sibongakonke's real projects. For each: problem solved, role, stack, why those tools, and a real repo/live link. Do not invent metrics or outcomes — leave a `<!-- TODO: confirm with Sibongakonke -->` comment instead of guessing.
2. **Replace placeholder contact links** — real email, real LinkedIn URL, confirm GitHub username is correct and public.
3. **Wire the résumé button** to an actual PDF once one exists. Don't fabricate résumé content.
4. **Replace placeholder blog posts** with real posts or remove the section if there are none yet — an empty "coming soon" section is better than fake post titles.
5. Only after 1–4 are done: additional polish (more diagrams, more interactivity, dark/light toggle, etc.)

## Content Rules

- Never invent specific numbers, employers, dates, or achievements. If real content isn't provided, use a clearly marked placeholder or leave a TODO comment — don't fill gaps with plausible-sounding fiction.
- Keep copy plain and specific. No "passionate," "results-driven," "synergy," or similar filler. Say what was actually built and what was actually hard about it.
- Junior-appropriate honesty: it's fine for the site to say "open to junior roles" and show active learning — don't oversell experience that isn't there.

## Technical Constraints

- Keep it a single HTML file unless explicitly asked to split it up — no build tooling, no framework, no external dependencies beyond Google Fonts.
- All colors must reference the CSS variables above — no hardcoded hex values in new code.
- Any live data fetch (like the GitHub API calls) must fail gracefully with a visible fallback message, never a broken/blank UI.
- Maintain responsiveness down to ~360px width and visible keyboard focus states on all interactive elements.
- Test any new interactive element with keyboard-only navigation before considering it done.

## When Unsure

If a request is ambiguous or missing information needed to do it properly (e.g. "add a project" with no details), ask for the specific missing details rather than inventing content to fill the gap.
