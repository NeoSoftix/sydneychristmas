import catalog from "@/data/catalog.json";
import { CATEGORY_META, type CategoryMeta } from "@/data/categoryMeta";

export type Product = {
  slug: string;
  name: string;
  image: string;
  price: number | null;
  wasPrice: number | null;
  /** Home category; missing for products listed only in collections */
  category?: string;
  subcategory?: string;
};

/** Product as handed to client components, with its filter tags */
export type ShopProduct = Product & {
  isNew: boolean;
  onSale: boolean;
  /** Subcategories of the current category this product is listed in */
  subcategories: string[];
};

export type Subcategory = { slug: string; name: string; description: string[]; products: string[] };
type Group = { slug: string; name: string; subcategories: Subcategory[] };

export type Category = Group & CategoryMeta & { count: number; cover: string };

const products = catalog.products as unknown as Record<string, Product>;
const groups = catalog.groups as Group[];
const collections = catalog.collections as Group[];

const collectionSet = (slug: string) =>
  new Set(collections.flatMap((c) => c.subcategories).find((s) => s.slug === slug)?.products ?? []);

const NEW = collectionSet("new-season-arrivals");
const SALE = collectionSet("on-sale");

function toShopProduct(slug: string, subcategories: string[] = []): ShopProduct {
  const p = products[slug];
  return { ...p, isNew: NEW.has(slug), onSale: SALE.has(slug) || p.wasPrice !== null, subcategories };
}

function unique(slugs: string[]) {
  return [...new Set(slugs)];
}

// Collections from the old menu that also get their own category page
const SHOP_COLLECTIONS = ["sale"];

/** Categories that have products, in menu order (Sale last) */
export function getCategories(): Category[] {
  return [...groups, ...collections.filter((c) => SHOP_COLLECTIONS.includes(c.slug))]
    .map((g) => {
      const slugs = unique(g.subcategories.flatMap((s) => s.products));
      const meta = CATEGORY_META[g.slug] ?? {};
      return {
        ...g,
        ...meta,
        shortName: meta.shortName ?? g.name,
        count: slugs.length,
        cover: products[meta.coverProduct ?? slugs[0]]?.image,
      } as Category;
    })
    .filter((c) => c.count > 0);
}

export function getCategory(slug: string) {
  return getCategories().find((c) => c.slug === slug);
}

export function getCategoryProducts(category: Category): ShopProduct[] {
  const subsOf = new Map<string, string[]>();
  for (const s of category.subcategories)
    for (const slug of s.products) subsOf.set(slug, [...(subsOf.get(slug) ?? []), s.slug]);
  return [...subsOf].map(([slug, subs]) => toShopProduct(slug, subs));
}

export function getProduct(slug: string) {
  return products[slug] ? toShopProduct(slug) : undefined;
}

/** Number of discounted products and the biggest saving, rounded down to 5% */
export function getSaleStats() {
  const onSale = Object.keys(products).map((slug) => toShopProduct(slug)).filter((p) => p.onSale);
  const best = Math.max(
    0,
    ...onSale.map((p) => (p.wasPrice && p.price ? 1 - p.price / p.wasPrice : 0))
  );
  return { count: onSale.length, maxPercent: Math.floor((best * 100) / 5) * 5 };
}

/** First paragraph of the category's intro text from the old site, cut to ~2 sentences */
export function getCategoryIntro(category: Category) {
  if (category.intro) return category.intro;
  const text = category.subcategories.find((s) => s.description.length)?.description[0] ?? "";
  const sentences = text.match(/[^.!?]+[.!?]+/g) ?? [text];
  let out = "";
  for (const s of sentences) {
    if (out && (out + s).length > 230) break;
    out += s;
  }
  return out.trim();
}
