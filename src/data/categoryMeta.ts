// Hand-written copy for each shop category page. Keys are category slugs
// from catalog.json; anything left out falls back to the scraped data.

export type FeatureIcon = "leaf" | "paw" | "gift" | "feather" | "check" | "home" | "truck" | "bulb" | "sun" | "star";

export type CategoryMeta = {
  /** Short label for the range strip */
  shortName?: string;
  /** Hero heading */
  title?: string;
  /** Hero paragraph (defaults to the old site's intro) */
  intro?: string;
  /** Handwritten note pinned to the hero image */
  note?: string;
  /** Handwritten line next to "Explore Our Range" */
  tagline?: string;
  features?: { icon: FeatureIcon; label: string }[];
  /** Product used for the range-strip thumbnail */
  coverProduct?: string;
  /** Product shown in the hero */
  heroProduct?: string;
  /** Word used in "Featured ___" */
  featuredNoun?: string;
  promo?: { eyebrow: string; title: string; text: string; product?: string };
};

export const DEFAULT_FEATURES: NonNullable<CategoryMeta["features"]> = [
  { icon: "check", label: "Hand-Checked\nQuality" },
  { icon: "home", label: "Family Owned\nSince 2007" },
  { icon: "gift", label: "Perfect for Gifts\n& Collectors" },
  { icon: "truck", label: "Australia-Wide\nDelivery" },
];

export const CATEGORY_META: Record<string, CategoryMeta> = {
  "australiana-christmas": {
    shortName: "Australian Christmas",
    title: "Australian Animal Christmas Decorations",
    intro:
      "Bring a little piece of Australia to your festive season with our unique range of Australian animal decorations. Ethically made from natural and renewable materials, perfect for your tree or as a gift.",
    note: "A little piece of Australia for your tree",
    tagline: "Iconic Australian wildlife, handcrafted into beautiful Christmas decorations.",
    features: [
      { icon: "leaf", label: "100% Natural\n& Sustainable" },
      { icon: "paw", label: "Unique Australian\nAnimal Designs" },
      { icon: "gift", label: "Perfect for Gifts\n& Collectors" },
      { icon: "feather", label: "Lightweight\n& Durable" },
    ],
    coverProduct: "9cm-koala-with-christmas-hat-hanging-christmas-tree-ornament",
    heroProduct: "9cm-koala-with-christmas-hat-hanging-christmas-tree-ornament",
    featuredNoun: "Decorations",
    promo: {
      eyebrow: "Customer Favourites",
      title: "Iconic Aussie Wildlife",
      text: "Beautifully handcrafted bristle decorations for a unique and meaningful Christmas.",
      product: "kookaburra-koala-kangaroo-aussie-bristle-door-hanger",
    },
  },
  "christmas-bon-bon-crackers": {
    shortName: "Bon Bon Crackers",
    title: "Christmas Bon Bons & Crackers",
    note: "Pull, pop & share a laugh",
    tagline: "Paper hats, silly jokes and a little surprise inside.",
    featuredNoun: "Bon Bons",
  },
  "christmas-decorations": {
    title: "Christmas Home Decorations",
    note: "Make every room merry",
    tagline: "Table pieces, stockings, light-ups and festive touches for every room.",
    featuredNoun: "Decorations",
  },
  "christmas-display-lights": {
    title: "Christmas Display Lights",
    note: "Be the brightest house on the street",
    tagline: "Acrylic figures, motifs, infinity mirrors and rope lights that wow.",
    features: [
      { icon: "bulb", label: "Energy Efficient\nLED Lights" },
      { icon: "star", label: "Show-Stopping\nDisplays" },
      { icon: "check", label: "Hand-Checked\nQuality" },
      { icon: "truck", label: "Australia-Wide\nDelivery" },
    ],
    featuredNoun: "Display Lights",
  },
  "christmas-fairy-lights": {
    title: "Christmas Fairy Lights",
    note: "Twinkle, twinkle all season long",
    tagline: "Fairy, icicle, curtain, net, cluster and solar lights for every space.",
    features: [
      { icon: "bulb", label: "Energy Efficient\nLED Lights" },
      { icon: "sun", label: "Solar & Battery\nOptions" },
      { icon: "check", label: "Tested Before\nIt Leaves Us" },
      { icon: "truck", label: "Australia-Wide\nDelivery" },
    ],
    featuredNoun: "Fairy Lights",
  },
  "christmas-inflatables": {
    title: "Christmas Inflatables",
    note: "Big smiles, bigger decorations",
    tagline: "Giant outdoor inflatables the whole street will love.",
    featuredNoun: "Inflatables",
  },
  "christmas-statues-and-figurines": {
    shortName: "Statues & Figurines",
    title: "Christmas Statues & Figurines",
    note: "Santa's whole crew is here",
    tagline: "Santas, gnomes, elves, angels, nutcrackers and reindeer.",
    featuredNoun: "Figurines",
  },
  "christmas-tree-decorations": {
    shortName: "Tree Decorations",
    title: "Christmas Tree Decorations",
    note: "Dress your tree to impress",
    tagline: "Baubles, toppers, picks, skirts and tinsel for the perfect tree.",
    featuredNoun: "Tree Decorations",
  },
  "gift-wrapping": {
    title: "Christmas Gift Wrapping",
    note: "Wrapped with love",
    tagline: "Ribbons, bags, tags and cards to finish every gift beautifully.",
    featuredNoun: "Gift Wrap",
  },
  "nativity-sets": {
    title: "Christmas Nativity Sets",
    note: "The true meaning of Christmas",
    tagline: "Beautiful nativity scenes for indoors and out.",
    featuredNoun: "Nativity Sets",
  },
  "trees-wreaths-and-garlands": {
    shortName: "Trees, Wreaths & Garlands",
    title: "Christmas Trees, Wreaths & Garlands",
    note: "Deck the halls, doors & mantels",
    tagline: "Quality artificial trees, lush wreaths and festive garlands.",
    featuredNoun: "Greenery",
  },
  sale: {
    shortName: "Sale",
    title: "Christmas Sale & Combo Specials",
    intro:
      "Our best prices on selected Christmas decorations, lights and combo specials. Grab a bargain while stocks last.",
    note: "Bargains for your merry Christmas",
    tagline: "Selected decorations and combo deals at our best prices.",
    featuredNoun: "Deals",
    promo: {
      eyebrow: "While Stocks Last",
      title: "Christmas Bargains",
      text: "Discounted decorations and combo specials from across the barn.",
    },
  },
  "wedding-lights": {
    title: "Wedding & Event Lights",
    note: "For your most magical day",
    tagline: "Long-length fairy, curtain and battery lights for weddings and events.",
    featuredNoun: "Wedding Lights",
  },
};
