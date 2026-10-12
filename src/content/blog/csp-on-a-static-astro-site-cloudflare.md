---
title: "Adding a Content-Security-Policy to a static Astro site on Cloudflare"
pubDate: 2026-10-12
description: "How I added a CSP and security headers to this portfolio with a single _headers file, and the third-party hosts it would have silently blocked."
tags: ["security", "cloudflare", "astro"]
---

I have deployed my own projects on Cloudflare, and this portfolio is one of them. I currently work at Future ProTechY, where I work with AWS, but for personal sites Cloudflare is what I use, so this is written from that side.

This site is a static Astro build deployed on Cloudflare. A Content-Security-Policy (CSP) tells the browser which sources it may load scripts, styles, images and connections from, so a script injected into a page cannot load code from somewhere you did not approve. On a static site there is no server code to set the header, but Cloudflare lets you do it with one file.

## Where the headers live

Put a file called `_headers` in Astro's `public/` folder. Astro copies `public/` into the build output, and Cloudflare reads `_headers` from there:

```text
/*
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Strict-Transport-Security: max-age=31536000; includeSubDomains
  Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=()
  Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https://img.shields.io; connect-src 'self' https://formspree.io; form-action 'self' https://formspree.io; base-uri 'self'; object-src 'none'; frame-ancestors 'self'
```

The `/*` line means "every path". This file is a Cloudflare and Netlify convention. Hosts such as GitHub Pages ignore it, so check where your site is actually served from before trusting it.

I check the result from the command line instead of guessing:

```bash
curl -sI https://your-site.example/ | grep -i content-security-policy
```

## How I built the policy

I started from `default-src 'self'`, which blocks everything not served from my own domain, and then added only what the site really loads:

- **Google Fonts:** `fonts.googleapis.com` for the stylesheet and `fonts.gstatic.com` for the font files.
- **Contact form:** `formspree.io` in both `connect-src` (the `fetch` call) and `form-action` (the plain form fallback).
- **Badges:** `img.shields.io` in `img-src`, because the skills section loads badge images from there.
- **No plugins or framing:** `object-src 'none'` and `frame-ancestors 'self'`.

The reliable way to find what you need is to load every page with the browser console open and read the "Refused to load…" errors.

## Gotcha 1: it blocks Cloudflare's own scripts

Cloudflare Web Analytics loads a script from `static.cloudflareinsights.com` and sends data to `cloudflareinsights.com`. My first policy allowed neither, so the analytics would have stopped working while the site looked completely normal. The fix is two more entries: the script host in `script-src` and the reporting host in `connect-src`.

If you turn on other Cloudflare features that inject scripts (Rocket Loader, Turnstile, email obfuscation), expect the same thing and test again after enabling each one.

## Gotcha 2: `'unsafe-inline'` on a static site

A strict CSP uses a random nonce on each response so that only your own inline scripts run. A static site has no per-request code, so it cannot generate nonces. Astro and the page's own theme script both use inline scripts, which means `script-src` needs `'unsafe-inline'`.

That makes the policy weaker against injected inline scripts than a nonce-based one. What it still does well: it blocks scripts from other domains, stops the page being framed by other sites, blocks plugins, and limits where forms can post. For a static portfolio with no user-generated content, that is a reasonable trade. If you need strict mode, you need a server or an edge function that can add nonces or hashes.

## Gotcha 3: test before you enforce

A mistake in a CSP breaks the page for every visitor. Cloudflare lets you send the same policy under a different header name, which only reports violations in the console instead of blocking:

```text
Content-Security-Policy-Report-Only: default-src 'self'; ...
```

Run it that way, fix everything the console complains about, then rename the header to `Content-Security-Policy`.

## Checklist

- Every page, not just the home page, loaded with the console open
- The contact form actually submitted
- Fonts and images visible
- Analytics still receiving data
- `curl -I` shows the headers on the live site
