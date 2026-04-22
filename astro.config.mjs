import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.day-fintech.co.kr',
  integrations: [
    tailwind(),
    sitemap({
      serialize(item) {
        item.lastmod = new Date().toISOString().slice(0, 10);
        return item;
      },
    }),
  ],
  output: 'static',
});
