import Image from "next/image";
import Link from "next/link";
import { DEFAULT_FEATURES } from "@/data/categoryMeta";
import { Feature, LeafSpray } from "./icons";

type Props = {
  title: string;
  intro: string;
  note?: string;
  image?: string;
  imageAlt?: string;
  features?: typeof DEFAULT_FEATURES;
  crumbs: { label: string; href?: string }[];
};

// Soft fairy-light bokeh dots behind the hero product: [left%, top%, size px, opacity]
const BOKEH: [number, number, number, number][] = [
  [16, 18, 46, 0.55],
  [84, 12, 30, 0.5],
  [72, 80, 56, 0.35],
  [30, 84, 24, 0.45],
  [93, 52, 40, 0.3],
  [22, 55, 18, 0.5],
  [60, 10, 20, 0.4],
  [48, 90, 34, 0.3],
];

export default function CategoryHero({ title, intro, note, image, imageAlt = "", features = DEFAULT_FEATURES, crumbs }: Props) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-[#fbf7f0] via-[#f8f2e7] to-[#f3ead9]">
      <div className="relative grid lg:grid-cols-[1.15fr_1fr]">
        {/* Copy */}
        <div className="relative z-10 px-4 pb-12 pt-10 sm:px-10 lg:py-14 lg:pl-16 lg:pr-6 xl:pl-24">
          <nav aria-label="Breadcrumb" className="text-sm text-zinc-600">
            <ol className="flex flex-wrap items-center gap-2">
              {crumbs.map((c, i) => (
                <li key={c.label} className="flex items-center gap-2">
                  {i > 0 && <span aria-hidden>&rsaquo;</span>}
                  {c.href ? (
                    <Link href={c.href} className="transition-colors hover:text-pine">
                      {c.label}
                    </Link>
                  ) : (
                    <span aria-current="page" className="text-zinc-800">
                      {c.label}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>

          <h1 className="mt-4 max-w-3xl font-serif text-4xl font-bold leading-[1.05] text-[#10261b] sm:text-5xl lg:text-[3.6rem]">
            {title}
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-zinc-600 sm:text-lg">{intro}</p>

          <ul className="mt-8 grid max-w-2xl grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-4">
            {features.map((f) => (
              <li key={f.label} className="flex items-center gap-3 text-sm leading-snug text-zinc-700">
                <Feature icon={f.icon} className="h-8 w-8 shrink-0 text-pine" />
                <span className="whitespace-pre-line">{f.label}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Image panel */}
        <div className="relative min-h-[300px] sm:min-h-[360px] lg:min-h-full">
          <div className="absolute inset-0 overflow-hidden bg-[radial-gradient(ellipse_at_60%_40%,#3f6b3a_0%,#1f4a2a_55%,#0f3520_100%)] lg:[clip-path:polygon(12%_0,100%_0,100%_100%,0_100%)]">
            {BOKEH.map(([x, y, size, opacity], i) => (
              <span
                key={i}
                className="absolute rounded-full bg-[#ffd98a] blur-[6px]"
                style={{ left: `${x}%`, top: `${y}%`, width: size, height: size, opacity }}
                aria-hidden
              />
            ))}
          </div>
          <LeafSpray className="absolute -left-4 bottom-0 w-40 opacity-80 lg:left-6" />
          <LeafSpray className="absolute -top-6 right-24 w-44 rotate-180 opacity-70" />

          {image && (
            <div className="absolute left-1/2 top-1/2 h-52 w-52 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#fbf7f0] p-5 shadow-[0_25px_50px_-15px_rgba(0,0,0,0.55)] ring-4 ring-gold/60 sm:h-64 sm:w-64 lg:left-[46%]">
              <Image
                src={image}
                alt={imageAlt}
                fill
                priority
                sizes="256px"
                className="rounded-full object-contain p-6 mix-blend-multiply"
              />
            </div>
          )}

          {note && (
            <div className="absolute bottom-6 right-4 w-44 rotate-6 rounded-sm bg-[#f5ecd8] px-4 py-4 text-center font-hand text-[1.4rem] leading-tight text-[#2c2418] shadow-[0_12px_25px_-10px_rgba(0,0,0,0.5)] sm:right-8 sm:w-52 lg:bottom-auto lg:top-1/2 lg:-translate-y-1/2">
              {note}
              <span className="mt-1 block text-xl" aria-hidden>
                &#9825;
              </span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
