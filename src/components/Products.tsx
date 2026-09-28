import Image from "next/image";
import Link from "next/link";

type Product = { name: string; price: string; image: string; tag: string };


const PRODUCTS: Product[] = [
  {
    name: "Kookaburra Koala Kangaroo Aussie Bristle Door Hanger",
    price: "$44.99",
    image: "/products/door-hanger.png",
    tag: "Door Hanger",
  },
  {
    name: "Hanging 9cm Koala with Christmas Hat Australiana Christmas Tree Ornament",
    price: "$13.99",
    image: "/products/koala.png",
    tag: "Tree Ornament",
  },
  {
    name: "Hanging 9cm White Cockatoo with Christmas Hat Australiana Christmas Tree Decoration",
    price: "$13.99",
    image: "/products/cockatoo.png",
    tag: "Tree Decoration",
  },
  {
    name: "Hanging 9cm Kookaburra with Christmas Hat Christmas Tree Ornament",
    price: "$13.99",
    image: "/products/kookaburra.png",
    tag: "Tree Ornament",
  },
  {
    name: "Hanging 9cm Magpie with Christmas Hat Christmas Tree Ornament",
    price: "$13.99",
    image: "/products/magpie.png",
    tag: "Tree Ornament",
  },
];

function CartIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M2.5 3.5h2.2l2.3 11.2a1.5 1.5 0 001.5 1.2h8.9a1.5 1.5 0 001.5-1.1L21 7H6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="9.5" cy="20" r="1.4" fill="currentColor" />
      <circle cx="17.5" cy="20" r="1.4" fill="currentColor" />
    </svg>
  );
}

/* Snowy wave edge; `flip` turns it upside down for the bottom of the section */
function SnowWave({ flip = false }: { flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 1440 90"
      preserveAspectRatio="none"
      className={`block h-14 w-full sm:h-20 ${flip ? "rotate-180" : ""}`}
      aria-hidden
    >
      <path
        d="M0 40C160 80 320 10 520 34s340 56 520 24 280-44 400-22V90H0z"
        className="fill-pine"
      />
      <path
        d="M0 40C160 80 320 10 520 34s340 56 520 24 280-44 400-22"
        fill="none"
        stroke="#ffffff"
        strokeWidth="6"
        strokeLinecap="round"
        strokeDasharray="1 16"
        opacity=".7"
      />
    </svg>
  );
}

function HangingBauble() {
  return (
    <svg viewBox="0 0 80 130" className="mx-auto h-16 w-auto sm:h-20" aria-hidden>
      <path d="M40 0v58" stroke="#e9c46a" strokeWidth="2" />
      <rect x="32" y="56" width="16" height="10" rx="2" fill="#e9c46a" />
      <circle cx="40" cy="96" r="30" fill="#c8102e" />
      <path d="M12 90c18 8 38 8 56 0" stroke="#e9c46a" strokeWidth="3" fill="none" />
      <path d="M13 104c18 8 36 8 54 0" stroke="#fff" strokeWidth="2" strokeDasharray="2 5" fill="none" opacity=".8" />
      <ellipse cx="29" cy="82" rx="7" ry="4" fill="#fff" opacity=".45" transform="rotate(-30 29 82)" />
    </svg>
  );
}

export default function Products() {
  return (
    <section id="products" className="relative bg-[#fdf8f1]">
      <SnowWave />

      <div className="relative overflow-hidden bg-pine px-4 pb-20 sm:px-6 lg:px-8">
        {/* Subtle falling-snow dots */}
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,.9) 1.2px, transparent 1.6px), radial-gradient(circle, rgba(255,255,255,.6) 1px, transparent 1.4px)",
            backgroundSize: "140px 140px, 90px 90px",
            backgroundPosition: "0 0, 45px 60px",
          }}
        />

        <div className="relative mx-auto max-w-4xl">
          {/* Heading */}
          <div className="-mt-2 text-center">
            <HangingBauble />
            <p className="mt-3 flex items-center justify-center gap-3 text-xs font-medium uppercase tracking-[0.35em] text-gold">
              <span className="h-px w-8 bg-gold/50" />
              Shop the Collection
              <span className="h-px w-8 bg-gold/50" />
            </p>
            <h2 className="mt-3 font-serif text-3xl font-extrabold text-white sm:text-4xl">
              Australiana <span className="text-gold-gradient">Christmas</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/85">
              Aussie bristle koalas, kookaburras, cockatoos and magpies in their Christmas
              hats &mdash; a true-blue touch for your tree and front door.
            </p>
          </div>

          {/* Alternating product rows */}
          <ul className="mt-12 flex flex-col gap-10 sm:gap-12">
            {PRODUCTS.map((p, i) => {
              const reverse = i % 2 === 1;
              return (
                <li
                  key={p.name}
                  className={`flex flex-col items-center gap-5 md:gap-10 ${
                    reverse ? "md:flex-row-reverse" : "md:flex-row"
                  }`}
                >
                  {/* Image capsule */}
                  <div className="relative w-full max-w-[260px] shrink-0 md:w-[260px] md:max-w-none">
                    <div className="relative aspect-[2/1] overflow-hidden rounded-full bg-white shadow-[0_20px_40px_-20px_rgba(0,0,0,0.6)] ring-2 ring-gold/70 ring-offset-[3px] ring-offset-pine">
                      <Image
                        src={p.image}
                        alt={p.name}
                        fill
                        sizes="260px"
                        className="object-contain p-2 transition-transform duration-500 hover:scale-105"
                      />
                    </div>
                    <span
                      className={`absolute -top-2 grid h-9 w-9 place-items-center rounded-full bg-[#c8102e] font-serif text-xs font-bold text-white shadow-lg ring-[3px] ring-pine ${
                        reverse ? "-left-1 md:left-auto md:-right-2" : "-left-1 md:-left-2"
                      }`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>

                  {/* Details */}
                  <div className={`text-center md:flex-1 ${reverse ? "md:text-right" : "md:text-left"}`}>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-gold/90">
                      {p.tag}
                    </p>
                    <h3 className="mt-2 font-serif text-lg font-bold leading-snug text-white sm:text-xl md:line-clamp-2 md:min-h-[3.3em]" title={p.name}>
                      {p.name}
                    </h3>
                    <p className="mt-2 font-serif text-xl font-extrabold text-gold">{p.price}</p>
                    <div
                      className={`mt-4 flex justify-center ${
                        reverse ? "md:justify-end" : "md:justify-start"
                      }`}
                    >
                      <button
                        type="button"
                        className="btn-gold group flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold text-pine-dark transition-transform hover:-translate-y-0.5"
                      >
                        <CartIcon className="h-4 w-4" />
                        Add to cart
                      </button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>

          <div className="mt-14 flex justify-center">
            <Link
              href="#"
              className="group flex items-center gap-2 rounded-full border-2 border-gold px-7 py-2.5 text-base font-medium text-white transition-colors hover:bg-gold/15"
            >
              View All Australiana
              <svg viewBox="0 0 20 20" fill="none" className="h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden>
                <path d="M7.5 5l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      <SnowWave flip />
    </section>
  );
}
