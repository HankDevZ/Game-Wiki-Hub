import type { APIRoute } from 'astro';
import { SITE } from '../site.config';

/**
 * Served at /robots.txt. Generated rather than static so the sitemap URL always
 * matches whatever domain the site was built for.
 */
export const GET: APIRoute = () => {
  const body = `# ${SITE.name} — ${SITE.url}
User-agent: *
Allow: /

# Nothing here is generated per-user, so there is nothing to keep crawlers out of.
# The 404 page is excluded from the sitemap rather than disallowed.

Sitemap: ${new URL('/sitemap-index.xml', SITE.url).href}
Sitemap: ${new URL('/sitemap.xml', SITE.url).href}
`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
