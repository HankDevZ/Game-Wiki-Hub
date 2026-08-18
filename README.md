# Hunt Games — Field Index

The directory site for the Hunt Games network, deployed at **https://hunt-games.com**. Every game
wiki in the network lives at its own subdomain (`ironnest.hunt-games.com`,
`paxautocratica.hunt-games.com`, etc.); this repo builds the root site that catalogs all of them
by genre, status, and domain.

- [`site/`](site) — the Astro site. **Deploy this directory.**
- [`docs/`](docs) — planning notes. Not deployed.

## Running it

```bash
cd site && npm install && npm run dev
```

| Command | What it does |
| --- | --- |
| `npm run dev` | Dev server on `localhost:4321` |
| `npm run build` | Static build into `site/dist/` |
| `npm run preview` | Serve the built output |
| `npm run check` | Type and template diagnostics — keep this at zero |
| `npm run assets` | Regenerate favicon / OG image from `scripts/generate-assets.mjs` |

## Game wikis

| # | Wiki | Genre |
| --- | --- | --- |
| 01 | [Bombanana](https://bombanana.hunt-games.com) | Party / Social Deduction |
| 02 | [Crimson Moon](https://crimson-moon.hunt-games.com) | Co-op Action |
| 03 | [Doloc Town](https://doloctown.hunt-games.com) | Cozy Sim |
| 04 | [Duskfade](https://duskfade.hunt-games.com) | Survival Adventure |
| 05 | [Grain Rot](https://grainrot.hunt-games.com) | Horror |
| 06 | [Iron Nest](https://ironnest.hunt-games.com) | Tower Defense Sim |
| 07 | [Mistfall Hunter](https://mistfall.hunt-games.com) | Action / Hunting |
| 08 | [Pax Autocratica](https://paxautocratica.hunt-games.com) | Strategy |
| 09 | [Schedule 1](https://schedule1.hunt-games.com) | Simulation |
| 10 | [Sovereign Tower](https://sovereign-tower.hunt-games.com) | Roguelike |
| 11 | [Wardogs](https://wardogs-game.hunt-games.com) | Tactical Shooter |
| 12 | [ZeroSpace](https://zerospace.hunt-games.com) | RTS / RPG |
| 13 | [Fields of Mistria](https://mistria.hunt-games.com) | Farming Sim |
| 14 | [Sandustry](https://sandustry.hunt-games.com) | Sandbox / Factory |

This list is generated from [`site/src/data/games.ts`](site/src/data/games.ts) — update the entry
there (not here) when a domain changes or a new wiki joins the network.

## Editing the directory

The whole network listing is one file: [`site/src/data/games.ts`](site/src/data/games.ts). Add a
game there — title, one-line description, genre, bucket, and domain (`null` while a site is still
being built) — and it propagates to the homepage grid, the stats row, the JSON-LD `ItemList`, and
`/llms.txt` automatically. Nothing else needs to change.

## Design

Ledger/field-survey identity: hairline-ruled index grid instead of card shadows, catalog numbers,
rotated status stamps, Fraunces for display type, Public Sans for body copy, IBM Plex Mono for
catalog numbers and domains. Both a light "ledger paper" theme and a dark "night survey" theme are
defined in [`site/src/styles/global.css`](site/src/styles/global.css); the browser picks based on
the reader's OS preference.

## SEO / GEO

- `robots.txt`, `sitemap.xml` — generated at build time ([`src/pages/robots.txt.ts`](site/src/pages/robots.txt.ts), `@astrojs/sitemap`).
- `llms.txt` — the [llmstxt.org](https://llmstxt.org) convention: a plain-text brief of the whole
  network for LLMs and answer engines, generated from `data/games.ts` so it can't drift from the
  page ([`src/pages/llms.txt.ts`](site/src/pages/llms.txt.ts)).
- JSON-LD `Organization`, `WebSite`, and `ItemList` (one entry per live game) on the homepage;
  `BreadcrumbList` on every page via `layouts/Base.astro`.
- Canonical URLs, Open Graph / Twitter card meta, and a generated 1200×630 OG image on every page.

## Deploying

Static assets only — no Worker code and no Astro adapter.

```bash
cd site && npm run deploy
```

## Not affiliated

Hunt Games and every site in the network are independent fan projects. Not affiliated with,
endorsed by, or sponsored by the studios or publishers of the games indexed. See `/about/#disclaimer`
and `/terms/` on the site.
