// Pulls categories + products from the old sydneyschristmasbarn.com.au site
// into src/data/catalog.json, and downloads product images into public/shop/.
//
//   node scripts/scrape-catalog.mjs            # data + images
//   node scripts/scrape-catalog.mjs --no-images

import { mkdir, writeFile, access } from "node:fs/promises";
import path from "node:path";

const BASE = "https://www.sydneyschristmasbarn.com.au";
const ROOT = path.resolve(import.meta.dirname, "..");
const OUT_JSON = path.join(ROOT, "src/data/catalog.json");
const IMG_DIR = path.join(ROOT, "public/shop");
const WITH_IMAGES = !process.argv.includes("--no-images");

// Menu groups that are collections/tags rather than product categories
const COLLECTION_GROUPS = new Set(["Shop By Theme", "Sale"]);

const ENTITIES = {
  amp: "&", quot: '"', apos: "'", nbsp: " ", lt: "<", gt: ">",
  rsquo: "’", lsquo: "‘", rdquo: "”", ldquo: "“",
  ndash: "–", mdash: "—", hellip: "…", trade: "™",
  reg: "®", copy: "©", deg: "°", times: "×",
};

const decode = (s) =>
  s
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)))
    .replace(/&([a-z]+);/gi, (m, n) => ENTITIES[n.toLowerCase()] ?? m)
    .replace(/\s+/g, " ")
    .trim();

const slugify = (s) =>
  s
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function get(url, as = "text") {
  for (let attempt = 1; ; attempt++) {
    try {
      const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
      if (!res.ok) throw new Error(`${res.status} ${url}`);
      const buf = Buffer.from(await res.arrayBuffer());
      // The old site serves Windows-1252 without declaring a charset
      return as === "buffer" ? buf : new TextDecoder("windows-1252").decode(buf);
    } catch (err) {
      if (attempt >= 3) throw err;
      await sleep(1000 * attempt);
    }
  }
}

/** Parse the sidebar menu: groups -> subcategory links */
function parseMenu(html) {
  const start = html.indexOf("side-navi");
  const end = html.indexOf("</ul>", html.indexOf("/combo-specials/", start));
  const menu = html.slice(start, end);
  const groups = [];
  for (const li of menu.split('<li class="dropdown">').slice(1)) {
    const links = [...li.matchAll(/<a[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/g)].map((m) => ({
      href: m[1].trim(),
      text: decode(m[2].replace(/<[^>]+>/g, "")),
    }));
    if (!links.length) continue;
    const [head, ...rest] = links;
    // Groups with no dropdown (e.g. Nativity Sets) link straight to their page
    const subs = rest.length ? rest : [head];
    groups.push({
      name: head.text,
      subcategories: subs
        .filter((l) => l.href.startsWith("/") && l.href !== "/")
        .map((l) => ({ slug: l.href.replace(/^\/|\/$/g, ""), name: l.text })),
    });
  }
  return groups;
}

/** Parse a category page: intro text + product cards */
function parseCategory(html) {
  const h1 = html.indexOf("<h1>");
  const productsAt = html.indexOf('id="mProducts"');
  const intro = h1 >= 0 && productsAt > h1 ? html.slice(h1, productsAt) : "";
  const paragraphs = [...intro.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/g)]
    .map((m) => decode(m[1].replace(/<[^>]+>/g, " ")))
    .filter(Boolean);

  const products = [];
  for (const card of html.split('<div class="mGrid').slice(1)) {
    const href = card.match(/<a href="([^"]+)"/)?.[1];
    const img = card.match(/<img src="([^"]+)"[^>]*alt="([^"]*)"/);
    const priceHtml = card.match(/smallprices">([\s\S]*?)<\/div>/)?.[1] ?? "";
    if (!href || !img) continue;
    const was = priceHtml.match(/<s>\$([\d,.]+)<\/s>/)?.[1];
    const now = priceHtml.match(/NOW \$([\d,.]+)/)?.[1] ?? priceHtml.match(/\$([\d,.]+)/)?.[1];
    products.push({
      slug: href.replace(/^\/|\/$/g, ""),
      name: decode(img[2]),
      image: img[1],
      price: now ? Number(now.replace(/,/g, "")) : null,
      wasPrice: was ? Number(was.replace(/,/g, "")) : null,
    });
  }
  return { description: paragraphs, products };
}

async function pool(items, size, fn) {
  let i = 0;
  await Promise.all(
    Array.from({ length: size }, async () => {
      while (i < items.length) await fn(items[i++]);
    })
  );
}

async function exists(p) {
  try {
    await access(p);
    return true;
  } catch {
    return false;
  }
}

const home = await get(BASE + "/");
const menu = parseMenu(home);
console.log(`Found ${menu.length} menu groups`);

const products = {};
const pages = menu.flatMap((g) => g.subcategories);
const pageData = {};

await pool(pages, 4, async (sub) => {
  const html = await get(`${BASE}/${sub.slug}/`);
  pageData[sub.slug] = parseCategory(html);
  console.log(`  ${sub.slug}: ${pageData[sub.slug].products.length} products`);
});

const groups = [];
const collections = [];
for (const g of menu) {
  const subs = g.subcategories.map((s) => {
    const { description, products: list } = pageData[s.slug];
    for (const p of list) {
      const existing = products[p.slug];
      // Keep the sale price if any listing shows one
      if (!existing || (p.wasPrice && !existing.wasPrice)) products[p.slug] = { ...p };
    }
    return { slug: s.slug, name: s.name, description, products: list.map((p) => p.slug) };
  });
  const entry = { slug: slugify(g.name), name: g.name, subcategories: subs };
  (COLLECTION_GROUPS.has(g.name) ? collections : groups).push(entry);
}

// Record each product's home category (first category it appears in)
for (const g of groups)
  for (const s of g.subcategories)
    for (const slug of s.products) {
      products[slug].category ??= g.slug;
      products[slug].subcategory ??= s.slug;
    }

if (WITH_IMAGES) {
  await mkdir(IMG_DIR, { recursive: true });
  const list = Object.values(products);
  let done = 0;
  await pool(list, 6, async (p) => {
    const file = path.basename(p.image);
    const dest = path.join(IMG_DIR, file);
    if (!(await exists(dest))) {
      try {
        await writeFile(dest, await get(BASE + p.image, "buffer"));
      } catch (err) {
        console.warn(`  image failed: ${p.image} (${err.message})`);
        return;
      }
    }
    p.image = `/shop/${file}`;
    if (++done % 100 === 0) console.log(`  images: ${done}/${list.length}`);
  });
}

await mkdir(path.dirname(OUT_JSON), { recursive: true });
await writeFile(OUT_JSON, JSON.stringify({ groups, collections, products }, null, 2));
console.log(
  `Saved ${groups.length} categories, ${collections.length} collections, ${Object.keys(products).length} products`
);
