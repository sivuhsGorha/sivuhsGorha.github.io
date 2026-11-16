// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

import react from '@astrojs/react';

export default defineConfig({
  site: 'https://sibongakonke-simamane.dev',
  integrations: [
    sitemap({
      filter: (page) =>
        !/\/(4\d\d|5\d\d)\/?$/.test(page),
    }),
    react(),
  ],

  // Shiki writes colours as inline style attributes, which a strict CSP blocks; Prism is class-based.
  markdown: {
    syntaxHighlight: 'prism',
  },

  // Hash-based CSP. Astro hashes every inline script/style it emits and writes the
  // policy into a <meta http-equiv> tag, so 'unsafe-inline' is not needed for either.
  // frame-ancestors cannot be set from <meta>, so it stays in public/_headers.
  security: {
    csp: {
      directives: [
        "default-src 'self'",
        "img-src 'self' data: blob:",
        "font-src 'self' https://fonts.gstatic.com",
        "connect-src 'self' https://formspree.io https://cloudflareinsights.com",
        "worker-src 'self' blob:",
        "media-src 'self' blob:",
        "form-action 'self' https://formspree.io",
        "base-uri 'self'",
        "object-src 'none'",
      ],
      scriptDirective: {
        resources: ["'self'", 'https://static.cloudflareinsights.com'],
      },
      styleDirective: {
        // No inline style="" attributes anywhere (CI enforces this), so no 'unsafe-inline'.
        // React islands set styles through the CSSOM, which CSP does not restrict.
        resources: ["'self'", 'https://fonts.googleapis.com'],
      },
    },
  },
});
