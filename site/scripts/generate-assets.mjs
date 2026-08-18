/**
 * Renders the site's raster assets from inline SVG so there is no binary source
 * of truth to keep in sync. Run with `npm run assets` after changing the design.
 *
 * Outputs: public/img/og.png (Open Graph card), public/img/apple-touch-icon.png,
 * public/img/icon-512.png, public/favicon.ico (PNG bytes in an ICO container),
 * public/favicon.svg.
 */
import { mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const pub = fileURLToPath(new URL('../public/', import.meta.url));
const img = `${pub}img/`;

// Dark ("night survey") palette — matches :root under prefers-color-scheme: dark
// in src/styles/global.css.
const INK = '#10140f';
const LINE = '#3c4438';
const ACCENT = '#d3a548';
const TEXT = '#ece7d8';
const DIM = '#a3a996';

// Light ("ledger paper") palette — matches the bare :root in the same file. This
// is the theme most viewers see by default, so it's what the static favicon
// fallback (favicon.ico, apple-touch-icon, icon-512) renders in: a favicon that
// only ever shows the dark variant reads as mismatched next to the light page
// chrome most visitors get.
const PAPER = '#eceae0';
const PAPER_TEXT = '#1b1f17';
const PAPER_ACCENT = '#a1731f';

const SERIF = "Georgia, 'Times New Roman', serif";
const MONO = "'SF Mono', Menlo, Consolas, monospace";

/**
 * Compass mark used by the favicon and the OG card: a survey instrument, not a
 * game reticle. Ring + ticks carry the foreground color; the needle carries the
 * one accent hit, same "structure vs. the one bold highlight" split the site
 * itself uses.
 */
const compass = (cx, cy, r, stroke, accent) => `
  <g fill="none" stroke="${stroke}" stroke-width="${r * 0.07}">
    <circle cx="${cx}" cy="${cy}" r="${r}"/>
    <path d="M${cx} ${cy - r * 1.28}V${cy - r * 0.86}M${cx} ${cy + r * 0.86}V${cy + r * 1.28}
             M${cx - r * 1.28} ${cy}H${cx - r * 0.86}M${cx + r * 0.86} ${cy}H${cx + r * 1.28}"/>
  </g>
  <path d="M${cx} ${cy - r * 0.55}L${cx + r * 0.18} ${cy}L${cx} ${cy + r * 0.55}L${cx - r * 0.18} ${cy}Z"
        fill="${accent}"/>`;

/** Static icon (no theme awareness) — used for the raster fallbacks. */
const icon = (size, bg, stroke, accent) => `
<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="12" fill="${bg}"/>
  ${compass(32, 32, 21, stroke, accent)}
</svg>`;

/**
 * Theme-aware favicon.svg. Chrome and Firefox both evaluate `prefers-color-scheme`
 * inside an SVG favicon's own stylesheet, so this one swaps palettes with the
 * reader's OS setting instead of being permanently one theme — the raster
 * fallbacks below can't do this, which is why they default to the light palette.
 */
const themedFaviconSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <style>
    .bg { fill: ${PAPER}; }
    .ring { stroke: ${PAPER_TEXT}; }
    .needle { fill: ${PAPER_ACCENT}; }
    @media (prefers-color-scheme: dark) {
      .bg { fill: ${INK}; }
      .ring { stroke: ${TEXT}; }
      .needle { fill: ${ACCENT}; }
    }
  </style>
  <rect class="bg" width="64" height="64" rx="12"/>
  <g class="ring" fill="none" stroke-width="1.47">
    <circle cx="32" cy="32" r="21"/>
    <path d="M32 5.12V13.94M32 50.06V58.88M5.12 32H13.94M50.06 32H58.88"/>
  </g>
  <path class="needle" d="M32 20.45L35.78 32L32 43.55L28.22 32Z"/>
</svg>`.trim();

/** Concentric wobble rings, matching the hero's ambient contour texture. */
function contourRings(cx, cy, count, gap, stroke) {
  let out = '';
  for (let i = 0; i < count; i++) {
    const r = 60 + i * gap;
    const pts = [];
    const n = 48;
    for (let j = 0; j <= n; j++) {
      const t = (j / n) * Math.PI * 2;
      const wob = Math.sin(t * 3 + r * 0.05) * (r * 0.05) + Math.cos(t * 5 - r * 0.02) * (r * 0.025);
      const x = cx + Math.cos(t) * (r + wob);
      const y = cy + Math.sin(t) * (r + wob) * 0.62;
      pts.push(`${j === 0 ? 'M' : 'L'}${x.toFixed(1)} ${y.toFixed(1)}`);
    }
    const alpha = Math.max(0.05, 0.3 - i * 0.018);
    out += `<path d="${pts.join(' ')}Z" fill="none" stroke="${stroke}" stroke-width="1" opacity="${alpha.toFixed(3)}"/>`;
  }
  return out;
}

const ogSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="${INK}"/>
  ${contourRings(980, 160, 9, 46, LINE)}
  <rect x="0" y="0" width="1200" height="630" fill="none" stroke="${LINE}" stroke-width="2"/>

  <text x="80" y="130" fill="${DIM}" font-family="${MONO}" font-size="21" letter-spacing="4">
    HUNT-GAMES.COM &#183; FIELD INDEX
  </text>

  <text x="78" y="252" fill="${TEXT}" font-family="${SERIF}" font-size="76" font-weight="700"
        letter-spacing="-1">Every world we&#8217;ve mapped,</text>
  <text x="78" y="336" fill="${TEXT}" font-family="${SERIF}" font-size="76" font-weight="700"
        letter-spacing="-1">indexed in one place.</text>

  <text x="80" y="404" fill="${DIM}" font-family="${SERIF}" font-size="27">
    Independent, deeply-researched wikis for games that don&#8217;t get one anywhere else.
  </text>

  <g font-family="${MONO}" font-size="22" fill="${ACCENT}">
    <text x="80" y="560">N&#176; 001&#8211;015</text>
  </g>
  <g transform="translate(1030,150)">
    ${compass(0, 0, 52, TEXT, ACCENT)}
  </g>
</svg>`;

await mkdir(img, { recursive: true });

await sharp(Buffer.from(ogSvg)).png({ compressionLevel: 9 }).toFile(`${img}og.png`);
await sharp(Buffer.from(icon(180, PAPER, PAPER_TEXT, PAPER_ACCENT)))
  .png()
  .toFile(`${img}apple-touch-icon.png`);
await sharp(Buffer.from(icon(512, PAPER, PAPER_TEXT, PAPER_ACCENT)))
  .png()
  .toFile(`${img}icon-512.png`);
await writeFile(`${pub}favicon.svg`, themedFaviconSvg);

/**
 * Minimal ICO writer. Browsers accept PNG-compressed entries, so the container is
 * a 6-byte header plus one 16-byte directory entry pointing at raw PNG bytes —
 * far less machinery than pulling in an ICO library for one 32px image.
 */
const png32 = await sharp(Buffer.from(icon(32, PAPER, PAPER_TEXT, PAPER_ACCENT))).png().toBuffer();
const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0); // reserved
header.writeUInt16LE(1, 2); // type: icon
header.writeUInt16LE(1, 4); // one image
const entry = Buffer.alloc(16);
entry[0] = 32; // width
entry[1] = 32; // height
entry[2] = 0; // palette colours
entry[3] = 0; // reserved
entry.writeUInt16LE(1, 4); // colour planes
entry.writeUInt16LE(32, 6); // bits per pixel
entry.writeUInt32LE(png32.length, 8);
entry.writeUInt32LE(header.length + entry.length, 12);
await writeFile(`${pub}favicon.ico`, Buffer.concat([header, entry, png32]));

console.log('assets written to public/');
