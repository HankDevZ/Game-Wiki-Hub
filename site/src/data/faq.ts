/**
 * Homepage FAQ. Grounded in questions that recur across the fan-wiki space generally —
 * affiliation/disclaimer pages, Fandom-accuracy complaints, wiki.gg-style "can I edit this"
 * and "why did this leave Fandom" discussions — rather than invented ones. Rendered on the
 * homepage, embedded as FAQPage JSON-LD, and listed in /llms.txt, all from this one array.
 */

export interface FaqItem {
  question: string;
  /** Plain text, no markup — used in JSON-LD and llms.txt. */
  answer: string;
  /** Optional single link rendered after the answer on the page. */
  link?: { href: string; label: string };
}

export const FAQ: FaqItem[] = [
  {
    question: 'Is Hunt Games affiliated with the games, studios, or publishers it covers?',
    answer:
      "No. Hunt Games and every wiki in the network are independent fan projects. We are not affiliated with, endorsed by, or sponsored by any of the studios or publishers whose games are indexed here.",
    link: { href: '/about/#disclaimer', label: 'Full disclaimer' },
  },
  {
    question: 'How accurate is the information on each wiki?',
    answer:
      "Every entry goes through the same process: surveyed against real search demand before anything is written, catalogued once the site is live, and periodically re-checked afterward for broken links, stale release info, and guides a patch has made wrong. If something is off, tell us which page and we'll fix it.",
    link: { href: '/contact/', label: 'Report an error' },
  },
  {
    question: 'Can I edit or contribute to these wikis, like Fandom?',
    answer:
      "No. Unlike Fandom-style wikis, nothing in the network is open to public editing. Each site is researched and written directly rather than crowdsourced, which also means no anonymous vandalism or ad-stuffed pages to sort through. If something is wrong or missing, email us instead of trying to edit it.",
  },
  {
    question: "My favorite game isn't listed — can I request a wiki for it?",
    answer:
      "Yes. Tell us the game and specifically what's missing from existing coverage of it. We can't promise a site for every suggestion, but we read every one. New entries only get built once there's measured search demand for that specific game, not just enthusiasm for it.",
    link: { href: '/contact/', label: 'Suggest a game' },
  },
  {
    question: 'Why does the site show ads?',
    answer:
      "Ads, served through Google AdSense, are what fund the research and upkeep behind the network. There's no account, paywall, or newsletter gating any of it.",
    link: { href: '/privacy/', label: 'Privacy policy' },
  },
  {
    question: 'Is my browsing tracked?',
    answer:
      "The site runs Google Analytics for aggregate usage — which entries get used, roughly — and Google AdSense, which may set its own cookies to serve ads. Neither is used to build a profile of you individually, and both can be opted out of.",
    link: { href: '/privacy/', label: 'Privacy policy' },
  },
  {
    question: 'Why one independent site per game instead of one big wiki?',
    answer:
      "Wikis that try to cover everything at once tend to end up thin everywhere. Each Hunt Games site exists because there's measured search demand for that specific game, and only publishes pages that answer a real question — release dates, mechanics the game itself doesn't explain, calculators, whatever the game withholds from the player.",
    link: { href: '/about/', label: 'About the network' },
  },
];
