"use client";

import { useState } from "react";
import { SITE } from "@/data/site";

const CONTACT_ITEMS = [
  {
    label: "Call Us",
    value: SITE.phone,
    href: SITE.phoneHref,
    icon: (
      <path
        fill="currentColor"
        d="M6.6 10.8a15.1 15.1 0 006.6 6.6l2.2-2.2a1 1 0 011-.25 11.4 11.4 0 003.6.57 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.57a1 1 0 01-.25 1l-2.22 2.23z"
      />
    ),
  },
  {
    label: "Email Us",
    value: SITE.email,
    href: `mailto:${SITE.email}`,
    icon: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.8" fill="none" />
        <path d="M3.5 6.5L12 13l8.5-6.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </>
    ),
  },
  {
    label: "Visit Us",
    value: SITE.address,
    href: SITE.mapsHref,
    icon: (
      <>
        <path d="M12 21s-7-6.2-7-11.5A7 7 0 0119 9.5C19 14.8 12 21 12 21z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" fill="none" />
        <circle cx="12" cy="9.5" r="2.5" stroke="currentColor" strokeWidth="1.8" fill="none" />
      </>
    ),
  },
];

const inputClass =
  "w-full rounded-lg bg-zinc-100 px-4 py-3 text-sm text-zinc-800 placeholder:text-zinc-400 outline-none ring-1 ring-transparent transition focus:bg-white focus:ring-[#c8102e]/60";

type FormProps = {
  title: string;
  subtitle: string;
  button: string;
  children: React.ReactNode;
};

function ContactForm({ title, subtitle, button, children }: FormProps) {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // TODO: send to a backend / email service
    setSent(true);
    e.currentTarget.reset();
  }

  return (
    <div className="flex h-full flex-col justify-center px-6 py-12 sm:px-12">
      <h2 className="text-center font-serif text-3xl font-extrabold text-zinc-900 sm:text-4xl">
        {title}
      </h2>
      <p className="mt-3 text-center text-sm text-zinc-500">{subtitle}</p>

      <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
        {children}
        <button
          type="submit"
          className="mx-auto mt-2 rounded-lg bg-[#c8102e] px-10 py-3 text-sm font-bold uppercase tracking-wider text-white shadow-[0_12px_25px_-10px_rgba(176,13,39,0.7)] transition-all hover:-translate-y-0.5 hover:bg-[#b00d27]"
        >
          {button}
        </button>
        {sent && (
          <p role="status" className="text-center text-sm font-medium text-pine">
            Thanks! We&apos;ll be in touch soon.
          </p>
        )}
      </form>
    </div>
  );
}

export default function Contact() {
  // false = "Send a Message" form, true = "Request a Callback" form
  const [callback, setCallback] = useState(false);

  const slide = "transition-all duration-700 ease-in-out";
  // Forms: old one fades out fast, new one fades in once the panel has covered the swap
  const formSlide = "md:[transition:transform_700ms_ease-in-out,opacity_250ms_ease-out]";
  const fadeInLate = "md:[transition-delay:0ms,350ms]";

  return (
    <section id="contact" className="bg-[#fdf8f1] px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <div className="relative mx-auto flex max-w-5xl flex-col overflow-hidden rounded-[2rem] bg-white shadow-[0_30px_60px_-25px_rgba(0,0,0,0.35)] md:block md:h-[640px]">
        {/* Message form: starts on the left, slides right (under the panel) when switching */}
        <div
          className={`${formSlide} ${callback ? "hidden md:block md:translate-x-full md:opacity-0" : `md:z-20 ${fadeInLate}`} md:absolute md:inset-y-0 md:left-0 md:w-1/2`}
        >
          <ContactForm
            title="Send a Message"
            subtitle="Questions about lights, decorations or orders? Drop us a line"
            button="Send Message"
          >
            <input name="name" required placeholder="Your Name" className={inputClass} aria-label="Your name" />
            <input name="email" type="email" required placeholder="Your E-mail" className={inputClass} aria-label="Your email" />
            <input name="phone" type="tel" placeholder="Phone Number" className={inputClass} aria-label="Phone number" />
            <textarea
              name="message"
              required
              rows={4}
              placeholder="Your Message"
              className={`${inputClass} resize-none`}
              aria-label="Your message"
            />
          </ContactForm>
        </div>

        {/* Callback form: hidden behind on the left, revealed on the right when switching */}
        <div
          className={`${formSlide} ${callback ? `md:z-30 md:translate-x-full md:opacity-100 ${fadeInLate}` : "hidden md:block md:z-10 md:opacity-0"} md:absolute md:inset-y-0 md:left-0 md:w-1/2`}
        >
          <ContactForm
            title="Request a Callback"
            subtitle="Leave your details and our friendly team will call you back"
            button="Call Me Back"
          >
            <input name="name" required placeholder="Your Name" className={inputClass} aria-label="Your name" />
            <input name="phone" type="tel" required placeholder="Phone Number" className={inputClass} aria-label="Phone number" />
            <select name="time" defaultValue="" className={inputClass} aria-label="Best time to call">
              <option value="" disabled>
                Best Time to Call
              </option>
              <option>Morning (9am – 12pm)</option>
              <option>Afternoon (12pm – 3pm)</option>
              <option>Late Afternoon (3pm – 5pm)</option>
            </select>
            <textarea
              name="topic"
              rows={3}
              placeholder="What can we help with?"
              className={`${inputClass} resize-none`}
              aria-label="What can we help with"
            />
          </ContactForm>
        </div>

        {/* Red contact panel: sits on the right, slides left when switching */}
        <div
          className={`${slide} order-first flex flex-col justify-center rounded-[2rem] bg-[#c8102e] px-6 py-12 text-white sm:px-12 md:absolute md:inset-y-0 md:left-1/2 md:z-40 md:w-1/2 ${
            callback ? "md:-translate-x-full" : ""
          }`}
        >
          <h2 className="text-center font-serif text-3xl font-extrabold sm:text-4xl">Contact Us</h2>
          <p className="mt-3 text-center text-white/85">
            We&apos;d love to help make your Christmas magical
          </p>

          <ul className="mt-8 flex flex-col gap-3">
            {CONTACT_ITEMS.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="flex items-center gap-4 rounded-xl border-2 border-white/80 px-5 py-3.5 transition-colors hover:bg-white/10"
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white text-[#c8102e]">
                    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
                      {item.icon}
                    </svg>
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs font-semibold uppercase tracking-widest text-white/75">
                      {item.label}
                    </span>
                    <span className="block break-words font-medium">{item.value}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <p className="mt-8 text-center text-sm text-white/85">
            {callback ? "Prefer to write to us instead?" : "Would you rather we called you?"}
          </p>
          <button
            type="button"
            onClick={() => setCallback((v) => !v)}
            className="mx-auto mt-3 rounded-lg border-2 border-white px-8 py-2.5 text-sm font-bold uppercase tracking-wider transition-colors hover:bg-white hover:text-[#c8102e]"
          >
            {callback ? "Send a Message" : "Request a Callback"}
          </button>
        </div>
      </div>
    </section>
  );
}
