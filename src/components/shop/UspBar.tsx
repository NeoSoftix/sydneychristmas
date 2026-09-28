import type { FeatureIcon } from "@/data/categoryMeta";
import { Feature } from "./icons";

const USPS: { icon: FeatureIcon; title: string; text: string }[] = [
  { icon: "home", title: "Free Click & Collect", text: "Pick up from our barn in Dural" },
  { icon: "truck", title: "Australia-Wide Delivery", text: "Dispatched within 5 business days" },
  { icon: "star", title: "Family Owned Since 2007", text: "Sydney's Christmas specialists" },
  { icon: "check", title: "Every Item Checked", text: "Tested before it leaves the barn" },
];

export default function UspBar() {
  return (
    <section aria-label="Why shop with us" className="relative z-10 bg-pine text-white">
      <ul className="grid grid-cols-2 gap-px bg-white/10 lg:grid-cols-4">
        {USPS.map((u) => (
          <li
            key={u.title}
            className="flex flex-col items-center gap-2 bg-pine px-3 py-5 text-center min-[420px]:flex-row min-[420px]:gap-3 min-[420px]:px-4 min-[420px]:text-left sm:gap-4 sm:px-8 sm:py-6"
          >
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white/10 text-gold sm:h-12 sm:w-12">
              <Feature icon={u.icon} className="h-5 w-5 sm:h-6 sm:w-6" />
            </span>
            <span className="min-w-0">
              <span className="block text-sm font-semibold leading-tight sm:text-base">{u.title}</span>
              <span className="mt-0.5 block text-xs leading-snug text-white/70 sm:text-sm">{u.text}</span>
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
