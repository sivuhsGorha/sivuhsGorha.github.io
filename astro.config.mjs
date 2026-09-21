// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

import react from '@astrojs/react';

import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://sibongakonke-simamane.dev',
  integrations: [
    sitemap({
      filter: (page) =>
        !/\/(4\d\d|5\d\d|react-bits-demo)\/?$/.test(page),
    }),
    react(),
  ],

  vite: {
    plugins: [tailwindcss()],
  },
});