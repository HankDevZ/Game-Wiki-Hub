/**
 * Global site metadata. Everything user-visible that isn't page content lives here
 * so the domain / branding can be changed in one place.
 */

export const SITE = {
  /** Must match astro.config.mjs `site`. Used for canonical URLs and JSON-LD. */
  url: import.meta.env.PUBLIC_SITE_URL ?? 'https://hunt-games.com',
  name: 'Hunt Games',
  shortName: 'Hunt Games',
  tagline: 'A field index of every world we’ve mapped',
  description:
    'Hunt Games indexes independent wikis for indie games — Steam pages, release dates, patch notes, and community databases, plus a deep guide for each title.',
  locale: 'en',
  ogLocale: 'en_US',
  /** Twitter/X handle for card attribution, or null to omit the tag. */
  twitter: null as string | null,
  /** Contact address published on the legal pages. */
  contactEmail: 'hello@hunt-games.com',
  /** Publication date of the site itself, for Organization/WebSite schema. */
  founded: '2026-08-18',
} as const;

/**
 * Google Analytics 4.
 *
 * `prodOnly` keeps localhost traffic out of the property. Set `gaMeasurementId` to
 * null to omit the script entirely (and drop the analytics paragraph from the
 * privacy page) until a property exists.
 */
export const ANALYTICS = {
  gaMeasurementId: null as string | null,
  prodOnly: true,
} as const;

export const NAV = [
  { href: '/#index', label: 'Index' },
  { href: '/#how', label: 'How it works' },
  { href: '/about/', label: 'About' },
  { href: '/contact/', label: 'Contact' },
] as const;
