"use client";

import { useState } from "react";
import type { ShopProduct } from "@/lib/catalog";
import ProductCard from "./ProductCard";

type Props = {
  title: string;
  products: ShopProduct[];
  subcategories: { slug: string; name: string }[];
};

const PAGE = 24;

const SORTS = {
  featured: { label: "Featured", fn: () => 0 },
  "price-asc": { label: "Price: Low to High", fn: (a: ShopProduct, b: ShopProduct) => (a.price ?? 0) - (b.price ?? 0) },
  "price-desc": { label: "Price: High to Low", fn: (a: ShopProduct, b: ShopProduct) => (b.price ?? 0) - (a.price ?? 0) },
  name: { label: "Name: A to Z", fn: (a: ShopProduct, b: ShopProduct) => a.name.localeCompare(b.name) },
};

export default function ProductGrid({ title, products, subcategories }: Props) {
  const [sub, setSub] = useState("all");
  const [sort, setSort] = useState<keyof typeof SORTS>("featured");
  const [limit, setLimit] = useState(PAGE);

  const list = products.filter((p) => sub === "all" || p.subcategories.includes(sub)).sort(SORTS[sort].fn);

  return (
    <section id="all-products" className="scroll-mt-6 bg-[#f7f2e9] px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="font-serif text-3xl font-bold text-[#10261b] sm:text-4xl">{title}</h2>
          <p className="mt-1 text-zinc-600">
            {list.length} {list.length === 1 ? "product" : "products"}
          </p>
        </div>
        <label className="flex w-full items-center gap-3 text-sm text-zinc-600 sm:w-auto">
          Sort by
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as keyof typeof SORTS)}
            className="min-w-0 flex-1 rounded-full bg-white px-4 py-2 text-zinc-800 sm:flex-none ring-1 ring-black/10 outline-none focus:ring-pine"
          >
            {Object.entries(SORTS).map(([id, s]) => (
              <option key={id} value={id}>
                {s.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      {subcategories.length > 1 && (
        <div className="no-scrollbar -mx-4 mt-6 flex gap-2 overflow-x-auto px-4 py-1 sm:mx-0 sm:flex-wrap sm:px-0">
          {[{ slug: "all", name: "All" }, ...subcategories].map((s) => (
            <button
              key={s.slug}
              type="button"
              aria-pressed={sub === s.slug}
              onClick={() => {
                setSub(s.slug);
                setLimit(PAGE);
              }}
              className={`shrink-0 rounded-full px-4 py-1.5 text-sm transition-colors ${
                sub === s.slug ? "bg-pine text-white" : "bg-white text-zinc-700 ring-1 ring-black/10 hover:ring-pine/50"
              }`}
            >
              {s.name}
            </button>
          ))}
        </div>
      )}

      <ul className="mt-8 grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 min-[1800px]:grid-cols-6">
        {list.slice(0, limit).map((p) => (
          <li key={p.slug}>
            <ProductCard product={p} className="h-full" />
          </li>
        ))}
      </ul>

      {list.length > limit && (
        <div className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={() => setLimit((l) => l + PAGE)}
            className="rounded-full border-2 border-pine px-8 py-3 font-medium text-pine transition-colors hover:bg-pine hover:text-white"
          >
            Load More ({list.length - limit} left)
          </button>
        </div>
      )}
    </section>
  );
}
