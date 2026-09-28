"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { SITE } from "@/data/site";

type NavLink = { label: string; href: string };
type NavItem = NavLink & { children?: NavLink[] };

const NAV: NavItem[] = [
  {
    label: "Shop",
    href: "/shop",
    children: [
      { label: "All Categories", href: "/shop" },
      { label: "Australiana Christmas", href: "/shop/australiana-christmas" },
      { label: "Wedding Lights", href: "/shop/wedding-lights" },
      { label: "Gift Wrapping", href: "/shop/gift-wrapping" },
    ],
  },
  {
    label: "Categories",
    href: "/shop",
    children: [
      { label: "Fairy Lights", href: "/shop/christmas-fairy-lights" },
      { label: "Display Lights", href: "/shop/christmas-display-lights" },
      { label: "Decorations", href: "/shop/christmas-decorations" },
      { label: "Tree Decorations", href: "/shop/christmas-tree-decorations" },
      { label: "Statues & Figurines", href: "/shop/christmas-statues-and-figurines" },
      { label: "Trees, Wreaths & Garlands", href: "/shop/trees-wreaths-and-garlands" },
      { label: "Nativity Sets", href: "/shop/nativity-sets" },
    ],
  },
  { label: "Gallery", href: "#" },
  { label: "Shipping", href: "#" },
  { label: "About", href: "/old-home#about" },
  { label: "Contact", href: "/#contact" },
];

function ChevronDown({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden>
      <path
        d="M5 7.5l5 5 5-5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PhoneIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M6.6 10.8a15.1 15.1 0 006.6 6.6l2.2-2.2a1 1 0 011-.25 11.4 11.4 0 003.6.57 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.57a1 1 0 01-.25 1l-2.22 2.23z" />
    </svg>
  );
}

function SearchIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" />
      <path d="M20 20l-3.5-3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function UserIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M4 21c0-4 3.6-6.5 8-6.5s8 2.5 8 6.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CartIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M2.5 3.5h2.2l2.3 11.2a1.5 1.5 0 001.5 1.2h8.9a1.5 1.5 0 001.5-1.1L21 7H6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="9.5" cy="20" r="1.4" fill="currentColor" />
      <circle cx="17.5" cy="20" r="1.4" fill="currentColor" />
    </svg>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="absolute inset-x-0 top-4 z-50 px-4 sm:top-5 sm:px-6 lg:px-8">
      <div className="relative flex h-[68px] w-full items-center rounded-full border border-white/20 bg-white/10 pl-4 pr-3 shadow-[0_8px_32px_rgba(0,0,0,0.25)] backdrop-blur-xl sm:h-[76px] sm:pr-5">
        {/* Logo: half inside the header, half hanging below */}
        <Link
          href="/"
          aria-label="Sydney's Christmas Barn home"
          className="absolute left-4 -top-1 transition-transform hover:-translate-y-0.5 sm:left-6 sm:-top-2"
        >
          <Image
            src="/logo.png"
            alt="Sydney's Christmas Barn — where the christmas fun begins"
            width={465}
            height={169}
            priority
            className="logo-outline h-auto w-[180px] sm:w-[240px] xl:w-[280px]"
          />
        </Link>
        {/* Spacer reserving room for the logo */}
        <div className="w-[190px] shrink-0 sm:w-[260px] xl:w-[300px]" />

        {/* Desktop nav */}
        <nav className="hidden flex-1 justify-center lg:flex">
          <ul className="flex items-center gap-1 xl:gap-3">
            {NAV.map((item) => (
              <li key={item.label} className="group relative">
                <Link
                  href={item.href}
                  className="flex items-center gap-1 rounded-full px-3 py-2 text-[15px] font-medium text-white/95 transition-colors hover:bg-white/10 hover:text-gold"
                >
                  {item.label}
                  {item.children && (
                    <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
                  )}
                </Link>
                {item.children && (
                  <div className="invisible absolute left-1/2 top-full -translate-x-1/2 pt-3 opacity-0 transition-all group-hover:visible group-hover:opacity-100">
                    <ul className="min-w-48 rounded-2xl border border-white/15 bg-pine-dark/90 p-2 shadow-xl backdrop-blur-xl">
                      {item.children.map((c) => (
                        <li key={c.label}>
                          <Link
                            href={c.href}
                            className="block rounded-xl px-4 py-2 text-sm text-white/90 hover:bg-white/10 hover:text-gold"
                          >
                            {c.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto flex items-center lg:ml-0">
          {/* Phone */}
          <a
            href={SITE.phoneHref}
            className="hidden items-center gap-2.5 border-x border-white/25 px-5 xl:flex"
          >
            <PhoneIcon className="h-5 w-5 text-gold" />
            <span className="leading-tight">
              <span className="block text-[17px] font-medium text-white">{SITE.phone}</span>
              <span className="block text-xs text-white/75">We&apos;re here to help!</span>
            </span>
          </a>

          {/* Icons */}
          <div className="flex items-center gap-1 sm:gap-2 xl:pl-4">
            <button
              aria-label="Search"
              className="hidden rounded-full p-2 text-white transition-colors hover:bg-white/10 hover:text-gold sm:block"
            >
              <SearchIcon className="h-6 w-6" />
            </button>
            <button
              aria-label="Account"
              className="hidden rounded-full p-2 text-white transition-colors hover:bg-white/10 hover:text-gold sm:block"
            >
              <UserIcon className="h-6 w-6" />
            </button>
            <button
              aria-label="Cart, 0 items"
              className="relative rounded-full p-2 text-white transition-colors hover:bg-white/10 hover:text-gold"
            >
              <CartIcon className="h-6 w-6" />
              <span className="absolute -right-0.5 -top-0.5 grid h-5 w-5 place-items-center rounded-full bg-red-600 text-[11px] font-semibold text-white ring-2 ring-pine">
                0
              </span>
            </button>

            {/* Mobile menu toggle */}
            <button
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="rounded-full p-2 text-white hover:bg-white/10 lg:hidden"
            >
              <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden>
                {open ? (
                  <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                ) : (
                  <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="mt-16 w-full rounded-3xl border border-white/20 bg-pine-dark/90 p-4 shadow-2xl backdrop-blur-xl lg:hidden">
          <ul className="flex flex-col">
            {NAV.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-4 py-3 text-base font-medium text-white hover:bg-white/10 hover:text-gold"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <a
            href={SITE.phoneHref}
            className="mt-2 flex items-center gap-3 rounded-xl border-t border-white/15 px-4 pt-4 text-white"
          >
            <PhoneIcon className="h-5 w-5 text-gold" />
            {SITE.phone}
          </a>
        </div>
      )}
    </header>
  );
}
