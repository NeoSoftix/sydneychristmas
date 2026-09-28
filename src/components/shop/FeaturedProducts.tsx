"use client";

import Image from "next/image";
import { useMemo, useRef, useState } from "react";
import type { ShopProduct } from "@/lib/catalog";
import ProductCard from "./ProductCard";
import { ArrowRight, Chevron, LeafSpray } from "./icons";

type Filter = { id: string; label: string; match: (p: ShopProduct) => boolean };

type Props = {
  noun: string;
  products: ShopProduct[];
  subcategories: { slug: string; name: string }[];
  promo: { eyebrow: string; title: string; text: string; image?: string };
};

const MAX_ITEMS = 12;

export default function FeaturedProducts({ noun, products, subcategories, promo }: Props) {
  const filters = useMemo(() => {
    const list: Filter[] = [{ id: "all", label: "All", match: () => true }];
    if (subcategories.length > 1)
      for (const s of subcategories)
        list.push({ id: s.slug, label: s.name, match: (p) => p.subcategories.includes(s.slug) });
    if (products.some((p) => p.isNew)) list.push({ id: "new", label: "New Arrivals", match: (p) => p.isNew });
    if (products.some((p) => p.onSale)) list.push({ id: "sale", label: "On Sale", match: (p) => p.onSale });
    return list;
  }, [products, subcategories]);

  const [active, setActive] = useState("all");
  const track = useRef<HTMLUListElement>(null);

  const filter = filters.find((f) => f.id === active) ?? filters[0];
  const shown = products.filter(filter.match).slice(0, MAX_ITEMS);

  function scroll(dir: 1 | -1) {
    const el = track.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  }

  function choose(id: string) {
    setActive(id);
    track.current?.scrollTo({ left: 0 });
  }

  return (
    <section className="bg-[#fdfbf7] px-4 pb-12 pt-10 sm:px-6 sm:pb-16 lg:px-8">
      <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
        <h2 className="font-serif text-3xl font-bold text-[#10261b] sm:text-4xl">Featured {noun}</h2>
        <span className="hidden h-px w-10 bg-[#10261b]/60 sm:block" aria-hidden />

        <div className="flex w-full min-w-0 items-center gap-3 lg:ml-auto lg:w-auto">
          <div role="tablist" aria-label="Filter products" className="no-scrollbar flex min-w-0 flex-1 gap-2 overflow-x-auto py-1">
            {filters.map((f) => (
              <button
                key={f.id}
                type="button"
                role="tab"
                aria-selected={f.id === active}
                onClick={() => choose(f.id)}
                className={`shrink-0 rounded-full px-5 py-2 text-sm transition-colors ${
                  f.id === active
                    ? "bg-pine font-medium text-white"
                    : "bg-white text-zinc-700 ring-1 ring-black/10 hover:ring-pine/50"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
          <div className="hidden shrink-0 gap-2 sm:flex">
            <button
              type="button"
              onClick={() => scroll(-1)}
              aria-label="Previous products"
              className="grid h-10 w-10 place-items-center rounded-full bg-white text-zinc-700 ring-1 ring-black/10 hover:text-pine"
            >
              <Chevron dir="left" className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => scroll(1)}
              aria-label="Next products"
              className="grid h-10 w-10 place-items-center rounded-full bg-white text-zinc-700 ring-1 ring-black/10 hover:text-pine"
            >
              <Chevron className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-5 sm:mt-8 lg:grid-cols-[minmax(280px,340px)_1fr]">
        {/* Promo card */}
        <div className="relative isolate flex flex-col justify-center overflow-hidden rounded-3xl bg-gradient-to-br from-[#1d4a30] to-[#0d3320] p-6 text-white sm:p-8">
          <LeafSpray className="absolute -right-10 -top-10 -z-10 w-44 rotate-180 opacity-40" />
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-white/75">{promo.eyebrow}</p>
          <h3 className="mt-3 font-serif text-2xl font-bold leading-tight sm:text-3xl">{promo.title}</h3>
          <p className="mt-3 max-w-md leading-relaxed text-white/90 sm:mt-4">{promo.text}</p>
          <div className="mt-5 flex items-end justify-between gap-4 sm:mt-6">
            <a
              href="#all-products"
              className="group flex shrink-0 items-center gap-3 rounded-full bg-[#fbf7f0] px-6 py-3 font-medium text-[#10261b] transition-transform hover:-translate-y-0.5"
            >
              Shop Now
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            {promo.image && (
              <div className="relative -mb-2 -mr-2 h-20 w-20 shrink-0 sm:-mb-3 sm:-mr-3 sm:h-28 sm:w-28 rounded-full bg-[#fbf7f0] ring-4 ring-gold/50">
                <Image
                  src={promo.image}
                  alt=""
                  fill
                  sizes="112px"
                  className="rounded-full object-contain p-3 mix-blend-multiply"
                />
              </div>
            )}
          </div>
        </div>

        {/* Product carousel */}
        <ul
          ref={track}
          className="no-scrollbar flex min-w-0 snap-x snap-mandatory gap-4 overflow-x-auto pb-4"
        >
          {shown.map((p) => (
            <li key={p.slug} className="w-[70%] shrink-0 snap-start min-[480px]:w-[46%] sm:w-[42%] md:w-[31%] xl:w-[23.5%] 2xl:w-[18.8%]">
              <ProductCard product={p} className="h-full" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
