// Build resources/search-index.json — a lightweight full-text index of every
// guide, used by the hub search box (resources/_articles.js) so it can match
// words inside an article's body, not just its title & tags.
//
// Regenerate after adding or editing guides:   node build-search-index.mjs
// (Same idea as regenerating sitemap.xml — run it when content changes.)

import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const DIR = 'resources';
const OUT = 'search-index.json';
const MAX_CHARS = 12000; // per-guide body cap — large enough to hold a whole guide
                         // (longest is ~12.5k chars) so search covers full content.
                         // The index is lazy-loaded only when the user starts searching.

const decode = (s) =>
  s
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, ' and ')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&rsquo;|&lsquo;|&apos;/g, "'")
    .replace(/&hellip;/g, '...')
    .replace(/&#8377;/g, 'Rs')
    .replace(/&#\d+;/g, ' ')
    .replace(/&[a-zA-Z]+;/g, ' ');

const stripTags = (html) =>
  html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<svg[\s\S]*?<\/svg>/gi, ' ')
    .replace(/<[^>]+>/g, ' ');

const files = readdirSync(DIR)
  .filter((f) => f.endsWith('.html') && !f.startsWith('_'))
  .sort();

const index = [];
for (const f of files) {
  const html = readFileSync(join(DIR, f), 'utf8');

  const titleM = html.match(/<title>([\s\S]*?)<\/title>/i);
  const title = titleM ? decode(titleM[1]).split('|')[0].trim() : f;

  const descM = html.match(/<meta\s+name=["']description["']\s+content=["']([\s\S]*?)["']/i);
  const desc = descM ? decode(descM[1]).trim() : '';

  const artM = html.match(/<article[\s\S]*?<\/article>/i);
  const body = decode(stripTags(artM ? artM[0] : html)).replace(/\s+/g, ' ').trim();

  const x = (desc + ' ' + body).replace(/\s+/g, ' ').trim().slice(0, MAX_CHARS);
  index.push({ u: DIR + '/' + f, t: title, x });
}

const json = JSON.stringify(index);
writeFileSync(OUT, json);
console.log(`Indexed ${index.length} guides → ${OUT} (${(json.length / 1024).toFixed(0)} KB)`);
