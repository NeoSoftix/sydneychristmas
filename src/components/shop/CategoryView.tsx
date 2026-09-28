import { getCategories, getCategoryIntro, getCategoryProducts, getProduct, type Category } from "@/lib/catalog";
import CategoryHero from "./CategoryHero";
import FeaturedProducts from "./FeaturedProducts";
import ProductGrid from "./ProductGrid";
import RangeStrip from "./RangeStrip";

type Props = {
  category: Category;
  crumbs: { label: string; href?: string }[];
  /** Skip the category hero (e.g. when the page has its own banner) */
  hideHero?: boolean;
};

/** Full category page: hero, endless category slider, featured carousel, all products */
export default function CategoryView({ category, crumbs, hideHero = false }: Props) {
  const products = getCategoryProducts(category);
  const hero = getProduct(category.heroProduct ?? "") ?? products[0];
  const promoProduct = getProduct(category.promo?.product ?? "") ?? products[1] ?? products[0];
  const subcategories = category.subcategories
    .filter((s) => s.products.length)
    .map((s) => ({ slug: s.slug, name: s.name }));

  return (
    <>
      {!hideHero && (
        <CategoryHero
          title={category.title ?? category.name}
          intro={getCategoryIntro(category)}
          note={category.note}
          image={hero?.image}
          imageAlt={hero?.name}
          features={category.features}
          crumbs={crumbs}
        />
      )}
      <RangeStrip categories={getCategories()} activeSlug={category.slug} tagline={category.tagline} />
      {/* Keyed by category so filters reset when switching categories */}
      <FeaturedProducts
        key={`featured-${category.slug}`}
        noun={category.featuredNoun ?? "Products"}
        products={products}
        subcategories={subcategories}
        promo={{
          eyebrow: category.promo?.eyebrow ?? "Family Favourites",
          title: category.promo?.title ?? category.shortName ?? category.name,
          text: category.promo?.text ?? "Hand-picked by our family and checked before it leaves the barn.",
          image: promoProduct?.image,
        }}
      />
      <ProductGrid
        key={`grid-${category.slug}`}
        title={`All ${category.shortName ?? category.name}`}
        products={products}
        subcategories={subcategories}
      />
    </>
  );
}
