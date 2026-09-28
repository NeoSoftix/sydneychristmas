import Image from "next/image";
import Link from "next/link";
import type { Category } from "@/lib/catalog";
import { ArrowRight } from "./icons";

type Props = {
  categories: Category[];
  activeSlug?: string;
  tagline?: string;
};

function CategoryCard({ category, active, hidden }: { category: Category; active: boolean; hidden?: boolean }) {
  return (
    <Link
      href={`/shop/${category.slug}`}
      // Keep the scroll position so the products below swap in place
      scroll={false}
      aria-current={active ? "page" : undefined}
      tabIndex={hidden ? -1 : undefined}
      className={`group flex h-full w-28 flex-col items-center rounded-t-full rounded-b-[2rem] p-1.5 pb-4 text-center shadow-[0_10px_25px_-15px_rgba(0,0,0,0.35)] transition-all hover:-translate-y-1 sm:w-36 2xl:w-40 ${
        active ? "bg-pine text-white ring-2 ring-pine" : "bg-white text-zinc-700 ring-1 ring-black/5"
      }`}
    >
      <span className="relative block aspect-square w-full overflow-hidden rounded-t-full rounded-b-2xl bg-[#f4efe6]">
        {category.cover && (
          <Image
            src={category.cover}
            alt=""
            fill
            sizes="160px"
            className="object-contain p-2 mix-blend-multiply transition-transform duration-500 group-hover:scale-105"
          />
        )}
      </span>
      <span className="mt-3 px-1 text-[13px] font-medium leading-snug">{category.shortName}</span>
    </Link>
  );
}

export default function RangeStrip({ categories, activeSlug, tagline }: Props) {
  return (
    <section className="bg-[#fdfbf7] pt-10 sm:pt-12">
      <div className="flex flex-wrap items-center gap-x-6 gap-y-3 px-4 sm:px-6 lg:px-8">
        <h2 className="font-serif text-3xl font-bold text-[#10261b] sm:text-4xl">Explore Our Range</h2>
        <span className="hidden h-px w-10 bg-[#10261b]/60 sm:block" aria-hidden />
        {tagline && (
          <p className="max-w-sm font-hand text-xl leading-tight text-zinc-600 sm:text-2xl">{tagline}</p>
        )}
        <Link
          href="/shop"
          className="group ml-auto flex items-center gap-3 text-sm font-medium text-zinc-700 hover:text-pine"
        >
          View All Categories
          <span className="grid h-9 w-9 place-items-center rounded-full bg-pine text-white transition-transform group-hover:translate-x-0.5">
            <ArrowRight className="h-4 w-4" />
          </span>
        </Link>
      </div>

      {/* Endless slider: pauses on hover / keyboard focus */}
      <div className="marquee-pause no-scrollbar mt-6 overflow-x-auto [mask-image:linear-gradient(90deg,transparent,#000_4%,#000_96%,transparent)] motion-safe:overflow-hidden">
        <div
          className="animate-marquee flex w-max"
          style={{ "--marquee-duration": `${categories.length * 4}s` } as React.CSSProperties}
        >
          {[false, true].map((copy) => (
            <ul key={String(copy)} aria-hidden={copy || undefined} className="flex gap-4 pb-8 pl-4 pt-2 sm:pl-6 lg:pl-8">
              {categories.map((c) => (
                <li key={c.slug}>
                  <CategoryCard category={c} active={c.slug === activeSlug} hidden={copy} />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
