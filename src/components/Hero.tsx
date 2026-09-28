import Image from "next/image";
import Link from "next/link";

function Sparkle({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12 0c.6 6.2 5.8 11.4 12 12-6.2.6-11.4 5.8-12 12-.6-6.2-5.8-11.4-12-12C6.2 11.4 11.4 6.2 12 0z" />
    </svg>
  );
}

function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden>
      <path d="M7.5 5l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const stroke = {
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  fill: "none",
};

const Icons = {
  cart: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
      <path {...stroke} strokeWidth={2} d="M2.5 3.5h2.2l2.3 11.2a1.5 1.5 0 001.5 1.2h8.9a1.5 1.5 0 001.5-1.1L21 7H6" />
      <circle cx="9.5" cy="20" r="1.4" fill="currentColor" />
      <circle cx="17.5" cy="20" r="1.4" fill="currentColor" />
    </svg>
  ),
};

export default function Hero() {
  return (
    <section className="relative isolate flex min-h-[100svh] w-full flex-col overflow-x-clip bg-pine">
      {/* Background artwork */}
      <Image
        src="/hero.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="-z-10 object-cover object-[center_bottom]"
      />

      <div className="mx-auto flex w-full flex-1 flex-col items-center px-4 pb-44 pt-40 text-center sm:pb-56 sm:pt-44 lg:pb-52 lg:pt-40">
        {/* Eyebrow */}
        <p className="flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.2em] text-gold sm:gap-5 sm:text-sm sm:tracking-[0.45em]">
          <Sparkle className="h-4 w-4 shrink-0" />
          Magical Christmas Decorations
          <Sparkle className="h-4 w-4 shrink-0" />
        </p>

        {/* Headline */}
        <h1 className="mt-6 font-serif font-extrabold leading-[0.95] tracking-tight drop-shadow-[0_6px_20px_rgba(0,0,0,0.35)]">
          <span className="block text-[2.5rem] text-white sm:text-7xl lg:text-[6.5rem]">
            Make Christmas
          </span>
          <span className="relative mt-1 inline-block pb-6 text-6xl sm:text-8xl lg:text-[7.5rem]">
            <span className="text-gold-gradient">Magical</span>
            <Sparkle className="animate-twinkle absolute -left-10 top-1/3 h-7 w-7 text-gold sm:-left-16 sm:h-10 sm:w-10" />
            <Sparkle className="animate-twinkle absolute -left-4 bottom-2 h-4 w-4 text-gold [animation-delay:0.8s] sm:-left-8 sm:h-6 sm:w-6" />
            <Sparkle className="animate-twinkle absolute -right-10 top-1/3 h-7 w-7 text-gold [animation-delay:0.4s] sm:-right-14 sm:h-10 sm:w-10" />
            <Sparkle className="animate-twinkle absolute -right-16 bottom-6 hidden h-4 w-4 text-gold [animation-delay:1.2s] sm:block" />
            {/* Swoosh underline */}
            <svg
              viewBox="0 0 440 30"
              className="absolute -bottom-1 left-1/2 w-[105%] -translate-x-1/2 text-gold"
              aria-hidden
            >
              <path
                d="M8 22C120 4 300 2 432 26"
                fill="none"
                stroke="currentColor"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
            </svg>
          </span>
        </h1>

        {/* Subtext */}
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-white/95 sm:text-2xl">
          Discover Christmas lights, decorations, ornaments, trees, wreaths and festive
          favourites for every home.
        </p>

        {/* CTAs */}
        <div className="mt-9 flex w-full flex-col items-center justify-center gap-4 sm:w-auto sm:flex-row sm:gap-6">
          <Link
            href="/shop"
            className="btn-gold group flex w-full items-center justify-center gap-3 rounded-full px-10 py-4 text-lg font-semibold text-pine-dark transition-transform hover:-translate-y-0.5 sm:w-auto"
          >
            {Icons.cart}
            Shop Christmas
            <Arrow className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href="#categories"
            className="group flex w-full items-center justify-center gap-3 rounded-full border-2 border-gold bg-pine-dark/60 px-10 py-[14px] text-lg font-medium text-white backdrop-blur transition-colors hover:bg-gold/15 sm:w-auto"
          >
            Explore Categories
            <Arrow className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
