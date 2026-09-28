"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import type { BannerSlide } from "@/data/banners";
import { ArrowRight, Check, Chevron } from "./icons";

const INTERVAL = 6500;

export default function BannerSlider({ slides }: { slides: BannerSlide[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchX = useRef<number | null>(null);

  const go = useCallback((i: number) => setIndex((i + slides.length) % slides.length), [slides.length]);

  // Autoplay; restarts whenever the slide changes so manual moves get a full interval
  useEffect(() => {
    if (paused) return;
    const t = setTimeout(() => go(index + 1), INTERVAL);
    return () => clearTimeout(t);
  }, [index, paused, go]);

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Featured collections"
      // All slides share one grid cell, so the banner grows to fit its tallest slide on any screen
      className="relative isolate grid min-h-[560px] overflow-hidden bg-pine-dark sm:min-h-[640px] lg:min-h-[720px] 2xl:min-h-[820px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") go(index - 1);
        if (e.key === "ArrowRight") go(index + 1);
      }}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 50) go(index + (dx < 0 ? 1 : -1));
        touchX.current = null;
      }}
    >
      {slides.map((s, i) => {
        const active = i === index;
        const dark = s.theme === "dark";
        return (
          <div
            key={s.image}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${slides.length}`}
            aria-hidden={!active}
            className={`relative transition-opacity duration-1000 ease-out [grid-area:1/1] ${
              active ? "z-10 opacity-100" : "pointer-events-none z-0 opacity-0"
            }`}
          >
            <Image
              src={s.image}
              alt=""
              fill
              priority={i === 0}
              sizes="100vw"
              quality={85}
              style={{ objectPosition: s.focus ?? "center" }}
              className={`-z-10 object-cover transition-transform duration-[7000ms] ease-out motion-reduce:transition-none ${
                active ? "scale-100" : "scale-110"
              }`}
            />
            {/* Scrim so the copy stays readable over the photo */}
            <div
              className={`absolute inset-0 -z-10 ${
                dark
                  ? "bg-gradient-to-r from-black/80 via-black/55 to-black/10 lg:from-black/75 lg:via-black/35 lg:to-transparent"
                  : "bg-gradient-to-r from-white/90 via-white/70 to-white/10 lg:from-white/85 lg:via-white/45 lg:to-transparent"
              }`}
            />

            {/* Top padding clears the floating header + hanging logo, bottom padding the slider controls */}
            <div className="flex h-full items-center px-4 pb-24 pt-32 sm:px-10 sm:pb-28 sm:pt-36 lg:px-16 lg:pt-40 xl:px-24">
              <div
                className={`max-w-xl transition-all 2xl:max-w-2xl delay-300 duration-700 motion-reduce:transition-none ${
                  active ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
                } ${dark ? "text-white" : "text-[#10261b]"}`}
              >
                <p
                  className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] sm:px-4 sm:text-xs sm:tracking-[0.2em] ${
                    dark ? "bg-white/15 text-gold backdrop-blur" : "bg-pine text-white"
                  }`}
                >
                  {s.eyebrow}
                </p>
                <h2 className="mt-4 font-serif text-[2rem] font-extrabold leading-[1.05] min-[380px]:text-4xl sm:mt-5 sm:text-6xl lg:text-7xl 2xl:text-8xl">
                  {s.title}
                  {s.highlight && (
                    <span className={`block ${dark ? "text-gold-gradient" : "text-[#b00d27]"}`}>{s.highlight}</span>
                  )}
                </h2>
                <p className={`mt-4 max-w-lg text-[15px] leading-relaxed sm:mt-5 sm:text-lg ${dark ? "text-white/90" : "text-zinc-700"}`}>
                  {s.text}
                </p>

                <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 sm:mt-6">
                  {s.usps.map((u) => (
                    <li key={u} className="flex items-center gap-2 text-sm font-medium">
                      <span
                        className={`grid h-5 w-5 place-items-center rounded-full ${
                          dark ? "bg-gold text-pine-dark" : "bg-pine text-white"
                        }`}
                      >
                        <Check className="h-3 w-3" />
                      </span>
                      {u}
                    </li>
                  ))}
                </ul>

                <div className="mt-7 flex flex-wrap items-center gap-3 sm:mt-8 sm:gap-4">
                  <Link
                    href={s.cta.href}
                    tabIndex={active ? undefined : -1}
                    className={`group flex items-center gap-3 rounded-full px-6 py-3 text-[15px] font-semibold sm:px-7 sm:py-3.5 sm:text-base transition-transform hover:-translate-y-0.5 ${
                      dark ? "btn-gold text-pine-dark" : "bg-[#b00d27] text-white shadow-lg hover:bg-[#c8102e]"
                    }`}
                  >
                    {s.cta.label}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                  {s.secondary && (
                    <Link
                      href={s.secondary.href}
                      tabIndex={active ? undefined : -1}
                      className={`rounded-full border-2 px-5 py-[10px] text-[15px] font-medium transition-colors sm:px-6 sm:py-[12px] sm:text-base ${
                        dark
                          ? "border-white/70 text-white hover:bg-white/10"
                          : "border-pine text-pine hover:bg-pine hover:text-white"
                      }`}
                    >
                      {s.secondary.label}
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* Controls */}
      <div className="absolute inset-x-0 bottom-5 z-20 flex items-center justify-between gap-4 px-4 sm:bottom-8 sm:px-10 lg:px-16 xl:px-24">
        <div className="flex items-center gap-2" role="tablist" aria-label="Choose slide">
          {slides.map((s, i) => (
            <button
              key={s.image}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Slide ${i + 1}: ${s.eyebrow}`}
              onClick={() => go(i)}
              className={`relative h-2 overflow-hidden rounded-full bg-white/40 transition-all ${
                i === index ? "w-14" : "w-2 hover:bg-white/70"
              }`}
            >
              {i === index && (
                <span
                  key={`${index}-${paused}`}
                  className="absolute inset-y-0 left-0 rounded-full bg-gold"
                  style={{
                    animation: paused ? "none" : `slider-progress ${INTERVAL}ms linear forwards`,
                    width: paused ? "100%" : undefined,
                  }}
                />
              )}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => go(index - 1)}
            aria-label="Previous slide"
            className="grid h-10 w-10 place-items-center rounded-full border border-white/40 sm:h-11 sm:w-11 bg-black/20 text-white backdrop-blur transition-colors hover:bg-white hover:text-pine"
          >
            <Chevron dir="left" className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => go(index + 1)}
            aria-label="Next slide"
            className="grid h-10 w-10 place-items-center rounded-full border border-white/40 sm:h-11 sm:w-11 bg-black/20 text-white backdrop-blur transition-colors hover:bg-white hover:text-pine"
          >
            <Chevron className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
