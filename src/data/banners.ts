export type BannerSlide = {
  image: string;
  /** "dark" = light text over a dark scrim, "light" = dark text over a light scrim */
  theme: "dark" | "light";
  eyebrow: string;
  title: string;
  /** Part of the title shown in gold */
  highlight?: string;
  text: string;
  usps: string[];
  cta: { label: string; href: string };
  secondary?: { label: string; href: string };
  /** CSS object-position, so the products stay in view on narrow screens */
  focus?: string;
};

/** Hero slides. `{sale}` / `{saleCount}` are filled in from the catalog. */
export const BANNERS: BannerSlide[] = [
  {
    image: "/banner/banner1.png",
    theme: "dark",
    eyebrow: "New Season Arrivals",
    title: "Light Up Your",
    highlight: "Christmas Village",
    text: "Glowing villages, lanterns, snow globes and musical decorations that bring the magic of Christmas indoors.",
    usps: ["Light-up & musical pieces", "Checked before it leaves the barn", "Free Click & Collect in Dural"],
    cta: { label: "Shop Decorations", href: "/shop/christmas-decorations" },
    secondary: { label: "Statues & Figurines", href: "/shop/christmas-statues-and-figurines" },
    focus: "72% center",
  },
  {
    image: "/banner/banner2.png",
    theme: "dark",
    eyebrow: "Sydney's Fairy Light Specialists",
    title: "Make Your Garden",
    highlight: "Twinkle",
    text: "LED fairy, icicle, net, cluster and solar lights for trees, rooftops and gardens, in stock all year round.",
    usps: ["Energy-efficient LED", "Solar & battery options", "Connectable sets"],
    cta: { label: "Shop Fairy Lights", href: "/shop/christmas-fairy-lights" },
    secondary: { label: "Wedding Lights", href: "/shop/wedding-lights" },
    focus: "70% center",
  },
  {
    image: "/banner/banner3.png",
    theme: "dark",
    eyebrow: "Christmas Sale",
    title: "Save Up To",
    highlight: "{sale}% Off",
    text: "Baubles, ribbons, figurines, lights and combo specials at our best prices. Grab them while stocks last!",
    usps: ["{saleCount}+ items reduced", "Combo specials", "Australia-wide delivery"],
    cta: { label: "Shop the Sale", href: "/shop/sale" },
    secondary: { label: "Tree Decorations", href: "/shop/christmas-tree-decorations" },
    focus: "60% center",
  },
  {
    image: "/banner/banner4.png",
    theme: "light",
    eyebrow: "Christmas Display Lights",
    title: "Show-Stopping",
    highlight: "Light Displays",
    text: "3D acrylic reindeer, snowmen and light motifs that make your lawn, porch or shopfront the talk of the street.",
    usps: ["Indoor & outdoor styles", "Bright LED displays", "Dispatched within 5 business days"],
    cta: { label: "Shop Display Lights", href: "/shop/christmas-display-lights" },
    secondary: { label: "Inflatables", href: "/shop/christmas-inflatables" },
    focus: "75% center",
  },
];
