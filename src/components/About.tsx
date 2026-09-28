import Image from "next/image";
import Link from "next/link";

function Holly({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 90" className={className} aria-hidden>
      <path
        d="M58 48C44 30 22 26 6 34c8 2 10 8 8 14 6-4 12-2 14 4 4-6 10-6 14-2 2-6 8-6 16-2z"
        fill="#1f7a3f"
      />
      <path
        d="M62 46C68 26 88 12 108 14c-6 5-5 11-1 16-7-2-12 2-12 8-5-5-11-3-14 2-3-6-9-5-19 6z"
        fill="#2c8f4c"
      />
      <path d="M58 48L14 40M62 46l38-26" stroke="#145c2d" strokeWidth="1.5" fill="none" />
      <circle cx="58" cy="56" r="8" fill="#c8102e" />
      <circle cx="70" cy="60" r="7" fill="#d62839" />
      <circle cx="62" cy="68" r="6.5" fill="#b00d27" />
      <circle cx="55.5" cy="53.5" r="2" fill="#fff" opacity=".6" />
      <circle cx="68" cy="57.5" r="1.8" fill="#fff" opacity=".6" />
    </svg>
  );
}

function Snowflake({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path
        d="M12 2v20M3.3 7l17.4 10M3.3 17L20.7 7M12 2l-2 2m2-2l2 2m-2 18l-2-2m2 2l2-2"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

export default function About() {
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-gradient-to-b from-white to-[#fdf8f1] px-4 py-20 sm:px-6 sm:py-28 lg:px-8"
    >
      {/* Festive corner decorations */}
      <Holly className="absolute -left-2 top-6 w-28 -rotate-12 sm:w-40" />
      <Holly className="absolute -right-4 bottom-10 w-24 rotate-[160deg] opacity-90 sm:w-32" />
      <Snowflake className="absolute right-[12%] top-16 h-8 w-8 text-[#c8102e]/15" />
      <Snowflake className="absolute left-[8%] bottom-24 h-10 w-10 text-pine/10" />
      <Snowflake className="absolute left-[45%] top-10 h-6 w-6 text-gold/40" />

      <div className="relative mx-auto max-w-6xl">
        {/* Intro: image + welcome */}
        <div className="grid items-center gap-12 md:grid-cols-[auto_1fr] lg:gap-20">
          <div className="mx-auto">
            <Image
              src="/about-elf.png"
              alt="A cheerful elf singing and playing the banjo"
              width={1254}
              height={1254}
              className="h-auto w-72 sm:w-96"
            />
          </div>

          <div className="text-center md:text-left">
            <p className="flex items-center justify-center gap-3 text-sm font-medium uppercase tracking-[0.35em] text-[#c8102e] md:justify-start">
              <span className="h-px w-8 bg-[#c8102e]/50" />
              About Us
            </p>
            <h2 className="mt-4 font-serif text-3xl font-extrabold leading-tight text-[#b00d27] sm:text-4xl lg:text-[2.75rem]">
              Hi and Welcome to Sydney&apos;s Christmas Barn,{" "}
              <span className="text-pine">&ldquo;Where the Christmas Fun Begins&rdquo;</span>
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-zinc-700">
              Thank you for visiting our site. Sydney&apos;s Christmas Barn was established in
              2007 and has been growing stronger every year and is now one of Sydney&apos;s
              largest suppliers of LED Fairy Lights and Christmas decorations all year round.
              We&apos;re a family owned and run business located in Dural in Sydney&apos;s
              North-West on the family farm.
            </p>
          </div>
        </div>

        {/* Story card */}
        <div className="mt-16 rounded-[2rem] border-2 border-dashed border-[#e7a3ad] bg-[#fdecee] px-6 py-10 text-center shadow-[0_20px_40px_-25px_rgba(176,13,39,0.35)] sm:px-12 sm:py-12">
          <p className="mx-auto max-w-4xl text-base leading-relaxed text-zinc-700 sm:text-lg">
            We wanted to create a unique Christmas experience where families come every year
            to create a family tradition. Families come back year after year to purchase their
            Christmas trees, lights and decorations, sit and have a chat with Santa, take a
            photo or two and feed the reindeer. We have watched many families grow and are now
            seeing lots of grandchildren join the yearly adventure.
          </p>
          <p className="mx-auto mt-5 max-w-4xl text-base font-medium leading-relaxed text-[#8f0b20] sm:text-lg">
            Our friendly staff are on hand to help you choose your Christmas lights and
            decorations, with plenty of advice on design and installation ideas &mdash; and we
            always check every item before it leaves the store.
          </p>
          <p className="mt-8 font-serif text-xl font-bold italic text-pine">
            Cathy &amp; George <span className="font-sans text-base font-normal not-italic text-zinc-500">(Directors)</span>
          </p>
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            href="#"
            className="group flex items-center gap-2 rounded-full bg-[#b00d27] px-9 py-4 text-lg font-semibold text-white shadow-[0_12px_25px_-10px_rgba(176,13,39,0.7)] transition-all hover:-translate-y-0.5 hover:bg-[#c8102e]"
          >
            Read Our Story
            <svg viewBox="0 0 20 20" fill="none" className="h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden>
              <path d="M7.5 5l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
