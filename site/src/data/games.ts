/**
 * The network directory. One entry per game wiki under hunt-games.com.
 *
 * `domain` is the live subdomain once a site has shipped. Entries without one
 * yet carry `status: 'pending'` and render as uncatalogued — no outbound link
 * until there's somewhere to send a reader.
 */

export type GameBucket =
  | 'Action'
  | 'Strategy'
  | 'Simulation'
  | 'Cozy'
  | 'Horror'
  | 'Adventure'
  | 'Party';

export interface GameEntry {
  /** Catalog number, assigned in the order a site joined the network. */
  n: number;
  title: string;
  /** One-line description in the site's own editorial voice. */
  desc: string;
  /** Specific genre label, shown in italics on the card. */
  genre: string;
  /** Broad bucket used by the filter bar. */
  bucket: GameBucket;
  /** Live subdomain, or null while the site is still being built. */
  domain: string | null;
}

export const GAMES: GameEntry[] = [
  {
    n: 1,
    title: 'Bombanana',
    desc: 'Roles, modules, and how to read a match before it reads you.',
    genre: 'Party / Social Deduction',
    bucket: 'Party',
    domain: 'bombanana.hunt-games.com',
  },
  {
    n: 2,
    title: 'Crimson Moon',
    desc: 'Co-op runs, gear loops, and what actually kills a squad.',
    genre: 'Co-op Action',
    bucket: 'Action',
    domain: 'crimson-moon.hunt-games.com',
  },
  {
    n: 3,
    title: 'Doloc Town',
    desc: "The town's routines, relationships, and seasons, indexed.",
    genre: 'Cozy Sim',
    bucket: 'Cozy',
    domain: 'doloctown.hunt-games.com',
  },
  {
    n: 4,
    title: 'Duskfade',
    desc: 'Release notes, demo impressions, and the systems worth learning early.',
    genre: 'Survival Adventure',
    bucket: 'Adventure',
    domain: 'duskfade.hunt-games.com',
  },
  {
    n: 5,
    title: 'Grain Rot',
    desc: 'Quests, players, and the harvest mechanics nobody explains.',
    genre: 'Horror',
    bucket: 'Horror',
    domain: 'grainrot.hunt-games.com',
  },
  {
    n: 6,
    title: 'Iron Nest',
    desc: 'Turret loadouts, wave math, and the builds that hold the line.',
    genre: 'Tower Defense Sim',
    bucket: 'Simulation',
    domain: 'ironnest.hunt-games.com',
  },
  {
    n: 7,
    title: 'Mistfall Hunter',
    desc: 'Tracking routes, hunt mechanics, and the gear that matters.',
    genre: 'Action / Hunting',
    bucket: 'Action',
    domain: 'mistfall.hunt-games.com',
  },
  {
    n: 8,
    title: 'Pax Autocratica',
    desc: 'Database entries, fixes, and run strategy for the compendium.',
    genre: 'Strategy',
    bucket: 'Strategy',
    domain: 'paxautocratica.hunt-games.com',
  },
  {
    n: 9,
    title: 'Schedule 1',
    desc: 'Mix calculators, recipes, and the math behind every batch.',
    genre: 'Simulation',
    bucket: 'Simulation',
    domain: 'schedule1.hunt-games.com',
  },
  {
    n: 10,
    title: 'Sovereign Tower',
    desc: 'Quest outcomes, branch points, and what each choice costs.',
    genre: 'Roguelike',
    bucket: 'Strategy',
    domain: 'sovereign-tower.hunt-games.com',
  },
  {
    n: 11,
    title: 'Wardogs',
    desc: 'Weapons, maps, and factions, catalogued for the next drop.',
    genre: 'Tactical Shooter',
    bucket: 'Action',
    domain: 'wardogs-game.hunt-games.com',
  },
  {
    n: 12,
    title: 'ZeroSpace',
    desc: "What it is, how it plays, and whether it's worth your time.",
    genre: 'RTS / RPG',
    bucket: 'Strategy',
    domain: 'zerospace.hunt-games.com',
  },
  {
    n: 13,
    title: 'Fields of Mistria',
    desc: 'Seasons, crops, and townsfolk, indexed for the long haul.',
    genre: 'Farming Sim',
    bucket: 'Cozy',
    domain: 'mistria.hunt-games.com',
  },
  {
    n: 14,
    title: 'Sandustry',
    desc: 'Tools and reference data for the factory-sand loop.',
    genre: 'Sandbox / Factory',
    bucket: 'Simulation',
    domain: 'sandustry.hunt-games.com',
  },
];

export const BUCKETS: GameBucket[] = [
  'Action',
  'Strategy',
  'Simulation',
  'Cozy',
  'Horror',
  'Adventure',
  'Party',
];

export const STATS = {
  total: GAMES.length,
  live: GAMES.filter((g) => g.domain).length,
  pending: GAMES.filter((g) => !g.domain).length,
  buckets: new Set(GAMES.map((g) => g.bucket)).size,
};
