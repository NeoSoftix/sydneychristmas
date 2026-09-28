import Image from "next/image";
import Link from "next/link";
import { SITE } from "@/data/site";

const QUICK_LINKS = [
  { label: "Shop", href: "/shop" },
  { label: "About Us", href: "/old-home#about" },
  { label: "Gallery", href: "#" },
  { label: "Shipping", href: "#" },
  { label: "Contact", href: "/#contact" },
];

const CATEGORY_LINKS = [
  { label: "Fairy Lights", href: "/shop/christmas-fairy-lights" },
  { label: "Christmas Decorations", href: "/shop/christmas-decorations" },
  { label: "Display Lights", href: "/shop/christmas-display-lights" },
  { label: "Tree Decorations", href: "/shop/christmas-tree-decorations" },
  { label: "Australiana", href: "/shop/australiana-christmas" },
  { label: "Nativity Sets", href: "/shop/nativity-sets" },
];

const SOCIALS = [
  {
    label: "Facebook",
    href: SITE.facebook,
    path: "M14 8h3V4h-3a4 4 0 00-4 4v2H8v4h2v8h4v-8h3l1-4h-4V8z",
    fill: true,
  },
  {
    label: "Instagram",
    href: SITE.instagram,
    path: "M7 3h10a4 4 0 014 4v10a4 4 0 01-4 4H7a4 4 0 01-4-4V7a4 4 0 014-4zm5 5a4 4 0 100 8 4 4 0 000-8zm5.5-1.5h.01",
    fill: false,
  },
  {
    label: "YouTube",
    href: "#",
    path: "M22 12s0-3.3-.4-4.8a2.5 2.5 0 00-1.8-1.8C18.3 5 12 5 12 5s-6.3 0-7.8.4a2.5 2.5 0 00-1.8 1.8C2 8.7 2 12 2 12s0 3.3.4 4.8a2.5 2.5 0 001.8 1.8c1.5.4 7.8.4 7.8.4s6.3 0 7.8-.4a2.5 2.5 0 001.8-1.8c.4-1.5.4-4.8.4-4.8zM10 15V9l5 3-5 3z",
    fill: true,
  },
];

function Sparkle({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12 0c.6 6.2 5.8 11.4 12 12-6.2.6-11.4 5.8-12 12-.6-6.2-5.8-11.4-12-12C6.2 11.4 11.4 6.2 12 0z" />
    </svg>
  );
}

function ColumnTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="flex items-center gap-2 font-serif text-lg font-bold text-gold">
      <Sparkle className="h-3.5 w-3.5" />
      {children}
    </h3>
  );
}

const linkClass = "text-white/80 transition-colors hover:text-gold";

export default function Footer() {
  return (
    <footer className="bg-[#fdf8f1]">
      <div className="relative overflow-hidden rounded-t-[2.5rem] bg-pine px-4 pt-16 text-white sm:rounded-t-[4rem] sm:px-10 sm:pt-20 lg:px-14">
        {/* Subtle falling-snow dots */}
        <div
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,.9) 1.2px, transparent 1.6px), radial-gradient(circle, rgba(255,255,255,.6) 1px, transparent 1.4px)",
            backgroundSize: "140px 140px, 90px 90px",
            backgroundPosition: "0 0, 45px 60px",
          }}
        />

        <div className="relative grid w-full gap-12 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr] lg:gap-16">
          {/* Brand */}
          <div>
            <Link href="/" aria-label="Sydney's Christmas Barn home" className="inline-block">
              <Image
                src="/logo.png"
                alt="Sydney's Christmas Barn — where the christmas fun begins"
                width={465}
                height={169}
                className="logo-outline h-auto w-[220px]"
              />
            </Link>
            <p className="mt-5 max-w-xs leading-relaxed text-white/80">
              A family owned Christmas shop in Dural, bringing LED fairy lights and festive
              decorations to Sydney homes since 2007.
            </p>
            <ul className="mt-6 flex gap-3">
              {SOCIALS.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    aria-label={s.label}
                    className="grid h-10 w-10 place-items-center rounded-full border border-gold/60 text-gold transition-colors hover:bg-gold hover:text-pine-dark"
                  >
                    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
                      <path
                        d={s.path}
                        fill={s.fill ? "currentColor" : "none"}
                        stroke={s.fill ? "none" : "currentColor"}
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fillRule="evenodd"
                      />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick links */}
          <div>
            <ColumnTitle>Quick Links</ColumnTitle>
            <ul className="mt-5 flex flex-col gap-3">
              {QUICK_LINKS.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className={linkClass}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <ColumnTitle>Categories</ColumnTitle>
            <ul className="mt-5 flex flex-col gap-3">
              {CATEGORY_LINKS.map((c) => (
                <li key={c.label}>
                  <Link href={c.href} className={linkClass}>
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <ColumnTitle>Get in Touch</ColumnTitle>
            <ul className="mt-5 flex flex-col gap-4 text-white/80">
              <li>
                <span className="block text-xs font-semibold uppercase tracking-widest text-gold/80">Phone</span>
                <a href={SITE.phoneHref} className={linkClass}>{SITE.phone}</a>
              </li>
              <li>
                <span className="block text-xs font-semibold uppercase tracking-widest text-gold/80">Email</span>
                <a href={`mailto:${SITE.email}`} className={`${linkClass} break-words`}>
                  {SITE.email}
                </a>
              </li>
              <li>
                <span className="block text-xs font-semibold uppercase tracking-widest text-gold/80">Location</span>
                <a
                  href={SITE.mapsHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                >
                  {SITE.address}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="relative mt-14 flex w-full flex-col items-center justify-between gap-3 border-t border-white/15 py-6 text-sm text-white/65 sm:flex-row">
          <p>&copy; {new Date().getFullYear()} Sydney&apos;s Christmas Barn. All rights reserved.</p>
          <p className="flex items-center gap-2">
            <Sparkle className="h-3 w-3 text-gold" />
            Where the Christmas Fun Begins
            <Sparkle className="h-3 w-3 text-gold" />
          </p>
        </div>
      </div>
    </footer>
  );
}
