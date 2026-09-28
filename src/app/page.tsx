import { notFound } from "next/navigation";
import Contact from "@/components/Contact";
import BannerSlider from "@/components/shop/BannerSlider";
import CategoryView from "@/components/shop/CategoryView";
import ShopFrame from "@/components/shop/ShopFrame";
import UspBar from "@/components/shop/UspBar";
import { BANNERS } from "@/data/banners";
import { getCategory, getSaleStats } from "@/lib/catalog";

// The previous landing page is kept at /old-home as a backup
const HOME_CATEGORY = "australiana-christmas";

export default function Home() {
  const category = getCategory(HOME_CATEGORY);
  if (!category) notFound();

  // Fill the sale numbers into the banner copy from the live catalog
  const sale = getSaleStats();
  const fill = (s: string) => s.replace("{sale}", String(sale.maxPercent)).replace("{saleCount}", String(sale.count));
  const slides = BANNERS.map((b) => ({
    ...b,
    title: fill(b.title),
    highlight: b.highlight && fill(b.highlight),
    usps: b.usps.map(fill),
  }));

  return (
    <ShopFrame overlayHeader>
      <BannerSlider slides={slides} />
      <UspBar />
      <CategoryView category={category} crumbs={[]} hideHero />
      <Contact />
    </ShopFrame>
  );
}
