"use client";

import Image from "next/image";
import { useState } from "react";
import type { ShopProduct } from "@/lib/catalog";
import { Cart, Check, Heart } from "./icons";

const money = (n: number) => `$${n.toFixed(2)}`;

export default function ProductCard({ product, className = "" }: { product: ShopProduct; className?: string }) {
  const [liked, setLiked] = useState(false);
  const [added, setAdded] = useState(false);

  function addToCart() {
    // TODO: connect to the real cart
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  }

  const badge = product.onSale ? "Sale" : product.isNew ? "New" : null;

  return (
    <article
      className={`group flex flex-col rounded-2xl bg-white p-2.5 sm:p-3 shadow-[0_12px_30px_-18px_rgba(0,0,0,0.35)] ring-1 ring-black/5 transition-shadow hover:shadow-[0_18px_40px_-18px_rgba(0,0,0,0.45)] ${className}`}
    >
      <div className="relative aspect-square overflow-hidden rounded-xl bg-[#f6f2eb]">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(min-width: 1280px) 20vw, (min-width: 768px) 33vw, 50vw"
          className="object-contain p-3 mix-blend-multiply transition-transform duration-500 group-hover:scale-105"
        />
        {badge && (
          <span
            className={`absolute left-2.5 top-2.5 rounded-md px-2 py-0.5 text-xs font-semibold text-white ${
              badge === "Sale" ? "bg-[#c8102e]" : "bg-[#c79a52]"
            }`}
          >
            {badge}
          </span>
        )}
        <button
          type="button"
          onClick={() => setLiked((v) => !v)}
          aria-pressed={liked}
          aria-label={liked ? "Remove from wishlist" : "Add to wishlist"}
          className={`absolute right-2 top-2 grid h-8 w-8 place-items-center rounded-full bg-white/80 backdrop-blur transition-colors ${
            liked ? "text-[#c8102e]" : "text-zinc-700 hover:text-[#c8102e]"
          }`}
        >
          <Heart className="h-[18px] w-[18px]" filled={liked} />
        </button>
      </div>

      <h3 className="mt-3 line-clamp-2 min-h-[2.6em] px-1 text-sm sm:mt-4 sm:text-[15px] leading-snug text-zinc-800" title={product.name}>
        {product.name}
      </h3>

      <div className="mt-auto flex items-end justify-between gap-2 px-1 pt-3">
        <p className="leading-tight">
          {product.price !== null && (
            <span className={`block text-base font-bold sm:text-lg ${product.wasPrice ? "text-[#c8102e]" : "text-zinc-900"}`}>
              {money(product.price)}
            </span>
          )}
          {product.wasPrice && (
            <span className="text-sm text-zinc-400 line-through">{money(product.wasPrice)}</span>
          )}
        </p>
        <button
          type="button"
          onClick={addToCart}
          aria-label={`Add ${product.name} to cart`}
          className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-pine sm:h-11 sm:w-11 text-white shadow-md transition-all hover:-translate-y-0.5 hover:bg-[#0e5a36]"
        >
          {added ? <Check className="h-5 w-5" /> : <Cart className="h-5 w-5" />}
        </button>
      </div>
    </article>
  );
}
