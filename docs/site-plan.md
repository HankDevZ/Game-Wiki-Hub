# Site plan

Root directory for the Hunt Games network, at `hunt-games.com`. One page (`/`) listing every game
wiki in the network, plus `/about/`, `/contact/`, `/privacy/`, `/terms/`.

## Network entries

Source of truth is [`site/src/data/games.ts`](../site/src/data/games.ts). Snapshot at time of
writing:

| # | Game | Domain | Status |
| - | --- | --- | --- |
| 1 | Bombanana | bombanana.hunt-games.com | live |
| 2 | Crimson Moon | crimson-moon.hunt-games.com | live |
| 3 | Doloc Town | doloctown.hunt-games.com | live |
| 4 | Duskfade | duskfade.hunt-games.com | live |
| 5 | Grain Rot | grainrot.hunt-games.com | live |
| 6 | Iron Nest | ironnest.hunt-games.com | live |
| 7 | Mistfall Hunter | mistfall.hunt-games.com | live |
| 8 | Pax Autocratica | paxautocratica.hunt-games.com | live |
| 9 | Schedule 1 | schedule1.hunt-games.com | live |
| 10 | Sovereign Tower | sovereign-tower.hunt-games.com | live |
| 11 | Wardogs | wardogs-game.hunt-games.com | live |
| 12 | ZeroSpace | zerospace.hunt-games.com | live |
| 13 | Fields of Mistria | mistria.hunt-games.com | live |
| 14 | Sandustry | sandustry.hunt-games.com | live |

Servant of the Lake was dropped from the index (2026-08-18): the project has no implementation yet
(`site/` and `docs/` are empty, not even a git repo), so there was nothing to catalog. Re-add it to
`games.ts` once a real site exists there.

All 14 entries are currently live. The `domain: null` / `status: 'pending'` path in `games.ts`
still exists for the next game that's mid-build — set `domain` to the subdomain once it ships and
the card, JSON-LD `ItemList`, and llms.txt "live" section all update on the next build. No other
file needs to change.

## Blog

`/blog/` holds network-wide editorial content — genre explainers, cross-game recommendations, how
the catalog itself is run — as opposed to per-game guides, which belong on each wiki's own
subdomain. Posts are Markdown files in
[`site/src/content/blog/`](../site/src/content/blog/), typed via
[`site/src/content.config.ts`](../site/src/content.config.ts). Adding a post is just adding a file
there; the index at `/blog/`, each post's page, and the `/llms.txt` "Blog posts" section all pick it
up on the next build with no other file to touch. Set `draft: true` in frontmatter to keep a post
out of all three until it's ready.

## Open items

- Wire up Google Analytics (or an alternative) by setting `ANALYTICS.gaMeasurementId` in
  `site/src/site.config.ts` — currently `null`, so the privacy page correctly states no tracking
  runs.
- Point DNS / Cloudflare Pages project at this repo's `site/` directory once ready to go live.
