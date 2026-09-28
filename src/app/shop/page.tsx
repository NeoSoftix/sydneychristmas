import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import CategoryHero from "@/components/shop/CategoryHero";
import { ArrowRight } from "@/components/shop/icons";
import { getCategories } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Shop All Categories | Sydney's Christmas Barn",
  description:
    "Browse Christmas fairy lights, decorations, tree ornaments, figurines, wreaths and more from Sydney's Christmas Barn.",
};

export default function ShopPage() {
  const categories = getCategories();
  const total = categories.reduce((n, c) => n + c.count, 0);

  return (
    <>
      <CategoryHero
        title="Shop All Christmas Categories"
        intro={`Lights, decorations and festive favourites for every home. Browse ${total}+ products hand-picked by our family in Dural since 2007.`}
        note="Where the Christmas fun begins"
        image={categories[0]?.cover}
        crumbs={[{ label: "Home", href: "/" }, { label: "Shop" }]}
      />

      <section className="px-4 py-14 sm:px-10 lg:px-16 xl:px-24">
        <h2 className="font-serif text-3xl font-bold text-[#10261b] sm:text-4xl">Explore Our Range</h2>
        <ul className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4 xl:grid-cols-6">
          {categories.map((c) => (
            <li key={c.slug}>
              <Link
                href={`/shop/${c.slug}`}
                className="group flex h-full flex-col items-center rounded-t-full rounded-b-[2rem] bg-white p-2 pb-5 text-center shadow-[0_10px_25px_-15px_rgba(0,0,0,0.35)] ring-1 ring-black/5 transition-all hover:-translate-y-1 hover:ring-pine/40"
              >
                <span className="relative block aspect-square w-full overflow-hidden rounded-t-full rounded-b-2xl bg-[#f4efe6]">
                  {c.cover && (
                    <Image
                      src={c.cover}
                      alt=""
                      fill
                      sizes="(min-width: 1280px) 200px, 45vw"
                      className="object-contain p-3 mix-blend-multiply transition-transform duration-500 group-hover:scale-105"
                    />
                  )}
                </span>
                <span className="mt-4 font-medium text-zinc-800">{c.shortName}</span>
                <span className="mt-1 flex items-center gap-1 text-sm text-zinc-500 group-hover:text-pine">
                  {c.count} products <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
