// @ts-check
import { copyFile, readFile } from 'node:fs/promises';
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Override at build time for preview deploys, e.g.
//   PUBLIC_SITE_URL=https://staging.example.com npm run build
const SITE = process.env.PUBLIC_SITE_URL ?? 'https://hunt-games.com';

/**
 * `@astrojs/sitemap` only emits `sitemap-index.xml` plus numbered chunks, so the
 * conventional `/sitemap.xml` that crawlers and SEO tools probe would 404.
 * Copy one of them there after the build.
 */
/** @returns {import('astro').AstroIntegration} */
function sitemapAlias() {
  return {
    name: 'sitemap-alias',
    hooks: {
      'astro:build:done': async ({ dir, logger }) => {
        const index = new URL('./sitemap-index.xml', dir);
        try {
          const chunks = [...(await readFile(index, 'utf8')).matchAll(/<loc>([^<]+)<\/loc>/g)];
          const source =
            chunks.length === 1 ? new URL(`./${chunks[0][1].split('/').pop()}`, dir) : index;

          await copyFile(source, new URL('./sitemap.xml', dir));
          logger.info(`\`sitemap.xml\` created as a copy of \`${source.href.split('/').pop()}\``);
        } catch (err) {
          logger.warn(
            `could not create sitemap.xml: ${err instanceof Error ? err.message : String(err)}`,
          );
        }
      },
    },
  };
}

// https://astro.build/config
export default defineConfig({
  site: SITE,
  trailingSlash: 'always',
  build: {
    format: 'directory',
  },
  integrations: [
    sitemap({
      changefreq: 'weekly',
      lastmod: new Date(),
      filter: (page) => !page.includes('/404'),
    }),
    sitemapAlias(),
  ],
});
