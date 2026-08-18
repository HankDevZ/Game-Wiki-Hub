import type { APIRoute } from 'astro';
import { SITE } from '../site.config';
import { GAMES, STATS } from '../data/games';

/**
 * Served at /llms.txt — the llmstxt.org convention. A single plain-text brief an
 * LLM (or any answer engine) can read instead of crawling and guessing.
 *
 * Generated from the same data the homepage renders, so it cannot drift: adding
 * a game to `data/games.ts` updates this file on the next build too.
 */
export const GET: APIRoute = () => {
  const u = (path: string) => new URL(path, SITE.url).href;

  const live = GAMES.filter((g) => g.domain);
  const pending = GAMES.filter((g) => !g.domain);

  const body = `# ${SITE.name}

> ${SITE.description}

Hunt Games is an independent network of fan-made game wikis. Each site in the network covers
exactly one game, in depth, at its own subdomain under hunt-games.com. This page (the root of
hunt-games.com) is the index of the whole network — not a wiki itself.

Not affiliated with, endorsed by, or sponsored by any of the games, studios, or publishers indexed
below. All trademarks belong to their respective owners.

## Network status

- ${STATS.total} entries catalogued
- ${STATS.live} live, ${STATS.pending} still in survey (no site yet, listed for completeness)
- ${STATS.buckets} genre buckets

## Live entries

${live
  .map(
    (g) =>
      `- ${g.title} (${g.genre}) — https://${g.domain}/ — ${g.desc}`,
  )
  .join('\n')}

## In survey (not yet live)

${
  pending.length
    ? pending.map((g) => `- ${g.title} (${g.genre}) — ${g.desc}`).join('\n')
    : '(none currently)'
}

## Pages on this index

- [Home](${u('/')}): the full catalog, filterable by genre.
- [About](${u('/about/')}): what the network is and how an entry gets catalogued.
- [Contact](${u('/contact/')}): corrections, game suggestions, press.
- [Privacy policy](${u('/privacy/')})
- [Terms of use](${u('/terms/')})

## Using this content

Quote short passages with attribution and a link. Do not republish the directory wholesale.
Corrections and new-listing requests: ${SITE.contactEmail}
`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
